
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received request to get AI recommendation');

    const { patientData } = await req.json();
    if (!patientData) {
      throw new Error('No patient data provided');
    }
    console.log('Patient data received:', JSON.stringify(patientData));

    // Use API key from environment variable or request body
    let perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    
    if (!perplexityApiKey || perplexityApiKey.trim() === '') {
      console.error('Perplexity API key not found in environment variables');
      throw new Error('API service configuration is missing - please add PERPLEXITY_API_KEY to your Supabase Edge Function Secrets');
    }

    console.log('Making request to Perplexity API...');
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
            content: `You are a medical AI assistant specializing in antibiotic recommendations. 
            Given the patient data, provide a detailed recommendation in JSON format with the following structure:
            {
              "primaryRecommendation": {
                "name": string,
                "dose": string,
                "route": string,
                "duration": string
              },
              "reasoning": string,
              "alternatives": [
                {
                  "name": string,
                  "dose": string,
                  "route": string,
                  "duration": string,
                  "reason": string
                }
              ],
              "precautions": [string]
            }
            Return ONLY valid JSON with NO markdown formatting or additional text.`
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
      console.error(`Perplexity API error (${response.status}):`, errorText);
      throw new Error(`AI service error: ${response.status} - ${errorText || 'Unknown error'}`);
    }

    const result = await response.json();
    console.log('Raw AI response received');

    if (!result?.choices?.[0]?.message?.content) {
      console.error('Invalid response format from AI:', result);
      throw new Error('Invalid response format from AI service');
    }

    try {
      const cleanJson = result.choices[0].message.content
        .replace(/```json\n?|\n?```/g, '')
        .replace(/[\u0000-\u001F]+/g, '')
        .trim();
      
      console.log('Cleaned JSON');
      const parsedRecommendation = JSON.parse(cleanJson);

      // Validate the response structure
      if (!parsedRecommendation.primaryRecommendation?.name ||
          !parsedRecommendation.reasoning ||
          !Array.isArray(parsedRecommendation.alternatives) ||
          !Array.isArray(parsedRecommendation.precautions)) {
        console.error('Invalid recommendation structure:', parsedRecommendation);
        throw new Error('Invalid recommendation format from AI');
      }

      return new Response(
        JSON.stringify({ 
          recommendation: parsedRecommendation,
          status: 'success'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI recommendation: ' + error.message);
    }
  } catch (error) {
    console.error('Error in get-ai-recommendation:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
        status: 'error'
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
