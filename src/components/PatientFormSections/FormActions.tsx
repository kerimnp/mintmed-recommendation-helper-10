
import React from "react";
import { Button } from "../ui/button";
import { Loader2, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormActionsProps {
  isSubmitting: boolean;
  disabled?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  isSubmitting, 
  disabled = false 
}) => {
  const { language } = useLanguage();

  const handleClick = (e: React.MouseEvent) => {
    console.log('=== GENERATE BUTTON CLICKED ===');
    console.log('Is submitting:', isSubmitting);
    console.log('Is disabled:', disabled);
    
    if (!disabled && !isSubmitting) {
      console.log('✅ Button click will proceed with form submission');
    } else {
      console.log('❌ Button click blocked:', { disabled, isSubmitting });
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || disabled}
        onClick={handleClick}
        className="bg-gradient-to-r from-medical-primary to-medical-accent hover:from-medical-primary-hover hover:to-medical-accent text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {language === "en" ? "Analyzing Patient Data..." : "Analiziranje Podataka..."}
          </>
        ) : (
          <>
            <Zap className="mr-2 h-5 w-5" />
            {language === "en" ? "Generate AI Recommendation" : "Generiraj AI Preporuku"}
          </>
        )}
      </Button>

      {disabled && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center max-w-md">
          {language === "en" 
            ? "No credits remaining. Contact support to continue using the service."
            : "Nema preostalih kredita. Kontaktirajte podršku za nastavak korištenja usluge."}
        </p>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Shield className="h-3 w-3" />
        <span>
          {language === "en" 
            ? "AI-powered clinical decision support following evidence-based guidelines"
            : "Klinička podrška za odlučivanje temeljene na AI-u prema smjernicama zasnovanim na dokazima"}
        </span>
      </div>
    </div>
  );
};
