import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Sun, Moon, LogIn, ArrowRight, Brain, Microscope, Globe, BookOpen, Hospital, HeartPulse, GraduationCap } from "lucide-react";
import { translations } from "@/translations";

const Index = () => {
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = translations[language];
  
  const features = [
    {
      icon: <Brain className="h-12 w-12 text-medical-primary" />,
      title: language === "en" ? "AI-Powered Recommendations" : "Preporuke Temeljene na AI",
      description: language === "en" 
        ? "Get evidence-based antibiotic recommendations tailored to each patient's unique profile." 
        : "Dobijte preporuke antibiotika temeljene na dokazima i prilagođene jedinstvenom profilu svakog pacijenta."
    },
    {
      icon: <Microscope className="h-12 w-12 text-medical-primary" />,
      title: language === "en" ? "Clinical Precision" : "Klinička Preciznost",
      description: language === "en" 
        ? "Factor in allergies, renal function, and comorbidities for safer prescribing." 
        : "Uzmite u obzir alergije, bubrežnu funkciju i komorbiditete za sigurnije propisivanje."
    },
    {
      icon: <Globe className="h-12 w-12 text-medical-primary" />,
      title: language === "en" ? "Regional Adaptation" : "Regionalna Prilagodba",
      description: language === "en" 
        ? "Recommendations consider local resistance patterns for optimal outcomes." 
        : "Preporuke uzimaju u obzir lokalne obrasce otpornosti za optimalne ishode."
    },
    {
      icon: <BookOpen className="h-12 w-12 text-medical-primary" />,
      title: language === "en" ? "Continuous Learning" : "Kontinuirano Učenje",
      description: language === "en" 
        ? "Access educational resources to stay updated with the latest clinical guidelines." 
        : "Pristupite obrazovnim resursima kako biste bili u toku s najnovijim kliničkim smjernicama."
    }
  ];
  
  const sections = [
    {
      icon: <Hospital className="h-14 w-14 text-medical-primary" />,
      title: language === "en" ? "Clinical Decision Support" : "Podrška Kliničkom Odlučivanju",
      description: language === "en" 
        ? "Our system integrates the latest clinical guidelines with patient-specific data to provide personalized antibiotic recommendations that optimize treatment outcomes while minimizing risks." 
        : "Naš sustav integrira najnovije kliničke smjernice s podacima specifičnim za pacijenta kako bi pružio personalizirane preporuke antibiotika koje optimiziraju ishode liječenja uz minimiziranje rizika."
    },
    {
      icon: <HeartPulse className="h-14 w-14 text-medical-primary" />,
      title: language === "en" ? "Patient Safety Focus" : "Fokus na Sigurnost Pacijenata",
      description: language === "en" 
        ? "Every recommendation accounts for patient allergies, drug interactions, renal/hepatic function, and other critical factors to ensure the safest possible antibiotic regimen for each individual." 
        : "Svaka preporuka uzima u obzir alergije pacijenta, interakcije lijekova, bubrežnu/jetrenu funkciju i druge kritične faktore kako bi se osigurao najsigurniji mogući režim antibiotika za svakog pojedinca."
    },
    {
      icon: <GraduationCap className="h-14 w-14 text-medical-primary" />,
      title: language === "en" ? "Educational Resources" : "Obrazovni Resursi",
      description: language === "en" 
        ? "Beyond recommendations, we provide comprehensive educational materials to help clinicians stay current with evolving best practices in antibiotic stewardship and infectious disease management." 
        : "Osim preporuka, pružamo sveobuhvatne obrazovne materijale kako bismo pomogli kliničarima da ostanu u toku s evolucijom najboljih praksi u upravljanju antibioticima i zaraznim bolestima."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Horalix - Advanced AI Medical Decision Support System</title>
        <meta name="description" content="Horalix - Leading AI-powered medical decision support system for healthcare professionals. Get evidence-based antibiotic recommendations tailored to patient needs." />
        <meta name="keywords" content="Horalix, AI in medicine, medical AI, antibiotic recommendations, healthcare AI, clinical decision support, medical software" />
      </Helmet>

      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-auto">
        <header className="fixed top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img 
                  src={theme === 'dark' ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png" : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"} 
                  alt="Horalix Logo" 
                  className="h-8 w-auto" 
                />
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")} 
                  className="rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-gray-200" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700" />
                  )}
                </Button>
                <LanguageToggle />
                <Link to="/auth">
                  <Button 
                    size="sm" 
                    className="flex items-center gap-2 bg-medical-primary hover:bg-medical-primary-hover text-white rounded-full shadow-sm"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>{language === "en" ? "Sign In" : "Prijava"}</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full overflow-auto pt-24">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6 }} 
                  className="space-y-8"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    {language === "en" ? "Evidence-Based Antibiotic Recommendations" : "Preporuke Antibiotika Temeljene na Dokazima"}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {language === "en" 
                      ? "Horalix combines clinical expertise with advanced AI to deliver personalized antibiotic recommendations that help optimize patient outcomes." 
                      : "Horalix kombinira kliničku stručnost s naprednom umjetnom inteligencijom za pružanje personaliziranih preporuka antibiotika koje pomažu u optimizaciji ishoda pacijenata."}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/advisor">
                      <Button 
                        size="lg" 
                        className="bg-medical-primary hover:bg-medical-primary-hover text-white rounded-full shadow-md group"
                      >
                        {language === "en" ? "Enter Application" : "Uđi u Aplikaciju"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {language === "en" ? "Learn More" : "Saznaj Više"}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.7, delay: 0.2 }} 
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-xl">
                    <img 
                      src="/lovable-uploads/c6384933-7f76-44d0-b4ab-45145d7d7c61.png" 
                      alt="Horalix Dashboard" 
                      className="w-full h-auto object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-white/10"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === "en" ? "Key Features" : "Ključne Značajke"}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {language === "en" 
                    ? "Horalix combines clinical expertise with advanced technology to provide accurate, personalized antibiotic recommendations." 
                    : "Horalix kombinira kliničku stručnost s naprednom tehnologijom za pružanje točnih, personaliziranih preporuka antibiotika."}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.5, delay: index * 0.1 }} 
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm"
                  >
                    <div className="mb-6 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* In-Depth Sections */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-32">
              {sections.map((section, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7 }} 
                  viewport={{ once: true, margin: "-100px" }} 
                  className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}
                >
                  <div className="md:w-1/2">
                    <div className="rounded-3xl p-12 flex items-center justify-center shadow-lg bg-white dark:bg-gray-800">
                      {section.icon}
                    </div>
                  </div>
                  <div className="md:w-1/2 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {section.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/20">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.6 }} 
                viewport={{ once: true }} 
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {language === "en" 
                    ? "Ready to transform your antibiotic prescribing practice?" 
                    : "Spremni za transformaciju vaše prakse propisivanja antibiotika?"}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {language === "en" 
                    ? "Join thousands of healthcare professionals who trust Horalix to support their clinical decision-making." 
                    : "Pridružite se tisućama zdravstvenih djelatnika koji vjeruju Horalixu u podršci njihovom kliničkom odlučivanju."}
                </p>
                <Link to="/advisor">
                  <Button 
                    size="lg" 
                    className="bg-medical-primary hover:bg-medical-primary-hover text-white rounded-full shadow-md"
                  >
                    {language === "en" 
                      ? "Try Antibiotic Advisor Now" 
                      : "Isprobajte Savjetnik za Antibiotike Sada"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        
        <footer className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex justify-center md:justify-start">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png" 
                    : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"} 
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
