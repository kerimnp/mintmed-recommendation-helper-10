import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { devLog } from "@/utils/productionUtils";

interface FormValidationProps {
  validateForm: () => boolean;
}

export const useFormValidation = (
  formData: any,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  setShowErrors: React.Dispatch<React.SetStateAction<boolean>>,
  sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> }
) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = translations[language];

  const validateForm = () => {
    devLog('=== FORM VALIDATION START ===');
    devLog('Form data:', formData);
    
    const newErrors: { [key: string]: string } = {};

    // Critical validation: infection sites (must have at least one)
    devLog('Checking infection sites:', formData.infectionSites);
    if (!formData.infectionSites || formData.infectionSites.length === 0) {
      newErrors.infectionSites = t.errors?.requiredField || "Please select at least one infection site";
      devLog('❌ Infection sites validation failed');
    } else {
      devLog('✅ Infection sites validation passed:', formData.infectionSites);
    }
    
    // Critical validation: severity (must be selected)
    devLog('Checking severity:', formData.severity);
    if (!formData.severity || formData.severity === '') {
      newErrors.severity = t.errors?.requiredField || "Please select infection severity";
      devLog('❌ Severity validation failed');
    } else {
      devLog('✅ Severity validation passed:', formData.severity);
    }

    // Optional but validate if provided
    if (formData.age && formData.age !== '') {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
        newErrors.age = t.errors?.invalidAge || "Please enter a valid age (0-120)";
        devLog('❌ Age validation failed:', formData.age);
      }
    }

    if (formData.weight && formData.weight !== '') {
      const weightNum = Number(formData.weight);
      if (isNaN(weightNum) || weightNum <= 0 || weightNum > 1000) {
        newErrors.weight = t.errors?.invalidWeight || "Please enter a valid weight (1-1000 kg)";
        devLog('❌ Weight validation failed:', formData.weight);
      }
    }

    if (formData.height && formData.height !== '') {
      const heightNum = Number(formData.height);
      if (isNaN(heightNum) || heightNum <= 0 || heightNum > 300) {
        newErrors.height = t.errors?.invalidHeight || "Please enter a valid height (1-300 cm)";
        devLog('❌ Height validation failed:', formData.height);
      }
    }

    devLog('Validation errors found:', newErrors);
    devLog('=== FORM VALIDATION END ===');

    setErrors(newErrors);
    setShowErrors(true);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      let sectionToScroll: keyof typeof sectionRefs;

      if (['age', 'gender', 'weight', 'height'].includes(firstErrorField)) {
        sectionToScroll = 'demographics';
      } else {
        sectionToScroll = 'infection';
      }

      // Show toast notification for validation errors
      toast({
        title: "Form Validation Error",
        description: `Please fix the following: ${Object.keys(newErrors).join(', ')}`,
        variant: "destructive",
      });

      sectionRefs[sectionToScroll]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  return { validateForm };
};