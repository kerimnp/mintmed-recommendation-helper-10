
import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Badge } from "./ui/badge";
import { X, AlertTriangle, Building, Hospital, Clock, ThermometerSnowflake, Microscope } from "lucide-react";
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
  errors?: { [key: string]: string };
}

type InfectionSite = {
  id: string;
  text: string;
  icon: React.ReactNode;
};

export const InfectionDetailsSection: React.FC<InfectionDetailsSectionProps> = ({
  formData,
  onInputChange,
  errors = {}
}) => {
  const { language } = useLanguage();
  const t = translations[language].infectionDetails;

  const handleSiteSelect = (site: string) => {
    console.log('Site selected:', site);
    console.log('Current infection sites:', formData.infectionSites);
    
    // Allow multiple sites but ensure array is properly updated
    const currentSites = formData.infectionSites || [];
    const updatedSites = currentSites.includes(site)
      ? currentSites.filter(s => s !== site) // Remove if already selected
      : [...currentSites, site]; // Add if not selected
    
    console.log('Updated infection sites:', updatedSites);
    onInputChange("infectionSites", updatedSites);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or positive numbers only
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
      onInputChange("duration", value);
    }
  };

  const getIconForSite = (siteId: string) => {
    switch(siteId) {
      case 'respiratory': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a1 1 0 0 1 .993.883L13 3v2.05a5.51 5.51 0 0 1 3.91 2.062A5.49 5.49 0 0 1 22 12a1 1 0 1 1-2 0 3.49 3.49 0 0 0-3-3.45v2.456l.351.1a3 3 0 0 1 1.29 5.233l-6.993 4.994A1 1 0 0 1 11 21a1 1 0 0 1-.649-.238l-6.993-5a3 3 0 0 1 1.298-5.23l.337-.096V5.5A3.5 3.5 0 0 0 2 9a1 1 0 0 1-2 0 5.51 5.51 0 0 1 5.096-5.49L5 3.05V3a1 1 0 0 1 1-1h6Zm3 9a1 1 0 0 1 0 2H9a1 1 0 1 1 0-2h6Z"/></svg>;
      case 'urinary': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 20h6M12 14v6M7 6h10M7 10h10M17 14H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4z"/></svg>;
      case 'skin': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 5c1.306 0 2 .693 2 2v10c0 1.306-.693 2-2 2h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1Z"/><rect x="5" y="5" width="9" height="14" rx="1"/></svg>;
      case 'abdominal': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"/><path d="M15 10c-.5-1-1.3-1.3-2-1.5-4-.8-4 3-4 3 3 3 6 1 6 1z"/><path d="M9 10c.5-1 1.3-1.3 2-1.5 4-.8 4 3 4 3-3 3-6 1-6 1z"/></svg>;
      case 'cns': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Z"/><path d="M4 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z"/><path d="M20 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z"/><path d="m12 8-.86 10.246a1 1 0 0 1-1.996.01L8 10"/><path d="m12 8 .86 10.246a1 1 0 0 0 1.996.01L16 10"/><path d="M20 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5"/></svg>;
      case 'wound': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3.58 13.433 2.26-2.26a1 1 0 0 1 1.42 0l2.56 2.56a1 1 0 0 1 0 1.42l-2.55 2.55M15 13v9"/><path d="M9 9h10.5A3.5 3.5 0 0 0 23 5.5a3.5 3.5 0 0 0-3.5-3.5h-1a3.5 3.5 0 0 0-3 1.5 7 7 0 1 1-14 0V1h15"/></svg>;
      case 'bloodstream': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M15 6.5v0M8 17.5v0M3.5 9.5v0M20.5 9.5v0M3.5 14.5v0M20.5 14.5v0"/></svg>;
      case 'bone': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 8 4-4 4 4c4 4 4 6.3 4 8-.13 3.09-3.35 3.63-5 1.64-3.28 3.73-7.61 3.55-10 .35-2.09 2.4-5 1.64-5-1.64 0-1.86 0-4 4-8Z"/></svg>;
      case 'ear': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/></svg>;
      case 'eye': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>;
      case 'dental': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5.5A7.5 7.5 0 1 0 4.5 13c0 2 .8 3.8 2 5.1L12 22l5.5-3.9c1.2-1.3 2-3 2-5.1a7.5 7.5 0 0 0-7.5-7.5Z"/><path d="m12 5.5-1.5-3 3-1-1.5-1 3.5.5-1 1 1.5.5-4 3Z"/></svg>;
      default: return <Microscope className="w-4 h-4" />;
    }
  };

  const availableSites: InfectionSite[] = [
    { id: "respiratory", text: t.sites.respiratory as string, icon: getIconForSite("respiratory") },
    { id: "urinary", text: t.sites.urinary as string, icon: getIconForSite("urinary") },
    { id: "skin", text: t.sites.skin as string, icon: getIconForSite("skin") },
    { id: "abdominal", text: t.sites.abdominal as string, icon: getIconForSite("abdominal") },
    { id: "cns", text: t.sites.cns as string, icon: getIconForSite("cns") },
    { id: "wound", text: t.sites.wound as string, icon: getIconForSite("wound") },
    { id: "bloodstream", text: t.sites.bloodstream as string, icon: getIconForSite("bloodstream") },
    { id: "bone", text: t.sites.bone as string, icon: getIconForSite("bone") },
    { id: "ear", text: t.sites.ear as string, icon: getIconForSite("ear") },
    { id: "eye", text: t.sites.eye as string, icon: getIconForSite("eye") },
    { id: "dental", text: t.sites.dental as string, icon: getIconForSite("dental") }
  ];

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-900/95 shadow-lg space-y-6 backdrop-blur-sm
      border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Microscope className="h-5 w-5 text-medical-primary" />
          {t.title as string}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t.subtitle as string}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
            <Hospital className="h-4 w-4 text-medical-primary/80" />
            {t.acquisitionType as string}
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={formData.isHospitalAcquired ? "outline" : "default"}
              className={cn(
                "flex items-center justify-center gap-2 py-5",
                !formData.isHospitalAcquired && "bg-medical-primary hover:bg-medical-primary/90"
              )}
              onClick={() => onInputChange("isHospitalAcquired", false)}
            >
              <Building className="h-4 w-4" />
              <div className="flex flex-col items-center">
                <span>Community Acquired</span>
                <span className="text-xs opacity-70">Outside hospital settings</span>
              </div>
            </Button>
            <Button
              type="button"
              variant={formData.isHospitalAcquired ? "default" : "outline"}
              className={cn(
                "flex items-center justify-center gap-2 py-5",
                formData.isHospitalAcquired && "bg-medical-primary hover:bg-medical-primary/90"
              )}
              onClick={() => onInputChange("isHospitalAcquired", true)}
            >
              <Hospital className="h-4 w-4" />
              <div className="flex flex-col items-center">
                <span>Hospital Acquired</span>
                <span className="text-xs opacity-70">Nosocomial infection</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
            {formData.infectionSites?.length > 0 ? 
              getIconForSite(formData.infectionSites[0]) : 
              <Microscope className="h-4 w-4 text-medical-primary/80" />}
            Select Infection Site
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableSites.map((site) => (
              <button
                key={site.id}
                type="button"
                onClick={() => handleSiteSelect(site.id)}
                className={cn(
                  "p-3 text-sm rounded-lg transition-all duration-200 border flex flex-col items-center gap-2",
                  formData.infectionSites?.includes(site.id)
                    ? "bg-medical-primary/10 text-medical-primary dark:bg-medical-primary/20 dark:text-medical-primary/90 border-medical-primary/30 dark:border-medical-primary/30 shadow-inner"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-gray-200 dark:border-gray-700"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full",
                  formData.infectionSites?.includes(site.id)
                    ? "bg-medical-primary/15 dark:bg-medical-primary/25"
                    : "bg-gray-100 dark:bg-gray-700"
                )}>
                  {site.icon}
                </div>
                {site.text}
              </button>
            ))}
          </div>
          {errors.infectionSites && (
            <p className="text-sm text-red-500 mt-1">{errors.infectionSites}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="symptoms" className="text-base text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-medical-primary/80" />
              {t.symptoms as string}
            </Label>
            <Textarea 
              id="symptoms" 
              placeholder={t.symptoms as string}
              className={cn(
                "bg-white dark:bg-gray-800/80 border rounded-lg min-h-[100px] placeholder:text-gray-400 dark:placeholder:text-gray-500",
                errors.symptoms
                  ? "border-red-500 focus:ring-red-500/20 focus:border-red-500/40"
                  : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary/40"
              )}
              value={formData.symptoms}
              onChange={(e) => onInputChange("symptoms", e.target.value)}
            />
            {errors.symptoms && (
              <p className="text-sm text-red-500 mt-1">{errors.symptoms}</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-base text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-medical-primary/80" />
                {t.duration as string}
              </Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="duration" 
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter number of days"
                  className={cn(
                    "bg-white dark:bg-gray-800/80 border rounded-lg placeholder:text-gray-400 dark:placeholder:text-gray-500",
                    errors.duration
                      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500/40"
                      : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary/40"
                  )}
                  value={formData.duration}
                  onChange={handleDurationChange}
                />
                <span className="text-gray-500 dark:text-gray-400">days</span>
              </div>
              {errors.duration && (
                <p className="text-sm text-red-500 mt-1">{errors.duration}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                <ThermometerSnowflake className="h-4 w-4 text-medical-primary/80" />
                {t.severity as string}
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(t.severityLevels as Record<string, string>).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onInputChange("severity", value)}
                    className={cn(
                      "p-2.5 text-sm rounded-lg border transition-all duration-200",
                      formData.severity === value
                        ? value === "mild" 
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 shadow-inner"
                          : value === "moderate"
                            ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800 shadow-inner"
                            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 shadow-inner"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {errors.severity && (
                <p className="text-sm text-red-500 mt-1">{errors.severity}</p>
              )}
            </div>
          </div>
        </div>

        {formData.duration && parseInt(formData.duration) > 7 && (
          <div className="flex items-start gap-2 p-4 bg-yellow-50 dark:bg-yellow-950/30 
            border border-yellow-200 dark:border-yellow-900/50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-yellow-700 dark:text-yellow-400">
                Chronic infection detected (&gt;7 days)
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                Consider broader spectrum antibiotics and evaluate for potential complications or underlying conditions
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
