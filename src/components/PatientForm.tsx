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
import { calculateBMI, getBMICategory } from "@/utils/antibioticRecommendations/bmiCalculations";
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
  const [showAnalysis, setShowAnalysis] = useState(false);
  
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return "text-blue-500";
    if (bmi < 25) return "text-green-500";
    if (bmi < 30) return "text-yellow-500";
    if (bmi < 35) return "text-orange-500";
    if (bmi < 40) return "text-red-500";
    return "text-red-700";
  };

  const renderBMIDisplay = () => {
    if (!bmi) return null;
    
    const category = getBMICategory(bmi);
    const color = getBMIColor(bmi);
    
    return (
      <Card className="p-4 mt-4 bg-white/90 dark:bg-gray-900/90">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">BMI</span>
            <p className={`text-2xl font-bold ${color}`}>{bmi.toFixed(1)}</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
            <p className={`font-medium ${color}`}>
              {t.bmi.categories[category as keyof typeof t.bmi.categories]}
            </p>
          </div>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-500`}
            style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
          />
        </div>
      </Card>
    );
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Only validate essential fields
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
            {renderBMIDisplay()}
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(2, t.allergies.title, t.allergies.subtitle)}
          <AllergySection 
            allergies={formData.allergies} 
            onAllergyChange={handleAllergyChange}
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(3, t.renalFunction.title, t.renalFunction.subtitle)}
          <RenalFunctionSection 
            creatinine={formData.creatinine} 
            onCreatinineChange={(value) => handleInputChange("creatinine", value)} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(4, t.comorbidities.title, t.comorbidities.subtitle)}
          <ComorbiditySection formData={formData} onInputChange={handleInputChange} />
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          {renderSectionHeader(5, t.infectionDetails.title, t.infectionDetails.subtitle)}
          <InfectionDetailsSection formData={formData} onInputChange={handleInputChange} />

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
          bmi={bmi || undefined}
        />
      )}

      {recommendation && (
        <AntibioticRecommendation recommendation={recommendation} />
      )}
    </div>
  );
};
