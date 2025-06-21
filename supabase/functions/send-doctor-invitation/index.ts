
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  doctorEmail: string;
  doctorFirstName?: string;
  doctorLastName?: string;
  hospitalName: string;
  adminName: string;
  customMessage?: string;
  invitationToken: string;
  hospitalAdminId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      doctorEmail,
      doctorFirstName,
      doctorLastName,
      hospitalName,
      adminName,
      customMessage,
      invitationToken,
      hospitalAdminId
    }: InvitationRequest = await req.json();

    console.log(`Sending invitation to ${doctorEmail} for ${hospitalName}`);

    const doctorName = [doctorFirstName, doctorLastName].filter(Boolean).join(' ') || doctorEmail;
    const acceptUrl = `${Deno.env.get('SUPABASE_URL')?.replace('/v1', '')}/hospital-invitation?token=${invitationToken}&hospital=${encodeURIComponent(hospitalName)}&admin=${hospitalAdminId}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hospital Invitation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            .highlight { background: #eff6ff; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 0 6px 6px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏥 Hospital Invitation</h1>
            <p>You're invited to join ${hospitalName}</p>
          </div>
          
          <div class="content">
            <h2>Hello ${doctorName}!</h2>
            
            <p>You have been invited by <strong>${adminName}</strong> to join <strong>${hospitalName}</strong> on our Antibiotic Management Platform.</p>
            
            ${customMessage ? `<div class="highlight"><strong>Personal Message:</strong><br>${customMessage}</div>` : ''}
            
            <p>Our platform helps healthcare professionals make evidence-based antibiotic recommendations, ensuring optimal patient care and supporting antimicrobial stewardship.</p>
            
            <div style="text-align: center;">
              <a href="${acceptUrl}" class="button">Accept Invitation & Join ${hospitalName}</a>
            </div>
            
            <div class="highlight">
              <strong>What happens next?</strong>
              <ul>
                <li>Click the button above to accept the invitation</li>
                <li>Create your account or sign in if you already have one</li>
                <li>You'll be automatically affiliated with ${hospitalName}</li>
                <li>Start using the platform with your hospital team</li>
              </ul>
            </div>
            
            <p><strong>Platform Features:</strong></p>
            <ul>
              <li>AI-powered antibiotic recommendations</li>
              <li>Clinical decision support tools</li>
              <li>Real-time drug interaction checks</li>
              <li>Antimicrobial stewardship analytics</li>
              <li>Collaborative hospital management</li>
            </ul>
            
            <p>If you have any questions, please don't hesitate to contact ${adminName} or our support team.</p>
          </div>
          
          <div class="footer">
            <p>This invitation was sent by ${adminName} from ${hospitalName}</p>
            <p>If you didn't expect this invitation, you can safely ignore this email.</p>
            <p>&copy; 2024 Antibiotic Management Platform. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Hospital Invitations <onboarding@resend.dev>",
      to: [doctorEmail],
      subject: `Invitation to join ${hospitalName} - Antibiotic Management Platform`,
      html: emailHtml,
    });

    console.log("Invitation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Invitation sent successfully",
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error sending invitation:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send invitation" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
