import React, { useState } from "react";
import { Button } from "./ui/button";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Card } from "./ui/card";
import { Calculator } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export const PatientForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [recommendation, setRecommendation] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
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
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.age) {
      newErrors.age = t.errors?.requiredField || "Age is required";
    } else if (Number(formData.age) < 0 || Number(formData.age) > 120) {
      newErrors.age = t.errors?.invalidAge || "Please enter a valid age";
    }

    if (!formData.gender) {
      newErrors.gender = t.errors?.requiredField || "Gender is required";
    }

    if (!formData.weight) {
      newErrors.weight = t.errors?.requiredField || "Weight is required";
    } else if (Number(formData.weight) <= 0 || Number(formData.weight) > 500) {
      newErrors.weight = t.errors?.invalidWeight || "Please enter a valid weight";
    }

    if (!formData.height) {
      newErrors.height = t.errors?.requiredField || "Height is required";
    } else if (Number(formData.height) <= 0 || Number(formData.height) > 300) {
      newErrors.height = t.errors?.invalidHeight || "Please enter a valid height";
    }

    if (!formData.severity) {
      newErrors.severity = t.errors?.requiredField || "Severity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: language === "en" ? "Validation Error" : "Greška Validacije",
        description: language === "en" 
          ? "Please fill in all required fields (Patient Demographics and Infection Details)"
          : "Molimo popunite sva obavezna polja (Demografski podaci i Detalji infekcije)",
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
    try {
      const aiResponse = await getAIRecommendation(formData);
      setAiRecommendation(aiResponse);
      toast({
        title: "AI Recommendation Ready",
        description: "The AI has analyzed the patient data and provided recommendations.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI recommendation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  const renderSectionHeader = (number: number, title: string, subtitle: string) => (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-medical-primary/10 text-medical-primary font-semibold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-medical-text">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-medical-text-secondary">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6 space-y-8">
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {language === "en" 
                  ? "Please correct the following errors:"
                  : "Molimo ispravite sljedeće greške:"}
                <ul className="list-disc list-inside mt-2">
                  {Object.values(errors).map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div>
            {renderSectionHeader(1, t.title, t.subtitle)}
            <PatientDemographicsSection 
              formData={formData} 
              onInputChange={handleInputChange}
              errors={errors}
            />
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(2, t.allergies.title, t.allergies.subtitle)}
          <AllergySection 
            allergies={formData.allergies} 
            onAllergyChange={(allergy, checked) => {
              handleInputChange("allergies", {
                ...formData.allergies,
                [allergy]: checked
              });
            }}
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(3, t.renalFunction.title, t.renalFunction.subtitle)}
          <RenalFunctionSection 
            creatinine={formData.creatinine} 
            onCreatinineChange={(value) => handleInputChange("creatinine", value)} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(4, t.comorbidities.title, t.comorbidities.subtitle)}
          <ComorbiditySection 
            formData={formData} 
            onInputChange={handleInputChange}
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(5, t.infectionDetails.title, t.infectionDetails.subtitle)}
          <InfectionDetailsSection 
            formData={formData} 
            onInputChange={handleInputChange}
          />

          <AIRecommendationSection
            isLoading={isLoadingAI}
            recommendation={aiRecommendation}
            onGetRecommendation={handleGetAIRecommendation}
          />

          <div className="flex gap-4">
            <Button 
              type="submit"
              className="premium-button flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <Calculator className="h-4 w-4" />
              {isSubmitting 
                ? (language === "en" ? "Generating..." : "Generisanje...") 
                : t.buttons.generate
              }
            </Button>
          </div>
        </Card>
      </form>

      {recommendation && (
        <AntibioticRecommendation recommendation={recommendation} />
      )}
    </div>
  );
};