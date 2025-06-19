
import { Article } from "../types/articleTypes";
import { Baby, Heart, Brain, Shield, Activity, Users } from "lucide-react";

export const pediatricArticles: Article[] = [
  {
    id: 'pediatric-dosing-principles',
    title: 'Pediatric Antibiotic Dosing Principles',
    description: 'Age-appropriate dosing strategies for children',
    icon: Baby,
    category: 'pediatrics',
    readTime: '18 min',
    lastUpdated: 'April 11, 2025',
    author: 'Dr. Sarah Johnson, MD',
    authorCredentials: 'Pediatric Infectious Disease Specialist',
    content: `
      <h3>Pediatric Antibiotic Dosing Principles</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 11, 2025</p>
      
      <div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Developmental Considerations</h4>
        <p>
          Pediatric patients are not simply small adults. Physiological differences
          in absorption, distribution, metabolism, and elimination require specialized dosing approaches.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Age-Related Pharmacokinetic Changes</h4>
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Neonates (0-28 days)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Immature hepatic enzyme systems</li>
            <li>Reduced renal function</li>
            <li>Increased total body water</li>
            <li>Lower protein binding</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Infants (1-12 months)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Rapidly developing organ systems</li>
            <li>Higher metabolic rate per kg</li>
            <li>Variable absorption patterns</li>
            <li>Immature blood-brain barrier</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'neonatal-sepsis',
    title: 'Neonatal Sepsis Management',
    description: 'Early recognition and treatment of neonatal infections',
    icon: Heart,
    category: 'pediatrics',
    readTime: '16 min',
    lastUpdated: 'April 11, 2025',
    author: 'Dr. Michael Chen, MD',
    authorCredentials: 'Neonatologist',
    content: `
      <h3>Neonatal Sepsis Management</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 11, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Time-Critical Condition</h4>
        <p>
          Neonatal sepsis requires immediate recognition and treatment due to the
          rapid progression and high mortality rate in this vulnerable population.
        </p>
      </div>
    `
  }
];
