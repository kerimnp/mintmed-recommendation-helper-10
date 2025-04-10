
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
import { Sun, Moon, BarChart2, LogIn, Lightbulb, Brain, Microscope, Globe, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";
import { translations } from "@/translations";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Index = () => {
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = translations[language];

  const features = [
    {
      icon: <Brain className="h-10 w-10 text-blue-500" />,
      title: language === "en" ? "AI-Powered Recommendations" : "Preporuke Temeljene na AI",
      description: language === "en" 
        ? "Get evidence-based antibiotic recommendations tailored to each patient's unique profile."
        : "Dobijte preporuke antibiotika temeljene na dokazima i prilagođene jedinstvenom profilu svakog pacijenta."
    },
    {
      icon: <Microscope className="h-10 w-10 text-green-500" />,
      title: language === "en" ? "Clinical Precision" : "Klinička Preciznost",
      description: language === "en"
        ? "Factor in allergies, renal function, and comorbidities for safer prescribing."
        : "Uzmite u obzir alergije, bubrežnu funkciju i komorbiditete za sigurnije propisivanje."
    },
    {
      icon: <Globe className="h-10 w-10 text-purple-500" />,
      title: language === "en" ? "Regional Adaptation" : "Regionalna Prilagodba",
      description: language === "en"
        ? "Recommendations consider local resistance patterns for optimal outcomes."
        : "Preporuke uzimaju u obzir lokalne obrasce otpornosti za optimalne ishode."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-amber-500" />,
      title: language === "en" ? "Continuous Learning" : "Kontinuirano Učenje",
      description: language === "en"
        ? "Access educational resources to stay updated with the latest clinical guidelines."
        : "Pristupite obrazovnim resursima kako biste bili u toku s najnovijim kliničkim smjernicama."
    }
  ];

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
        <header className="fixed top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                    : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
                  } 
                  alt="Horalix Logo" 
                  className="h-8 w-auto"
                />
              </div>
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
            </div>
          </div>
        </header>

        <main className="w-full overflow-auto pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-medical-text leading-tight"
              >
                {t.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-medical-text-secondary leading-relaxed"
              >
                {t.subtitle}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link to="/auth">
                  <Button size="lg" className="bg-medical-primary hover:bg-medical-primary-hover text-white">
                    {language === "en" ? "Get Started" : "Započnite"}
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button variant="outline" size="lg">
                    {language === "en" ? "Explore Dashboard" : "Istražite Nadzornu Ploču"}
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="rounded-full w-16 h-16 bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="form-card p-8 rounded-3xl ios-card-shadow"
            >
              <PatientForm />
            </motion.div>
          </div>
        </main>
        
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex justify-center md:justify-start">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                    : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
                  } 
                  alt="Horalix Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <div className="mt-8 md:mt-0">
                <p className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400">
                  &copy; {new Date().getFullYear()} Horalix. {language === "en" ? "All rights reserved." : "Sva prava pridržana."}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
