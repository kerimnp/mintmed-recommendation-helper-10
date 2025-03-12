
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
      throw new Error('AI service configuration is missing');
    }

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
            content: `You are an AI medical assistant specializing in antibiotic recommendations. 
            Given the patient data, provide a recommendation in JSON format. Return ONLY a valid JSON object with NO markdown formatting or additional text.`
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
      throw new Error('AI service temporarily unavailable');
    }

    const result = await response.json();
    if (!result?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI service');
    }

    const aiResponse = result.choices[0].message.content;
    console.log('Raw AI response:', aiResponse);

    try {
      const cleanJson = aiResponse
        .replace(/```json\n?|\n?```/g, '')
        .replace(/[\u0000-\u001F]+/g, '')
        .trim();
      
      const parsedRecommendation = JSON.parse(cleanJson);

      if (!parsedRecommendation.primaryRecommendation ||
          !parsedRecommendation.reasoning ||
          !Array.isArray(parsedRecommendation.alternatives) ||
          !Array.isArray(parsedRecommendation.precautions)) {
        throw new Error('Invalid recommendation format');
      }

      return new Response(
        JSON.stringify({ recommendation: parsedRecommendation }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI recommendation');
    }
  } catch (error) {
    console.error('Error in get-ai-recommendation:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
