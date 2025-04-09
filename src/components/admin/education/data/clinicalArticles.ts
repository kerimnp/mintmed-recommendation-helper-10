
import { Article } from "../types/articleTypes";
import { FileText, Stethoscope, PieChart } from "lucide-react";

export const clinicalArticles: Article[] = [
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
    `
  }
];
