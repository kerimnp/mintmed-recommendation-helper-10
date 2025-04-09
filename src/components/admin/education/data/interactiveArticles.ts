
import { Article } from "../types/articleTypes";
import { ListVideo } from "lucide-react";

export const interactiveArticles: Article[] = [
  {
    id: 'interactive-case-studies',
    title: 'Interactive Clinical Case Studies',
    description: 'Practice scenarios for antibiotic decision-making',
    icon: ListVideo,
    category: 'interactive',
    readTime: '30 min',
    lastUpdated: 'March 25, 2025',
    author: 'Clinical Education Team',
    authorCredentials: 'Horalix Education Department',
    content: `
      <h3>Interactive Clinical Case Studies</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 25, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">How to Use These Cases</h4>
        <p>
          These interactive case studies are designed to help you develop clinical reasoning skills for antimicrobial
          prescribing. Read each case, consider your approach, and compare with expert recommendations.
          Look for key decision points and alternative management strategies throughout.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Case 1: Community-Acquired Pneumonia</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">Patient Presentation</h5>
        <p class="mb-4">
          A 72-year-old man presents to the emergency department with a 3-day history of productive cough, 
          fever, and increasing shortness of breath. Medical history includes COPD, type 2 diabetes (HbA1c 7.2%), 
          and hypertension. His vital signs show T 38.7°C, HR 105, RR 24, BP 138/85, and O2 saturation 92% on room air.
        </p>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Laboratory and Imaging</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>WBC: 15.8 × 10^9/L with neutrophil predominance</li>
            <li>BUN: 26 mg/dL, Creatinine: 1.1 mg/dL (baseline 0.9)</li>
            <li>Chest X-ray: Right lower lobe consolidation</li>
            <li>Blood cultures: Pending</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">Clinical Question 1</h5>
          <p>What is the appropriate empiric antibiotic regimen for this patient?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Recommendation</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2">
                This patient has community-acquired pneumonia with several risk factors (age >65, COPD, diabetes) 
                and moderate severity. The recommended empiric regimen is:
              </p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Ceftriaxone 1-2g IV q24h PLUS</li>
                <li>Azithromycin 500mg IV/PO × 1, then 250mg PO daily</li>
                <li>Alternative: Levofloxacin 750mg IV/PO daily as monotherapy</li>
              </ul>
              <p class="mt-2">
                Combination therapy is recommended due to the patient's age and comorbidities to provide coverage 
                for both typical and atypical pathogens.
              </p>
            </div>
          </details>
        </div>
      </div>
    `
  }
];
