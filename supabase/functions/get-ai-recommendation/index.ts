import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received request to get AI recommendation');

    // Get request body
    const { patientData } = await req.json();
    if (!patientData) {
      throw new Error('No patient data provided');
    }
    console.log('Received patient data:', patientData);

    // Verify Perplexity API key
    if (!perplexityApiKey) {
      console.error('Missing Perplexity API key');
      return new Response(
        JSON.stringify({ error: 'Missing API key configuration' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Call Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an AI medical assistant specializing in antibiotic recommendations. Provide evidence-based recommendations considering patient factors, local resistance patterns, and current guidelines. Always be precise with dosing and include monitoring requirements.'
          },
          {
            role: 'user',
            content: JSON.stringify(patientData)
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to get AI recommendation' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await response.json();
    const recommendation = result.choices[0].message.content;
    console.log('Got recommendation from Perplexity');

    return new Response(
      JSON.stringify({ recommendation }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in get-ai-recommendation:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});