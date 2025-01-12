import { PatientForm } from "@/components/PatientForm";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    title: "Antibioteka",
    subtitle: "Advanced Clinical Decision Support for Antibiotic Recommendations",
  },
  bs: {
    title: "Antibioteka",
    subtitle: "Napredna klinička podrška za preporuke antibiotika",
  },
};

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-cyan/10 to-medical-deep/5">
      <LanguageToggle />
      <div className="container px-4 py-12">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold text-medical-deep bg-clip-text text-transparent bg-gradient-to-r from-medical-deep to-medical-electric">
            {t.title}
          </h1>
          <p className="text-lg text-medical-deep/60 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        <PatientForm />
      </div>
    </div>
  );
};

export default Index;