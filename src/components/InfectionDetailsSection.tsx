import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

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

  const availableSites = [
    { value: "respiratory", label: t.sites.respiratory },
    { value: "urinary", label: t.sites.urinary },
    { value: "skin", label: t.sites.skin },
    { value: "abdominal", label: t.sites.abdominal },
    { value: "cns", label: t.sites.cns },
    { value: "wound", label: t.sites.wound },
    { value: "bloodstream", label: t.sites.bloodstream },
    { value: "bone", label: t.sites.bone },
    { value: "ear", label: t.sites.ear },
    { value: "eye", label: t.sites.eye },
    { value: "dental", label: t.sites.dental }
  ];

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 shadow-lg space-y-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{t.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300">Selected Infection Sites</Label>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.infectionSites?.map((site) => (
              <Badge 
                key={site}
                variant="secondary"
                className="px-3 py-1.5 flex items-center gap-2 cursor-pointer
                  bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200
                  hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors
                  border border-blue-200 dark:border-blue-800 group"
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
                key={site.value}
                onClick={() => handleSiteSelect(site.value)}
                className={`p-2.5 text-sm rounded-xl transition-all duration-200
                  ${formData.infectionSites?.includes(site.value)
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 cursor-not-allowed border-blue-200 dark:border-blue-800'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-gray-200 dark:border-gray-700'
                  } border shadow-sm hover:shadow-md`}
                disabled={formData.infectionSites?.includes(site.value)}
              >
                {site.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="symptoms" className="text-gray-700 dark:text-gray-300">{t.symptoms}</Label>
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
          <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300">{t.duration}</Label>
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
          <Label htmlFor="severity" className="text-gray-700 dark:text-gray-300">{t.severity}</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(t.severityLevels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => onInputChange("severity", value)}
                className={`p-2.5 text-sm rounded-xl border transition-all duration-200
                  ${formData.severity === value
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-800 shadow-inner'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  } shadow-sm hover:shadow-md`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};