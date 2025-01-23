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
    console.log('Received patient data:', patientData);

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
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
    Given the patient data, provide a recommendation in JSON format. Return ONLY a valid JSON object with NO markdown formatting or additional text. The JSON must follow this structure:
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
    }`;

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
    const aiResponse = result.choices[0].message.content;
    console.log('Raw AI response:', aiResponse);

    try {
      // Clean and parse the response
      const cleanJson = aiResponse
        .replace(/```json\n?|\n?```/g, '') // Remove markdown code blocks
        .replace(/[\u0000-\u001F]+/g, '') // Remove control characters
        .trim();
      
      const parsedRecommendation = JSON.parse(cleanJson);

      // Validate the structure
      if (!parsedRecommendation.primaryRecommendation ||
          !parsedRecommendation.reasoning ||
          !Array.isArray(parsedRecommendation.alternatives) ||
          !Array.isArray(parsedRecommendation.precautions)) {
        throw new Error('Response missing required fields');
      }

      console.log('Successfully parsed AI recommendation:', parsedRecommendation);
      
      return new Response(
        JSON.stringify({ recommendation: parsedRecommendation }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.error('Problematic response:', aiResponse);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid AI response format',
          details: error.message,
          rawResponse: aiResponse 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
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