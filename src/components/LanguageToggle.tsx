import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-700 p-1 shadow-sm">
      <button
        onClick={() => language !== "en" && toggleLanguage()}
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          language === "en"
            ? "bg-blue-900 dark:bg-blue-700 text-white"
            : "text-blue-900 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-gray-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => language !== "bs" && toggleLanguage()}
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          language === "bs"
            ? "bg-blue-900 dark:bg-blue-700 text-white"
            : "text-blue-900 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-gray-700"
        }`}
      >
        BS
      </button>
    </div>
  );
};