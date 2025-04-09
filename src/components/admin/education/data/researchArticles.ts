
import { Article } from "../types/articleTypes";
import { Dna } from "lucide-react";

export const researchArticles: Article[] = [
  {
    id: 'genomic-resistance',
    title: 'Genomic Approaches to Resistance Detection',
    description: 'Next-generation sequencing technologies for antimicrobial resistance',
    icon: Dna,
    category: 'research',
    readTime: '18 min',
    lastUpdated: 'March 22, 2025',
    author: 'Dr. Priya Sharma, PhD',
    authorCredentials: 'Genomic Epidemiologist',
    content: `
      <h3>Genomic Approaches to Resistance Detection</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 22, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Technical Summary</h4>
        <p>
          Genomic approaches to antimicrobial resistance detection offer faster, more comprehensive identification 
          of resistance mechanisms compared to traditional phenotypic methods. These technologies have transformative 
          potential for clinical microbiology laboratories and infection control.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Next-Generation Sequencing Technologies</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Short-read Sequencing</h5>
          <p class="text-sm mb-2">
            Technologies like Illumina that produce short DNA fragments (100-300 bp)
          </p>
          <div>
            <p class="text-sm font-medium">Advantages:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>High accuracy (>99.9%)</li>
              <li>High throughput</li>
              <li>Established resistance databases</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Limitations:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Cannot resolve repetitive regions</li>
              <li>Challenges in assembly</li>
            </ul>
          </div>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Long-read Sequencing</h5>
          <p class="text-sm mb-2">
            Technologies like Oxford Nanopore or PacBio that produce long reads (>10kb)
          </p>
          <div>
            <p class="text-sm font-medium">Advantages:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Complete genome assembly</li>
              <li>Resolution of repetitive regions</li>
              <li>Mobile genetic element detection</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-sm font-medium">Limitations:</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Higher error rates</li>
              <li>Lower throughput</li>
              <li>More expensive per base</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }
];
