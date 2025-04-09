
// Educational article data
export type ArticleCategory = "fundamentals" | "clinical" | "advanced" | "specialized" | "guidelines" | "research" | "interactive";

export interface CategoryOption {
  id: string;
  label: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  icon: any;  // Lucide icon component
  category: ArticleCategory;
  readTime: string;
  lastUpdated: string;
  author: string;
  authorCredentials: string;
  content: string;
}

import { 
  BookOpen, 
  Microscope, 
  Calculator, 
  Book, 
  FileText,
  Stethoscope,
  LineChart,
  PieChart,
  Dna,
  Beaker,
  Brain,
  Virus,
  Flask,
  ListVideo
} from 'lucide-react';

// Article categories for filtering
export const categories: CategoryOption[] = [
  { id: "all", label: "All Resources" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "clinical", label: "Clinical Guidelines" },
  { id: "advanced", label: "Advanced Topics" },
  { id: "specialized", label: "Specialized Care" },
  { id: "guidelines", label: "Practice Standards" },
  { id: "research", label: "Latest Research" },
  { id: "interactive", label: "Interactive Learning" }
];

export const articles: Article[] = [
  {
    id: 'basics',
    title: 'Basic Principles of Antibiotic Therapy',
    description: 'Foundational knowledge for effective antimicrobial prescribing',
    icon: BookOpen,
    category: 'fundamentals',
    readTime: '15 min',
    lastUpdated: 'March 23, 2025',
    author: 'Dr. Maria Chen, MD, PhD',
    authorCredentials: 'Infectious Disease Specialist',
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
  {
    id: 'clinical-guidelines',
    title: 'Evidence-Based Clinical Guidelines',
    description: 'Current consensus recommendations from leading organizations',
    icon: FileText,
    category: 'clinical',
    readTime: '25 min',
    lastUpdated: 'April 5, 2025',
    author: 'IDSA Guidelines Committee',
    authorCredentials: 'Infectious Diseases Society of America',
    content: `
      <h3>Clinical Practice Guidelines</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 5, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Implementation Notes</h4>
        <p>
          These guidelines represent consensus recommendations but should be adapted to local conditions
          and patient-specific factors. Always consider local antibiograms when selecting empiric therapy.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Community-Acquired Pneumonia (CAP)</h4>
      <div class="mb-6">
        <p class="mb-3">First-line therapy recommendations for outpatients:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Previously healthy and no risk factors for MRSA or P. aeruginosa:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>Amoxicillin 1g TID</li>
              <li>OR Doxycycline 100mg BID</li>
            </ul>
          </li>
          <li>
            <strong>Comorbidities (heart, lung, liver, or renal disease; diabetes; alcoholism; malignancy; asplenia):</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>Amoxicillin/clavulanate OR cefpodoxime/cefuroxime PLUS macrolide</li>
              <li>OR Respiratory fluoroquinolone (levofloxacin, moxifloxacin)</li>
            </ul>
          </li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Urinary Tract Infections</h4>
      <div class="mb-6">
        <p class="mb-3">Recommendations for uncomplicated cystitis in women:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Nitrofurantoin 100mg BID for 5 days</li>
          <li>OR Trimethoprim-sulfamethoxazole 160/800mg BID for 3 days (if local resistance <20%)</li>
          <li>OR Fosfomycin 3g single dose</li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Skin and Soft Tissue Infections</h4>
      <div class="mb-6">
        <p class="mb-3">For non-purulent cellulitis (beta-hemolytic streptococci):</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Cephalexin 500mg QID</li>
          <li>OR Dicloxacillin 500mg QID</li>
          <li>OR Clindamycin 300-450mg TID (if PCN allergic)</li>
        </ul>
        
        <p class="mt-4 mb-3">For purulent infections (likely S. aureus, possible MRSA):</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Trimethoprim-sulfamethoxazole 1-2 DS tablets BID</li>
          <li>OR Doxycycline 100mg BID</li>
          <li>OR Clindamycin 300-450mg TID</li>
          <li>Consider incision and drainage for abscesses</li>
        </ul>
      </div>
      
      <div class="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Key References</h4>
        <ul class="text-sm space-y-2">
          <li>Metlay JP, et al. <em>Am J Respir Crit Care Med.</em> 2023; 207:17-28. <span class="text-blue-600 dark:text-blue-400">DOI: 10.1164/rccm.202208-1640ST</span></li>
          <li>Gupta K, et al. <em>Clin Infect Dis.</em> 2024; 76:1006-1016. <span class="text-blue-600 dark:text-blue-400">DOI: 10.1093/cid/ciad948</span></li>
          <li>Stevens DL, et al. <em>Clin Infect Dis.</em> 2024; 78:342-351. <span class="text-blue-600 dark:text-blue-400">DOI: 10.1093/cid/ciad825</span></li>
        </ul>
      </div>
    `
  },
  // New Articles
  {
    id: 'mrsa-management',
    title: 'MRSA Management Strategies',
    description: 'Comprehensive approach to MRSA infections in various clinical settings',
    icon: Stethoscope,
    category: 'clinical',
    readTime: '22 min',
    lastUpdated: 'April 4, 2025',
    author: 'Dr. Robert Chang, MD',
    authorCredentials: 'Hospital Epidemiologist',
    content: `
      <h3>MRSA Management Strategies</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 4, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Summary</h4>
        <p>
          Methicillin-resistant Staphylococcus aureus (MRSA) infections require specific therapeutic approaches 
          based on infection site, severity, and local resistance patterns. Early identification and appropriate 
          antimicrobial selection are critical for optimal outcomes.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Diagnostic Strategies</h4>
      <p class="mb-4">
        Rapid identification of MRSA is essential for timely intervention. Current diagnostic methods include:
      </p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Culture-based Methods</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Chromogenic media (results in 24-48h)</li>
            <li>Conventional culture with susceptibility testing</li>
            <li>MRSA screening swabs (nares, axilla, groin)</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Rapid Molecular Testing</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>PCR-based assays (results in 1-2h)</li>
            <li>MALDI-TOF with resistance prediction</li>
            <li>Loop-mediated isothermal amplification</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Treatment Options by Infection Type</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">Skin and Soft Tissue Infections</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="font-medium text-sm">Non-severe:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Trimethoprim-sulfamethoxazole 1-2 DS tablets BID</li>
              <li>Doxycycline 100mg BID</li>
              <li>Clindamycin 300-450mg TID (if susceptible)</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Severe/Complicated:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Vancomycin 15-20 mg/kg IV q8-12h</li>
              <li>Linezolid 600mg IV/PO BID</li>
              <li>Daptomycin 4-6 mg/kg IV daily</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">Bacteremia and Endocarditis</h5>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Vancomycin 15-20 mg/kg IV q8-12h, target trough 15-20 μg/mL</li>
          <li>Daptomycin 8-10 mg/kg IV daily (preferred for MRSA with vancomycin MIC ≥1.5 μg/mL)</li>
          <li>Duration: Uncomplicated bacteremia: 2 weeks; Endocarditis: 6 weeks</li>
          <li>Source control is essential (remove intravascular devices, drain abscesses)</li>
        </ul>
      </div>
      
      <div class="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Monitoring Recommendations</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="font-medium text-sm">Vancomycin:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Trough levels before 4th dose</li>
              <li>Monitor renal function every 2-3 days</li>
              <li>Weekly CBC to assess for neutropenia</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Daptomycin:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>CPK levels at baseline and weekly</li>
              <li>Monitor for myopathy symptoms</li>
              <li>Consider dose adjustment in renal impairment</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Prevention Strategies</h4>
      <div class="mb-6">
        <ul class="list-disc pl-5 space-y-2">
          <li>Active surveillance in high-risk units (ICU, transplant, dialysis)</li>
          <li>Contact precautions for all MRSA-colonized or infected patients</li>
          <li>Decolonization protocols for specific populations (mupirocin, chlorhexidine)</li>
          <li>Hand hygiene compliance monitoring and feedback</li>
          <li>Environmental cleaning with attention to high-touch surfaces</li>
        </ul>
      </div>
    `
  },
  {
    id: 'antibiotic-stewardship',
    title: 'Hospital Antibiotic Stewardship Programs',
    description: 'Implementation strategies for effective antimicrobial management',
    icon: LineChart,
    category: 'guidelines',
    readTime: '15 min',
    lastUpdated: 'March 27, 2025',
    author: 'Dr. Elena Rodriguez, PharmD, BCPS',
    authorCredentials: 'Antimicrobial Stewardship Director',
    content: `
      <h3>Hospital Antibiotic Stewardship Programs</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 27, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Impact</h4>
        <p>
          Effective antimicrobial stewardship programs (ASPs) have been shown to reduce inappropriate antibiotic use 
          by 20-40%, decrease healthcare costs, and lower rates of Clostridioides difficile infections and 
          antimicrobial resistance.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Core Elements of Hospital ASPs</h4>
      <p class="mb-4">
        The CDC recommends seven core elements for effective hospital antibiotic stewardship programs:
      </p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">1. Leadership Commitment</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Dedicated financial and human resources</li>
            <li>Executive-level support</li>
            <li>Integration into quality and patient safety programs</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">2. Accountability</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Physician leader (typically ID specialist)</li>
            <li>Pharmacy leader (clinical pharmacist)</li>
            <li>Clear roles and responsibilities</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">3. Pharmacy Expertise</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Clinical pharmacist with infectious disease training</li>
            <li>Pharmacy-driven interventions</li>
            <li>Dose optimization and IV to PO conversions</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">4. Actions</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Prospective audit and feedback</li>
            <li>Prior authorization for restricted antibiotics</li>
            <li>Antibiotic "time-outs" at 48-72 hours</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">5. Tracking</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Antibiotic utilization (DOT, DDD)</li>
            <li>Resistance patterns and C. difficile rates</li>
            <li>Process and outcome measures</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">6. Reporting</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Regular updates to prescribers</li>
            <li>Antibiogram distribution</li>
            <li>Feedback on individual prescribing patterns</li>
          </ul>
        </div>
      </div>
      
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">7. Education</h5>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Regular educational sessions for all prescribers</li>
          <li>Academic detailing and one-on-one education</li>
          <li>Guidelines and clinical pathways development</li>
          <li>Patient education materials on appropriate antibiotic use</li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Implementation Strategies</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">High-Impact Interventions</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="font-medium text-sm">For Immediate Implementation:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Antibiotic "time-outs" at 48-72 hours</li>
              <li>IV to PO conversion protocols</li>
              <li>Pharmacy-driven dose adjustments</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Requiring More Resources:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Prospective audit and feedback</li>
              <li>Prior authorization program</li>
              <li>Computerized clinical decision support</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Metrics for Success</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="font-medium text-sm">Process Measures:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Antibiotic days of therapy (DOT)</li>
              <li>Compliance with guidelines</li>
              <li>Time to appropriate therapy</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Outcome Measures:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Antibiotic resistance rates</li>
              <li>C. difficile infection rates</li>
              <li>Antibiotic-associated adverse events</li>
              <li>Length of stay and mortality</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'sepsis-management',
    title: 'Sepsis: Early Recognition and Management',
    description: 'Time-sensitive approaches to sepsis and septic shock',
    icon: PieChart,
    category: 'clinical',
    readTime: '23 min',
    lastUpdated: 'April 7, 2025',
    author: 'Dr. Michael Torres, MD',
    authorCredentials: 'Critical Care Specialist',
    content: `
      <h3>Sepsis: Early Recognition and Management</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 7, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Summary</h4>
        <p>
          Sepsis is a life-threatening organ dysfunction caused by a dysregulated host response to infection.
          Early recognition and timely intervention are critical for improving outcomes in sepsis and septic shock.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Definitions and Diagnostic Criteria</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Sepsis-3 Definition</h5>
          <p class="text-sm">
            Life-threatening organ dysfunction caused by a dysregulated host response to infection
          </p>
          <div class="mt-3">
            <p class="font-medium text-sm">Diagnostic Criteria:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Suspected or documented infection</li>
              <li>Acute increase in SOFA score ≥2 points</li>
              <li>qSOFA can be used for rapid bedside assessment</li>
            </ul>
          </div>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Septic Shock</h5>
          <p class="text-sm">
            Subset of sepsis with circulatory and cellular/metabolic dysfunction associated with higher mortality
          </p>
          <div class="mt-3">
            <p class="font-medium text-sm">Diagnostic Criteria:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Sepsis with persistent hypotension</li>
              <li>Need for vasopressors to maintain MAP ≥65 mmHg</li>
              <li>Serum lactate >2 mmol/L despite adequate fluid resuscitation</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Initial Management: The Hour-1 Bundle</h4>
      <p class="mb-3">
        The Surviving Sepsis Campaign recommends completing these steps within the first hour of sepsis recognition:
      </p>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <ol class="list-decimal pl-5 space-y-2">
          <li><strong>Measure lactate level</strong>. Repeat if initial lactate is >2 mmol/L</li>
          <li><strong>Obtain blood cultures</strong> prior to administering antibiotics</li>
          <li><strong>Administer broad-spectrum antibiotics</strong></li>
          <li><strong>Begin rapid administration of crystalloid</strong> (30 mL/kg) for hypotension or lactate ≥4 mmol/L</li>
          <li><strong>Apply vasopressors</strong> if patient is hypotensive during or after fluid resuscitation</li>
        </ol>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Antimicrobial Therapy</h4>
      
      <div class="mb-6">
        <p class="mb-3">Principles for empiric antimicrobial selection:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Administer within 1 hour of sepsis recognition</li>
          <li>Use broad-spectrum agents effective against likely pathogens</li>
          <li>Consider local resistance patterns and antibiograms</li>
          <li>Ensure adequate dosing based on pharmacokinetic/pharmacodynamic principles</li>
          <li>De-escalate based on culture results and clinical improvement</li>
        </ul>
      </div>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">Empiric Therapy by Suspected Source</h5>
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Pulmonary:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Community-acquired: Ceftriaxone + Azithromycin or Respiratory Fluoroquinolone</li>
              <li>Hospital-acquired/VAP: Antipseudomonal β-lactam + Aminoglycoside or Fluoroquinolone</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Intra-abdominal:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Piperacillin-tazobactam OR Carbapenem ± Metronidazole (if not included)</li>
              <li>Add antifungal coverage for high-risk patients</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Urinary:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Community-acquired: Ceftriaxone or Fluoroquinolone</li>
              <li>Hospital-acquired: Antipseudomonal β-lactam ± Aminoglycoside</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Skin/Soft Tissue:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Vancomycin or Linezolid + Piperacillin-tazobactam or Carbapenem</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">4. Source Control</h4>
      <div class="mb-6">
        <ul class="list-disc pl-5 space-y-2">
          <li>Identify infection source requiring intervention within 6-12 hours</li>
          <li>Consider drainage of abscesses, debridement of infected tissue, removal of infected devices</li>
          <li>Use least invasive approach that achieves adequate source control</li>
          <li>Remove intravascular devices suspected to be source of sepsis after establishing alternative access</li>
        </ul>
      </div>
      
      <div class="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Warning Signs Requiring Immediate Intervention</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Systolic BP <90 mmHg or MAP <65 mmHg</li>
              <li>Lactate >4 mmol/L</li>
              <li>Altered mental status</li>
            </ul>
          </div>
          <div>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Respiratory rate >22/min</li>
              <li>Significant oliguria (<0.5 mL/kg/h)</li>
              <li>Mottled skin or prolonged capillary refill</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'genomic-resistance',
    title: 'Genomic Approaches to Resistance Detection',
    description: 'Next-generation sequencing technologies for antimicrobial resistance',
    icon: Dna,
    category: 'research',
    readTime: '18 min',
    lastUpdated: 'March 22, 2025',
    author: 'Dr. Priya Sharma, PhD',
    authorCredentials: 'Genomic Epidemiologist',
    content: `
      <h3>Genomic Approaches to Resistance Detection</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 22, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Technical Summary</h4>
        <p>
          Genomic approaches to antimicrobial resistance detection offer faster, more comprehensive identification 
          of resistance mechanisms compared to traditional phenotypic methods. These technologies have transformative 
          potential for clinical microbiology laboratories and infection control.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Next-Generation Sequencing Technologies</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Short-read Sequencing</h5>
          <p class="text-sm mb-2">
            Technologies like Illumina that produce short DNA fragments (100-300 bp)
          </p>
          <div>
            <p class="text-sm font-medium">Advantages:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>High accuracy (>99.9%)</li>
              <li>High throughput</li>
              <li>Established resistance databases</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Limitations:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Cannot resolve repetitive regions</li>
              <li>Challenges in assembly</li>
            </ul>
          </div>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Long-read Sequencing</h5>
          <p class="text-sm mb-2">
            Technologies like Oxford Nanopore or PacBio that produce long reads (>10kb)
          </p>
          <div>
            <p class="text-sm font-medium">Advantages:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Complete genome assembly</li>
              <li>Resolution of repetitive regions</li>
              <li>Mobile genetic element detection</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Limitations:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Higher error rates</li>
              <li>Lower throughput</li>
              <li>More expensive per base</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Bioinformatic Approaches</h4>
      
      <div class="mb-6">
        <p class="mb-3">Methods for identifying resistance determinants from sequence data:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Reference-based mapping:</strong> Alignment to known resistance genes
            <ul class="list-disc pl-5 mt-1">
              <li>Tools: SRST2, KmerResistance, AMRFinder</li>
            </ul>
          </li>
          <li>
            <strong>De novo assembly:</strong> Reconstruction of complete genomes from reads
            <ul class="list-disc pl-5 mt-1">
              <li>Tools: SPAdes, SKESA, Unicycler, Canu</li>
            </ul>
          </li>
          <li>
            <strong>Machine learning approaches:</strong> Prediction based on sequence patterns
            <ul class="list-disc pl-5 mt-1">
              <li>Tools: DeepARG, ResFinder, PATRIC</li>
            </ul>
          </li>
          <li>
            <strong>Structural variant detection:</strong> Identifying large genomic rearrangements
            <ul class="list-disc pl-5 mt-1">
              <li>Tools: BreakDancer, DELLY, Sniffles</li>
            </ul>
          </li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Clinical Applications</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Infection Control:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Outbreak detection and tracking</li>
              <li>Transmission network reconstruction</li>
              <li>Identification of environmental reservoirs</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Antimicrobial Stewardship:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Rapid resistance prediction</li>
              <li>Therapy optimization</li>
              <li>Novel resistance mechanism detection</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Surveillance:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Monitoring emerging threats</li>
              <li>Tracking resistance genes across settings</li>
              <li>One Health applications (human-animal-environment interface)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h4 class="font-medium text-purple-700 dark:text-purple-300 mb-2">Current Challenges and Future Directions</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Standardization of bioinformatic pipelines</li>
          <li>Interpretation of novel variants with unknown phenotypic effects</li>
          <li>Integration with clinical laboratory workflows</li>
          <li>Cost and technical expertise requirements</li>
          <li>Regulatory considerations for clinical implementation</li>
        </ul>
        <p class="text-xs text-gray-500 mt-3">Emerging technologies like nanopore metagenomics and single-cell sequencing promise to further revolutionize resistance detection in the coming years.</p>
      </div>
    `
  },
  {
    id: 'immunocompromised',
    title: 'Antimicrobial Therapy in Immunocompromised Hosts',
    description: 'Special considerations for patients with impaired immune function',
    icon: Beaker,
    category: 'specialized',
    readTime: '20 min',
    lastUpdated: 'April 1, 2025',
    author: 'Dr. Thomas Wright, MD, PhD',
    authorCredentials: 'Transplant Infectious Disease Specialist',
    content: `
      <h3>Antimicrobial Therapy in Immunocompromised Hosts</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 1, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Summary</h4>
        <p>
          Immunocompromised patients present unique challenges in antimicrobial therapy due to atypical 
          presentations, broader differential diagnoses, and increased risk of opportunistic pathogens.
          Early, aggressive empiric therapy is often needed while awaiting diagnostic results.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Risk Assessment</h4>
      
      <div class="mb-6">
        <p class="mb-3">Key factors affecting infection risk and antimicrobial approach:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Type of immune defect:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>Neutropenia: Bacterial and fungal infections</li>
              <li>T-cell defects: Viral, fungal, and mycobacterial infections</li>
              <li>B-cell defects: Encapsulated bacterial infections</li>
              <li>Complement defects: Neisseria and pneumococcal infections</li>
            </ul>
          </li>
          <li>
            <strong>Severity and duration of immunosuppression:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>Profound neutropenia (<100 cells/μL) vs. moderate (100-500 cells/μL)</li>
              <li>Prolonged neutropenia (>7 days) significantly increases risk</li>
              <li>Timing post-transplant (early vs. late infections)</li>
            </ul>
          </li>
          <li>
            <strong>Environmental exposures:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>Recent travel history</li>
              <li>Exposure to construction sites (Aspergillus risk)</li>
              <li>Animal exposures</li>
              <li>Healthcare-associated exposures</li>
            </ul>
          </li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Neutropenic Fever Management</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">Initial Approach</h5>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Immediate blood cultures (peripheral and all catheter lumens)</li>
          <li>Site-specific cultures based on symptoms</li>
          <li>Prompt initiation of broad-spectrum antibiotics</li>
          <li>Risk stratification (high vs. low risk)</li>
        </ol>
        
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="font-medium text-sm">Low Risk:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Expected neutropenia <7 days</li>
              <li>No significant comorbidities</li>
              <li>Hemodynamically stable</li>
              <li>Consider oral therapy or early discharge</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">High Risk:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Prolonged neutropenia expected</li>
              <li>Significant comorbidities</li>
              <li>Hemodynamic instability</li>
              <li>Require inpatient IV therapy</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">Empiric Antimicrobial Options</h5>
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Initial Monotherapy (no specific source):</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Cefepime 2g IV q8h</li>
              <li>Piperacillin-tazobactam 4.5g IV q6h</li>
              <li>Meropenem 1g IV q8h</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Consider adding vancomycin if:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Suspected catheter-related infection</li>
              <li>Known MRSA colonization</li>
              <li>Severe mucositis</li>
              <li>Hemodynamic instability</li>
              <li>Pneumonia</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Antifungal therapy considerations:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Add empiric antifungal after 4-7 days of persistent fever</li>
              <li>Consider earlier if high-risk or colonization</li>
              <li>Options: Caspofungin, voriconazole, liposomal amphotericin B</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Special Considerations by Patient Population</h4>
      
      <div class="mt-2 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Hematopoietic Stem Cell Transplant</h5>
          <div>
            <p class="text-sm font-medium">Pre-engraftment phase (<30 days):</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Bacterial: gram-negative bacilli, gram-positive cocci</li>
              <li>Fungal: Candida, Aspergillus</li>
              <li>Viral: HSV reactivation</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Post-engraftment (30-100 days):</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Viral: CMV, HHV-6, adenovirus</li>
              <li>Fungal: Aspergillus, Pneumocystis jirovecii</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Late phase (>100 days):</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Encapsulated bacteria</li>
              <li>VZV reactivation</li>
              <li>Continued risk of opportunistic infections if GVHD</li>
            </ul>
          </div>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Solid Organ Transplant</h5>
          <div>
            <p class="text-sm font-medium">Early post-transplant (<1 month):</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Surgical site infections</li>
              <li>Donor-derived infections</li>
              <li>Nosocomial pathogens</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Intermediate (1-6 months):</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Opportunistic infections (CMV, EBV, PJP)</li>
              <li>Reactivation of latent infections</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Late (>6 months):</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Community-acquired infections</li>
              <li>Continued opportunistic risk if graft dysfunction</li>
              <li>Organ-specific infections (e.g., recurrent UTIs in renal transplants)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Clinical Pearls</h4>
        <ul class="list-disc pl-5 text-sm space-y-2">
          <li>Immunocompromised patients may not mount typical inflammatory responses; fever may be the only sign of serious infection</li>
          <li>Prophylaxis strategies should be tailored to specific risk factors and local epidemiology</li>
          <li>Drug interactions with immunosuppressants are common and require careful monitoring</li>
          <li>Consider therapeutic drug monitoring for azoles, aminoglycosides, and vancomycin</li>
          <li>Diagnostic workup should be more extensive than in immunocompetent hosts</li>
        </ul>
      </div>
    `
  },
  {
    id: 'surgical-prophylaxis',
    title: 'Surgical Antimicrobial Prophylaxis',
    description: 'Evidence-based approaches to preventing surgical site infections',
    icon: Flask,
    category: 'guidelines',
    readTime: '14 min',
    lastUpdated: 'March 18, 2025',
    author: 'Dr. Jennifer Kim, MD',
    authorCredentials: 'Surgical Infectious Disease Specialist',
    content: `
      <h3>Surgical Antimicrobial Prophylaxis Guidelines</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 18, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Summary</h4>
        <p>
          Appropriate surgical prophylaxis can reduce the incidence of surgical site infections (SSIs) by 40-60%.
          Optimal prophylaxis involves selecting the right antibiotic, administering it at the correct time,
          and discontinuing therapy promptly to minimize resistance development.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Key Principles</h4>
      
      <div class="mb-6">
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Timing:</strong> Administer within 60 minutes before incision (120 minutes for vancomycin and fluoroquinolones)
          </li>
          <li>
            <strong>Selection:</strong> Cover most likely pathogens for the specific procedure
          </li>
          <li>
            <strong>Dosing:</strong> Use adequate doses; consider weight-based dosing for obese patients
          </li>
          <li>
            <strong>Redosing:</strong> Repeat for prolonged procedures (>2 half-lives of drug) or significant blood loss
          </li>
          <li>
            <strong>Duration:</strong> Single dose typically sufficient; extend no longer than 24 hours even for high-risk procedures
          </li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Recommendations by Procedure Type</h4>
      
      <div class="overflow-x-auto mb-6">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-800">
              <th class="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Procedure</th>
              <th class="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Common Pathogens</th>
              <th class="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Recommended Agents</th>
              <th class="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Alternative (β-lactam allergy)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">Cardiac/Vascular</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">S. aureus, CoNS</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Cefazolin</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Vancomycin or Clindamycin</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">Colorectal</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Enteric gram-negative bacilli, anaerobes, enterococci</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Cefazolin + Metronidazole or Cefoxitin</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Gentamicin + Clindamycin or Metronidazole</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">Orthopedic</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">S. aureus, CoNS</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Cefazolin</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Vancomycin or Clindamycin</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">Neurosurgery</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">S. aureus, CoNS, enteric gram-negative bacilli</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Cefazolin</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Vancomycin ± Gentamicin</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">Gynecologic</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Enteric gram-negative bacilli, anaerobes, group B streptococci</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Cefazolin or Cefoxitin</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Clindamycin + Gentamicin</td>
            </tr>
            <tr>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">Urologic</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Enteric gram-negative bacilli, enterococci</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Cefazolin or Cefoxitin</td>
              <td class="border border-gray-200 dark:border-gray-700 px-4 py-2">Gentamicin ± Clindamycin</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Special Considerations</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">MRSA Risk Factors</h5>
        <p class="mb-2">Consider vancomycin or adding vancomycin to standard regimen if:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Known MRSA colonization</li>
              <li>Recent hospitalization</li>
              <li>Recent antibiotic exposure</li>
            </ul>
          </div>
          <div>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>High institutional MRSA rates</li>
              <li>Implantation of prosthetic material in high-MRSA settings</li>
              <li>Vancomycin-susceptible enterococci risk for cardiac or GU procedures</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">Weight-Based Dosing Recommendations</h5>
        <div class="space-y-3">
          <div>
            <p class="text-sm mb-1">Cefazolin:</p>
            <ul class="list-disc pl-5 text-sm">
              <li><80 kg: 1g</li>
              <li>80-120 kg: 2g</li>
              <li>>120 kg: 3g</li>
            </ul>
          </div>
          <div>
            <p class="text-sm mb-1">Vancomycin:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>15 mg/kg based on actual body weight</li>
              <li>Consider loading dose of 20-25 mg/kg for obese patients</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">4. Common Errors to Avoid</h4>
      
      <div class="mb-6">
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Inappropriate timing:</strong> Too early (>60 min before incision) or after incision
          </li>
          <li>
            <strong>Failure to redose:</strong> For procedures lasting >2 half-lives of antibiotic
          </li>
          <li>
            <strong>Unnecessary continuation:</strong> Beyond 24 hours post-procedure
          </li>
          <li>
            <strong>Excessive spectrum:</strong> Using broader agents than needed for targeted prophylaxis
          </li>
          <li>
            <strong>Inadequate dosing:</strong> Not adjusting for weight in obese patients
          </li>
        </ul>
      </div>
      
      <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Beyond Antibiotic Prophylaxis</h4>
        <p class="mb-2">
          Other evidence-based measures to reduce surgical site infections include:
        </p>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Preoperative chlorhexidine bathing</li>
          <li>Appropriate hair removal (clippers rather than razors)</li>
          <li>Strict glycemic control (glucose <200 mg/dL)</li>
          <li>Maintenance of normothermia</li>
          <li>Appropriate wound management and site preparation</li>
          <li>Smoking cessation (at least 4 weeks before elective procedures)</li>
        </ul>
      </div>
    `
  },
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
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Clinical Course</h5>
          <p>
            The patient is admitted and started on IV antibiotics. By day 3, he is afebrile, oxygen requirements 
            are improving, and he is able to take oral medications. Blood cultures show no growth after 48 hours. 
            Sputum culture grows Streptococcus pneumoniae susceptible to penicillin (MIC 0.06 μg/mL).
          </p>
        </div>
        
        <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">Clinical Question 2</h5>
          <p>How would you adjust therapy at this point?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Recommendation</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2">
                With clinical improvement and identification of a susceptible pathogen, therapy can be narrowed and switched to oral:
              </p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Amoxicillin 1g PO TID (preferred)</li>
                <li>Alternative: Doxycycline 100mg PO BID if penicillin-allergic</li>
              </ul>
              <p class="mt-2">
                Total duration: 5 days (given clinical improvement within 72 hours)
              </p>
              <p class="mt-2">
                Note: Azithromycin can be discontinued since S. pneumoniae has been identified as the causative pathogen.
              </p>
            </div>
          </details>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Case 2: Complicated Urinary Tract Infection</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">Patient Presentation</h5>
        <p class="mb-4">
          A 45-year-old woman presents with fever, right flank pain, nausea, and dysuria for the past 2 days. 
          She has a history of recurrent UTIs and was treated with ciprofloxacin 4 weeks ago for a similar episode. 
          Medical history includes hypertension and a kidney stone 6 months ago. Vital signs: T 38.9°C, HR 110, 
          RR 18, BP 128/76.
        </p>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Laboratory and Imaging</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Urinalysis: >100 WBC/hpf, positive leukocyte esterase and nitrites</li>
            <li>Serum WBC: 16.2 × 10^9/L</li>
            <li>BUN: 22 mg/dL, Creatinine: 1.0 mg/dL</li>
            <li>CT abdomen/pelvis: Right-sided pyelonephritis, 4mm non-obstructing right renal calculus</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">Clinical Question 1</h5>
          <p>What empiric antibiotic therapy would you recommend, and why?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Recommendation</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2">
                This patient has pyelonephritis with risk factors for resistant organisms (recent antibiotic exposure).
                Given her recent fluoroquinolone exposure, an alternative class is preferred:
              </p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Ertapenem 1g IV q24h, OR</li>
                <li>Ceftriaxone 1-2g IV q24h</li>
              </ul>
              <p class="mt-2">
                Rationale: Recent fluoroquinolone use increases risk of resistant gram-negative bacilli, including ESBL-producers.
              </p>
            </div>
          </details>
        </div>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Clinical Course</h5>
          <p>
            The patient is admitted and started on ceftriaxone. On day 2, urine culture grows >100,000 CFU/mL of Escherichia coli 
            resistant to ciprofloxacin and trimethoprim-sulfamethoxazole, but susceptible to ceftriaxone, gentamicin, and nitrofurantoin. 
            The patient becomes afebrile on day 2 and symptoms improve.
          </p>
        </div>
        
        <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">Clinical Question 2</h5>
          <p>When and how would you transition to oral therapy?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Recommendation</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2">
                The patient can be transitioned to oral therapy when:
              </p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Clinically improved (afebrile, improved symptoms)</li>
                <li>Able to tolerate oral intake</li>
                <li>Hemodynamically stable</li>
              </ul>
              <p class="mt-2">
                Appropriate oral options based on susceptibilities:
              </p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Cefuroxime 500mg PO BID</li>
                <li>Cefdinir 300mg PO BID</li>
              </ul>
              <p class="mt-2">
                Duration: 7-14 days total (including IV therapy)
              </p>
              <p class="mt-2">
                Note: Despite in vitro susceptibility to nitrofurantoin, it's not appropriate for pyelonephritis due to poor tissue penetration.
              </p>
            </div>
          </details>
        </div>
      </div>
      
      <div class="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h4 class="font-medium text-purple-700 dark:text-purple-300 mb-2">Additional Case Studies</h4>
        <p class="mb-3">
          Explore more interactive cases covering:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h5 class="font-medium mb-1">Skin and Soft Tissue Infections</h5>
            <p class="text-sm">Cellulitis, diabetic foot infections, and necrotizing fasciitis</p>
          </div>
          <div class="p-3 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h5 class="font-medium mb-1">Intra-abdominal Infections</h5>
            <p class="text-sm">Appendicitis, cholecystitis, and peritonitis</p>
          </div>
          <div class="p-3 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h5 class="font-medium mb-1">CNS Infections</h5>
            <p class="text-sm">Meningitis, brain abscess, and post-neurosurgical infections</p>
          </div>
          <div class="p-3 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h5 class="font-medium mb-1">Biofilm-associated Infections</h5>
            <p class="text-sm">Prosthetic joint infections and catheter-related bloodstream infections</p>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-3">
          Each case includes expert commentary, treatment rationales, and follow-up questions to reinforce learning.
        </p>
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
      
      <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Macrolides</h5>
          <p class="text-sm mb-2">
            Generally well-tolerated; neurocognitive effects are uncommon
          </p>
          <div>
            <p class="text-sm font-medium">Clinical manifestations:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Acute psychosis (rare)</li>
              <li>Mania (rare)</li>
              <li>Nightmares</li>
              <li>Hearing loss (high-dose IV)</li>
            </ul>
          </div>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Metronidazole</h5>
          <p class="text-sm mb-2">
            Can cause a distinctive encephalopathy with characteristic MRI findings
          </p>
          <div>
            <p class="text-sm font-medium">Clinical manifestations:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Cerebellar dysfunction (ataxia)</li>
              <li>Dysarthria</li>
              <li>MRI: T2 hyperintensities in the dentate nuclei and splenium</li>
              <li>Peripheral neuropathy with prolonged use</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Risk factors:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Prolonged therapy (>2 weeks)</li>
              <li>High doses</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
        <h5 class="font-medium mb-2">Other Notable Antibiotics</h5>
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Linezolid:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Serotonin syndrome (with serotonergic medications)</li>
              <li>Peripheral neuropathy with prolonged use</li>
              <li>Optic neuritis with prolonged use</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Isoniazid:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Peripheral neuropathy (preventable with pyridoxine)</li>
              <li>Psychosis, seizures (especially with pyridoxine deficiency)</li>
              <li>Toxic encephalopathy in overdose</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Aminoglycosides:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Vestibular toxicity</li>
              <li>Rare neuromuscular blockade</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Risk Assessment and Prevention</h4>
      
      <div class="mb-6">
        <p class="mb-3">Strategies to minimize antibiotic-associated neurocognitive effects:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Baseline assessment:</strong> Document pre-existing neurological conditions and cognitive function
          </li>
          <li>
            <strong>Dose adjustment:</strong> Modify doses for renal/hepatic dysfunction and extremes of age
          </li>
          <li>
            <strong>Drug interactions:</strong> Review for potential interactions with CNS-active medications
          </li>
          <li>
            <strong>Monitoring:</strong> Regular assessment of mental status, especially in high-risk patients
          </li>
          <li>
            <strong>Patient and family education:</strong> Inform about potential neurological effects and when to report them
          </li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">4. Management of Antibiotic-Induced Neurocognitive Effects</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <ol class="list-decimal pl-5 space-y-2">
          <li><strong>Recognition and documentation:</strong> Establish temporal relationship with antibiotic initiation</li>
          <li><strong>Exclude other causes:</strong> Rule out other etiologies of altered mental status</li>
          <li><strong>Drug discontinuation or modification:</strong> Consider antibiotic discontinuation, dose adjustment, or alternative agent</li>
          <li><strong>Supportive care:</strong> Address symptoms and provide supportive therapy</li>
          <li><strong>Monitoring:</strong> Assess for resolution after antibiotic discontinuation</li>
        </ol>
      </div>
      
      <div class="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Clinical Pearls</h4>
        <ul class="list-disc pl-5 text-sm space-y-2">
          <li>Neurologic symptoms that develop during antibiotic therapy should prompt consideration of drug-induced causes</li>
          <li>Cefepime-induced neurotoxicity is often misdiagnosed as delirium from other causes, especially in critical care settings</li>
          <li>Most antibiotic-induced neurocognitive effects are reversible upon discontinuation of the offending agent</li>
          <li>Consider EEG in patients with unexplained encephalopathy on antibiotics; characteristic patterns may be seen with certain agents</li>
          <li>Metronidazole-induced encephalopathy can persist for weeks after discontinuation but typically resolves completely</li>
        </ul>
      </div>
    `
  },
  {
    id: 'evolving-pathogens',
    title: 'Emerging and Re-emerging Pathogens',
    description: 'Surveillance and management of novel infectious threats',
    icon: Virus,
    category: 'research',
    readTime: '22 min',
    lastUpdated: 'April 3, 2025',
    author: 'Dr. Alex Nguyen, MD, MPH',
    authorCredentials: 'Global Health Specialist',
    content: `
      <h3>Emerging and Re-emerging Pathogens</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 3, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Overview</h4>
        <p>
          Emerging infectious diseases pose significant challenges to global health security. This article examines
          key emerging and re-emerging pathogens of concern, surveillance strategies, and antimicrobial approaches
          for novel threats.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Current Pathogens of Concern</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">Bacterial Threats</h5>
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Candida auris:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Multi-drug resistant fungal pathogen</li>
              <li>High mortality in healthcare settings</li>
              <li>Resistant to multiple antifungal classes</li>
              <li>Environmental persistence and difficult decontamination</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Carbapenem-resistant Enterobacteriaceae (CRE):</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Limited treatment options</li>
              <li>Increasing global prevalence</li>
              <li>Mortality rates of 40-50% in bloodstream infections</li>
              <li>Emergence of novel resistance mechanisms (e.g., NDM, KPC, OXA-48)</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Mycobacterium abscessus complex:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Rapidly growing mycobacterium with extensive drug resistance</li>
              <li>Increasing prevalence in cystic fibrosis and bronchiectasis</li>
              <li>Requires prolonged, multi-drug therapy</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">Viral Threats</h5>
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Novel Coronaviruses:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Continued surveillance for novel variants</li>
              <li>Potential for emergence at human-animal interface</li>
              <li>Need for agile therapeutic development pipelines</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Emerging Arboviruses:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Geographic expansion due to vector range changes</li>
              <li>Examples: Chikungunya, Zika, Eastern equine encephalitis</li>
              <li>Limited specific therapies available</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Filoviruses (Ebola, Marburg):</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Recurrent outbreaks with high mortality</li>
              <li>Increasing availability of vaccines and therapeutics</li>
              <li>Human-to-human transmission with healthcare implications</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Antimicrobial Development Strategies</h4>
      
      <div class="mb-6">
        <p class="mb-3">Novel approaches to address emerging pathogens:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Novel target identification:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>Bacterial virulence factors as targets</li>
              <li>Non-essential gene products</li>
              <li>Bacterial secretion systems</li>
            </ul>
          </li>
          <li>
            <strong>Antibiotic alternatives:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>Phage therapy</li>
              <li>Antibacterial peptides</li>
              <li>Monoclonal antibodies</li>
              <li>CRISPR-based antimicrobials</li>
            </ul>
          </li>
          <li>
            <strong>Combination therapy approaches:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>Beta-lactam/beta-lactamase inhibitor combinations</li>
              <li>Antibiotic adjuvants</li>
              <li>Multi-drug regimens targeting different pathways</li>
            </ul>
          </li>
          <li>
            <strong>Repurposing existing drugs:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li>High-throughput screening of approved compounds</li>
              <li>Combination testing</li>
              <li>Faster pathway to clinical implementation</li>
            </ul>
          </li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Surveillance and Early Detection</h4>
      
      <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Global Surveillance Networks</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>WHO Global Outbreak Alert and Response Network (GOARN)</li>
            <li>CDC Global Disease Detection Program</li>
            <li>One Health surveillance at human-animal-environment interfaces</li>
            <li>Digital disease surveillance through web-mining (e.g., ProMED, HealthMap)</li>
            <li>Genomic surveillance networks</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Advanced Diagnostic Technologies</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Metagenomic next-generation sequencing</li>
            <li>Point-of-care molecular diagnostics</li>
            <li>Syndromic testing panels</li>
            <li>Wearable biosensors</li>
            <li>AI-assisted diagnostic algorithms</li>
            <li>Environmental sampling and wastewater surveillance</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">4. Clinical Preparedness and Response</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">Healthcare System Readiness</h5>
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Institutional Preparedness:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Updated isolation protocols</li>
              <li>Regular preparedness drills</li>
              <li>Clear communication channels</li>
              <li>Surge capacity planning</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Clinical Training:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Recognition of unusual pathogens</li>
              <li>Management of highly resistant organisms</li>
              <li>Personal protective equipment training</li>
              <li>Emerging infection protocols</li>
            </ul>
          </div>
          <div>
            <p class="font-medium text-sm">Therapeutic Stockpiling:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Strategic national stockpiles</li>
              <li>Rapid antimicrobial susceptibility testing capabilities</li>
              <li>Access to investigational agents</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Future Directions</h4>
        <p class="mb-2">
          Emerging strategies to address novel infectious threats include:
        </p>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Predictive modeling of emerging pathogen evolution</li>
          <li>Platform technologies for rapid vaccine development</li>
          <li>Broad-spectrum antiviral agents</li>
          <li>Global pathogen genomic databases with AI-powered analysis</li>
          <li>Universal vaccine approaches for viral families with pandemic potential</li>
          <li>Portable, field-deployable diagnostics and laboratory capabilities</li>
        </ul>
        <p class="text-xs text-gray-500 mt-3">
          Coordination between clinical, public health, research, and industry sectors is essential for effective 
          preparedness and response to emerging infectious disease threats.
        </p>
      </div>
    `
  }
];

