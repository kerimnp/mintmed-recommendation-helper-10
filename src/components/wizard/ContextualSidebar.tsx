
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  Info, 
  AlertTriangle, 
  BookOpen, 
  Clock,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContextualSidebarProps {
  currentStep: string;
  patientData: any;
  calculations: any;
  recommendations: any;
  completionPercentage: number;
}

export const ContextualSidebar: React.FC<ContextualSidebarProps> = ({
  currentStep,
  patientData,
  calculations,
  recommendations,
  completionPercentage
}) => {
  const { language } = useLanguage();

  const renderStepGuidance = () => {
    const guidance = {
      demographics: {
        title: language === "en" ? "Patient Information" : "Informacije o Pacijentu",
        tips: [
          language === "en" ? "Accurate weight is crucial for dosing" : "Točna težina je ključna za doziranje",
          language === "en" ? "Age affects drug metabolism" : "Dob utječe na metabolizam lijekova",
          language === "en" ? "Pregnancy status changes recommendations" : "Status trudnoće mijenja preporuke"
        ]
      },
      infection: {
        title: language === "en" ? "Infection Details" : "Detalji Infekcije",
        tips: [
          language === "en" ? "Select all affected sites" : "Odaberite sva zahvaćena mjesta",
          language === "en" ? "Severity impacts antibiotic choice" : "Težina utječe na izbor antibiotika",
          language === "en" ? "Hospital vs community acquired matters" : "Bolnička vs ambulantna infekcija je važna"
        ]
      },
      allergies: {
        title: language === "en" ? "Allergy Assessment" : "Procjena Alergija",
        tips: [
          language === "en" ? "Beta-lactam allergies are most critical" : "Alergije na beta-laktame su najkritičnije",
          language === "en" ? "Cross-reactivity patterns matter" : "Obrasci unakrsne reaktivnosti su važni",
          language === "en" ? "Severity of past reactions" : "Težina prošlih reakcija"
        ]
      }
    };

    const currentGuidance = guidance[currentStep as keyof typeof guidance];
    if (!currentGuidance) return null;

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            {currentGuidance.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {currentGuidance.tips.map((tip, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  const renderCalculations = () => {
    if (!calculations || Object.keys(calculations).length === 0) return null;

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600" />
            {language === "en" ? "Live Calculations" : "Izračuni Uživo"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {calculations.bmi && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">BMI:</span>
              <Badge variant="outline">{calculations.bmi}</Badge>
            </div>
          )}
          {calculations.crCl && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">CrCl:</span>
              <Badge variant="outline">{calculations.crCl} mL/min</Badge>
            </div>
          )}
          {calculations.adjustedWeight && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Adj. Weight:</span>
              <Badge variant="outline">{calculations.adjustedWeight} kg</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderRiskAlerts = () => {
    const alerts = [];
    
    if (patientData?.age && parseInt(patientData.age) > 65) {
      alerts.push(language === "en" ? "Elderly patient - consider dose adjustment" : "Stariji pacijent - razmislite o prilagodbi doze");
    }
    
    if (patientData?.kidneyDisease) {
      alerts.push(language === "en" ? "Renal impairment - nephrotoxic drugs caution" : "Bubrežno oštećenje - oprez s nefrotoksičnim lijekovima");
    }

    if (patientData?.pregnancy === 'yes') {
      alerts.push(language === "en" ? "Pregnancy - teratogenic drugs contraindicated" : "Trudnoća - teratogeni lijekovi kontraindicirani");
    }

    if (alerts.length === 0) return null;

    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            {language === "en" ? "Risk Alerts" : "Upozorenja o Riziku"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {alerts.map((alert, index) => (
              <li key={index} className="text-sm text-orange-700 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {alert}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-medical-primary" />
            {language === "en" ? "Progress" : "Napredak"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{language === "en" ? "Assessment Complete" : "Procjena Završena"}</span>
              <span>{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Step Guidance */}
      {renderStepGuidance()}

      {/* Live Calculations */}
      {renderCalculations()}

      {/* Risk Alerts */}
      {renderRiskAlerts()}

      {/* Quick Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            {language === "en" ? "Quick Reference" : "Brza Referenca"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                {language === "en" ? "Guidelines: IDSA 2024" : "Smjernice: IDSA 2024"}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {language === "en" 
                ? "All recommendations based on latest clinical evidence"
                : "Sve preporuke temeljene na najnovijim kliničkim dokazima"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
