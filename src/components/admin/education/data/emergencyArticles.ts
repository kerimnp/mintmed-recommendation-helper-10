
import { Article } from "../types/articleTypes";
import { Zap, AlertTriangle, Clock, Activity, Heart, Target } from "lucide-react";

export const emergencyArticles: Article[] = [
  {
    id: 'emergency-antibiotic-protocols',
    title: 'Emergency Department Antibiotic Protocols',
    description: 'Rapid decision-making for acute infections',
    icon: Zap,
    category: 'emergency',
    readTime: '16 min',
    lastUpdated: 'April 14, 2025',
    author: 'Dr. Jennifer Lopez, MD',
    authorCredentials: 'Emergency Medicine Physician',
    content: `
      <h3>Emergency Department Antibiotic Protocols</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 14, 2025</p>
      
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Time-Critical Decisions</h4>
        <p>
          Emergency department antibiotic selection requires rapid assessment and
          immediate initiation of appropriate therapy for life-threatening infections.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Sepsis Protocols</h4>
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Initial Assessment</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Recognize sepsis within 1 hour</li>
            <li>Obtain blood cultures before antibiotics</li>
            <li>Initiate broad-spectrum therapy</li>
            <li>Consider local resistance patterns</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Empiric Regimens</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Piperacillin-tazobactam + vancomycin</li>
            <li>Meropenem for severe illness</li>
            <li>Add antifungal if indicated</li>
            <li>Consider atypical coverage</li>
          </ul>
        </div>
      </div>
    `
  }
];
