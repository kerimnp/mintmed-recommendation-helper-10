import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { PatientForm } from "@/components/PatientForm";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { translations } from "@/translations";

const Index = () => {
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 
      dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 dark:border-medical-text-secondary/10 
        bg-white/80 dark:bg-medical-bg-secondary/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={theme === 'dark' 
                ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
              } 
              alt="Horalix Logo" 
              className="h-10 w-auto"
            />
            <div className="h-6 w-px bg-black/10 dark:bg-medical-text-secondary/20" />
            <span className="text-gray-900 dark:text-medical-text text-sm font-medium">
              Clinical Decision Support
            </span>
          </div>
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </header>

      <main className="relative pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-6 animate-fade-in">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-medical-text">
                {t.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-medical-text-secondary max-w-2xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
            </div>
            
            <div className="form-card p-8">
              <PatientForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;