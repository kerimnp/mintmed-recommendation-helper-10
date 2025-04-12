
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, BarChart2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormHeaderProps {
  errors: { [key: string]: string };
  showErrors: boolean;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ errors, showErrors }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-medical-text">{t.title}</h2>
        <div className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>{language === "en" ? "Sign In" : "Prijava"}</span>
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {showErrors && Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {language === "en" 
              ? "Please correct the following errors:"
              : "Molimo ispravite sljedeće greške:"}
            <ul className="list-disc list-inside mt-2">
              {Object.values(errors).map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
