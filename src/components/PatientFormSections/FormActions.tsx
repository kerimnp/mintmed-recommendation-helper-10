
import React from "react";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

interface FormActionsProps {
  isSubmitting: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ isSubmitting }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex gap-4">
      <Button 
        type="submit"
        className="premium-button flex-1 flex items-center justify-center gap-2"
        disabled={isSubmitting}
      >
        <Calculator className="h-4 w-4" />
        {isSubmitting 
          ? (language === "en" ? "Generating..." : "Generisanje...") 
          : t.buttons.generate
        }
      </Button>
    </div>
  );
};
