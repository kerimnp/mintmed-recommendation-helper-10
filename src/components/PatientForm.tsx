import React, { useState, useEffect } from "react";
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
import { Calculator, Info, Printer, Activity, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { calculateBMI } from "@/utils/antibioticRecommendations/bmiCalculations";
import { PatientAnalysis } from "./PatientAnalysis";
import { Alert, AlertDescription } from "./ui/alert";

export const PatientForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [recommendation, setRecommendation] = useState<any>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    nationality: "",
    pregnancy: "",
    infectionSites: [],
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

  useEffect(() => {
    if (formData.weight && formData.height) {
      const calculatedBMI = calculateBMI(formData.weight, formData.height);
      setBmi(calculatedBMI);
    }
  }, [formData.weight, formData.height]);

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

    if (!formData.nationality) {
      newErrors.nationality = t.errors?.requiredField || "Nationality is required";
    }

    if (formData.infectionSites.length === 0) {
      newErrors.infectionSites = t.errors?.requiredField || "At least one infection site is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === "gender" && value === "male") {
        newData.pregnancy = "not_applicable";
      }
      return newData;
    });
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePrint = () => {
    if (recommendation) {
      window.print();
    } else {
      toast({
        title: language === "en" ? "No Recommendation" : "Nema Preporuke",
        description: language === "en" 
          ? "Please generate a recommendation first"
          : "Molimo prvo generišite preporuku",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: language === "en" ? "Validation Error" : "Greška Validacije",
        description: language === "en" 
          ? "Please check all required fields and correct any errors"
          : "Molimo provjerite sva obavezna polja i ispravite greške",
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

  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6 space-y-8">
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive" className="mb-6">
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
            {renderSectionHeader(1, 
              language === "en" ? "Patient Demographics" : "Demografski Podaci",
              language === "en" ? "Basic patient information" : "Osnovni podaci o pacijentu"
            )}
            <PatientDemographicsSection 
              formData={formData} 
              onInputChange={handleInputChange}
              errors={errors}
            />
            
            {bmi && (
              <div className="mt-4 p-3 bg-medical-primary/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-medical-primary" />
                  <span className="font-medium text-medical-primary">
                    BMI: {bmi.toFixed(1)} kg/m²
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(2,
            language === "en" ? "Allergies" : "Alergije",
            language === "en" ? "Known drug allergies" : "Poznate alergije na lijekove"
          )}
          <AllergySection 
            allergies={formData.allergies} 
            onAllergyChange={(allergy, checked) => handleInputChange(`allergies.${allergy}`, checked)} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(3,
            language === "en" ? "Renal Function" : "Bubrežna Funkcija",
            language === "en" ? "Creatinine levels" : "Nivoi kreatinina"
          )}
          <RenalFunctionSection 
            creatinine={formData.creatinine} 
            onCreatinineChange={(value) => handleInputChange("creatinine", value)} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(4,
            language === "en" ? "Comorbidities" : "Komorbiditeti",
            language === "en" ? "Existing conditions" : "Postojeća stanja"
          )}
          <ComorbiditySection formData={formData} onInputChange={handleInputChange} />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(5,
            language === "en" ? "Infection Details" : "Detalji Infekcije",
            language === "en" ? "Infection characteristics" : "Karakteristike infekcije"
          )}
          <InfectionDetailsSection formData={formData} onInputChange={handleInputChange} />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(6,
            language === "en" ? "Medication History" : "Istorija Lijekova",
            language === "en" ? "Previous treatments" : "Prethodna liječenja"
          )}
          <MedicationHistorySection formData={formData} onInputChange={handleInputChange} />

          <div className="flex gap-4">
            <Button 
              type="submit"
              className="premium-button flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <Calculator className="h-4 w-4" />
              {isSubmitting 
                ? (language === "en" ? "Generating..." : "Generisanje...") 
                : (language === "en" ? "Generate Recommendation" : "Generiši Preporuku")
              }
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              <Activity className="h-4 w-4" />
              {language === "en" ? "Toggle Analysis" : "Prikaži Analizu"}
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 p-0"
                    onClick={handlePrint}
                    disabled={!recommendation}
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {language === "en" ? "Print Recommendation" : "Štampaj Preporuku"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </form>

      {showAnalysis && (
        <PatientAnalysis
          infectionSites={formData.infectionSites}
          severity={formData.severity}
          symptoms={formData.symptoms}
        />
      )}

      {recommendation && (
        <AntibioticRecommendation recommendation={recommendation} />
      )}
    </div>
  );
};