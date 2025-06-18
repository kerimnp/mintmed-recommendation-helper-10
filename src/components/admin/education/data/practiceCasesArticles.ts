
import { Article } from "../types/articleTypes";
import { PlayCircle, CheckCircle, Timer, Users2, Star, Trophy } from "lucide-react";

export const practiceCasesArticles: Article[] = [
  {
    id: 'emergency-antibiotic-decisions',
    title: 'Emergency Antibiotic Decision Making',
    description: 'Rapid-fire cases requiring immediate antibiotic decisions',
    icon: Timer,
    category: 'interactive',
    readTime: '35 min',
    lastUpdated: 'March 31, 2025',
    author: 'Emergency Medicine Education Team',
    authorCredentials: 'Emergency Medicine Specialists',
    content: `
      <h3>Emergency Antibiotic Decision Making</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 31, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Emergency Scenario Training</h4>
        <p>
          Practice making rapid antibiotic decisions under time pressure. Each case includes a timer 
          and expert feedback on your choices. Focus on pattern recognition and clinical reasoning.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Scenario 1: Febrile Neutropenia</h4>
      
      <div class="mb-6 p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
        <h5 class="font-medium mb-2 text-red-700 dark:text-red-300">⏱️ TIME PRESSURE: 15 minutes to decision</h5>
        <p class="mb-4">
          A 45-year-old woman with acute leukemia (day 10 post-chemotherapy) presents to ED with fever 101.8°F. 
          She appears ill but is hemodynamically stable. ANC = 100 cells/μL.
        </p>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Rapid Assessment</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Vital signs: T 101.8°F, HR 108, BP 118/75, RR 22, O2 sat 97%</li>
            <li>Physical: No obvious source, central line in place (no erythema)</li>
            <li>Labs: WBC 0.8 k/μL, ANC 100, normal chemistry</li>
            <li>Chest X-ray: Clear</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">⚡ URGENT DECISION REQUIRED</h5>
          <p class="mb-2">What is your immediate antibiotic choice?</p>
          <div class="space-y-2">
            <button class="block w-full text-left p-2 border rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm">
              A) Cefepime 2g IV q8h
            </button>
            <button class="block w-full text-left p-2 border rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm">
              B) Piperacillin-tazobactam 4.5g IV q6h + Vancomycin
            </button>
            <button class="block w-full text-left p-2 border rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm">
              C) Meropenem 1g IV q8h + Vancomycin
            </button>
            <button class="block w-full text-left p-2 border rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm">
              D) Levofloxacin 750mg IV daily
            </button>
          </div>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Expert Analysis</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2"><strong>Correct Answer: A) Cefepime 2g IV q8h</strong></p>
              <p class="mb-2"><strong>Expert Rationale:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>High-risk febrile neutropenia requires immediate broad-spectrum coverage</li>
                <li>Cefepime provides excellent gram-negative coverage including Pseudomonas</li>
                <li>No clinical signs of gram-positive infection - vancomycin not immediately needed</li>
                <li>Single agent preferred unless patient unstable or high MRSA risk</li>
                <li>Can add vancomycin if condition deteriorates or positive cultures</li>
              </ul>
              <p class="mt-2 text-sm text-green-600 dark:text-green-400">
                <strong>Time goal:</strong> Antibiotics within 1 hour of fever onset in neutropenic patients
              </p>
            </div>
          </details>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Scenario 2: Pediatric Meningitis</h4>
      
      <div class="mb-6 p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/10">
        <h5 class="font-medium mb-2 text-orange-700 dark:text-orange-300">⏱️ CRITICAL TIME: 30 minutes to antibiotics</h5>
        <p class="mb-4">
          18-month-old brought by parents for fever, vomiting, and lethargy × 6 hours. 
          Physical exam reveals neck stiffness and bulging fontanelle.
        </p>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Clinical Presentation</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Age: 18 months, Weight: 12 kg</li>
            <li>Vital signs: T 102.8°F, HR 140, RR 28, BP 95/60</li>
            <li>Neuro: Lethargic, neck stiffness, bulging fontanelle</li>
            <li>Lumbar puncture planned but delayed due to concern for increased ICP</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">🚨 CANNOT DELAY FOR LP</h5>
          <p class="mb-2">What empiric antibiotic regimen do you start immediately?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">View Pediatric Protocol</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2"><strong>Recommended:</strong> Ceftriaxone 100mg/kg/day IV q12h + Vancomycin 15mg/kg IV q6h</p>
              <p class="mb-2"><strong>Dosing calculation for 12kg child:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Ceftriaxone: 1200mg (100mg/kg) IV q12h = 600mg per dose</li>
                <li>Vancomycin: 180mg (15mg/kg) IV q6h = 45mg per dose</li>
                <li>Consider dexamethasone 0.15mg/kg IV q6h × 4 days</li>
              </ul>
              <p class="mb-2"><strong>Rationale:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>Age 1-23 months: risk for S. pneumoniae, N. meningitidis, Group B Strep</li>
                <li>Ceftriaxone: excellent CNS penetration, covers most likely pathogens</li>
                <li>Vancomycin: coverage for resistant pneumococci</li>
                <li>LP can be done after antibiotics without compromising diagnosis</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Performance Tracking</h4>
      
      <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">📊 Your Emergency Response Metrics</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p class="font-medium">Decision Time</p>
            <p>Average: 8.5 minutes</p>
            <p class="text-xs text-gray-500">Target: <10 minutes</p>
          </div>
          <div>
            <p class="font-medium">Accuracy Rate</p>
            <p>85% (17/20 cases)</p>
            <p class="text-xs text-gray-500">Target: >80%</p>
          </div>
          <div>
            <p class="font-medium">Critical Cases</p>
            <p>95% appropriate escalation</p>
            <p class="text-xs text-gray-500">Target: >90%</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'antibiotic-stewardship-rounds',
    title: 'Virtual Antibiotic Stewardship Rounds',
    description: 'Participate in simulated stewardship interventions and recommendations',
    icon: Users2,
    category: 'interactive',
    readTime: '40 min',
    lastUpdated: 'March 31, 2025',
    author: 'ASP Simulation Team',
    authorCredentials: 'Antimicrobial Stewardship Specialists',
    content: `
      <h3>Virtual Antibiotic Stewardship Rounds</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 31, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Stewardship Simulation</h4>
        <p>
          Experience real hospital rounds with the antimicrobial stewardship team. Review actual cases,
          make intervention recommendations, and learn from expert pharmacist and physician feedback.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Case Review Session - ICU Patient</h4>
      
      <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h5 class="font-medium mb-2">📋 Patient Summary</h5>
        <p class="mb-4">
          <strong>Mr. Johnson, 65yo</strong> - ICU Day 8, admitted with pneumonia, now on multiple antibiotics.
          Infectious disease team requested ASP consultation for optimization.
        </p>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Current Antibiotic Regimen (Day 8)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Vancomycin 1250mg IV q12h (started Day 1)</li>
            <li>Piperacillin-tazobactam 4.5g IV q8h (started Day 1)</li>
            <li>Azithromycin 500mg IV daily (started Day 1, completed 5 days)</li>
            <li>Fluconazole 400mg IV daily (started Day 5)</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Microbiology Results</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li><strong>Blood cultures (Day 1):</strong> No growth × 2 sets</li>
            <li><strong>Sputum culture (Day 2):</strong> S. pneumoniae susceptible to penicillin</li>
            <li><strong>Urine culture (Day 1):</strong> No growth</li>
            <li><strong>C. difficile (Day 6):</strong> Negative</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h5 class="font-medium mb-2">Clinical Status</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Afebrile × 48 hours, stable vitals</li>
            <li>Chest X-ray improving</li>
            <li>WBC trending down (18.5 → 9.2 k/μL)</li>
            <li>Planning extubation tomorrow</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          <h5 class="font-medium mb-2">🔍 ASP Team Discussion</h5>
          <p class="mb-2">What stewardship interventions would you recommend?</p>
          <details class="mt-3">
            <summary class="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">Join the Discussion</summary>
            <div class="mt-2 pl-4">
              <p class="mb-2"><strong>ASP Pharmacist (Dr. Sarah Kim):</strong></p>
              <p class="mb-2 text-sm italic">
                "This patient has penicillin-susceptible S. pneumoniae with good clinical response. 
                I'm concerned about the broad-spectrum therapy duration. What are your thoughts on de-escalation?"
              </p>
              
              <p class="mb-2"><strong>Your Recommendations:</strong></p>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li><strong>De-escalate antibiotics:</strong> Switch to penicillin G 2-3 million units IV q4h</li>
                <li><strong>Discontinue vancomycin:</strong> No MRSA coverage needed</li>
                <li><strong>Discontinue fluconazole:</strong> No evidence of invasive candidiasis</li>
                <li><strong>Plan duration:</strong> Complete 7-10 days total for CAP</li>
              </ul>
              
              <p class="mb-2"><strong>ID Physician (Dr. Martinez):</strong></p>
              <p class="text-sm italic">
                "Excellent recommendations. The narrow-spectrum approach is ideal here. 
                Let's also plan oral step-down to amoxicillin when extubated."
              </p>
            </div>
          </details>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Intervention Documentation</h4>
      
      <div class="mb-6 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/10">
        <h5 class="font-medium mb-2">📝 ASP Intervention Note</h5>
        <div class="text-sm space-y-2">
          <p><strong>Date:</strong> Hospital Day 8</p>
          <p><strong>Consulted by:</strong> ID Service</p>
          <p><strong>Indication:</strong> Antibiotic optimization</p>
          
          <div class="mt-3">
            <p class="font-medium">Recommendations:</p>
            <ol class="list-decimal pl-5 space-y-1">
              <li>De-escalate to penicillin G 3 MU IV q4h based on susceptible S. pneumoniae</li>
              <li>Discontinue vancomycin - no gram-positive indication</li>
              <li>Discontinue fluconazole - no evidence of invasive candidiasis</li>
              <li>Plan 7-day total course for CAP</li>
              <li>Consider oral step-down to amoxicillin 1g TID when appropriate</li>
            </ol>
          </div>
          
          <div class="mt-3">
            <p class="font-medium">Expected Outcomes:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Reduced spectrum of therapy</li>
              <li>Cost savings: ~$450/day</li>
              <li>Decreased selection pressure for resistance</li>
              <li>Reduced risk of C. difficile infection</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }
];
