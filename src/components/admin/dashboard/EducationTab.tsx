
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const EducationTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Educational Resources</CardTitle>
        <CardDescription>
          Antibiotic stewardship and educational materials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <section>
            <h3 className="text-lg font-semibold mb-2">Antibiotic Stewardship</h3>
            <p className="text-muted-foreground mb-4">
              Resources on responsible antibiotic use and stewardship programs.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <a href="https://www.cdc.gov/antibiotic-use/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  CDC - Antibiotic Use and Stewardship
                </a>
              </li>
              <li>
                <a href="https://www.who.int/campaigns/world-antimicrobial-awareness-week" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  WHO - Antimicrobial Resistance
                </a>
              </li>
              <li>
                <a href="https://www.idsociety.org/practice-guideline/antimicrobial-stewardship/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  IDSA - Antimicrobial Stewardship Guidelines
                </a>
              </li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">Clinical Research</h3>
            <p className="text-muted-foreground mb-4">
              Latest research and clinical studies on antibiotic therapy.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <a href="https://pubmed.ncbi.nlm.nih.gov/?term=antibiotic+resistance" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  PubMed - Latest Antibiotic Resistance Research
                </a>
              </li>
              <li>
                <a href="https://www.cochranelibrary.com/cdsr/reviews/topics" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Cochrane Library - Systematic Reviews
                </a>
              </li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">Educational Modules</h3>
            <p className="text-muted-foreground mb-4">
              Training materials on proper antibiotic usage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 hover:bg-secondary/50 cursor-pointer">
                <h4 className="font-medium">Basic Principles of Antibiotics</h4>
                <p className="text-sm text-muted-foreground">Introduction to antibiotic classes and mechanisms</p>
              </Card>
              <Card className="p-4 hover:bg-secondary/50 cursor-pointer">
                <h4 className="font-medium">Antimicrobial Resistance</h4>
                <p className="text-sm text-muted-foreground">Understanding the development of resistance</p>
              </Card>
              <Card className="p-4 hover:bg-secondary/50 cursor-pointer">
                <h4 className="font-medium">Pediatric Dosing</h4>
                <p className="text-sm text-muted-foreground">Special considerations for pediatric patients</p>
              </Card>
              <Card className="p-4 hover:bg-secondary/50 cursor-pointer">
                <h4 className="font-medium">Antibiotic Pharmacokinetics</h4>
                <p className="text-sm text-muted-foreground">ADME principles for major antibiotic classes</p>
              </Card>
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};
