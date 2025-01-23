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
import { Card } from "./ui/card";
import { Calculator } from "lucide-react";

export const PatientForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [recommendation, setRecommendation] = useState<any>(null);
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    nationality: "Serbia",
    pregnancy: "not_applicable",
    infectionSites: [],
    symptoms: "",
    duration: "",
    severity: "mild",
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === "gender" && value === "male") {
        newData.pregnancy = "not-applicable";
      }
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.gender || !formData.weight || !formData.height || !formData.nationality || formData.infectionSites.length === 0) {
      toast({
        title: language === "en" ? "Missing Information" : "Nedostaju Informacije",
        description: language === "en" 
          ? "Please fill in all required fields including age, gender, weight, height, nationality, and at least one infection site."
          : "Molimo popunite sva obavezna polja uključujući dob, spol, težinu, visinu, nacionalnost i najmanje jedno mjesto infekcije.",
        variant: "destructive"
      });
      return;
    }

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
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6 space-y-8">
          <PatientDemographicsSection formData={formData} onInputChange={handleInputChange} />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <AllergySection 
            allergies={formData.allergies} 
            onAllergyChange={(allergy, checked) => handleInputChange(`allergies.${allergy}`, checked)} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <RenalFunctionSection 
            creatinine={formData.creatinine} 
            onCreatinineChange={(value) => handleInputChange("creatinine", value)} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <ComorbiditySection formData={formData} onInputChange={handleInputChange} />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <InfectionDetailsSection formData={formData} onInputChange={handleInputChange} />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <MedicationHistorySection formData={formData} onInputChange={handleInputChange} />

          <Button 
            type="submit"
            className="premium-button flex items-center gap-2 mt-6"
          >
            <Calculator className="h-4 w-4" />
            {language === "en" ? "Generate Recommendation" : "Generiši Preporuku"}
          </Button>
        </Card>
      </form>

      {recommendation && (
        <AntibioticRecommendation recommendation={recommendation} />
      )}
    </div>
  );
};