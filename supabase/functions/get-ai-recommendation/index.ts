
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

    // Use OpenAI API key from environment variable
    const openAiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAiApiKey || openAiApiKey.trim() === '') {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('API service configuration is missing - please add OPENAI_API_KEY to your Supabase Edge Function Secrets');
    }

    // Enhanced system message with comprehensive clinical guidelines
    const systemMessage = `You are an advanced clinical AI assistant specializing in evidence-based antibiotic recommendations. 
    You must provide comprehensive, clinically-sound recommendations following IDSA, CDC, and WHO guidelines.
    
    Given the patient data, provide a detailed recommendation in JSON format with the following structure:
    {
      "primaryRecommendation": {
        "name": string,
        "dosage": string,
        "frequency": string,
        "route": string,
        "duration": string
      },
      "reasoning": string,
      "alternatives": [
        {
          "name": string,
          "dosage": string,
          "frequency": string,
          "route": string,
          "duration": string,
          "reason": string
        }
      ],
      "precautions": [string],
      "rationale": {
        "infectionType": string,
        "severity": string,
        "reasons": [string],
        "regionConsiderations": [string],
        "allergyConsiderations": [string],
        "doseAdjustments": [string]
      }
    }
    
    CRITICAL CLINICAL CONSIDERATIONS:
    1. SAFETY FIRST: Always check for allergies and contraindications before recommending any antibiotic.
    2. RESISTANCE PATTERNS: Consider regional resistance patterns for ${patientData.region || patientData.nationality || "the patient's region"}.
    3. RENAL FUNCTION: If kidney disease or elevated creatinine, provide appropriate dose adjustments.
    4. DRUG INTERACTIONS: Consider patient comorbidities and potential drug interactions.
    5. INFECTION SITE: Match antibiotic spectrum to likely pathogens for the infection site.
    6. SEVERITY: Severe infections may require IV therapy and broader spectrum coverage.
    7. HOSPITAL VS COMMUNITY: Hospital-acquired infections require broader spectrum coverage.
    
    SPECIFIC GUIDELINES:
    - Respiratory infections: Consider S. pneumoniae, H. influenzae, atypicals
    - UTI: Consider E. coli, Klebsiella, Enterococcus
    - Skin/soft tissue: Consider S. aureus, Streptococcus
    - Intra-abdominal: Consider gram-negatives and anaerobes
    - For penicillin allergies: Use macrolides, fluoroquinolones, or cephalosporins (if not severe allergy)
    - For severe infections: Consider combination therapy or IV antibiotics
    
    DOSING PRINCIPLES:
    - Provide specific mg/kg doses for pediatric patients (age < 18)
    - Adjust for renal impairment (CrCl < 50 mL/min)
    - Consider hepatic adjustment for liver disease
    - Use weight-based dosing when appropriate
    
    Return ONLY valid JSON with NO markdown formatting or additional text.`;

    console.log('Making request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: JSON.stringify(patientData) }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error (${response.status}):`, errorText);
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

      // Validate the response structure - Added check for non-empty name
      if (!parsedRecommendation.primaryRecommendation?.name || 
          parsedRecommendation.primaryRecommendation.name.trim() === '' ||
          !parsedRecommendation.reasoning ||
          !Array.isArray(parsedRecommendation.alternatives) ||
          !Array.isArray(parsedRecommendation.precautions)) {
        console.error('Invalid recommendation structure or empty primary recommendation name:', parsedRecommendation);
        throw new Error('Invalid or incomplete recommendation format from AI');
      }

      // Add any additional regional or renal considerations from our calculations
      if (patientData.additionalContext) {
        parsedRecommendation.rationale = parsedRecommendation.rationale || {
          infectionType: patientData.infectionSites[0] || "unknown",
          severity: patientData.severity || "unknown",
          reasons: []
        };
        
        if (patientData.additionalContext.regionalConsiderations?.length) {
          parsedRecommendation.rationale.regionConsiderations = [
            ...(parsedRecommendation.rationale.regionConsiderations || []),
            ...patientData.additionalContext.regionalConsiderations
          ];
        }
        
        if (patientData.additionalContext.renalConsiderations?.length) {
          parsedRecommendation.rationale.doseAdjustments = [
            ...(parsedRecommendation.rationale.doseAdjustments || []),
            ...patientData.additionalContext.renalConsiderations
          ];
        }
      }

      console.log('Successfully processed recommendation');
      return new Response(
        JSON.stringify({ 
          recommendation: parsedRecommendation,
          status: 'success'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.error('Raw content:', result.choices[0].message.content);
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

