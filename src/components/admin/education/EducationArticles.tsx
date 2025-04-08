
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Download, Award, Microscope, Calculator, Book, Users, ChevronRight } from 'lucide-react';

// Educational article data
const articles = [
  {
    id: 'basics',
    title: 'Basic Principles of Antibiotic Therapy',
    description: 'Foundational knowledge for effective antimicrobial prescribing',
    icon: BookOpen,
    content: `
      <h3>Principles of Antibiotic Therapy</h3>
      <h4>1. Appropriate Antibiotic Selection</h4>
      <p>
        Choosing the right antibiotic involves considering multiple factors including the suspected pathogen, 
        site of infection, patient factors, and local resistance patterns. Empiric therapy should be guided by 
        the most likely causative organisms for the specific infection being treated.
      </p>
      
      <h4>2. Spectrum of Activity</h4>
      <p>
        Antibiotics can be classified as narrow-spectrum or broad-spectrum based on the range of bacteria they 
        target. Whenever possible, narrow-spectrum antibiotics should be preferred to minimize collateral damage 
        to the patient's microbiome and reduce selective pressure that promotes resistance.
      </p>
      
      <h4>3. Route of Administration</h4>
      <p>
        The selection between oral, intravenous, or other routes depends on:
      </p>
      <ul>
        <li>Severity of infection</li>
        <li>Bioavailability of the antibiotic</li>
        <li>Site of infection</li>
        <li>Patient's ability to take oral medications</li>
      </ul>
      
      <h4>4. Timing and Duration</h4>
      <p>
        Prompt initiation of antibiotics is critical for severe infections. The duration of therapy should be 
        tailored to the specific infection, with many conditions now requiring shorter courses than previously 
        recommended.
      </p>
    `
  },
  {
    id: 'resistance',
    title: 'Understanding Antimicrobial Resistance',
    description: 'Mechanisms and management of antibiotic resistance',
    icon: Microscope,
    content: `
      <h3>Mechanisms of Resistance</h3>
      <p>Bacteria develop resistance to antibiotics through several mechanisms:</p>
      
      <h4>Enzymatic Inactivation</h4>
      <p>
        Bacteria produce enzymes that destroy or modify the antibiotic. The classic example is 
        β-lactamases which hydrolyze the β-lactam ring of penicillins and cephalosporins.
      </p>
      
      <h4>Target Modification</h4>
      <p>
        Bacteria alter the binding site of the antibiotic. For example, changes in penicillin-binding 
        proteins (PBPs) leading to methicillin resistance in Staphylococcus aureus.
      </p>
      
      <h4>Decreased Permeability</h4>
      <p>
        Reduced expression of porins or changes in cell membrane structure prevent antibiotics from 
        entering the bacterial cell, common in Gram-negative bacteria.
      </p>
      
      <h4>Efflux Pumps</h4>
      <p>
        Active transport systems that expel antibiotics from the cell before they can reach their target. 
        These pumps can confer resistance to multiple drug classes simultaneously.
      </p>
      
      <h4>Major Resistant Pathogens</h4>
      <p>Key resistant pathogens of clinical concern include:</p>
      <ul>
        <li><strong>MRSA (Methicillin-resistant Staphylococcus aureus)</strong></li>
        <li><strong>VRE (Vancomycin-resistant Enterococci)</strong></li>
        <li><strong>ESBL-producing Enterobacteriaceae</strong></li>
        <li><strong>CRE (Carbapenem-resistant Enterobacteriaceae)</strong></li>
        <li><strong>MDR Pseudomonas aeruginosa</strong></li>
      </ul>
    `
  },
  {
    id: 'pediatric',
    title: 'Pediatric Antibiotic Dosing',
    description: 'Age-specific considerations for antimicrobial therapy in children',
    icon: Calculator,
    content: `
      <h3>Principles of Pediatric Dosing</h3>
      <p>
        Pediatric dosing requires special consideration due to developmental changes in absorption, 
        distribution, metabolism, and elimination. Key principles include:
      </p>
      
      <ul>
        <li><strong>Weight-based dosing</strong> - Most pediatric doses are calculated based on body weight (mg/kg)</li>
        <li><strong>Body surface area</strong> - For some drugs, dosing by BSA may be more appropriate</li>
        <li><strong>Age-specific physiology</strong> - Renal function, hepatic metabolism, and body composition change throughout development</li>
        <li><strong>Gestational age considerations</strong> - Premature neonates require additional dose adjustments</li>
        <li><strong>Maximum dose limits</strong> - Weight-based calculations should not exceed adult maximum doses</li>
      </ul>
      
      <h4>Developmental Pharmacokinetics</h4>
      <p>Drug handling varies across pediatric age groups:</p>
      
      <h5>Neonates (0-28 days)</h5>
      <ul>
        <li>Reduced gastric acid</li>
        <li>Higher body water percentage</li>
        <li>Immature blood-brain barrier</li>
        <li>Limited hepatic enzyme activity</li>
        <li>Reduced glomerular filtration</li>
      </ul>
      
      <h5>Infants (1-12 months)</h5>
      <ul>
        <li>Rapidly developing hepatic enzymes</li>
        <li>Increasing renal function</li>
        <li>High body water percentage</li>
        <li>Variable oral absorption</li>
      </ul>
    `
  },
  {
    id: 'pharmacology',
    title: 'Antibiotic Pharmacokinetics',
    description: 'Understanding how antibiotics move through the body',
    icon: Book,
    content: `
      <h3>Basic PK/PD Principles</h3>
      <p>
        Understanding pharmacokinetics (what the body does to the drug) and pharmacodynamics 
        (what the drug does to the body) is essential for optimizing antibiotic dosing.
      </p>
      
      <h4>Key Pharmacokinetic Parameters</h4>
      <ul>
        <li><strong>Absorption</strong> - How the drug enters the bloodstream</li>
        <li><strong>Distribution</strong> - How the drug moves throughout the body and into tissues</li>
        <li><strong>Metabolism</strong> - How the drug is transformed by the body</li>
        <li><strong>Elimination</strong> - How the drug is removed from the body</li>
        <li><strong>Half-life</strong> - Time required for the concentration to be reduced by 50%</li>
      </ul>
      
      <h4>Pharmacodynamic Properties</h4>
      <p>Antibiotics are classified based on their killing mechanism:</p>
      
      <h5>Concentration-Dependent Killing</h5>
      <p>
        Higher drug concentrations result in more rapid killing. Efficacy correlates with peak concentration.
      </p>
      <p>
        <strong>Examples:</strong> Aminoglycosides, Fluoroquinolones, Daptomycin
      </p>
      
      <h5>Time-Dependent Killing</h5>
      <p>
        Killing depends on time above the MIC. Efficacy correlates with duration of exposure.
      </p>
      <p>
        <strong>Examples:</strong> Beta-lactams, Macrolides, Linezolid
      </p>
    `
  }
];

export const EducationArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const handleSelectArticle = (id: string) => {
    setSelectedArticle(id === selectedArticle ? null : id);
  };

  const selectedArticleData = articles.find(article => article.id === selectedArticle);

  return (
    <div className="space-y-6">
      {selectedArticle === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <Card 
              key={article.id}
              className="overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelectArticle(article.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                    <article.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">{article.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedArticle(null)}
              className="px-2 flex items-center space-x-2"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span>Back to articles</span>
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Article
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                {selectedArticleData && <selectedArticleData.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                <div>
                  <CardTitle>{selectedArticleData?.title}</CardTitle>
                  <CardDescription>{selectedArticleData?.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticleData?.content || "" }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
