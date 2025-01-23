import { PatientData } from "./types/patientTypes";

const generatePrompt = (data: PatientData) => {
  return `As a medical AI assistant, please analyze the following patient data and provide antibiotic recommendations:

Patient Demographics:
- Age: ${data.age}
- Gender: ${data.gender}
- Weight: ${data.weight}kg
- Height: ${data.height}cm
${data.pregnancy ? `- Pregnancy Status: ${data.pregnancy}` : ''}

Infection Details:
- Sites: ${data.infectionSites.join(', ')}
- Severity: ${data.severity}
- Duration: ${data.duration} days
- Symptoms: ${data.symptoms}
- Hospital Acquired: ${data.isHospitalAcquired ? 'Yes' : 'No'}

Allergies:
${Object.entries(data.allergies)
  .filter(([_, value]) => value)
  .map(([key]) => `- ${key}`)
  .join('\n')}

Comorbidities:
${[
  data.kidneyDisease && '- Kidney Disease',
  data.liverDisease && '- Liver Disease',
  data.diabetes && '- Diabetes',
  data.immunosuppressed && '- Immunosuppressed'
].filter(Boolean).join('\n')}

Resistance Patterns:
${Object.entries(data.resistances)
  .filter(([_, value]) => value)
  .map(([key]) => `- ${key.toUpperCase()}`)
  .join('\n')}

Please provide:
1. Primary antibiotic recommendation (name, dose, route, duration)
2. Clinical reasoning for the choice
3. Alternative options if primary is not suitable
4. Important precautions or monitoring requirements
5. Any necessary dose adjustments based on patient factors`;
};

export const getAIRecommendation = async (data: PatientData) => {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`,
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
            content: generatePrompt(data)
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI recommendation');
    }

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    throw error;
  }
};