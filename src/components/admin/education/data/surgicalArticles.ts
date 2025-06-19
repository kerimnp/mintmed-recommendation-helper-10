
import { Article } from "../types/articleTypes";
import { Scissors, Shield, Activity, Clock, Target, Users } from "lucide-react";

export const surgicalArticles: Article[] = [
  {
    id: 'surgical-prophylaxis',
    title: 'Surgical Antibiotic Prophylaxis Guidelines',
    description: 'Evidence-based perioperative antimicrobial prophylaxis',
    icon: Scissors,
    category: 'surgical',
    readTime: '19 min',
    lastUpdated: 'April 13, 2025',
    author: 'Dr. David Martinez, MD',
    authorCredentials: 'Surgical Infectious Disease Specialist',
    content: `
      <h3>Surgical Antibiotic Prophylaxis Guidelines</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 13, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Primary Goal</h4>
        <p>
          Surgical antibiotic prophylaxis aims to prevent surgical site infections (SSI)
          by achieving therapeutic antibiotic concentrations in tissues at the time of incision.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Timing Principles</h4>
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Optimal Timing</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Administer within 60 minutes before incision</li>
            <li>Vancomycin: 120 minutes before incision</li>
            <li>Fluoroquinolones: 120 minutes before incision</li>
            <li>Re-dose if surgery exceeds 2 half-lives</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Duration</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Single dose for most procedures</li>
            <li>Discontinue within 24 hours</li>
            <li>Maximum 48 hours for cardiac surgery</li>
            <li>No benefit from prolonged courses</li>
          </ul>
        </div>
      </div>
    `
  }
];
