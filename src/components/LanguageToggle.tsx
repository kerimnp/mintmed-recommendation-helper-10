import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 premium-button"
    >
      {language === "en" ? "EN" : "BS"}
    </Button>
  );
};