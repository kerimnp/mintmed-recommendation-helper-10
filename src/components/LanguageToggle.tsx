import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 flex bg-white/80 backdrop-blur-sm rounded-lg border border-medical-cyan/20 p-1">
      <button
        onClick={() => language !== "en" && toggleLanguage()}
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          language === "en"
            ? "bg-medical-deep text-white"
            : "text-medical-deep hover:bg-medical-deep/10"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => language !== "bs" && toggleLanguage()}
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          language === "bs"
            ? "bg-medical-deep text-white"
            : "text-medical-deep hover:bg-medical-deep/10"
        }`}
      >
        BS
      </button>
    </div>
  );
};