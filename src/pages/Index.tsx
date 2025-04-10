
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

  const sections = [
    {
      icon: <Hospital className="h-12 w-12 text-blue-600" />,
      title: language === "en" ? "Clinical Decision Support" : "Podrška Kliničkom Odlučivanju",
      description: language === "en"
        ? "Our system integrates the latest clinical guidelines with patient-specific data to provide personalized antibiotic recommendations that optimize treatment outcomes while minimizing risks."
        : "Naš sustav integrira najnovije kliničke smjernice s podacima specifičnim za pacijenta kako bi pružio personalizirane preporuke antibiotika koje optimiziraju ishode liječenja uz minimiziranje rizika."
    },
    {
      icon: <HeartPulse className="h-12 w-12 text-red-500" />,
      title: language === "en" ? "Patient Safety Focus" : "Fokus na Sigurnost Pacijenata",
      description: language === "en"
        ? "Every recommendation accounts for patient allergies, drug interactions, renal/hepatic function, and other critical factors to ensure the safest possible antibiotic regimen for each individual."
        : "Svaka preporuka uzima u obzir alergije pacijenta, interakcije lijekova, bubrežnu/jetrenu funkciju i druge kritične faktore kako bi se osigurao najsigurniji mogući režim antibiotika za svakog pojedinca."
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-green-600" />,
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
          {/* Hero Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    {language === "en" 
                      ? "Evidence-Based Antibiotic Recommendations" 
                      : "Preporuke Antibiotika Temeljene na Dokazima"}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {language === "en"
                      ? "Horalix combines clinical expertise with advanced AI to deliver personalized antibiotic recommendations that help optimize patient outcomes."
                      : "Horalix kombinira kliničku stručnost s naprednom umjetnom inteligencijom za pružanje personaliziranih preporuka antibiotika koje pomažu u optimizaciji ishoda pacijenata."}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/advisor">
                      <Button size="lg" className="bg-medical-primary hover:bg-medical-primary-hover text-white group">
                        {language === "en" ? "Enter Application" : "Uđi u Aplikaciju"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/admin">
                      <Button variant="outline" size="lg">
                        {language === "en" ? "Explore Dashboard" : "Istražite Nadzornu Ploču"}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-xl">
                    <img 
                      src="/lovable-uploads/c6384933-7f76-44d0-b4ab-45145d7d7c61.png" 
                      alt="Horalix Dashboard" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 ios-card-shadow"
                  >
                    <div className="rounded-full w-16 h-16 bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* In-Depth Sections */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-24">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
                >
                  <div className="md:w-1/2">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-10 flex items-center justify-center ios-card-shadow">
                      {section.icon}
                    </div>
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{section.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-blue-900/20">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
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
                  <Button size="lg" className="bg-medical-primary hover:bg-medical-primary-hover text-white">
                    {language === "en" ? "Try Antibiotic Advisor Now" : "Isprobajte Savjetnik za Antibiotike Sada"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
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
