
import { Article } from "../types/articleTypes";
import { Baby, Heart, Calculator, Thermometer, Stethoscope, Shield } from "lucide-react";

export const pediatricArticles: Article[] = [
  {
    id: 'neonatal-antibiotic-dosing',
    title: 'Neonatal Antibiotic Dosing Guidelines',
    description: 'Age and weight-based dosing for critically ill neonates',
    icon: Baby,
    category: 'specialized',
    readTime: '20 min',
    lastUpdated: 'April 1, 2025',
    author: 'Dr. Jennifer Park, MD',
    authorCredentials: 'Neonatal-Perinatal Medicine',
    content: `
      <h3>Neonatal Antibiotic Dosing Guidelines</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 1, 2025</p>
      
      <div class="mb-6 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
        <h4 class="font-medium text-pink-700 dark:text-pink-300 mb-2">Neonatal Pharmacokinetics</h4>
        <p>
          Neonatal drug dosing requires careful consideration of gestational age, postnatal age, 
          weight, and organ maturation. Standard pediatric dosing may not apply to this population.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Age-Based Dosing Categories</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Preterm (<32 weeks GA)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Immature renal function</li>
            <li>Prolonged half-lives</li>
            <li>Extended dosing intervals</li>
            <li>Lower mg/kg doses</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Late Preterm (32-37 weeks)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Transitional physiology</li>
            <li>Moderate dose adjustments</li>
            <li>PNA considerations</li>
            <li>Individual monitoring</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Term (≥37 weeks)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Mature renal function by 1 month</li>
            <li>Standard dosing after 1 month</li>
            <li>Weight-based calculations</li>
            <li>Adult-like kinetics by 6 months</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Common Neonatal Antibiotics</h4>
      
      <div class="my-6 space-y-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Ampicillin (First-line for GBS/E. coli)</h5>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b">
                  <th class="text-left p-2">Age Group</th>
                  <th class="text-left p-2">Dose</th>
                  <th class="text-left p-2">Interval</th>
                  <th class="text-left p-2">Route</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-2">0-7 days, <2kg</td>
                  <td class="p-2">50mg/kg</td>
                  <td class="p-2">q12h</td>
                  <td class="p-2">IV</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">0-7 days, ≥2kg</td>
                  <td class="p-2">50mg/kg</td>
                  <td class="p-2">q8h</td>
                  <td class="p-2">IV</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">8-28 days, <2kg</td>
                  <td class="p-2">50mg/kg</td>
                  <td class="p-2">q8h</td>
                  <td class="p-2">IV</td>
                </tr>
                <tr>
                  <td class="p-2">8-28 days, ≥2kg</td>
                  <td class="p-2">50mg/kg</td>
                  <td class="p-2">q6h</td>
                  <td class="p-2">IV</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Gentamicin (Aminoglycoside)</h5>
          <div class="mb-3">
            <p class="text-sm font-medium mb-1">Extended Interval Dosing (Preferred)</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li><strong><32 weeks GA:</strong> 4-5mg/kg q48h</li>
              <li><strong>32-37 weeks GA:</strong> 4-5mg/kg q36h</li>
              <li><strong>≥37 weeks GA:</strong> 4-5mg/kg q24h</li>
            </ul>
          </div>
          <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border">
            <p class="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-1">Monitoring Required</p>
            <ul class="list-disc pl-5 text-xs space-y-1">
              <li>Trough levels before 3rd dose</li>
              <li>Target trough: <2 μg/mL</li>
              <li>Peak levels if concerns about efficacy</li>
              <li>Renal function monitoring</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Special Considerations</h4>
      
      <div class="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">⚠️ Critical Safety Points</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Always use actual birth weight for calculations in first week of life</li>
          <li>Avoid sulfonamides and tetracyclines in neonates</li>
          <li>Monitor for "gray baby syndrome" with chloramphenicol</li>
          <li>Fluoroquinolones generally contraindicated</li>
          <li>Vancomycin requires frequent level monitoring</li>
        </ul>
      </div>
    `
  },
  {
    id: 'pediatric-sepsis-protocol',
    title: 'Pediatric Sepsis Recognition and Management',
    description: 'Age-specific protocols for early recognition and treatment',
    icon: Heart,
    category: 'clinical',
    readTime: '18 min',
    lastUpdated: 'April 1, 2025',
    author: 'Dr. Michael Chen, MD',
    authorCredentials: 'Pediatric Emergency Medicine',
    content: `
      <h3>Pediatric Sepsis Recognition and Management</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 1, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Pediatric Sepsis Alert</h4>
        <p>
          Pediatric sepsis can progress rapidly with minimal warning signs. Early recognition 
          using age-appropriate criteria and prompt antibiotic administration are crucial for survival.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Age-Specific SIRS Criteria</h4>
      
      <div class="my-6 overflow-x-auto">
        <table class="w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="text-left p-3 border-b">Age Group</th>
              <th class="text-left p-3 border-b">Heart Rate (bpm)</th>
              <th class="text-left p-3 border-b">Respiratory Rate</th>
              <th class="text-left p-3 border-b">WBC (k/μL)</th>
              <th class="text-left p-3 border-b">Temperature</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="p-3">0-1 month</td>
              <td class="p-3">>180 or <100</td>
              <td class="p-3">>50</td>
              <td class="p-3">>34 or <5</td>
              <td class="p-3">>38.5°C or <36°C</td>
            </tr>
            <tr class="border-b">
              <td class="p-3">1-12 months</td>
              <td class="p-3">>180 or <90</td>
              <td class="p-3">>40</td>
              <td class="p-3">>19.5 or <5</td>
              <td class="p-3">>38.5°C or <36°C</td>
            </tr>
            <tr class="border-b">
              <td class="p-3">2-5 years</td>
              <td class="p-3">>140</td>
              <td class="p-3">>22</td>
              <td class="p-3">>17.5 or <6</td>
              <td class="p-3">>38.5°C or <36°C</td>
            </tr>
            <tr class="border-b">
              <td class="p-3">6-12 years</td>
              <td class="p-3">>130</td>
              <td class="p-3">>18</td>
              <td class="p-3">>13.5 or <4.5</td>
              <td class="p-3">>38.5°C or <36°C</td>
            </tr>
            <tr>
              <td class="p-3">13-18 years</td>
              <td class="p-3">>110</td>
              <td class="p-3">>14</td>
              <td class="p-3">>11 or <4.5</td>
              <td class="p-3">>38.5°C or <36°C</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Empiric Antibiotic Protocols</h4>
      
      <div class="my-6 space-y-4">
        <div class="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
          <h5 class="font-medium mb-2 text-red-700 dark:text-red-300">Neonatal Sepsis (0-28 days)</h5>
          <div class="space-y-2 text-sm">
            <p><strong>Early-onset (0-72 hours):</strong></p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Ampicillin + Gentamicin (GBS, E. coli coverage)</li>
              <li>Alternative: Ampicillin + Cefotaxime</li>
            </ul>
            <p><strong>Late-onset (>72 hours):</strong></p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Vancomycin + Cefotaxime (broader coverage)</li>
              <li>Consider antifungal if high risk</li>
            </ul>
          </div>
        </div>
        
        <div class="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/10">
          <h5 class="font-medium mb-2 text-orange-700 dark:text-orange-300">Infant/Child Sepsis (1 month - 18 years)</h5>
          <div class="space-y-2 text-sm">
            <p><strong>Community-acquired:</strong></p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Ceftriaxone + Vancomycin (if MRSA risk)</li>
              <li>Alternative: Cefotaxime + Vancomycin</li>
            </ul>
            <p><strong>Healthcare-associated:</strong></p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Piperacillin-tazobactam + Vancomycin</li>
              <li>Consider antifungal if immunocompromised</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">3. Pediatric Sepsis Bundles</h4>
      
      <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">🕐 Hour-1 Bundle Elements</h4>
        <ol class="list-decimal pl-5 space-y-1 text-sm">
          <li>Measure lactate level</li>
          <li>Obtain blood cultures before antibiotics</li>
          <li>Administer broad-spectrum antibiotics within 1 hour</li>
          <li>Begin rapid administration of 20mL/kg crystalloid for hypoperfusion</li>
          <li>Apply vasopressors if patient is hypotensive during or after fluid resuscitation</li>
        </ol>
      </div>
    `
  }
];
