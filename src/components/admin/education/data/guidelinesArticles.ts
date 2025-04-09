
import { Article } from "../types/articleTypes";
import { LineChart } from "lucide-react";

export const guidelinesArticles: Article[] = [
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
    `
  }
];
