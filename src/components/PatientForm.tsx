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

export const PatientForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    pregnancy: "",
    infectionSite: "",
    symptoms: "",
    duration: "",
    severity: "",
    creatinine: "", // New field for renal function
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
    immunosuppressed: false
  });

  const [recommendation, setRecommendation] = useState<any>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    
    if (!formData.age || !formData.gender || !formData.weight || !formData.height) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const recommendation = generateAntibioticRecommendation(formData);
    setRecommendation(recommendation);
    
    toast({
      title: "Recommendation Generated",
      description: "Antibiotic recommendation has been generated based on patient data",
    });
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

        <div className="sticky bottom-6 z-10">
          <Button 
            type="submit"
            className="w-full bg-mint-300 hover:bg-mint-400 text-gray-900 font-medium transition-all duration-200 shadow-lg"
          >
            Generate Antibiotic Recommendation
          </Button>
        </div>
      </form>

      {recommendation && (
        <AntibioticRecommendation recommendation={recommendation} />
      )}
    </div>
  );
};