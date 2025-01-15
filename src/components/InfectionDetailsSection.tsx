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

  const handleRemoveSite = (siteToRemove: string) => {
    const updatedSites = formData.infectionSites.filter(site => site !== siteToRemove);
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
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="form-label">Selected Infection Sites</Label>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.infectionSites?.map((site) => (
              <Badge 
                key={site}
                variant="secondary"
                className="px-3 py-1 flex items-center gap-2"
              >
                {t.sites[site as keyof typeof t.sites]}
                <button
                  onClick={() => handleRemoveSite(site)}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableSites.map((site) => (
              <button
                key={site.value}
                onClick={() => handleSiteSelect(site.value)}
                className={`p-2 text-sm rounded-lg border transition-colors
                  ${formData.infectionSites?.includes(site.value)
                    ? 'border-medical-deep/40 bg-medical-deep/5 text-medical-deep cursor-not-allowed'
                    : 'border-gray-200 hover:border-medical-deep/40 hover:bg-medical-deep/5'
                  }`}
                disabled={formData.infectionSites?.includes(site.value)}
              >
                {site.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="symptoms" className="form-label">{t.symptoms}</Label>
          <Textarea 
            id="symptoms" 
            placeholder={t.symptoms}
            className="input-field min-h-[100px]"
            value={formData.symptoms}
            onChange={(e) => onInputChange("symptoms", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="form-label">{t.duration}</Label>
          <Input 
            id="duration" 
            type="number" 
            placeholder={t.duration}
            className="input-field"
            value={formData.duration}
            onChange={(e) => onInputChange("duration", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="severity" className="form-label">{t.severity}</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(t.severityLevels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => onInputChange("severity", value)}
                className={`p-2 text-sm rounded-lg border transition-colors
                  ${formData.severity === value
                    ? 'border-medical-deep/40 bg-medical-deep/5 text-medical-deep'
                    : 'border-gray-200 hover:border-medical-deep/40 hover:bg-medical-deep/5'
                  }`}
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