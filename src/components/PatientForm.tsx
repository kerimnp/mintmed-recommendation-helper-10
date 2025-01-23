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
import { Card } from "./ui/card";
import { 
  User, 
  AlertCircle, 
  Stethoscope,
  Heart, 
  Bug, 
  PillIcon, 
  Calculator,
  ChevronRight,
  ChevronLeft,
  KidneyIcon
} from "lucide-react";

export const PatientForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [formData, setFormData] = useState<PatientData>({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    nationality: "Serbia", // Added nationality field with default value
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (field === "gender" && value === "male") {
        newData.pregnancy = "not_applicable";
      }
      
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.gender || !formData.weight || !formData.height || !formData.nationality || formData.infectionSites.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including age, gender, weight, height, nationality, and at least one infection site.",
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

  const sections = [
    {
      title: "Patient Demographics",
      icon: <User className="h-5 w-5" />,
      component: <PatientDemographicsSection formData={formData} onInputChange={handleInputChange} />
    },
    {
      title: "Allergies",
      icon: <AlertCircle className="h-5 w-5" />,
      component: <AllergySection allergies={formData.allergies} onAllergyChange={(allergy, checked) => 
        handleInputChange(`allergies.${allergy}`, checked)} />
    },
    {
      title: "Renal Function",
      icon: <KidneyIcon className="h-5 w-5" />,
      component: <RenalFunctionSection creatinine={formData.creatinine} 
        onCreatinineChange={(value) => handleInputChange("creatinine", value)} />
    },
    {
      title: "Comorbidities",
      icon: <Heart className="h-5 w-5" />,
      component: <ComorbiditySection formData={formData} onInputChange={handleInputChange} />
    },
    {
      title: "Infection Details",
      icon: <Bug className="h-5 w-5" />,
      component: <InfectionDetailsSection formData={formData} onInputChange={handleInputChange} />
    },
    {
      title: "Medication History",
      icon: <PillIcon className="h-5 w-5" />,
      component: <MedicationHistorySection formData={formData} onInputChange={handleInputChange} />
    }
  ];

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(prev => prev + 1);
    }
  };

  const previousSection = () => {
    if (activeSection > 0) {
      setActiveSection(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {sections.map((section, index) => (
          <Button
            key={index}
            variant={activeSection === index ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setActiveSection(index)}
          >
            {section.icon}
            <span className="hidden sm:inline">{section.title}</span>
          </Button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6">
          <div className="space-y-6">
            {sections[activeSection].component}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={previousSection}
              disabled={activeSection === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {activeSection === sections.length - 1 ? (
              <Button 
                type="submit"
                className="premium-button flex items-center gap-2"
              >
                <Calculator className="h-4 w-4" />
                Generate Recommendation
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextSection}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      </form>

      {recommendation && (
        <AntibioticRecommendation recommendation={recommendation} />
      )}
    </div>
  );
};