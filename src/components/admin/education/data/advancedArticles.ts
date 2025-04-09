
import { Article } from "../types/articleTypes";
import { Microscope, Book } from "lucide-react";

export const advancedArticles: Article[] = [
  {
    id: 'resistance',
    title: 'Understanding Antimicrobial Resistance',
    description: 'Mechanisms and management of antibiotic resistance',
    icon: Microscope,
    category: 'advanced',
    readTime: '18 min',
    lastUpdated: 'April 2, 2025',
    author: 'Dr. James Wilson, MD',
    authorCredentials: 'Clinical Microbiologist',
    content: `
      <h3>Mechanisms of Resistance</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 2, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Significance</h4>
        <p>
          Understanding resistance mechanisms helps clinicians anticipate treatment failures and select appropriate 
          alternative therapies. Resistance patterns should inform both empiric therapy choices and institutional 
          antimicrobial stewardship efforts.
        </p>
      </div>
      
      <p class="mb-4">
        Bacteria develop resistance to antibiotics through several mechanisms:
      </p>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Enzymatic Inactivation</h4>
      <p class="mb-4">
        Bacteria produce enzymes that destroy or modify the antibiotic. The classic example is 
        β-lactamases which hydrolyze the β-lactam ring of penicillins and cephalosporins.
      </p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">β-lactamases</h5>
          <p class="text-sm">Hydrolyze β-lactam antibiotics</p>
          <p class="text-sm text-gray-500 mt-1">Examples: TEM, SHV, CTX-M</p>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Aminoglycoside-modifying enzymes</h5>
          <p class="text-sm">Modify aminoglycoside structure</p>
          <p class="text-sm text-gray-500 mt-1">Examples: AAC, ANT, APH</p>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Target Modification</h4>
      <p class="mb-4">
        Bacteria alter the binding site of the antibiotic. For example, changes in penicillin-binding 
        proteins (PBPs) leading to methicillin resistance in Staphylococcus aureus.
      </p>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Decreased Permeability</h4>
      <p class="mb-4">
        Reduced expression of porins or changes in cell membrane structure prevent antibiotics from 
        entering the bacterial cell, common in Gram-negative bacteria.
      </p>
      
      <h4 class="text-lg font-medium mt-6 mb-3">4. Efflux Pumps</h4>
      <p class="mb-4">
        Active transport systems that expel antibiotics from the cell before they can reach their target. 
        These pumps can confer resistance to multiple drug classes simultaneously.
      </p>
      
      <div class="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Major Resistant Pathogens of Concern</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300">Critical</span>
            <span>Carbapenem-resistant Enterobacteriaceae (CRE)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300">Critical</span>
            <span>MDR Acinetobacter baumannii</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">High</span>
            <span>MRSA (Methicillin-resistant S. aureus)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">High</span>
            <span>ESBL-producing Enterobacteriaceae</span>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-3">Based on WHO priority pathogens list, 2024 update</p>
      </div>
    `
  },
  {
    id: 'pharmacology',
    title: 'Antibiotic Pharmacokinetics',
    description: 'Understanding how antibiotics move through the body',
    icon: Book,
    category: 'advanced',
    readTime: '20 min',
    lastUpdated: 'March 30, 2025',
    author: 'Dr. Lisa Martinez, PharmD',
    authorCredentials: 'Clinical Pharmacologist',
    content: `
      <h3>Basic PK/PD Principles</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 30, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Relevance</h4>
        <p>
          Understanding pharmacokinetics (PK) and pharmacodynamics (PD) principles allows for optimal 
          dosing regimens that maximize efficacy while minimizing toxicity and resistance development.
        </p>
      </div>
      
      <p class="mb-4">
        Understanding pharmacokinetics (what the body does to the drug) and pharmacodynamics 
        (what the drug does to the body) is essential for optimizing antibiotic dosing.
      </p>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Key Pharmacokinetic Parameters</h4>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse mb-6">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-800">
              <th class="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Parameter</th>
              <th class="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Definition</th>
              <th class="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Clinical Relevance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Absorption</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">How the drug enters the bloodstream</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Affects bioavailability and onset of action</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Distribution</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">How the drug moves throughout the body</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Determines if drug reaches infection site</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Metabolism</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">How the drug is transformed by the body</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Affects duration of action and potential for drug interactions</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Elimination</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">How the drug is removed from the body</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Influences dosing interval and need for adjustment in organ dysfunction</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Half-life</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Time for concentration to reduce by 50%</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Determines dosing frequency</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Pharmacodynamic Properties</h4>
      <p class="mb-3">Antibiotics are classified based on their killing mechanism:</p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Concentration-Dependent Killing</h5>
          <p class="text-sm mb-3">
            Higher drug concentrations result in more rapid killing. Efficacy correlates with peak concentration 
            or area under the curve (AUC) to MIC ratio.
          </p>
          <p class="text-sm font-medium">Examples:</p>
          <ul class="list-disc pl-5 text-sm">
            <li>Aminoglycosides</li>
            <li>Fluoroquinolones</li>
            <li>Daptomycin</li>
          </ul>
          <p class="text-xs text-gray-500 mt-2">Dosing strategy: Higher doses, extended intervals</p>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Time-Dependent Killing</h5>
          <p class="text-sm mb-3">
            Killing depends on time above the MIC. Efficacy correlates with duration of exposure above 
            the pathogen's minimum inhibitory concentration.
          </p>
          <p class="text-sm font-medium">Examples:</p>
          <ul class="list-disc pl-5 text-sm">
            <li>Beta-lactams</li>
            <li>Macrolides</li>
            <li>Linezolid</li>
          </ul>
          <p class="text-xs text-gray-500 mt-2">Dosing strategy: Frequent administration or continuous infusion</p>
        </div>
      </div>
      
      <div class="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h4 class="font-medium text-purple-700 dark:text-purple-300 mb-2">Advanced Concept: Post-Antibiotic Effect</h4>
        <p class="mb-2">
          The persistent suppression of bacterial growth after antibiotic exposure, even when drug 
          concentrations fall below the MIC. Significant for:
        </p>
        <ul class="list-disc pl-5 text-sm">
          <li>Aminoglycosides against gram-negatives (2-8 hours)</li>
          <li>Fluoroquinolones against most bacteria (1-3 hours)</li>
          <li>Macrolides against gram-positives (3-7 hours)</li>
        </ul>
        <p class="text-xs text-gray-500 mt-3">References: Clinical Pharmacology & Therapeutics, 2023</p>
      </div>
    `
  },
];
