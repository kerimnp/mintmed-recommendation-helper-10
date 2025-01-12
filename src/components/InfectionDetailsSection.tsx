import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";

interface InfectionDetailsSectionProps {
  formData: {
    infectionSite: string;
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

  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="infectionSite" className="form-label">{t.site}</Label>
          <Select value={formData.infectionSite} onValueChange={(value) => onInputChange("infectionSite", value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder={t.site} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="respiratory">{t.sites.respiratory}</SelectItem>
              <SelectItem value="urinary">{t.sites.urinary}</SelectItem>
              <SelectItem value="skin">{t.sites.skin}</SelectItem>
              <SelectItem value="abdominal">{t.sites.abdominal}</SelectItem>
              <SelectItem value="cns">{t.sites.cns}</SelectItem>
              <SelectItem value="wound">{t.sites.wound}</SelectItem>
              <SelectItem value="bloodstream">{t.sites.bloodstream}</SelectItem>
              <SelectItem value="bone">{t.sites.bone}</SelectItem>
              <SelectItem value="ear">{t.sites.ear}</SelectItem>
              <SelectItem value="eye">{t.sites.eye}</SelectItem>
              <SelectItem value="dental">{t.sites.dental}</SelectItem>
              <SelectItem value="other">{t.sites.other}</SelectItem>
            </SelectContent>
          </Select>
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
          <Select value={formData.severity} onValueChange={(value) => onInputChange("severity", value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder={t.severity} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mild">{t.severityLevels.mild}</SelectItem>
              <SelectItem value="moderate">{t.severityLevels.moderate}</SelectItem>
              <SelectItem value="severe">{t.severityLevels.severe}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};