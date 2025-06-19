
import { Article } from "../types/articleTypes";
import { Shield, AlertTriangle, Target, TrendingUp, Database, Globe } from "lucide-react";

export const resistanceArticles: Article[] = [
  {
    id: 'antimicrobial-resistance-overview',
    title: 'Antimicrobial Resistance: Global Health Crisis',
    description: 'Understanding the scope and impact of antimicrobial resistance worldwide',
    icon: Globe,
    category: 'resistance',
    readTime: '18 min',
    lastUpdated: 'April 8, 2025',
    author: 'Dr. Sarah Martinez, MD, MPH',
    authorCredentials: 'WHO Antimicrobial Resistance Task Force',
    content: `
      <h3>Antimicrobial Resistance: Global Health Crisis</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 8, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Global Impact</h4>
        <p>
          Antimicrobial resistance (AMR) is responsible for approximately 700,000 deaths annually worldwide,
          with projections suggesting this could rise to 10 million deaths per year by 2050 without action.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Understanding AMR Mechanisms</h4>
      <p class="mb-4">
        Antimicrobial resistance develops through various mechanisms that allow pathogens to survive
        exposure to antimicrobial agents that would normally inhibit or kill them.
      </p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Enzymatic Inactivation</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Beta-lactamases hydrolyze beta-lactam rings</li>
            <li>Extended-spectrum beta-lactamases (ESBLs)</li>
            <li>Carbapenemases destroy carbapenems</li>
            <li>Aminoglycoside-modifying enzymes</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Target Modification</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Altered penicillin-binding proteins</li>
            <li>Ribosomal mutations affecting binding</li>
            <li>DNA gyrase modifications</li>
            <li>Cell wall composition changes</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'carbapenem-resistance',
    title: 'Carbapenem-Resistant Enterobacteriaceae (CRE)',
    description: 'Management strategies for carbapenem-resistant infections',
    icon: Shield,
    category: 'resistance',
    readTime: '16 min',
    lastUpdated: 'April 8, 2025',
    author: 'Dr. James Liu, MD',
    authorCredentials: 'Hospital Epidemiologist',
    content: `
      <h3>Carbapenem-Resistant Enterobacteriaceae (CRE)</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 8, 2025</p>
      
      <div class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Clinical Significance</h4>
        <p>
          CRE infections are associated with mortality rates of 40-50% and represent one of the most
          serious antimicrobial resistance threats in healthcare settings.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Resistance Mechanisms</h4>
      <p class="mb-4">
        CRE organisms employ multiple resistance mechanisms, often in combination,
        making treatment extremely challenging.
      </p>
    `
  },
  {
    id: 'vancomycin-resistance',
    title: 'Vancomycin-Resistant Enterococci (VRE)',
    description: 'Clinical management and infection control for VRE',
    icon: AlertTriangle,
    category: 'resistance',
    readTime: '14 min',
    lastUpdated: 'April 8, 2025',
    author: 'Dr. Lisa Rodriguez, PharmD',
    authorCredentials: 'Infectious Disease Pharmacist',
    content: `
      <h3>Vancomycin-Resistant Enterococci (VRE)</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 8, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Epidemiology</h4>
        <p>
          VRE colonization affects 10-40% of hospitalized patients in endemic areas,
          with E. faecium being the predominant species causing clinical infections.
        </p>
      </div>
    `
  }
];
