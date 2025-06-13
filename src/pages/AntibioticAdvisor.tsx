
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PatientForm } from "@/components/PatientForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { WizardSteps, WizardStepData } from "@/components/wizard/WizardSteps";
import { ContextualSidebar } from "@/components/wizard/ContextualSidebar";
import { PatientTemplates } from "@/components/wizard/PatientTemplates";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const AntibioticAdvisor = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState('templates');
  const [showTemplates, setShowTemplates] = useState(true);
  const [patientData, setPatientData] = useState({});
  const [calculations, setCalculations] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const wizardSteps: WizardStepData[] = [
    {
      id: 'demographics',
      title: language === "en" ? "Patient Demographics" : "Demografija Pacijenta",
      subtitle: language === "en" ? "Age, weight, height, gender" : "Dob, težina, visina, spol",
      icon: "👤",
      isCompleted: !!patientData.age && !!patientData.weight && !!patientData.height,
      hasError: !!formErrors.demographics,
      isActive: currentStep === 'demographics'
    },
    {
      id: 'infection',
      title: language === "en" ? "Infection Details" : "Detalji Infekcije",
      subtitle: language === "en" ? "Site, severity, symptoms" : "Mjesto, težina, simptomi",
      icon: "🦠",
      isCompleted: !!patientData.infectionSites?.length && !!patientData.severity,
      hasError: !!formErrors.infection,
      isActive: currentStep === 'infection'
    },
    {
      id: 'allergies',
      title: language === "en" ? "Allergies & Resistance" : "Alergije i Rezistencija",
      subtitle: language === "en" ? "Drug allergies, resistance patterns" : "Alergije na lijekove, obrasci rezistencije",
      icon: "⚠️",
      isCompleted: patientData.allergies !== undefined,
      hasError: !!formErrors.allergies,
      isActive: currentStep === 'allergies'
    },
    {
      id: 'comorbidities',
      title: language === "en" ? "Medical History" : "Medicinska Anamneza",
      subtitle: language === "en" ? "Comorbidities, medications" : "Komorbiditeti, lijekovi",
      icon: "📋",
      isCompleted: patientData.comorbidities !== undefined,
      hasError: !!formErrors.comorbidities,
      isActive: currentStep === 'comorbidities'
    },
    {
      id: 'review',
      title: language === "en" ? "Review & Generate" : "Pregled i Generiranje",
      subtitle: language === "en" ? "Final review and recommendation" : "Konačni pregled i preporuka",
      icon: "✅",
      isCompleted: false,
      hasError: false,
      isActive: currentStep === 'review'
    }
  ];

  // Calculate completion percentage
  useEffect(() => {
    const completedSteps = wizardSteps.filter(step => step.isCompleted).length;
    const totalSteps = wizardSteps.length - 1; // Exclude review step
    setCompletionPercentage((completedSteps / totalSteps) * 100);
  }, [patientData]);

  // Real-time calculations
  useEffect(() => {
    if (patientData.weight && patientData.height) {
      const weight = parseFloat(patientData.weight);
      const height = parseFloat(patientData.height);
      const bmi = weight / Math.pow(height / 100, 2);
      
      let newCalculations: any = { bmi: bmi.toFixed(1) };

      if (patientData.age && patientData.creatinine) {
        const age = parseInt(patientData.age);
        const creatinine = parseFloat(patientData.creatinine);
        const isFemale = patientData.gender === 'female';
        
        // Cockcroft-Gault equation
        let crCl = ((140 - age) * weight) / (72 * creatinine);
        if (isFemale) crCl *= 0.85;
        
        newCalculations.crCl = Math.round(crCl);
      }

      if (patientData.gender && height) {
        // Calculate adjusted body weight
        const heightInInches = height / 2.54;
        const baseWeight = patientData.gender === 'male' ? 50 : 45.5;
        const ibw = baseWeight + (2.3 * (heightInInches - 60));
        const adjWeight = ibw + (0.4 * (weight - ibw));
        
        newCalculations.adjustedWeight = Math.round(adjWeight);
      }

      setCalculations(newCalculations);
    }
  }, [patientData]);

  const handleTemplateSelect = (template: any) => {
    setPatientData(template.preset);
    setShowTemplates(false);
    setCurrentStep('demographics');
    
    toast({
      title: language === "en" ? "Template Applied" : "Predložak Primijenjen",
      description: language === "en" 
        ? `${template.name} template has been applied` 
        : `${template.name} predložak je primijenjen`,
    });
  };

  const handleSkipTemplates = () => {
    setShowTemplates(false);
    setCurrentStep('demographics');
  };

  const handleStepClick = (stepId: string) => {
    if (stepId === 'templates') {
      setShowTemplates(true);
      return;
    }
    setCurrentStep(stepId);
  };

  const handleNextStep = () => {
    const currentIndex = wizardSteps.findIndex(step => step.id === currentStep);
    if (currentIndex < wizardSteps.length - 1) {
      setCurrentStep(wizardSteps[currentIndex + 1].id);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = wizardSteps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(wizardSteps[currentIndex - 1].id);
    } else {
      setShowTemplates(true);
    }
  };

  const renderStepContent = () => {
    if (showTemplates) {
      return (
        <PatientTemplates
          onSelectTemplate={handleTemplateSelect}
          onSkip={handleSkipTemplates}
        />
      );
    }

    return (
      <div className="space-y-6">
        <PatientForm 
          initialData={patientData}
          onDataChange={setPatientData}
          currentStep={currentStep}
          onStepComplete={(step: string) => {
            // Handle step completion
            console.log(`Step ${step} completed`);
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-white dark:from-gray-900 dark:to-gray-950 overflow-auto">
      <Helmet>
        <title>Horalix - Smart Antibiotic Advisor</title>
        <meta name="description" content="AI-powered antibiotic recommendations with clinical decision support" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>

      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src={theme === 'dark' ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png" : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"} 
                  alt="Horalix Logo" 
                  className="h-8 w-auto" 
                />
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === "en" ? "Smart Antibiotic Advisor" : "Pametni Savjetnik za Antibiotike"}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "en" ? "AI-powered clinical decision support" : "Klinička podrška pokretana AI-jem"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!showTemplates && completionPercentage > 0 && (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm text-gray-600">{Math.round(completionPercentage)}%</span>
                  <Progress value={completionPercentage} className="w-20 h-2" />
                </div>
              )}
              
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>
                    {language === "en" ? "Back" : "Natrag"}
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={showTemplates ? 'templates' : currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                >
                  <div className="p-6 sm:p-8">
                    {renderStepContent()}
                  </div>

                  {/* Navigation Footer */}
                  {!showTemplates && (
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          onClick={handlePreviousStep}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          {language === "en" ? "Previous" : "Prethodno"}
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Save className="h-4 w-4" />
                            {language === "en" ? "Save Draft" : "Spremi Nacrt"}
                          </Button>

                          <Button
                            onClick={handleNextStep}
                            className="flex items-center gap-2 bg-medical-primary hover:bg-medical-primary/90"
                          >
                            {currentStep === 'review' ? (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                {language === "en" ? "Generate Recommendation" : "Generiraj Preporuku"}
                              </>
                            ) : (
                              <>
                                {language === "en" ? "Next" : "Sljedeće"}
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Step Navigation */}
                {!showTemplates && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                        {language === "en" ? "Assessment Steps" : "Koraci Procjene"}
                      </h3>
                      <WizardSteps
                        steps={wizardSteps}
                        onStepClick={handleStepClick}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Contextual Sidebar */}
                {!showTemplates && (
                  <ContextualSidebar
                    currentStep={currentStep}
                    patientData={patientData}
                    calculations={calculations}
                    recommendations={{}}
                    completionPercentage={completionPercentage}
                  />
                )}

                {/* Quick Actions */}
                {showTemplates && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                        {language === "en" ? "Why Use Templates?" : "Zašto Koristiti Predloške?"}
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {language === "en" ? "Save time with pre-filled data" : "Uštedite vrijeme s unaprijed ispunjenim podacima"}
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {language === "en" ? "Reduce input errors" : "Smanjite greške unosa"}
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {language === "en" ? "Learn from common scenarios" : "Učite iz čestih scenarija"}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AntibioticAdvisor;
