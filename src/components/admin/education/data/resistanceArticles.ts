
import { Article } from "../types/articleTypes";
import { Shield, Zap, AlertTriangle, TrendingUp, Globe, Microscope } from "lucide-react";

export const resistanceArticles: Article[] = [
  {
    id: 'mrsa-management',
    title: 'MRSA: Detection and Management Strategies',
    description: 'Comprehensive approach to methicillin-resistant Staphylococcus aureus',
    icon: Shield,
    category: 'advanced',
    readTime: '18 min',
    lastUpdated: 'March 30, 2025',
    author: 'Dr. Patricia Williams, MD',
    authorCredentials: 'Infectious Disease Specialist',
    content: `
      <h3>MRSA: Detection and Management Strategies</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 30, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Clinical Significance</h4>
        <p>
          MRSA infections are associated with increased morbidity, mortality, length of stay, and healthcare costs.
          Rapid identification and appropriate therapy are crucial for optimal patient outcomes.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. MRSA Detection Methods</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Rapid Diagnostic Tests</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>PCR-based assays (2-4 hours)</li>
            <li>MALDI-TOF MS identification</li>
            <li>Chromogenic agar (24 hours)</li>
            <li>Latex agglutination tests</li>
          </ul>
          <p class="text-xs text-gray-500 mt-2">Turnaround time: 2-24 hours</p>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Traditional Methods</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Disk diffusion (cefoxitin)</li>
            <li>Oxacillin MIC testing</li>
            <li>Automated susceptibility systems</li>
            <li>mecA gene detection</li>
          </ul>
          <p class="text-xs text-gray-500 mt-2">Turnaround time: 24-48 hours</p>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Treatment Options by Infection Type</h4>
      
      <div class="my-6 space-y-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Skin and Soft Tissue Infections</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium mb-1">Mild-Moderate (Outpatient)</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Clindamycin 300-450mg PO q8h</li>
                <li>Doxycycline 100mg PO q12h</li>
                <li>TMP-SMX DS PO q12h</li>
                <li>Linezolid 600mg PO q12h</li>
              </ul>
            </div>
            <div>
              <p class="text-sm font-medium mb-1">Severe (Hospitalized)</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Vancomycin 15-20mg/kg IV q8-12h</li>
                <li>Linezolid 600mg IV q12h</li>
                <li>Daptomycin 4mg/kg IV daily</li>
                <li>Ceftaroline 600mg IV q12h</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Bacteremia and Endocarditis</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li><strong>First-line:</strong> Vancomycin 15-20mg/kg IV q8-12h (target trough 15-20 μg/mL)</li>
            <li><strong>Alternative:</strong> Daptomycin 6mg/kg IV daily (higher dose for bacteremia)</li>
            <li><strong>Combination:</strong> Consider gentamicin for first 3-5 days in endocarditis</li>
            <li><strong>Duration:</strong> 4-6 weeks for endocarditis, 2-4 weeks for uncomplicated bacteremia</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Monitoring and Adverse Effects</h4>
      
      <div class="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Vancomycin Monitoring</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Trough levels before 4th dose for serious infections</li>
          <li>Target trough: 10-15 μg/mL (15-20 μg/mL for severe infections)</li>
          <li>Weekly SCr and BUN monitoring</li>
          <li>Consider AUC-guided dosing in complex patients</li>
        </ul>
      </div>
    `
  },
  {
    id: 'esbl-management',
    title: 'ESBL-Producing Enterobacteriaceae Management',
    description: 'Extended-spectrum beta-lactamase infections and carbapenem stewardship',
    icon: AlertTriangle,
    category: 'advanced',
    readTime: '16 min',
    lastUpdated: 'March 30, 2025',
    author: 'Dr. Kevin Zhang, PharmD',
    authorCredentials: 'Antimicrobial Stewardship Pharmacist',
    content: `
      <h3>ESBL-Producing Enterobacteriaceae Management</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 30, 2025</p>
      
      <div class="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
        <h4 class="font-medium text-orange-700 dark:text-orange-300 mb-2">Global Health Threat</h4>
        <p>
          ESBL-producing organisms are a WHO priority pathogen. They resist most beta-lactam antibiotics
          and often carry additional resistance genes, limiting treatment options significantly.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. ESBL Detection and Reporting</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Laboratory Detection</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Phenotypic confirmation tests</li>
            <li>Double-disk synergy test</li>
            <li>Automated system algorithms</li>
            <li>Molecular detection (PCR)</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Clinical Implications</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Resistance to all penicillins</li>
            <li>Resistance to cephalosporins</li>
            <li>Resistance to aztreonam</li>
            <li>Variable resistance to beta-lactamase inhibitors</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Treatment Strategies</h4>
      
      <div class="my-6 space-y-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">First-Line Agents</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium mb-1">Carbapenems (Preferred)</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Meropenem 1-2g IV q8h</li>
                <li>Imipenem 500mg IV q6h</li>
                <li>Ertapenem 1g IV daily (not for Pseudomonas)</li>
                <li>Doripenem 500mg IV q8h</li>
              </ul>
            </div>
            <div>
              <p class="text-sm font-medium mb-1">Carbapenem-Sparing Options</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Ceftazidime-avibactam 2.5g IV q8h</li>
                <li>Meropenem-vaborbactam 4g IV q8h</li>
                <li>Piperacillin-tazobactam (if MIC ≤8)</li>
                <li>Aminoglycosides (combination therapy)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Oral Step-Down Options</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li><strong>Fluoroquinolones:</strong> If susceptible (increasing resistance)</li>
            <li><strong>TMP-SMX:</strong> For UTIs if susceptible</li>
            <li><strong>Fosfomycin:</strong> For uncomplicated cystitis</li>
            <li><strong>Nitrofurantoin:</strong> For uncomplicated cystitis (limited spectrum)</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Carbapenem Stewardship</h4>
      
      <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Stewardship Principles</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Use carbapenems judiciously to prevent CRE emergence</li>
          <li>Consider carbapenem-sparing agents when appropriate</li>
          <li>Implement day 3-5 antibiotic timeouts</li>
          <li>Monitor local resistance patterns and consumption</li>
          <li>Ensure appropriate infection control measures</li>
        </ul>
      </div>
    `
  }
];
