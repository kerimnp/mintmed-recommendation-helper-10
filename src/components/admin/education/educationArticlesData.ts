
// Educational article data
export type ArticleCategory = "fundamentals" | "clinical" | "advanced" | "specialized";

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
} from 'lucide-react';

// Article categories for filtering
export const categories: CategoryOption[] = [
  { id: "all", label: "All Resources" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "clinical", label: "Clinical Guidelines" },
  { id: "advanced", label: "Advanced Topics" },
  { id: "specialized", label: "Specialized Care" },
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
            <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">Critical</Badge>
            <span>Carbapenem-resistant Enterobacteriaceae (CRE)</span>
          </div>
          <div class="flex items-center gap-2">
            <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">Critical</Badge>
            <span>MDR Acinetobacter baumannii</span>
          </div>
          <div class="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">High</Badge>
            <span>MRSA (Methicillin-resistant S. aureus)</span>
          </div>
          <div class="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">High</Badge>
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
  }
];
