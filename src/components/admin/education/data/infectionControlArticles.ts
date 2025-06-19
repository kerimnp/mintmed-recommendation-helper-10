
import { Article } from "../types/articleTypes";
import { Shield, Users, Droplets, Wind, Eye, Hand } from "lucide-react";

export const infectionControlArticles: Article[] = [
  {
    id: 'hand-hygiene-principles',
    title: 'Hand Hygiene in Healthcare Settings',
    description: 'Evidence-based hand hygiene practices for infection prevention',
    icon: Hand,
    category: 'infection-control',
    readTime: '12 min',
    lastUpdated: 'April 9, 2025',
    author: 'Dr. Michelle Chang, RN, CIC',
    authorCredentials: 'Infection Prevention Specialist',
    content: `
      <h3>Hand Hygiene in Healthcare Settings</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 9, 2025</p>
      
      <div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Impact on Patient Safety</h4>
        <p>
          Proper hand hygiene is the single most effective intervention for preventing
          healthcare-associated infections, reducing transmission rates by up to 40%.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">WHO 5 Moments for Hand Hygiene</h4>
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Before Patient Contact</h5>
          <p class="text-sm">
            Clean hands before touching a patient when approaching him/her.
          </p>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Before Aseptic Task</h5>
          <p class="text-sm">
            Clean hands immediately before performing an aseptic task.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'isolation-precautions',
    title: 'Transmission-Based Precautions',
    description: 'Standard and transmission-based isolation protocols',
    icon: Shield,
    category: 'infection-control',
    readTime: '15 min',
    lastUpdated: 'April 9, 2025',
    author: 'Dr. Robert Kim, MD',
    authorCredentials: 'Hospital Epidemiologist',
    content: `
      <h3>Transmission-Based Precautions</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 9, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">CDC Guidelines</h4>
        <p>
          Transmission-based precautions are designed to interrupt transmission of pathogens
          in healthcare settings and are used in addition to standard precautions.
        </p>
      </div>
    `
  },
  {
    id: 'ppe-guidelines',
    title: 'Personal Protective Equipment (PPE) Guidelines',
    description: 'Proper selection, use, and disposal of PPE',
    icon: Eye,
    category: 'infection-control',
    readTime: '13 min',
    lastUpdated: 'April 9, 2025',
    author: 'Dr. Amanda Foster, RN, MSN',
    authorCredentials: 'Infection Control Nurse',
    content: `
      <h3>Personal Protective Equipment (PPE) Guidelines</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: April 9, 2025</p>
      
      <div class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h4 class="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Key Principle</h4>
        <p>
          PPE effectiveness depends on proper selection, correct use, appropriate removal,
          and safe disposal to prevent self-contamination.
        </p>
      </div>
    `
  }
];
