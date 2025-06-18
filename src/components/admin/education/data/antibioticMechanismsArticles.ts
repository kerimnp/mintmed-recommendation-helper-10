
import { Article } from "../types/articleTypes";
import { Zap, Shield, Target, Dna2, Microscope, Activity } from "lucide-react";

export const antibioticMechanismsArticles: Article[] = [
  {
    id: 'beta-lactam-mechanisms',
    title: 'Beta-Lactam Antibiotics: Mechanisms of Action',
    description: 'Cell wall synthesis inhibition and resistance mechanisms',
    icon: Shield,
    category: 'fundamentals',
    readTime: '12 min',
    lastUpdated: 'March 28, 2025',
    author: 'Dr. Michael Torres, PharmD',
    authorCredentials: 'Clinical Pharmacologist',
    content: `
      <h3>Beta-Lactam Antibiotics: Mechanisms of Action</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 28, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Mechanism Overview</h4>
        <p>
          Beta-lactam antibiotics inhibit bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs),
          disrupting peptidoglycan cross-linking essential for bacterial structural integrity.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">1. Structure-Activity Relationships</h4>
      <p class="mb-4">
        The beta-lactam ring is the core pharmacophore responsible for antimicrobial activity. 
        Structural modifications around this ring determine spectrum, stability, and resistance profiles.
      </p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Penicillins</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Thiazolidine ring fused to beta-lactam</li>
            <li>Side chain modifications alter spectrum</li>
            <li>Natural penicillins: narrow spectrum</li>
            <li>Semi-synthetic: extended spectrum</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Cephalosporins</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Dihydrothiazine ring system</li>
            <li>Generation-based classification</li>
            <li>Improved beta-lactamase stability</li>
            <li>Broader spectrum of activity</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">2. Resistance Mechanisms</h4>
      <p class="mb-3">Bacterial resistance to beta-lactams occurs through several mechanisms:</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Beta-lactamase production:</strong> Enzymatic hydrolysis of the beta-lactam ring</li>
        <li><strong>PBP modifications:</strong> Altered target proteins with reduced affinity</li>
        <li><strong>Efflux pumps:</strong> Active removal of antibiotics from bacterial cells</li>
        <li><strong>Porin mutations:</strong> Reduced permeability in gram-negative bacteria</li>
      </ul>
    `
  },
  {
    id: 'protein-synthesis-inhibitors',
    title: 'Protein Synthesis Inhibitors',
    description: 'Ribosomal targeting antibiotics and their mechanisms',
    icon: Target,
    category: 'fundamentals',
    readTime: '14 min',
    lastUpdated: 'March 28, 2025',
    author: 'Dr. Lisa Chen, PhD',
    authorCredentials: 'Molecular Microbiologist',
    content: `
      <h3>Protein Synthesis Inhibitors</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 28, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Ribosomal Targeting</h4>
        <p>
          Protein synthesis inhibitors target bacterial ribosomes, disrupting translation and preventing 
          bacterial growth. Different classes target specific ribosomal subunits and steps in translation.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">30S Ribosomal Subunit Inhibitors</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Aminoglycosides</h5>
          <p class="text-sm mb-2">Bind to 16S rRNA in 30S subunit</p>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Causes misreading of mRNA</li>
            <li>Prevents initiation complex formation</li>
            <li>Bactericidal activity</li>
            <li>Concentration-dependent killing</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Tetracyclines</h5>
          <p class="text-sm mb-2">Block tRNA binding to A-site</p>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Prevents elongation of peptide chain</li>
            <li>Bacteriostatic activity</li>
            <li>Broad spectrum coverage</li>
            <li>Reversible binding</li>
          </ul>
        </div>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">50S Ribosomal Subunit Inhibitors</h4>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Macrolides</h5>
          <p class="text-sm mb-2">Bind to 23S rRNA near peptidyl transferase</p>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Blocks peptide elongation</li>
            <li>Bacteriostatic (usually)</li>
            <li>Good tissue penetration</li>
            <li>Anti-inflammatory effects</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Chloramphenicol</h5>
          <p class="text-sm mb-2">Inhibits peptidyl transferase activity</p>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Prevents peptide bond formation</li>
            <li>Bacteriostatic activity</li>
            <li>Excellent CNS penetration</li>
            <li>Bone marrow toxicity risk</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'dna-replication-inhibitors',
    title: 'DNA Replication and Repair Inhibitors',
    description: 'Fluoroquinolones and DNA gyrase targeting mechanisms',
    icon: Dna2,
    category: 'fundamentals',
    readTime: '11 min',
    lastUpdated: 'March 28, 2025',
    author: 'Dr. Robert Kim, MD, PhD',
    authorCredentials: 'Infectious Disease Specialist',
    content: `
      <h3>DNA Replication and Repair Inhibitors</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: March 28, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">DNA Targeting Mechanisms</h4>
        <p>
          These antibiotics interfere with bacterial DNA replication, repair, or transcription processes,
          leading to bacterial death through DNA damage accumulation and replication failure.
        </p>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Fluoroquinolone Mechanisms</h4>
      <p class="mb-4">
        Fluoroquinolones target bacterial topoisomerases, essential enzymes for DNA replication and transcription.
        They form stable complexes with DNA and topoisomerase, creating lethal DNA breaks.
      </p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">DNA Gyrase (Topoisomerase II)</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Primary target in gram-negative bacteria</li>
            <li>Introduces negative supercoils</li>
            <li>Essential for DNA replication</li>
            <li>Fluoroquinolone-gyrase-DNA complex formation</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Topoisomerase IV</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Primary target in gram-positive bacteria</li>
            <li>Separates daughter chromosomes</li>
            <li>Critical for cell division</li>
            <li>Drug-enzyme-DNA ternary complex</li>
          </ul>
        </div>
      </div>
    `
  }
];
