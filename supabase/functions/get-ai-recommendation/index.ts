import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

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
    console.log('Received patient data:', patientData);

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

    const systemPrompt = `You are an AI medical assistant specializing in antibiotic recommendations. 
    Analyze the patient data and provide a recommendation in the following JSON format ONLY:
    {
      "primaryRecommendation": {
        "name": "antibiotic name",
        "dose": "dosage details",
        "route": "administration route",
        "duration": "treatment duration"
      },
      "reasoning": "detailed clinical reasoning for the recommendation",
      "alternatives": [
        {
          "name": "alternative antibiotic name",
          "dose": "alternative dosage",
          "route": "alternative route",
          "duration": "alternative duration",
          "reason": "reason for suggesting this alternative"
        }
      ],
      "precautions": [
        "list of relevant precautions and warnings"
      ]
    }
    
    Consider all patient factors including allergies, comorbidities, and infection details. 
    Ensure dosing is appropriate for patient weight and renal function.
    IMPORTANT: Return ONLY the JSON object, no additional text.`;

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
            content: systemPrompt
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
    let recommendation = result.choices[0].message.content;
    
    // Ensure the response is valid JSON
    try {
      // If it's a string, parse it to ensure it's valid JSON
      if (typeof recommendation === 'string') {
        recommendation = JSON.parse(recommendation);
      }
      console.log('Got structured recommendation from Perplexity');
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid AI response format' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

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