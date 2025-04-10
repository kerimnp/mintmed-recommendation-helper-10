
import React from "react";
import { Link } from "react-router-dom";
import { PatientForm } from "@/components/PatientForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowLeft, AlarmClock, ShieldAlert, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const AntibioticAdvisor = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 overflow-auto">
      <Helmet>
        <title>Horalix - Antibiotic Recommendation System</title>
        <meta name="description" content="Evidence-based antibiotic recommendations tailored to patient needs" />
      </Helmet>

      <header className="fixed top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/">
                <img 
                  src={theme === 'dark' ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png" : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"} 
                  alt="Horalix Logo" 
                  className="h-8 w-auto" 
                />
              </Link>
              <div className="h-5 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
              <h1 className="text-lg font-medium text-gray-900 dark:text-white hidden sm:block">
                {language === "en" ? "Antibiotic Advisor" : "Savjetnik za Antibiotike"}
              </h1>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4" />
                <span>{language === "en" ? "Back to Home" : "Natrag na Početnu"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "en" ? "Antibiotic Recommendation System" : "Sustav Preporuke Antibiotika"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {language === "en" 
              ? "Use the form below to get personalized, evidence-based antibiotic recommendations."
              : "Koristite obrazac ispod da biste dobili personalizirane preporuke za antibiotike temeljene na dokazima."}
          </p>
          
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {language === "en" ? "Clinical Excellence" : "Klinička Izvrsnost"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                <ShieldAlert className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {language === "en" ? "Patient Safety" : "Sigurnost Pacijenta"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                <AlarmClock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {language === "en" ? "Rapid Results" : "Brzi Rezultati"}
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm"
        >
          <PatientForm />
        </motion.div>
      </div>
    </div>
  );
};

export default AntibioticAdvisor;
