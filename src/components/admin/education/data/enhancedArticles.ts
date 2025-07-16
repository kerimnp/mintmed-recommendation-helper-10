import { Article } from "../types/articleTypes";
import { Shield, Pill, Bug, Computer, AlertTriangle, MessageSquare, DollarSign } from "lucide-react";

export const enhancedArticles: Article[] = [
  {
    id: "antibiotic-stewardship-principles",
    title: "Antibiotic Stewardship: Core Principles and Implementation",
    description: "Comprehensive guide to implementing evidence-based antibiotic stewardship programs in hospital settings",
    icon: Shield,
    category: "guidelines",
    difficulty: "intermediate",
    readTime: "25 min",
    lastUpdated: "July 16, 2025",
    author: "Dr. Sarah Johnson, PharmD",
    authorCredentials: "PharmD, BCPS, Clinical Pharmacy Specialist",
    tags: ["stewardship", "implementation", "evidence-based", "hospital"],
    relatedTopics: ["antimicrobial resistance", "quality improvement", "infection control"],
    learningObjectives: [
      "Understand the core elements of effective antibiotic stewardship programs",
      "Learn implementation strategies for hospital-based ASPs",
      "Master measurement and outcome evaluation techniques",
      "Develop skills in overcoming common implementation barriers"
    ],
    keyTakeaways: [
      "Leadership commitment is essential for successful ASP implementation",
      "Dedicated pharmacist expertise drives clinical effectiveness",
      "Prospective audit with feedback remains the gold standard intervention",
      "Measurement of both process and outcome metrics is crucial"
    ],
    clinicalApplications: [
      "Reducing inappropriate antibiotic use by 20-30%",
      "Decreasing antimicrobial resistance rates",
      "Improving patient safety through reduced adverse effects",
      "Achieving significant cost savings while maintaining quality"
    ],
    references: [
      "CDC. Core Elements of Hospital Antibiotic Stewardship Programs. 2019.",
      "Barlam TF, et al. Implementing an Antibiotic Stewardship Program. Clin Microbiol Rev. 2016;29(4):699-747."
    ],
    content: `
      <div class="prose max-w-none">
        <h2 class="text-2xl font-bold mb-6 text-foreground">Antibiotic Stewardship: Core Principles and Implementation</h2>
        
        <div class="bg-primary/5 border-l-4 border-primary p-6 mb-8 rounded-r-lg">
          <h3 class="text-lg font-semibold mb-3 text-primary">Executive Summary</h3>
          <p class="text-muted-foreground leading-relaxed">
            Antibiotic stewardship programs (ASPs) are coordinated interventions designed to improve and measure the appropriate use of antibiotics by promoting the selection of the optimal antibiotic drug regimen, dose, duration of therapy, and route of administration. These programs are essential for combating antimicrobial resistance while optimizing patient outcomes.
          </p>
        </div>

        <h3 class="text-xl font-semibold mb-4 text-foreground">Core Elements of Effective Stewardship</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-card border rounded-lg p-6">
            <h4 class="font-semibold mb-3 text-card-foreground">Leadership Commitment</h4>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start"><span class="text-primary mr-2">•</span>Dedicated funding and resources allocation</li>
              <li class="flex items-start"><span class="text-primary mr-2">•</span>Clear accountability structures and reporting lines</li>
              <li class="flex items-start"><span class="text-primary mr-2">•</span>Integration into institutional quality metrics</li>
              <li class="flex items-start"><span class="text-primary mr-2">•</span>Regular reporting to governing bodies and committees</li>
            </ul>
          </div>
          
          <div class="bg-card border rounded-lg p-6">
            <h4 class="font-semibold mb-3 text-card-foreground">Drug Expertise</h4>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start"><span class="text-primary mr-2">•</span>Dedicated pharmacist with ID training</li>
              <li class="flex items-start"><span class="text-primary mr-2">•</span>Antimicrobial resistance pattern analysis</li>
              <li class="flex items-start"><span class="text-primary mr-2">•</span>Clinical microbiology result interpretation</li>
              <li class="flex items-start"><span class="text-primary mr-2">•</span>Formulary management and optimization</li>
            </ul>
          </div>
        </div>

        <div class="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
          <h3 class="text-lg font-semibold mb-3 text-primary">Conclusion</h3>
          <p class="text-muted-foreground leading-relaxed">
            Successful antibiotic stewardship requires sustained commitment, adequate resources, and continuous improvement. Programs that integrate core elements while adapting to local contexts demonstrate the greatest success in optimizing antimicrobial use and improving patient outcomes.
          </p>
        </div>
      </div>
    `
  }
];