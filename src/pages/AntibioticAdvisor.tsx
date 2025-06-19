
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PatientForm } from "@/components/PatientForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Shield, Zap, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProfileDropdown } from "@/components/admin/dashboard/layout/ProfileDropdown";
import { PatientData } from "@/utils/types/patientTypes";

const AntibioticAdvisor = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  // Initialize patient form state
  const [patientData, setPatientData] = useState<PatientData>({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    region: "",
    infectionSites: [],
    symptoms: "",
    duration: "",
    severity: "mild",
    allergies: {
      penicillin: false,
      cephalosporin: false,
      sulfa: false,
      macrolide: false,
      fluoroquinolone: false,
    },
    resistances: {
      mrsa: false,
      vre: false,
      esbl: false,
      cre: false,
      pseudomonas: false,
    },
    kidneyDisease: false,
    liverDisease: false,
    diabetes: false,
    immunosuppressed: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlePatientFormSubmit = async (data: PatientData) => {
    setIsLoading(true);
    try {
      // Handle form submission logic here
      console.log('Patient form submitted:', data);
      // Add your submission logic here
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      <Helmet>
        <title>Horalix - Antibiotic Recommendation System</title>
        <meta name="description" content="Evidence-based antibiotic recommendations tailored to patient needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src={theme === 'dark' ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png" : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"} 
                  alt="Horalix Logo" 
                  className="h-8 w-auto cursor-pointer" 
                />
              </Link>
              <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === "en" ? "Antibiotic Advisor" : "Savjetnik za Antibiotike"}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "en" ? "Evidence-based recommendations" : "Preporuke temeljene na dokazima"}
                </p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 leading-tight">
                {language === "en" ? "Clinical Decision Support" : "Klinička Podrška za Odlučivanje"}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light">
                {language === "en" 
                  ? "Evidence-based antibiotic recommendations powered by clinical guidelines"
                  : "Preporuke za antibiotike zasnovane na dokazima uz kliničke smernice"}
              </p>
              
              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="group p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    {language === "en" ? "Safety First" : "Sigurnost na Prvom Mjestu"}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Comprehensive allergy and interaction checks" : "Sveobuhvatne provjere alergija i interakcija"}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    {language === "en" ? "Instant Results" : "Trenutni Rezultati"}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Real-time analysis with detailed rationale" : "Analiza u realnom vremenu s detaljnim objašnjenjem"}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="group p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    {language === "en" ? "Evidence-Based" : "Zasnovano na Dokazima"}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Following IDSA, CDC, and WHO guidelines" : "Prati IDSA, CDC i WHO smernice"}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Patient Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <PatientForm 
              patientData={patientData}
              setPatientData={setPatientData}
              onSubmit={handlePatientFormSubmit}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AntibioticAdvisor;
