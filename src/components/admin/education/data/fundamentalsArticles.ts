
import { Article } from "../types/articleTypes";
import { BookOpen } from "lucide-react";

export const fundamentalsArticles: Article[] = [
  {
    id: 'basics',
    title: 'Basic Principles of Antibiotic Therapy',
    description: 'Foundational knowledge for effective antimicrobial prescribing',
    icon: BookOpen,
    category: 'fundamentals',
    difficulty: 'beginner',
    readTime: '15 min',
    lastUpdated: 'March 23, 2025',
    author: 'Dr. Maria Chen, MD, PhD',
    authorCredentials: 'Infectious Disease Specialist',
    learningObjectives: [
      'Understand the core principles of antibiotic selection',
      'Differentiate between narrow-spectrum and broad-spectrum antibiotics',
      'Apply stewardship principles in clinical practice',
      'Evaluate factors influencing antibiotic choice'
    ],
    keyTakeaways: [
      'Use narrow-spectrum antibiotics whenever clinically appropriate',
      'Consider patient factors and local resistance patterns',
      'Empiric therapy should target most likely pathogens',
      'Antimicrobial stewardship reduces resistance development'
    ],
    clinicalApplications: [
      'Review culture results to de-escalate therapy when possible',
      'Consider patient allergies and comorbidities in selection',
      'Monitor for therapeutic response and adjust as needed',
      'Educate patients on proper antibiotic use and adherence'
    ],
    content: `
      <h3>Principles of Antibiotic Therapy</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 23, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Summary</h4>
        <p>
          Appropriate antibiotic selection involves considering the suspected pathogen, site of infection,
          patient factors, and local resistance patterns. Whenever possible, use narrow-spectrum antibiotics
          to minimize microbiome disruption and reduce selective pressure for resistance.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Appropriate Antibiotic Selection</h4>
      <p class="mb-4">
        Choosing the right antibiotic involves considering multiple factors including the suspected pathogen, 
        site of infection, patient factors, and local resistance patterns. Empiric therapy should be guided by 
        the most likely causative organisms for the specific infection being treated.
      </p>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Spectrum of Activity</h4>
      <p class="mb-4">
        Antibiotics can be classified as narrow-spectrum or broad-spectrum based on the range of bacteria they 
        target. Whenever possible, narrow-spectrum antibiotics should be preferred to minimize collateral damage 
        to the patient's microbiome and reduce selective pressure that promotes resistance.
      </p>
      
      <div class="my-6 border-l-4 border-medical-accent pl-4">
        <p class="italic text-gray-700 dark:text-gray-300">
          "Using the narrowest spectrum agent that is appropriate for the clinical situation is a core principle 
          of antimicrobial stewardship."
        </p>
        <p class="text-sm text-gray-500 mt-2">— Infectious Diseases Society of America (IDSA)</p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Route of Administration</h4>
      <p class="mb-3">
        The selection between oral, intravenous, or other routes depends on:
      </p>
      <ul class="list-disc pl-5 mb-4 space-y-1">
        <li>Severity of infection</li>
        <li>Bioavailability of the antibiotic</li>
        <li>Site of infection</li>
        <li>Patient's ability to take oral medications</li>
      </ul>
      
      <h4 class="text-lg font-medium mt-6 mb-3">4. Timing and Duration</h4>
      <p class="mb-4">
        Prompt initiation of antibiotics is critical for severe infections. The duration of therapy should be 
        tailored to the specific infection, with many conditions now requiring shorter courses than previously 
        recommended.
      </p>
      
      <div class="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Evidence Summary</h4>
        <p class="mb-2">Recent clinical trials support shorter courses for many common infections:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Uncomplicated UTI: 3-5 days</li>
          <li>Community-acquired pneumonia: 5-7 days</li>
          <li>Uncomplicated cellulitis: 5-6 days</li>
        </ul>
        <p class="text-xs text-gray-500 mt-3">References: IDSA Guidelines 2023, NEJM Clinical Review 2024</p>
      </div>
    `
  },
];
