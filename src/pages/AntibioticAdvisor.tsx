
import React from "react";
import { Link } from "react-router-dom";
import { PatientForm } from "@/components/PatientForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowLeft, AlarmClock, ShieldAlert, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const AntibioticAdvisor = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-auto">
      <Helmet>
        <title>Horalix - Antibiotic Recommendation System</title>
        <meta name="description" content="Evidence-based antibiotic recommendations tailored to patient needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>

      <header className="fixed top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src={theme === 'dark' ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png" : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"} 
                  alt="Horalix Logo" 
                  className="h-8 w-auto" 
                />
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === "en" ? "Antibiotic Advisor" : "Savjetnik za Antibiotike"}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "en" ? "Evidence-based recommendations" : "Preporuke temeljene na dokazima"}
                </p>
              </div>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2">
                <ArrowLeft className="h-4 w-4" />
                <span className={isMobile ? "sr-only" : ""}>
                  {language === "en" ? "Back to Home" : "Natrag na Početnu"}
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                {language === "en" ? "Antibiotic Recommendation System" : "Sustav Preporuke Antibiotika"}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
                {language === "en" 
                  ? "Get personalized, evidence-based antibiotic recommendations tailored to your patient's specific needs and medical history."
                  : "Dobijte personalizirane preporuke za antibiotike temeljene na dokazima, prilagođene specifičnim potrebama i medicinskoj povijesti vašeg pacijenta."}
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col items-center text-center p-4 sm:p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 sm:mb-4">
                    <Stethoscope className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    {language === "en" ? "Clinical Excellence" : "Klinička Izvrsnost"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Evidence-based protocols following latest guidelines" : "Protokoli temeljeni na dokazima koji slijede najnovije smjernice"}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center text-center p-4 sm:p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3 sm:mb-4">
                    <ShieldAlert className="h-6 w-6 sm:h-7 sm:w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    {language === "en" ? "Patient Safety" : "Sigurnost Pacijenta"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Comprehensive safety checks and drug interaction alerts" : "Sveobuhvatne sigurnosne provjere i upozorenja o interakcijama lijekova"}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center text-center p-4 sm:p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3 sm:mb-4">
                    <AlarmClock className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    {language === "en" ? "Rapid Analysis" : "Brza Analiza"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Instant recommendations with detailed clinical rationale" : "Trenutne preporuke s detaljnim kliničkim obrazloženjem"}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Patient Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === "en" ? "Patient Assessment Form" : "Obrazac za Procjenu Pacijenta"}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  {language === "en" 
                    ? "Please fill out the patient information below to receive a comprehensive antibiotic recommendation."
                    : "Molimo unesite podatke o pacijentu u nastavku kako biste dobili sveobuhvatnu preporuku za antibiotike."}
                </p>
              </div>
              <PatientForm />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AntibioticAdvisor;
