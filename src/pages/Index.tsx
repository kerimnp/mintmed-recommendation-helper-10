
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { PatientForm } from "@/components/PatientForm";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon, BarChart2, LogIn } from "lucide-react";
import { useTheme } from "next-themes";
import { translations } from "@/translations";
import { Helmet } from "react-helmet";

const Index = () => {
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = translations[language];

  return (
    <>
      <Helmet>
        <title>Horalix - Advanced AI Medical Decision Support System</title>
        <meta name="description" content="Horalix - Leading AI-powered medical decision support system for healthcare professionals. Get evidence-based antibiotic recommendations tailored to patient needs." />
        <meta name="keywords" content="Horalix, AI in medicine, medical AI, antibiotic recommendations, healthcare AI, clinical decision support, medical software" />
        <meta property="og:title" content="Horalix - Advanced AI Medical Decision Support System" />
        <meta property="og:description" content="AI-powered medical decision support system for healthcare professionals" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Horalix - Advanced AI Medical Decision Support System" />
        <meta name="twitter:description" content="AI-powered medical decision support system for healthcare professionals" />
        <link rel="canonical" href="https://horalix.ai" />
      </Helmet>

      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 
        dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary overflow-auto">
        <header className="fixed top-0 right-0 z-50 p-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full bg-gray-100/80 dark:bg-medical-bg-secondary hover:bg-gray-200/80 
                dark:hover:bg-medical-bg"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-900 dark:text-medical-text" />
              ) : (
                <Moon className="h-5 w-5 text-gray-900 dark:text-medical-text" />
              )}
            </Button>
            <LanguageToggle />
            <Link to="/auth">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80">
                <LogIn className="h-4 w-4" />
                <span>{language === "en" ? "Sign In" : "Prijava"}</span>
              </Button>
            </Link>
          </div>
        </header>

        <main className="w-full overflow-auto">
          <div className="w-full px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8 pt-16">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                    : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
                  } 
                  alt="Horalix Logo" 
                  className="h-12 sm:h-16 w-auto"
                />
              </div>
              <div className="text-center mb-8 sm:mb-12 space-y-4 sm:space-y-6 animate-fade-in">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-medical-text">
                  {t.title}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-medical-text-secondary max-w-2xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
              </div>
              
              <div className="form-card p-4 sm:p-8">
                <PatientForm />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
