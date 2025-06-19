
import { Article } from "../types/articleTypes";
import { Pill, Activity, Heart, Brain, Kidney, Liver } from "lucide-react";

export const pharmacologyArticles: Article[] = [
  {
    id: 'pharmacokinetics-basics',
    title: 'Antibiotic Pharmacokinetics and Pharmacodynamics',
    description: 'Understanding ADME principles in antimicrobial therapy',
    icon: Activity,
    category: 'pharmacology',
    readTime: '20 min',
    lastUpdated: 'April 10, 2025',
    author: 'Dr. Thomas Anderson, PharmD, PhD',
    authorCredentials: 'Clinical Pharmacologist',
    content: `
      <h3>Antibiotic Pharmacokinetics and Pharmacodynamics</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 10, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">PK/PD Integration</h4>
        <p>
          Understanding pharmacokinetic and pharmacodynamic principles is essential for
          optimizing antibiotic dosing and improving clinical outcomes.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Pharmacokinetic Parameters</h4>
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Absorption</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Bioavailability (F)</li>
            <li>Rate of absorption (ka)</li>
            <li>Food effects</li>
            <li>First-pass metabolism</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Distribution</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Volume of distribution (Vd)</li>
            <li>Protein binding</li>
            <li>Tissue penetration</li>
            <li>Blood-brain barrier</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'renal-dosing',
    title: 'Antibiotic Dosing in Renal Impairment',
    description: 'Dose adjustments for patients with kidney disease',
    icon: Kidney,
    category: 'pharmacology',
    readTime: '17 min',
    lastUpdated: 'April 10, 2025',
    author: 'Dr. Maria Santos, PharmD',
    authorCredentials: 'Nephrology Clinical Pharmacist',
    content: `
      <h3>Antibiotic Dosing in Renal Impairment</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 10, 2025</p>
      
      <div class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Clinical Importance</h4>
        <p>
          Inappropriate dosing in renal impairment can lead to treatment failure,
          increased toxicity, or drug accumulation with serious adverse effects.
        </p>
      </div>
    `
  },
  {
    id: 'hepatic-dosing',
    title: 'Antibiotic Use in Liver Disease',
    description: 'Considerations for patients with hepatic impairment',
    icon: Liver,
    category: 'pharmacology',
    readTime: '15 min',
    lastUpdated: 'April 10, 2025',
    author: 'Dr. Jennifer Wu, MD',
    authorCredentials: 'Hepatology Specialist',
    content: `
      <h3>Antibiotic Use in Liver Disease</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 10, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Hepatotoxicity Risk</h4>
        <p>
          Several antibiotics can cause hepatotoxicity, and patients with pre-existing
          liver disease require careful selection and monitoring.
        </p>
      </div>
    `
  }
];
