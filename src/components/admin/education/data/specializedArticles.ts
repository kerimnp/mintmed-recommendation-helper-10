
import { Article } from "../types/articleTypes";
import { Calculator, Brain } from "lucide-react";

export const specializedArticles: Article[] = [
  {
    id: 'pediatric',
    title: 'Pediatric Antibiotic Dosing',
    description: 'Age-specific considerations for antimicrobial therapy in children',
    icon: Calculator,
    category: 'specialized',
    readTime: '12 min',
    lastUpdated: 'March 15, 2025',
    author: 'Dr. Sarah Johnson, MD',
    authorCredentials: 'Pediatric Infectious Disease Specialist',
    content: `
      <h3>Principles of Pediatric Dosing</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 15, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Summary</h4>
        <p>
          Pediatric dosing requires special consideration due to developmental changes in absorption, 
          distribution, metabolism, and elimination. Most pediatric doses are calculated based on body weight (mg/kg)
          or body surface area (BSA).
        </p>
      </div>
      
      <p class="mb-4">
        Pediatric dosing requires special consideration due to developmental changes in absorption, 
        distribution, metabolism, and elimination. Key principles include:
      </p>
      
      <ul class="list-disc pl-5 mb-6 space-y-2">
        <li><strong>Weight-based dosing</strong> - Most pediatric doses are calculated based on body weight (mg/kg)</li>
        <li><strong>Body surface area</strong> - For some drugs, dosing by BSA may be more appropriate</li>
        <li><strong>Age-specific physiology</strong> - Renal function, hepatic metabolism, and body composition change throughout development</li>
        <li><strong>Gestational age considerations</strong> - Premature neonates require additional dose adjustments</li>
        <li><strong>Maximum dose limits</strong> - Weight-based calculations should not exceed adult maximum doses</li>
      </ul>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Developmental Pharmacokinetics</h4>
      <p class="mb-3">Drug handling varies across pediatric age groups:</p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Neonates (0-28 days)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Reduced gastric acid</li>
            <li>Higher body water percentage</li>
            <li>Immature blood-brain barrier</li>
            <li>Limited hepatic enzyme activity</li>
            <li>Reduced glomerular filtration</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Infants (1-12 months)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Rapidly developing hepatic enzymes</li>
            <li>Increasing renal function</li>
            <li>High body water percentage</li>
            <li>Variable oral absorption</li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Clinical Pearl</h4>
        <p class="mb-2">
          The "Rule of Sixes" is a quick method to calculate safe doses of medications for pediatric patients:
        </p>
        <div class="pl-4 border-l-2 border-green-300 dark:border-green-700">
          <p>6 × patient's weight (kg) = maximum safe dose in mg</p>
        </div>
        <p class="text-xs text-gray-500 mt-3">This rule applies to select medications only. Always verify with appropriate references.</p>
      </div>
    `
  },
  {
    id: 'neurocognitive-disorders',
    title: 'Antibiotics and Neurocognitive Effects',
    description: 'Mental status changes associated with antimicrobial therapy',
    icon: Brain,
    category: 'specialized',
    readTime: '16 min',
    lastUpdated: 'March 20, 2025',
    author: 'Dr. Stephanie Lee, MD, PhD',
    authorCredentials: 'Neuro-infectious Disease Specialist',
    content: `
      <h3>Antibiotics and Neurocognitive Effects</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 20, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Summary</h4>
        <p>
          Antibiotic-associated neurocognitive effects range from mild headaches to severe encephalopathy.
          Early recognition of these adverse effects is critical for appropriate management, especially
          in elderly patients or those with pre-existing neurological conditions.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Mechanisms of Neurotoxicity</h4>
      
      <div class="mb-6">
        <p class="mb-3">Multiple mechanisms contribute to antibiotic-induced neurocognitive effects:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>GABA receptor antagonism:</strong> Inhibition of inhibitory neurotransmission (e.g., β-lactams)
          </li>
          <li>
            <strong>Mitochondrial dysfunction:</strong> Impaired cellular energy production (e.g., linezolid, tetracyclines)
          </li>
          <li>
            <strong>Direct neurotoxicity:</strong> Damage to neurons or supporting cells (e.g., metronidazole)
          </li>
          <li>
            <strong>Alteration of neurotransmitter levels:</strong> Changes in dopamine, serotonin (e.g., fluoroquinolones)
          </li>
          <li>
            <strong>Blood-brain barrier disruption:</strong> Increased permeability and CNS drug levels
          </li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Antibiotic Classes and Associated Neurocognitive Effects</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">β-lactams</h5>
          <p class="text-sm mb-2">
            High doses can cause neurotoxicity, especially with renal dysfunction
          </p>
          <div>
            <p class="text-sm font-medium">Clinical manifestations:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Confusion, disorientation</li>
              <li>Myoclonus</li>
              <li>Seizures (especially with cefepime)</li>
              <li>Hallucinations</li>
              <li>Encephalopathy</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Risk factors:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Renal impairment</li>
              <li>Advanced age</li>
              <li>High doses</li>
              <li>Pre-existing CNS disorders</li>
            </ul>
          </div>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Fluoroquinolones</h5>
          <p class="text-sm mb-2">
            Associated with central and peripheral nervous system effects
          </p>
          <div>
            <p class="text-sm font-medium">Clinical manifestations:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Headache, dizziness</li>
              <li>Insomnia</li>
              <li>Agitation, anxiety</li>
              <li>Psychosis (rare)</li>
              <li>Seizures (rare)</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Risk factors:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Elderly patients</li>
              <li>Concurrent CNS-active medications</li>
              <li>History of seizures</li>
              <li>Renal impairment</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }
];
