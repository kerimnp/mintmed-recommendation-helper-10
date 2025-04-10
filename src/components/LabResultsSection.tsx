
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Beaker, FlaskConical, Microscope } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LabResultsSectionProps {
  onLabResultsChange: (results: any) => void;
}

export const LabResultsSection: React.FC<LabResultsSectionProps> = ({ onLabResultsChange }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("bloodwork");
  const [labResults, setLabResults] = useState({
    bloodwork: {
      wbc: "",
      rbc: "",
      hemoglobin: "",
      hematocrit: "",
      platelets: ""
    },
    biochemistry: {
      glucose: "",
      urea: "",
      creatinine: "",
      sodium: "",
      potassium: ""
    },
    microbiology: {
      culture: "",
      gramStain: "",
      sensitivity: ""
    }
  });

  const handleResultChange = (category: string, field: string, value: string) => {
    const updatedResults = {
      ...labResults,
      [category]: {
        ...labResults[category as keyof typeof labResults],
        [field]: value
      }
    };
    
    setLabResults(updatedResults);
    onLabResultsChange(updatedResults);
  };

  const renderBloodworkInputs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="wbc" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "WBC (×10³/μL)" : "Leukociti (×10³/μL)"}
        </Label>
        <Input
          id="wbc"
          type="number"
          step="0.1"
          value={labResults.bloodwork.wbc}
          onChange={(e) => handleResultChange("bloodwork", "wbc", e.target.value)}
          placeholder={language === "en" ? "e.g. 7.5" : "npr. 7.5"}
          className="ios-input"
        />
        <p className="text-xs text-gray-500 mt-1">{language === "en" ? "Normal: 4.5-11.0" : "Normalno: 4.5-11.0"}</p>
      </div>
      <div>
        <Label htmlFor="rbc" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "RBC (×10⁶/μL)" : "Eritrociti (×10⁶/μL)"}
        </Label>
        <Input
          id="rbc"
          type="number"
          step="0.1"
          value={labResults.bloodwork.rbc}
          onChange={(e) => handleResultChange("bloodwork", "rbc", e.target.value)}
          placeholder={language === "en" ? "e.g. 4.8" : "npr. 4.8"}
          className="ios-input"
        />
        <p className="text-xs text-gray-500 mt-1">{language === "en" ? "Normal: 4.5-5.9 (M), 4.0-5.2 (F)" : "Normalno: 4.5-5.9 (M), 4.0-5.2 (Ž)"}</p>
      </div>
      <div>
        <Label htmlFor="hemoglobin" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Hemoglobin (g/dL)" : "Hemoglobin (g/dL)"}
        </Label>
        <Input
          id="hemoglobin"
          type="number"
          step="0.1"
          value={labResults.bloodwork.hemoglobin}
          onChange={(e) => handleResultChange("bloodwork", "hemoglobin", e.target.value)}
          placeholder={language === "en" ? "e.g. 14.0" : "npr. 14.0"}
          className="ios-input"
        />
        <p className="text-xs text-gray-500 mt-1">{language === "en" ? "Normal: 13.5-17.5 (M), 12.0-15.5 (F)" : "Normalno: 13.5-17.5 (M), 12.0-15.5 (Ž)"}</p>
      </div>
      <div>
        <Label htmlFor="platelets" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Platelets (×10³/μL)" : "Trombociti (×10³/μL)"}
        </Label>
        <Input
          id="platelets"
          type="number"
          step="1"
          value={labResults.bloodwork.platelets}
          onChange={(e) => handleResultChange("bloodwork", "platelets", e.target.value)}
          placeholder={language === "en" ? "e.g. 250" : "npr. 250"}
          className="ios-input"
        />
        <p className="text-xs text-gray-500 mt-1">{language === "en" ? "Normal: 150-450" : "Normalno: 150-450"}</p>
      </div>
    </div>
  );

  const renderBiochemistryInputs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="glucose" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Glucose (mg/dL)" : "Glukoza (mg/dL)"}
        </Label>
        <Input
          id="glucose"
          type="number"
          step="1"
          value={labResults.biochemistry.glucose}
          onChange={(e) => handleResultChange("biochemistry", "glucose", e.target.value)}
          placeholder={language === "en" ? "e.g. 95" : "npr. 95"}
          className="ios-input"
        />
        <p className="text-xs text-gray-500 mt-1">{language === "en" ? "Normal: 70-100" : "Normalno: 70-100"}</p>
      </div>
      <div>
        <Label htmlFor="urea" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Urea (mg/dL)" : "Urea (mg/dL)"}
        </Label>
        <Input
          id="urea"
          type="number"
          step="1"
          value={labResults.biochemistry.urea}
          onChange={(e) => handleResultChange("biochemistry", "urea", e.target.value)}
          placeholder={language === "en" ? "e.g. 15" : "npr. 15"}
          className="ios-input"
        />
        <p className="text-xs text-gray-500 mt-1">{language === "en" ? "Normal: 7-20" : "Normalno: 7-20"}</p>
      </div>
      <div>
        <Label htmlFor="sodium" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Sodium (mEq/L)" : "Natrij (mEq/L)"}
        </Label>
        <Input
          id="sodium"
          type="number"
          step="1"
          value={labResults.biochemistry.sodium}
          onChange={(e) => handleResultChange("biochemistry", "sodium", e.target.value)}
          placeholder={language === "en" ? "e.g. 140" : "npr. 140"}
          className="ios-input"
        />
        <p className="text-xs text-gray-500 mt-1">{language === "en" ? "Normal: 135-145" : "Normalno: 135-145"}</p>
      </div>
      <div>
        <Label htmlFor="potassium" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Potassium (mEq/L)" : "Kalij (mEq/L)"}
        </Label>
        <Input
          id="potassium"
          type="number"
          step="0.1"
          value={labResults.biochemistry.potassium}
          onChange={(e) => handleResultChange("biochemistry", "potassium", e.target.value)}
          placeholder={language === "en" ? "e.g. 4.0" : "npr. 4.0"}
          className="ios-input"
        />
        <p className="text-xs text-gray-500 mt-1">{language === "en" ? "Normal: 3.5-5.0" : "Normalno: 3.5-5.0"}</p>
      </div>
    </div>
  );

  const renderMicrobiologyInputs = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="culture" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Culture Results" : "Rezultati Kulture"}
        </Label>
        <Input
          id="culture"
          value={labResults.microbiology.culture}
          onChange={(e) => handleResultChange("microbiology", "culture", e.target.value)}
          placeholder={language === "en" ? "e.g. E. coli isolated" : "npr. E. coli izoliran"}
          className="ios-input"
        />
      </div>
      <div>
        <Label htmlFor="gramStain" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Gram Stain" : "Gram Bojenje"}
        </Label>
        <Input
          id="gramStain"
          value={labResults.microbiology.gramStain}
          onChange={(e) => handleResultChange("microbiology", "gramStain", e.target.value)}
          placeholder={language === "en" ? "e.g. Gram-negative rods" : "npr. Gram-negativni štapići"}
          className="ios-input"
        />
      </div>
      <div>
        <Label htmlFor="sensitivity" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {language === "en" ? "Antibiotic Sensitivity" : "Osjetljivost na Antibiotike"}
        </Label>
        <Input
          id="sensitivity"
          value={labResults.microbiology.sensitivity}
          onChange={(e) => handleResultChange("microbiology", "sensitivity", e.target.value)}
          placeholder={language === "en" ? "e.g. Sensitive to ciprofloxacin" : "npr. Osjetljiv na ciprofloksacin"}
          className="ios-input"
        />
      </div>
    </div>
  );

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border border-gray-100 dark:border-gray-800 rounded-xl">
      <div className="space-y-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-medical-primary" />
          {language === "en" ? "Laboratory Results" : "Laboratorijski Rezultati"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {language === "en" 
            ? "Enter available lab results if applicable (optional)" 
            : "Unesite dostupne laboratorijske rezultate ako su primjenjivi (opcionalno)"}
        </p>
      </div>

      <Tabs defaultValue="bloodwork" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="bloodwork" className="flex items-center gap-1.5 data-[state=active]:text-medical-primary">
            <Beaker className="h-4 w-4" />
            <span>{language === "en" ? "Bloodwork" : "Krvna Slika"}</span>
          </TabsTrigger>
          <TabsTrigger value="biochemistry" className="flex items-center gap-1.5 data-[state=active]:text-medical-primary">
            <FlaskConical className="h-4 w-4" />
            <span>{language === "en" ? "Biochemistry" : "Biokemija"}</span>
          </TabsTrigger>
          <TabsTrigger value="microbiology" className="flex items-center gap-1.5 data-[state=active]:text-medical-primary">
            <Microscope className="h-4 w-4" />
            <span>{language === "en" ? "Microbiology" : "Mikrobiologija"}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bloodwork" className="mt-4">
          {renderBloodworkInputs()}
        </TabsContent>
        <TabsContent value="biochemistry" className="mt-4">
          {renderBiochemistryInputs()}
        </TabsContent>
        <TabsContent value="microbiology" className="mt-4">
          {renderMicrobiologyInputs()}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
