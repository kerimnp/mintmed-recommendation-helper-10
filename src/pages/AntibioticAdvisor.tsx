
import React from "react";
import { PatientForm } from "@/components/PatientForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const AntibioticAdvisor = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 
      dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary overflow-auto pt-20">
      <Helmet>
        <title>Horalix - Antibiotic Recommendation System</title>
        <meta name="description" content="Evidence-based antibiotic recommendations tailored to patient needs" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-medical-text mb-4">
            {language === "en" ? "Antibiotic Recommendation System" : "Sustav Preporuke Antibiotika"}
          </h1>
          <p className="text-gray-600 dark:text-medical-text-secondary">
            {language === "en" 
              ? "Use the form below to get personalized, evidence-based antibiotic recommendations."
              : "Koristite obrazac ispod da biste dobili personalizirane preporuke za antibiotike temeljene na dokazima."}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="form-card p-8 rounded-3xl ios-card-shadow"
        >
          <PatientForm />
        </motion.div>
      </div>
    </div>
  );
};

export default AntibioticAdvisor;
