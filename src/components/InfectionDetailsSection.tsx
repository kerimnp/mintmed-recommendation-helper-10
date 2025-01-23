import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";
import { Badge } from "./ui/badge";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfectionDetailsSectionProps {
  formData: {
    infectionSites: string[];
    symptoms: string;
    duration: string;
    severity: string;
  };
  onInputChange: (field: string, value: any) => void;
}

export const InfectionDetailsSection: React.FC<InfectionDetailsSectionProps> = ({
  formData,
  onInputChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language].infectionDetails;

  const handleSiteSelect = (site: string) => {
    const currentSites = formData.infectionSites || [];
    if (!currentSites.includes(site)) {
      onInputChange("infectionSites", [...currentSites, site]);
    }
  };

  const handleSiteRemove = (site: string) => {
    const updatedSites = formData.infectionSites.filter(s => s !== site);
    onInputChange("infectionSites", updatedSites);
  };

  const handleSiteToggle = (site: string) => {
    const currentSites = formData.infectionSites || [];
    if (currentSites.includes(site)) {
      handleSiteRemove(site);
    } else {
      handleSiteSelect(site);
    }
  };

  const availableSites = [
    { id: "respiratory", text: t.sites.respiratory },
    { id: "urinary", text: t.sites.urinary },
    { id: "skin", text: t.sites.skin },
    { id: "abdominal", text: t.sites.abdominal },
    { id: "cns", text: t.sites.cns },
    { id: "wound", text: t.sites.wound },
    { id: "bloodstream", text: t.sites.bloodstream },
    { id: "bone", text: t.sites.bone },
    { id: "ear", text: t.sites.ear },
    { id: "eye", text: t.sites.eye },
    { id: "dental", text: t.sites.dental }
  ];

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg space-y-6 backdrop-blur-sm
      border border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-gray-700 dark:text-gray-300 font-medium">
            {t.sites.respiratory}
          </Label>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {formData.infectionSites?.map((site) => (
              <Badge 
                key={site}
                variant="secondary"
                className={cn(
                  "px-3 py-1.5 flex items-center gap-2 cursor-pointer transition-all duration-200",
                  "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",
                  "hover:bg-blue-100 dark:hover:bg-blue-900/50",
                  "border border-blue-200 dark:border-blue-800 group"
                )}
                onClick={() => handleSiteRemove(site)}
              >
                {t.sites[site as keyof typeof t.sites]}
                <X className="h-3 w-3 opacity-50 group-hover:opacity-100" />
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableSites.map((site) => (
              <button
                key={site.id}
                onClick={() => handleSiteToggle(site.id)}
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
            {t.symptoms}
          </Label>
          <Textarea 
            id="symptoms" 
            placeholder={t.symptoms}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 min-h-[100px]
              placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={formData.symptoms}
            onChange={(e) => onInputChange("symptoms", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300 font-medium">
            {t.duration}
          </Label>
          <Input 
            id="duration" 
            type="number" 
            placeholder={t.duration}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40
              placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={formData.duration}
            onChange={(e) => onInputChange("duration", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300 font-medium">
            {t.severity}
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(t.severityLevels).map(([value, label]) => (
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