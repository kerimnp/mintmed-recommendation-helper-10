
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AntibioticAnalytics } from "@/components/admin/AntibioticAnalytics";
import { ResistancePatternMap } from "@/components/admin/ResistancePatternMap";
import { TreatmentEffectiveness } from "@/components/admin/TreatmentEffectiveness";
import { ClinicalGuidelines } from "@/components/admin/ClinicalGuidelines";
import { RegionalAdaptation } from "@/components/admin/RegionalAdaptation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useToast } from "@/components/ui/use-toast";
import { Shield, ScrollText, PieChart, Microscope, MapPin, BookOpen } from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("antibiotics");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-4 md:p-8 pt-24 lg:pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="antibiotics" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="antibiotics" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden md:inline">Antibiotics</span>
              </TabsTrigger>
              <TabsTrigger value="effectiveness" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span className="hidden md:inline">Effectiveness</span>
              </TabsTrigger>
              <TabsTrigger value="resistance" className="flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                <span className="hidden md:inline">Resistance</span>
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="flex items-center gap-2">
                <ScrollText className="h-4 w-4" />
                <span className="hidden md:inline">Guidelines</span>
              </TabsTrigger>
              <TabsTrigger value="regional" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden md:inline">Regional</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden md:inline">Education</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="antibiotics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Antibiotic Prescription Analytics</CardTitle>
                  <CardDescription>
                    View detailed analytics on antibiotic prescriptions, patient data, and product usage.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AntibioticAnalytics />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="effectiveness" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Effectiveness</CardTitle>
                  <CardDescription>
                    Analytics on treatment outcomes and comparative effectiveness.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TreatmentEffectiveness />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resistance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resistance Pattern Mapping</CardTitle>
                  <CardDescription>
                    Interactive visualization of antibiotic resistance patterns.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResistancePatternMap />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="guidelines" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Guidelines</CardTitle>
                  <CardDescription>
                    Reference guidelines and decision support tools.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClinicalGuidelines />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="regional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Adaptation</CardTitle>
                  <CardDescription>
                    Region-specific resistance patterns and guidelines.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RegionalAdaptation />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education" className="space-y-4">
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
