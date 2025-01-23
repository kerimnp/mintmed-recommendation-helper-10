import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Badge } from "./ui/badge";
import { X, AlertTriangle, Building, Hospital } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface InfectionDetailsSectionProps {
  formData: {
    infectionSites: string[];
    symptoms: string;
    duration: string;
    severity: string;
    isHospitalAcquired: boolean;
  };
  onInputChange: (field: string, value: any) => void;
}

type InfectionSite = {
  id: string;
  text: string;
};

export const InfectionDetailsSection: React.FC<InfectionDetailsSectionProps> = ({
  formData,
  onInputChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language].infectionDetails;

  const handleSiteSelect = (site: string) => {
    onInputChange("infectionSites", [site]); // Changed to only allow one site at a time
  };

  const availableSites: InfectionSite[] = [
    { id: "respiratory", text: t.sites.respiratory as string },
    { id: "urinary", text: t.sites.urinary as string },
    { id: "skin", text: t.sites.skin as string },
    { id: "abdominal", text: t.sites.abdominal as string },
    { id: "cns", text: t.sites.cns as string },
    { id: "wound", text: t.sites.wound as string },
    { id: "bloodstream", text: t.sites.bloodstream as string },
    { id: "bone", text: t.sites.bone as string },
    { id: "ear", text: t.sites.ear as string },
    { id: "eye", text: t.sites.eye as string },
    { id: "dental", text: t.sites.dental as string }
  ];

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg space-y-6 backdrop-blur-sm
      border border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t.title as string}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t.subtitle as string}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-gray-700 dark:text-gray-300 font-medium">
            {t.acquisitionType as string}
          </Label>
          <div className="flex gap-2">
            <Button
              variant={formData.isHospitalAcquired ? "outline" : "default"}
              className="flex items-center gap-2 flex-1"
              onClick={() => onInputChange("isHospitalAcquired", false)}
            >
              <Building className="h-4 w-4" />
              Community Acquired
            </Button>
            <Button
              variant={formData.isHospitalAcquired ? "default" : "outline"}
              className="flex items-center gap-2 flex-1"
              onClick={() => onInputChange("isHospitalAcquired", true)}
            >
              <Hospital className="h-4 w-4" />
              Hospital Acquired
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-gray-700 dark:text-gray-300 font-medium">
            Select Infection Site
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableSites.map((site) => (
              <button
                key={site.id}
                onClick={() => handleSiteSelect(site.id)}
                className={cn(
                  "p-2.5 text-sm rounded-xl transition-all duration-200 border shadow-sm",
                  formData.infectionSites?.includes(site.id)
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-gray-200 dark:border-gray-700"
                )}
              >
                {site.text}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="symptoms" className="text-gray-700 dark:text-gray-300 font-medium">
            {t.symptoms as string}
          </Label>
          <Textarea 
            id="symptoms" 
            placeholder={t.symptoms as string}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 min-h-[100px]
              placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={formData.symptoms}
            onChange={(e) => onInputChange("symptoms", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300 font-medium">
            {t.duration as string}
          </Label>
          <Input 
            id="duration" 
            type="number" 
            placeholder={t.duration as string}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40
              placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={formData.duration}
            onChange={(e) => onInputChange("duration", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300 font-medium">
            {t.severity as string}
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(t.severityLevels as Record<string, string>).map(([value, label]) => (
              <button
                key={value}
                onClick={() => onInputChange("severity", value)}
                className={cn(
                  "p-2.5 text-sm rounded-xl border transition-all duration-200",
                  formData.severity === value
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 shadow-inner"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {formData.duration && parseInt(formData.duration) > 7 && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/30 
            border border-yellow-200 dark:border-yellow-900/50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Chronic infection detected (&gt;7 days). Consider broader spectrum antibiotics.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};