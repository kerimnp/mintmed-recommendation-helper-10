import React, { useState, useRef } from "react";
import { Card } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { generateAntibioticRecommendation } from "@/utils/antibioticRecommendations";
import { getAIRecommendation } from "@/utils/aiRecommendations";
import { AntibioticRecommendation } from "./AntibioticRecommendation";
import { AIRecommendationSection } from "./AIRecommendationSection";
import { AllergySection } from "./AllergySection";
import { RenalFunctionSection } from "./RenalFunctionSection";
import { PatientDemographicsSection } from "./PatientDemographicsSection";
import { ComorbiditySection } from "./ComorbiditySection";
import { InfectionDetailsSection } from "./InfectionDetailsSection";
import { LabResultsSection } from "./LabResultsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";
import { FormHeader } from "./PatientFormSections/FormHeader";
import { SectionHeader } from "./PatientFormSections/SectionHeader";
import { FormActions } from "./PatientFormSections/FormActions";

export const PatientForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [recommendation, setRecommendation] = useState<EnhancedAntibioticRecommendation | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<EnhancedAntibioticRecommendation | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  const sectionRefs = {
    demographics: useRef<HTMLDivElement>(null),
    infection: useRef<HTMLDivElement>(null),
  };
  
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    nationality: "",
    pregnancy: "",
    infectionSites: [] as string[],
    symptoms: "",
    duration: "",
    severity: "",
    creatinine: "",
    recentAntibiotics: false,
    isHospitalAcquired: false,
    allergies: {
      penicillin: false,
      cephalosporin: false,
      sulfa: false,
      macrolide: false,
      fluoroquinolone: false
    },
    kidneyDisease: false,
    liverDisease: false,
    diabetes: false,
    immunosuppressed: false,
    resistances: {
      mrsa: false,
      vre: false,
      esbl: false,
      cre: false,
      pseudomonas: false
    },
    labResults: null
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Only validate the truly required fields
    if (!formData.infectionSites || formData.infectionSites.length === 0) {
      newErrors.infectionSites = t.errors?.requiredField || "Infection site is required";
    }
    
    if (!formData.severity) {
      newErrors.severity = t.errors?.requiredField || "Severity is required";
    }

    // Only validate other fields if they're provided but invalid
    if (formData.age && (Number(formData.age) < 0 || Number(formData.age) > 120)) {
      newErrors.age = t.errors?.invalidAge || "Please enter a valid age";
    }

    if (formData.weight && (Number(formData.weight) <= 0 || Number(formData.weight) > 500)) {
      newErrors.weight = t.errors?.invalidWeight || "Please enter a valid weight";
    }

    if (formData.height && (Number(formData.height) <= 0 || Number(formData.height) > 300)) {
      newErrors.height = t.errors?.invalidHeight || "Please enter a valid height";
    }

    setErrors(newErrors);
    setShowErrors(true);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      let sectionToScroll: keyof typeof sectionRefs;

      if (['age', 'gender', 'weight', 'height'].includes(firstErrorField)) {
        sectionToScroll = 'demographics';
      } else {
        sectionToScroll = 'infection';
      }

      sectionRefs[sectionToScroll]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: language === "en" ? "Validation Error" : "Greška Validacije",
        description: language === "en" 
          ? "Please fill in all required fields (Infection Details)"
          : "Molimo popunite sva obavezna polja (Detalji infekcije)",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const recommendation = generateAntibioticRecommendation(formData);
      setRecommendation(recommendation);
      
      toast({
        title: language === "en" ? "Recommendation Generated" : "Preporuka Generisana",
        description: language === "en"
          ? "Antibiotic recommendation has been generated based on patient data"
          : "Preporuka antibiotika je generisana na osnovu podataka o pacijentu",
      });
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Greška",
        description: language === "en"
          ? "An error occurred while generating the recommendation. Please try again."
          : "Došlo je do greške prilikom generisanja preporuke. Molimo pokušajte ponovo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetAIRecommendation = async () => {
    if (!validateForm()) {
      toast({
        title: language === "en" ? "Validation Error" : "Greška Validacije",
        description: language === "en" 
          ? "Please fill in all required fields before getting AI recommendation"
          : "Molimo popunite sva obavezna polja prije dobivanja AI preporuke",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingAI(true);
    setAiRecommendation(null); // Clear previous recommendation
    try {
      console.log("Getting AI recommendation with data:", formData);
      const aiResponse = await getAIRecommendation(formData);
      console.log("AI recommendation response:", aiResponse);

      if (aiResponse && aiResponse.primaryRecommendation && aiResponse.primaryRecommendation.name && aiResponse.primaryRecommendation.name.trim() !== "") {
        setAiRecommendation(aiResponse);
        toast({
          title: "AI Recommendation Ready",
          description: "The AI has analyzed the patient data and provided recommendations.",
        });
      } else {
        // This case handles when aiResponse is technically not an error, but lacks meaningful content.
        setAiRecommendation(null); 
        toast({
          title: "AI Analysis Incomplete",
          description: "The AI analysis was generated but appears to be missing key details. Please check your input data or try again. If the problem persists, ensure the AI service is properly configured.",
          variant: "default", 
        });
      }
    } catch (error) {
      console.error('AI Recommendation error:', error);
      setAiRecommendation(null);
      toast({
        title: "Error Getting AI Recommendation",
        description: error instanceof Error ? error.message : "Failed to get AI recommendation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleLabResultsChange = (results: any) => {
    handleInputChange("labResults", results);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <FormHeader errors={errors} showErrors={showErrors} />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6 space-y-8">
          <div ref={sectionRefs.demographics}>
            <SectionHeader number={1} title={t.title} subtitle={t.subtitle} />
            <PatientDemographicsSection 
              formData={formData} 
              onInputChange={handleInputChange}
              errors={showErrors ? errors : {}}
            />
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <div>
            <SectionHeader number={2} title={t.allergies.title} subtitle={t.allergies.subtitle} />
            <AllergySection 
              allergies={formData.allergies} 
              onAllergyChange={(allergy, checked) => {
                handleInputChange("allergies", {
                  ...formData.allergies,
                  [allergy]: checked
                });
              }}
            />
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <div>
            <SectionHeader number={3} title={t.renalFunction.title} subtitle={t.renalFunction.subtitle} />
            <RenalFunctionSection 
              creatinine={formData.creatinine} 
              onCreatinineChange={(value) => handleInputChange("creatinine", value)}
              age={formData.age}
              weight={formData.weight}
              gender={formData.gender}
              height={formData.height}
            />
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <div>
            <SectionHeader number={4} title={t.comorbidities.title} subtitle={t.comorbidities.subtitle} />
            <ComorbiditySection 
              formData={formData} 
              onInputChange={handleInputChange}
            />
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <div ref={sectionRefs.infection}>
            <SectionHeader number={5} title={t.infectionDetails.title} subtitle={t.infectionDetails.subtitle} />
            <InfectionDetailsSection 
              formData={formData} 
              onInputChange={handleInputChange}
              errors={showErrors ? errors : {}}
            />
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <div>
            <SectionHeader 
              number={6}
              title={language === "en" ? "Laboratory Results" : "Laboratorijski Rezultati"}
              subtitle={language === "en" ? "Enter available lab results if applicable (optional)" : "Unesite dostupne laboratorijske rezultate ako su dostupni (opcionalno)"}
            />
            <LabResultsSection 
              onLabResultsChange={handleLabResultsChange}
            />
          </div>

          <AIRecommendationSection
            isLoading={isLoadingAI}
            recommendation={aiRecommendation}
            onGetRecommendation={handleGetAIRecommendation}
          />

          <FormActions isSubmitting={isSubmitting} />
        </Card>
      </form>

      {recommendation && (
        <AntibioticRecommendation recommendation={recommendation} />
      )}
    </div>
  );
};
