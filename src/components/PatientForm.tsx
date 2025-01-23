import React, { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { generateAntibioticRecommendation } from "@/utils/antibioticRecommendations";
import { AntibioticRecommendation } from "./AntibioticRecommendation";
import { AllergySection } from "./AllergySection";
import { RenalFunctionSection } from "./RenalFunctionSection";
import { PatientDemographicsSection } from "./PatientDemographicsSection";
import { ComorbiditySection } from "./ComorbiditySection";
import { InfectionDetailsSection } from "./InfectionDetailsSection";
import { MedicationHistorySection } from "./MedicationHistorySection";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import type { PatientData } from "@/utils/antibioticRecommendations/types";

export const PatientForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [formData, setFormData] = useState<PatientData>({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    pregnancy: "not_applicable",
    infectionSites: [],
    symptoms: "",
    duration: "",
    severity: "mild",
    creatinine: "",
    recentAntibiotics: false,
    allergies: {
      penicillin: false,
      cephalosporin: false,
      sulfa: false,
      macrolide: false,
      fluoroquinolone: false
    },
    otherAllergies: "",
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

  const [recommendation, setRecommendation] = useState<any>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (field === "gender" && value === "male") {
        newData.pregnancy = "not_applicable";
      }
      
      return newData;
    });
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      allergies: {
        ...prev.allergies,
        [allergy]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.gender || !formData.weight || !formData.height || formData.infectionSites.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including age, gender, weight, height, and at least one infection site.",
        variant: "destructive"
      });
      return;
    }

    try {
      const recommendation = generateAntibioticRecommendation(formData);
      setRecommendation(recommendation);
      
      toast({
        title: "Recommendation Generated",
        description: "Antibiotic recommendation has been generated based on patient data",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while generating the recommendation. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        <PatientDemographicsSection
          formData={formData}
          onInputChange={handleInputChange}
        />

        <AllergySection
          allergies={formData.allergies}
          onAllergyChange={handleAllergyChange}
        />

        <RenalFunctionSection
          creatinine={formData.creatinine}
          onCreatinineChange={(value) => handleInputChange("creatinine", value)}
        />

        <ComorbiditySection
          formData={formData}
          onInputChange={handleInputChange}
        />

        <InfectionDetailsSection
          formData={formData}
          onInputChange={handleInputChange}
        />

        <MedicationHistorySection
          formData={formData}
          onInputChange={handleInputChange}
        />

        <div className="sticky bottom-6 z-10 px-4">
          <button 
            type="submit"
            className="premium-button"
          >
            {t.buttons.generate}
          </button>
        </div>
      </form>

      {recommendation && (
        <AntibioticRecommendation recommendation={recommendation} />
      )}
    </div>
  );
};
