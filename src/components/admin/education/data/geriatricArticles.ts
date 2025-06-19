
import { Article } from "../types/articleTypes";
import { Users, Heart, Brain, Pill, Activity, Shield } from "lucide-react";

export const geriatricArticles: Article[] = [
  {
    id: 'geriatric-considerations',
    title: 'Antibiotic Use in Elderly Patients',
    description: 'Special considerations for geriatric antimicrobial therapy',
    icon: Users,
    category: 'geriatrics',
    readTime: '17 min',
    lastUpdated: 'April 12, 2025',
    author: 'Dr. Patricia Wilson, MD',
    authorCredentials: 'Geriatrician',
    content: `
      <h3>Antibiotic Use in Elderly Patients</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 12, 2025</p>
      
      <div class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 class="font-medium text-amber-700 dark:text-amber-300 mb-2">Age-Related Changes</h4>
        <p>
          Elderly patients experience physiological changes that affect drug disposition,
          increased susceptibility to adverse effects, and higher rates of drug interactions.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Pharmacokinetic Changes in Aging</h4>
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Absorption Changes</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Decreased gastric acid production</li>
            <li>Delayed gastric emptying</li>
            <li>Reduced intestinal blood flow</li>
            <li>Changes in gut microbiome</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Distribution Changes</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Decreased lean body mass</li>
            <li>Increased adipose tissue</li>
            <li>Reduced serum albumin</li>
            <li>Decreased total body water</li>
          </ul>
        </div>
      </div>
    `
  }
];
