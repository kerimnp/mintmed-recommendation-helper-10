
import { Article } from "../types/articleTypes";
import { FileText, Stethoscope, Heart, Brain, Lungs, Users } from "lucide-react";

export const clinicalCasesArticles: Article[] = [
  {
    id: 'pneumonia-case-series',
    title: 'Community-Acquired Pneumonia: Case Series',
    description: 'Multiple clinical scenarios with varying severity and patient factors',
    icon: Lungs,
    category: 'clinical',
    readTime: '25 min',
    lastUpdated: 'March 29, 2025',
    author: 'Dr. Amanda Foster, MD',
    authorCredentials: 'Pulmonary Medicine Specialist',
    content: `
      <h3>Community-Acquired Pneumonia: Case Series</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 29, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Learning Objectives</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Apply CAP severity assessment tools (CURB-65, PSI)</li>
          <li>Select appropriate empiric antibiotic therapy</li>
          <li>Recognize when to escalate or de-escalate therapy</li>
          <li>Understand duration and monitoring parameters</li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Case 1: Low-Risk Outpatient CAP</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">Patient Presentation</h5>
        <p class="mb-4">
          A 45-year-old healthy office worker presents to urgent care with 2 days of productive cough, 
          low-grade fever (100.8°F), and mild fatigue. No significant medical history, no recent travel, 
          and no antibiotic use in past 3 months.
        </p>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Physical Examination & Diagnostics</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Vital signs: T 100.8°F, HR 88, RR 18, BP 125/78, O2 sat 98% on room air</li>
            <li>Chest: Right lower lobe crackles, no egophony</li>
            <li>Chest X-ray: Right lower lobe infiltrate</li>
            <li>CURB-65 score: 0 (low risk)</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">Clinical Decision Point</h5>
          <p class="mb-2">What is the most appropriate initial antibiotic therapy?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Recommendation</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2"><strong>Recommended therapy:</strong> Amoxicillin 1g PO TID × 5 days</p>
              <p class="mb-2"><strong>Rationale:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Low risk for drug-resistant pathogens</li>
                <li>No comorbidities or risk factors for atypical pathogens</li>
                <li>Amoxicillin provides excellent coverage for S. pneumoniae</li>
                <li>Shorter duration (5 days) is evidence-based for uncomplicated CAP</li>
              </ul>
              <p class="mt-2 text-sm text-amber-600 dark:text-amber-400">
                <strong>Alternative:</strong> If penicillin allergy, use azithromycin 500mg × 1, then 250mg daily × 4 days
              </p>
            </div>
          </details>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Case 2: Moderate-Risk Hospitalized CAP</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">Patient Presentation</h5>
        <p class="mb-4">
          A 68-year-old man with COPD and diabetes presents to ED with 4 days of worsening dyspnea, 
          productive cough with purulent sputum, and fever. Recent exacerbation treated with prednisone 2 weeks ago.
        </p>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Clinical Assessment</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Vital signs: T 101.9°F, HR 108, RR 26, BP 142/88, O2 sat 89% on room air</li>
            <li>CURB-65 score: 2 (confusion absent, BUN elevated, RR >30, age >65)</li>
            <li>PSI Class IV (moderate-high risk)</li>
            <li>Chest X-ray: Bilateral lower lobe infiltrates</li>
            <li>WBC: 16.2 k/μL, Procalcitonin: 0.8 ng/mL</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">Clinical Decision Point</h5>
          <p class="mb-2">What empiric antibiotic regimen is most appropriate?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Recommendation</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2"><strong>Recommended therapy:</strong> Ceftriaxone 1g IV daily + Azithromycin 500mg IV daily</p>
              <p class="mb-2"><strong>Rationale:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>COPD + recent steroids = risk for resistant pathogens</li>
                <li>Combination therapy covers typical and atypical pathogens</li>
                <li>Ceftriaxone: excellent pneumococcal coverage including some resistant strains</li>
                <li>Azithromycin: atypical coverage + anti-inflammatory effects</li>
              </ul>
              <p class="mt-2 text-sm text-blue-600 dark:text-blue-400">
                <strong>Duration:</strong> Plan for 5-7 days total, with possible oral step-down after clinical improvement
              </p>
            </div>
          </details>
        </div>
      </div>
    `
  },
  {
    id: 'sepsis-antibiotic-cases',
    title: 'Sepsis and Antibiotic Selection',
    description: 'Critical care scenarios requiring rapid antibiotic intervention',
    icon: Heart,
    category: 'clinical',
    readTime: '22 min',
    lastUpdated: 'March 29, 2025',
    author: 'Dr. James Rodriguez, MD',
    authorCredentials: 'Critical Care Medicine',
    content: `
      <h3>Sepsis and Antibiotic Selection</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 29, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Critical Time Factors</h4>
        <p>
          In sepsis, every hour delay in appropriate antibiotic therapy increases mortality by 7.6%. 
          Broad-spectrum empiric therapy should be initiated within 1 hour of recognition.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Case 1: Septic Shock - Unknown Source</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">Emergency Department Presentation</h5>
        <p class="mb-4">
          A 72-year-old woman brought by EMS, found down at home by family. Altered mental status, 
          hypotensive, and febrile. Medical history includes diabetes, CKD (GFR 35), and recurrent UTIs.
        </p>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Initial Assessment</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Vital signs: T 103.2°F, HR 128, RR 32, BP 78/45 (after 2L NS still 85/50)</li>
            <li>Mental status: Confusion, responds to voice</li>
            <li>Physical exam: No obvious source identified initially</li>
            <li>Labs: WBC 18.5 k/μL with left shift, Lactate 4.2 mmol/L, Creatinine 2.1 mg/dL</li>
            <li>Septic shock criteria met</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2 text-red-600 dark:text-red-400">URGENT: Antibiotic Selection</h5>
          <p class="mb-2">What empiric antibiotic regimen should be started immediately?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Emergency Protocol</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2"><strong>Immediate therapy:</strong> Piperacillin-Tazobactam 3.375g IV q6h + Vancomycin 20mg/kg IV</p>
              <p class="mb-2"><strong>Rationale for this combination:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Unknown source requires broad gram-positive and gram-negative coverage</li>
                <li>Pip-tazo: excellent gram-negative coverage including Pseudomonas</li>
                <li>Vancomycin: MRSA coverage given healthcare exposures</li>
                <li>Renal dosing adjustments needed for both drugs</li>
                <li>History of recurrent UTIs suggests possible ESBL or resistant organisms</li>
              </ul>
              <p class="mt-2 text-sm text-amber-600 dark:text-amber-400">
                <strong>Consider adding:</strong> Fluconazole if invasive candidiasis suspected (central lines, immunocompromise)
              </p>
            </div>
          </details>
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-300 dark:border-blue-700">
          <h5 class="font-medium mb-2">24-Hour Follow-up</h5>
          <p class="mb-2">Blood cultures grow E. coli ESBL-positive. Urine culture pending. Patient improving on pressors.</p>
          <details class="mt-2">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">De-escalation Strategy</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2"><strong>Targeted therapy:</strong> Switch to Meropenem 1g IV q8h (renally adjusted)</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>E. coli ESBL confirmed - carbapenem indicated</li>
                <li>Discontinue vancomycin (no gram-positive growth)</li>
                <li>Continue for 7-10 days based on clinical response</li>
                <li>Consider oral step-down when hemodynamically stable</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    `
  }
];
