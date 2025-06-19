
import { Article } from "../types/articleTypes";
import { Pill, Activity, Brain, Heart } from "lucide-react";

export const pharmacologyArticles: Article[] = [
  {
    id: 'pk-pd-fundamentals',
    title: 'Pharmacokinetic/Pharmacodynamic Principles',
    description: 'Essential PK/PD concepts for antibiotic optimization',
    icon: Activity,
    category: 'pharmacology',
    readTime: '15 min',
    lastUpdated: 'March 28, 2025',
    author: 'Dr. Sarah Johnson, PharmD',
    authorCredentials: 'Clinical Pharmacist, Infectious Diseases',
    content: `
      <h3>Pharmacokinetic/Pharmacodynamic Principles</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 28, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Relevance</h4>
        <p>
          Understanding PK/PD principles is crucial for optimizing antibiotic therapy. These concepts help 
          clinicians select appropriate doses, intervals, and durations to maximize efficacy while minimizing toxicity.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Key PK/PD Parameters</h4>
      
      <div class="my-6 space-y-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Time-Dependent Killing (T>MIC)</h5>
          <p class="text-sm mb-2">
            <strong>Mechanism:</strong> Bactericidal activity correlates with time drug concentration exceeds MIC
          </p>
          <p class="text-sm mb-2">
            <strong>Drug Classes:</strong> Beta-lactams, vancomycin, linezolid
          </p>
          <p class="text-sm mb-2">
            <strong>Target:</strong> T>MIC for 40-70% of dosing interval
          </p>
          <p class="text-sm">
            <strong>Clinical Strategy:</strong> Frequent dosing or continuous infusion
          </p>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Concentration-Dependent Killing (Cmax/MIC)</h5>
          <p class="text-sm mb-2">
            <strong>Mechanism:</strong> Higher peak concentrations produce greater bacterial killing
          </p>
          <p class="text-sm mb-2">
            <strong>Drug Classes:</strong> Aminoglycosides, fluoroquinolones, daptomycin
          </p>
          <p class="text-sm mb-2">
            <strong>Target:</strong> Cmax/MIC ratio of 8-10 (aminoglycosides)
          </p>
          <p class="text-sm">
            <strong>Clinical Strategy:</strong> Higher doses, extended intervals
          </p>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">AUC-Dependent Killing</h5>
          <p class="text-sm mb-2">
            <strong>Mechanism:</strong> Total drug exposure correlates with efficacy
          </p>
          <p class="text-sm mb-2">
            <strong>Drug Classes:</strong> Fluoroquinolones, vancomycin, azithromycin
          </p>
          <p class="text-sm mb-2">
            <strong>Target:</strong> AUC/MIC >125 (fluoroquinolones), AUC/MIC >400 (vancomycin)
          </p>
          <p class="text-sm">
            <strong>Clinical Strategy:</strong> Optimize total daily dose
          </p>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Post-Antibiotic Effect (PAE)</h4>
      <p class="mb-4">
        PAE is the persistent suppression of bacterial growth after antibiotic concentrations fall below the MIC.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h5 class="font-medium text-green-700 dark:text-green-300 mb-2">Significant PAE</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Aminoglycosides (2-8 hours)</li>
            <li>Fluoroquinolones (2-6 hours)</li>
            <li>Vancomycin vs gram-positive (2-4 hours)</li>
          </ul>
        </div>
        <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h5 class="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Minimal PAE</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Beta-lactams vs gram-negative</li>
            <li>Clindamycin</li>
            <li>Macrolides vs gram-negative</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Clinical Applications</h4>
      
      <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h5 class="font-medium mb-3">Dosing Optimization Strategies</h5>
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Extended/Continuous Infusion Beta-lactams</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Optimize T>MIC by prolonging infusion time, especially for resistant organisms
            </p>
          </div>
          <div>
            <p class="font-medium text-sm">Once-Daily Aminoglycosides</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Maximize Cmax/MIC ratio while utilizing PAE for bacterial suppression
            </p>
          </div>
          <div>
            <p class="font-medium text-sm">AUC-Guided Vancomycin</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Target AUC/MIC >400 for serious MRSA infections using Bayesian dosing
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'therapeutic-drug-monitoring',
    title: 'Therapeutic Drug Monitoring in Clinical Practice',
    description: 'When and how to monitor antibiotic levels for optimal outcomes',
    icon: Brain,
    category: 'pharmacology',
    readTime: '12 min',
    lastUpdated: 'March 28, 2025',
    author: 'Dr. Michael Chen, PharmD',
    authorCredentials: 'Clinical Pharmacist, Critical Care',
    content: `
      <h3>Therapeutic Drug Monitoring in Clinical Practice</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 28, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">When to Monitor</h4>
        <p>
          TDM is indicated when there's a narrow therapeutic window, significant toxicity risk, 
          altered pharmacokinetics, or treatment failure with standard dosing.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Vancomycin Monitoring</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-3">2020 Consensus Guidelines</h5>
        <div class="space-y-3">
          <div>
            <p class="font-medium text-sm">Primary Recommendation: AUC-Guided Dosing</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Target AUC₂₄ of 400-600 (invasive MRSA) using Bayesian software
            </p>
          </div>
          <div>
            <p class="font-medium text-sm">Trough-Based Alternative</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
              15-20 mg/L when AUC monitoring unavailable (higher nephrotoxicity risk)
            </p>
          </div>
          <div>
            <p class="font-medium text-sm">Loading Dose</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              25-30 mg/kg for serious infections, regardless of renal function
            </p>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Aminoglycoside Monitoring</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Traditional Dosing</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Peak: 5-10 mg/L (gentamicin/tobramycin)</li>
            <li>Trough: <2 mg/L</li>
            <li>Draw levels with 3rd dose</li>
            <li>Monitor SCr, hearing</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Extended Interval Dosing</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Single random level 6-14h post-dose</li>
            <li>Use nomogram or calculator</li>
            <li>Simplified monitoring</li>
            <li>Reduced toxicity risk</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Beta-lactam Monitoring</h4>
      
      <div class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h5 class="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Emerging Practice</h5>
        <p class="text-sm mb-3">
          Beta-lactam TDM is gaining acceptance for critically ill patients and resistant infections
        </p>
        <div class="space-y-2">
          <p class="text-sm"><strong>Target:</strong> Free drug concentration >4x MIC for 100% T>MIC</p>
          <p class="text-sm"><strong>Sampling:</strong> Mid-interval for continuous infusion, trough for intermittent</p>
          <p class="text-sm"><strong>Indications:</strong> Severe sepsis, ARC, resistant pathogens</p>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Special Populations</h4>
      
      <div class="space-y-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Critical Illness</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Increased Vd due to fluid resuscitation</li>
            <li>Altered clearance (ARC or AKI)</li>
            <li>Consider higher loading doses</li>
            <li>More frequent monitoring</li>
          </ul>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Obesity</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Use appropriate weight descriptor</li>
            <li>Increased Vd for hydrophilic drugs</li>
            <li>May need dose adjustments</li>
            <li>Monitor for under-dosing</li>
          </ul>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Renal Impairment</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Decreased clearance of renally eliminated drugs</li>
            <li>More frequent monitoring required</li>
            <li>Dose/interval adjustments needed</li>
            <li>Consider nephrotoxicity risk</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'drug-interactions-mechanisms',
    title: 'Antibiotic Drug Interactions: Mechanisms and Management',
    description: 'Understanding and managing clinically significant antibiotic interactions',
    icon: Pill,
    category: 'pharmacology',
    readTime: '18 min',
    lastUpdated: 'March 28, 2025',
    author: 'Dr. Lisa Rodriguez, PharmD',
    authorCredentials: 'Clinical Pharmacy Specialist, Drug Information',
    content: `
      <h3>Antibiotic Drug Interactions: Mechanisms and Management</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 28, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Critical Safety Alert</h4>
        <p>
          Some antibiotic interactions can be life-threatening. Always check for interactions 
          before prescribing, especially with narrow therapeutic index drugs.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Pharmacokinetic Interactions</h4>
      
      <div class="space-y-4 mb-6">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">CYP450 Enzyme Interactions</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-medium text-sm text-red-600 dark:text-red-400 mb-2">Strong Inhibitors</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Ciprofloxacin (CYP1A2)</li>
                <li>Clarithromycin (CYP3A4)</li>
                <li>Fluconazole (CYP2C9, CYP3A4)</li>
                <li>Isoniazid (CYP2E1)</li>
              </ul>
            </div>
            <div>
              <p class="font-medium text-sm text-green-600 dark:text-green-400 mb-2">Inducers</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Rifampin (CYP3A4, others)</li>
                <li>Rifabutin (CYP3A4)</li>
                <li>Rifapentine (CYP3A4)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Absorption Interactions</h5>
          <div class="space-y-2">
            <p class="text-sm"><strong>Chelation:</strong> Fluoroquinolones + divalent cations (Ca²⁺, Mg²⁺, Fe²⁺)</p>
            <p class="text-sm"><strong>pH Effects:</strong> Atazanavir + proton pump inhibitors</p>
            <p class="text-sm"><strong>Timing:</strong> Separate administration by 2-4 hours</p>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">High-Risk Interactions</h4>
      
      <div class="space-y-4 mb-6">
        <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <h5 class="font-medium text-red-700 dark:text-red-300 mb-2">QT Prolongation</h5>
          <div class="mb-3">
            <p class="text-sm mb-2"><strong>High-Risk Antibiotics:</strong></p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Macrolides (azithromycin, clarithromycin)</li>
              <li>Fluoroquinolones (moxifloxacin > levofloxacin)</li>
              <li>Azole antifungals</li>
            </ul>
          </div>
          <div>
            <p class="text-sm mb-2"><strong>Management:</strong></p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Baseline and monitoring ECGs</li>
              <li>Correct electrolyte abnormalities</li>
              <li>Avoid multiple QT-prolonging drugs</li>
              <li>Consider alternative agents</li>
            </ul>
          </div>
        </div>
        
        <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <h5 class="font-medium text-orange-700 dark:text-orange-300 mb-2">Warfarin Interactions</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm mb-2"><strong>Major Interactions:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Metronidazole (↑↑ INR)</li>
                <li>Trimethoprim-SMX (↑ INR)</li>
                <li>Fluconazole (↑↑ INR)</li>
                <li>Ciprofloxacin (↑ INR)</li>
              </ul>
            </div>
            <div>
              <p class="text-sm mb-2"><strong>Management:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Increase INR monitoring</li>
                <li>Consider dose reduction</li>
                <li>Patient education on bleeding signs</li>
                <li>Alternative anticoagulants if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Clinically Significant Examples</h4>
      
      <div class="space-y-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Rifampin + Multiple Drug Classes</h5>
          <p class="text-sm mb-2">
            <strong>Mechanism:</strong> Potent CYP3A4 inducer, reduces levels of numerous drugs
          </p>
          <p class="text-sm mb-2">
            <strong>Affected Drugs:</strong> HIV protease inhibitors, immunosuppressants, oral contraceptives
          </p>
          <p class="text-sm">
            <strong>Management:</strong> Dose adjustments, alternative drugs, additional contraception
          </p>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Linezolid + Serotonergic Drugs</h5>
          <p class="text-sm mb-2">
            <strong>Mechanism:</strong> Weak MAO inhibitor, risk of serotonin syndrome
          </p>
          <p class="text-sm mb-2">
            <strong>Risk Factors:</strong> SSRIs, SNRIs, tramadol, meperidine
          </p>
          <p class="text-sm">
            <strong>Management:</strong> Avoid combination when possible, monitor for serotonin syndrome
          </p>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Vancomycin + Nephrotoxic Drugs</h5>
          <p class="text-sm mb-2">
            <strong>Mechanism:</strong> Additive nephrotoxicity
          </p>
          <p class="text-sm mb-2">
            <strong>Risk Factors:</strong> Aminoglycosides, amphotericin B, loop diuretics, NSAIDs
          </p>
          <p class="text-sm">
            <strong>Management:</strong> Enhanced monitoring, dose adjustments, minimize duration
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'antibiotic-tissue-penetration',
    title: 'Antibiotic Tissue Penetration and Site-Specific Therapy',
    description: 'Selecting antibiotics based on tissue penetration characteristics',
    icon: Heart,
    category: 'pharmacology',
    readTime: '14 min',
    lastUpdated: 'March 28, 2025',
    author: 'Dr. Jennifer Park, MD, PhD',
    authorCredentials: 'Infectious Diseases Physician, Clinical Pharmacologist',
    content: `
      <h3>Antibiotic Tissue Penetration and Site-Specific Therapy</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 28, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Importance</h4>
        <p>
          Adequate antibiotic concentrations at the infection site are essential for treatment success. 
          Understanding tissue penetration helps optimize antibiotic selection for specific infections.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Central Nervous System</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h5 class="font-medium text-green-700 dark:text-green-300 mb-2">Good CNS Penetration</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Metronidazole (100%)</li>
            <li>Fluoroquinolones (60-90%)</li>
            <li>Linezolid (70%)</li>
            <li>Rifampin (10-20%)</li>
            <li>Trimethoprim-SMX (40-50%)</li>
          </ul>
        </div>
        <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h5 class="font-medium text-red-700 dark:text-red-300 mb-2">Poor CNS Penetration</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Vancomycin (5-10%)</li>
            <li>Aminoglycosides (<5%)</li>
            <li>Most beta-lactams (5-20%)</li>
            <li>Daptomycin (minimal)</li>
          </ul>
        </div>
      </div>
      
      <div class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h5 class="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Meningitis Considerations</h5>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Inflammation increases penetration of some antibiotics</li>
          <li>Higher doses often required (e.g., ceftriaxone 2g q12h)</li>
          <li>Intraventricular administration may be needed for resistant organisms</li>
          <li>Steroids can reduce penetration - timing is critical</li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Respiratory Tract</h4>
      
      <div class="space-y-4 mb-6">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Epithelial Lining Fluid (ELF) Concentrations</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-medium text-sm text-green-600 dark:text-green-400 mb-2">High ELF Penetration</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Fluoroquinolones (200-300%)</li>
                <li>Macrolides (500-1000%)</li>
                <li>Linezolid (400%)</li>
                <li>Doxycycline (100-200%)</li>
              </ul>
            </div>
            <div>
              <p class="font-medium text-sm text-orange-600 dark:text-orange-400 mb-2">Variable Penetration</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Beta-lactams (20-100%)</li>
                <li>Vancomycin (20-30%)</li>
                <li>Aminoglycosides (10-50%)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Bone and Joint Infections</h4>
      
      <div class="space-y-4 mb-6">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Bone Penetration Characteristics</h5>
          <div class="space-y-3">
            <div>
              <p class="font-medium text-sm">Excellent Bone Penetration</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Fluoroquinolones (50-100% of serum)</li>
                <li>Linezolid (40-60%)</li>
                <li>Clindamycin (40-50%)</li>
                <li>Rifampin (good penetration)</li>
              </ul>
            </div>
            <div>
              <p class="font-medium text-sm">Moderate Bone Penetration</p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Beta-lactams (10-20%)</li>
                <li>Vancomycin (5-15%)</li>
                <li>Daptomycin (limited data)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h5 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Considerations</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Chronic osteomyelitis may require prolonged oral therapy</li>
            <li>Biofilm formation reduces antibiotic effectiveness</li>
            <li>Combination therapy often needed for optimal outcomes</li>
            <li>Surgical debridement improves antibiotic penetration</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Intracellular Infections</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h5 class="font-medium text-green-700 dark:text-green-300 mb-2">High Intracellular Activity</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Macrolides (azithromycin)</li>
            <li>Fluoroquinolones</li>
            <li>Tetracyclines/doxycycline</li>
            <li>Rifampin</li>
            <li>Linezolid</li>
          </ul>
        </div>
        <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h5 class="font-medium text-red-700 dark:text-red-300 mb-2">Poor Intracellular Activity</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Beta-lactams</li>
            <li>Vancomycin</li>
            <li>Aminoglycosides</li>
            <li>Daptomycin</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Site-Specific Dosing Considerations</h4>
      
      <div class="space-y-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Endocarditis</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Bactericidal antibiotics preferred</li>
            <li>Higher doses and longer durations</li>
            <li>Combination therapy for synergy</li>
            <li>Consider valve penetration characteristics</li>
          </ul>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Prosthetic Device Infections</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Biofilm-active antibiotics (rifampin, fluoroquinolones)</li>
            <li>Prolonged therapy duration</li>
            <li>Device removal may be necessary</li>
            <li>Combination therapy to prevent resistance</li>
          </ul>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Abscess/Loculated Infections</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Surgical drainage often required  </li>
            <li>Antibiotics may not penetrate well into abscesses</li>
            <li>Consider local antibiotic instillation</li>
            <li>Prolonged systemic therapy may be needed</li>
          </ul>
        </div>
      </div>
    `
  }
];
