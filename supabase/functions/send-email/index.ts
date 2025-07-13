import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  template?: string;
  templateData?: Record<string, any>;
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-EMAIL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Verify Resend API key is configured
    if (!Deno.env.get("RESEND_API_KEY")) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) {
      throw new Error("Authentication failed");
    }

    logStep("User authenticated", { userId: userData.user.id });

    // Verify user has admin or super_admin role
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', userData.user.id)
      .single();

    if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
      throw new Error("Insufficient permissions");
    }

    logStep("User authorized", { role: profile.role });

    const { to, subject, html, text, from, template, templateData }: EmailRequest = await req.json();

    if (!to || to.length === 0) {
      throw new Error("Recipient email addresses are required");
    }

    if (!subject) {
      throw new Error("Subject is required");
    }

    if (!html && !text && !template) {
      throw new Error("Email content (html, text, or template) is required");
    }

    logStep("Request validated", { recipientCount: to.length });

    let emailContent: any = {
      from: from || "Antibioteka <noreply@antibioteka.com>",
      to,
      subject,
    };

    if (template) {
      // Handle template-based emails
      switch (template) {
        case 'welcome':
          emailContent.html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2A7FFF;">Welcome to Antibioteka!</h1>
              <p>Dear ${templateData?.name || 'User'},</p>
              <p>Welcome to Antibioteka, your evidence-based antibiotic decision support platform.</p>
              <p>We're excited to have you join our community of healthcare professionals committed to optimizing antibiotic therapy.</p>
              <p>If you have any questions, please don't hesitate to contact our support team.</p>
              <p>Best regards,<br>The Antibioteka Team</p>
            </div>
          `;
          break;
        case 'password_reset':
          emailContent.html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2A7FFF;">Password Reset Request</h1>
              <p>You have requested to reset your password for your Antibioteka account.</p>
              <p>Your temporary password is: <strong>${templateData?.tempPassword}</strong></p>
              <p>Please log in and change your password immediately.</p>
              <p>If you didn't request this, please contact support immediately.</p>
              <p>Best regards,<br>The Antibioteka Team</p>
            </div>
          `;
          break;
        case 'system_maintenance':
          emailContent.html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #FFB74D;">System Maintenance Notice</h1>
              <p>We will be performing scheduled maintenance on Antibioteka.</p>
              <p><strong>Maintenance Window:</strong> ${templateData?.maintenanceWindow || 'TBD'}</p>
              <p>During this time, you may experience brief interruptions in service.</p>
              <p>We apologize for any inconvenience and appreciate your patience.</p>
              <p>Best regards,<br>The Antibioteka Team</p>
            </div>
          `;
          break;
        default:
          throw new Error(`Unknown template: ${template}`);
      }
    } else {
      // Handle custom HTML/text emails
      if (html) emailContent.html = html;
      if (text) emailContent.text = text;
    }

    logStep("Sending email", { template, recipientCount: to.length });

    // Send email using Resend
    const emailResponse = await resend.emails.send(emailContent);

    if (emailResponse.error) {
      throw new Error(`Resend API error: ${emailResponse.error.message}`);
    }

    logStep("Email sent successfully", { emailId: emailResponse.data?.id });

    // Log the admin action
    await supabaseClient.from('admin_activity_logs').insert({
      admin_user_id: userData.user.id,
      action_type: 'email_sent',
      target_type: 'email',
      target_id: to.join(','),
      details: {
        subject,
        template: template || 'custom',
        recipient_count: to.length,
        email_id: emailResponse.data?.id
      }
    });

    return new Response(JSON.stringify({
      success: true,
      message: `Email sent to ${to.length} recipient(s)`,
      emailId: emailResponse.data?.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      success: false,
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});