
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

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
    const newErrors: { [key: string]: string } = {};

    // Only validate the truly required fields
    if (!formData.infectionSites || formData.infectionSites.length === 0) {
      newErrors.infectionSites = t.errors?.requiredField || "Infection site is required";
    }
    
    if (!formData.severity) {
      newErrors.severity = t.errors?.requiredField || "Severity is required";
    }

    // Only validate other fields if they're provided but invalid
    if (formData.age && (Number(formData.age) < 0 || Number(formData.age) > 120)) {
      newErrors.age = t.errors?.invalidAge || "Please enter a valid age";
    }

    if (formData.weight && (Number(formData.weight) <= 0 || Number(formData.weight) > 500)) {
      newErrors.weight = t.errors?.invalidWeight || "Please enter a valid weight";
    }

    if (formData.height && (Number(formData.height) <= 0 || Number(formData.height) > 300)) {
      newErrors.height = t.errors?.invalidHeight || "Please enter a valid height";
    }

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

      sectionRefs[sectionToScroll]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  return { validateForm };
};
