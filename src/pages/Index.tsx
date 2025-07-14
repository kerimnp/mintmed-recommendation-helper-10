import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ProfileDropdown } from "@/components/admin/dashboard/layout/ProfileDropdown";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Sun, Moon, LogIn, ArrowRight, Brain, Microscope, Globe, BookOpen, Hospital, HeartPulse, GraduationCap, UserPlus, Shield, Clock, Users } from "lucide-react";
import { translations } from "@/translations";
import medicalHero from "@/assets/medical-hero.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import clinicalPrecision from "@/assets/clinical-precision.jpg";

const Index = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
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
                  className="rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-gray-200" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700" />
                  )}
                </Button>
                
                <Link to="/pricing">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-2 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                  >
                    <span className="hidden sm:inline">{language === "en" ? "Pricing" : "Cijene"}</span>
                  </Button>
                </Link>
                
                <LanguageToggle />
                
                {user ? (
                  <ProfileDropdown />
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/auth">
                      <Button 
                        variant="ghost"
                        size="sm" 
                        className="flex items-center gap-2 rounded-full"
                      >
                        <LogIn className="h-4 w-4" />
                        <span className="hidden sm:inline">{language === "en" ? "Sign In" : "Prijava"}</span>
                      </Button>
                    </Link>
                    <Link to="/auth?mode=signup">
                      <Button 
                        size="sm" 
                        className="flex items-center gap-2 rounded-full shadow-sm"
                      >
                        <UserPlus className="h-4 w-4" />
                        <span className="hidden sm:inline">{language === "en" ? "Get Started" : "Počni"}</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="w-full overflow-auto pt-24">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Hero Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-background"></div>
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${medicalHero})` }}
            ></div>
            
            <div className="relative max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6 }} 
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <Shield className="h-4 w-4 mr-2" />
                      {language === "en" ? "Clinically Validated AI" : "Klinički Validiran AI"}
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      {language === "en" ? "Smarter Antibiotic Decisions" : "Pametnije Odluke o Antibioticima"}
                      <span className="block text-primary">
                        {language === "en" ? "Better Patient Care" : "Bolja Briga o Pacijentima"}
                      </span>
                    </h1>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {language === "en" 
                      ? "Transform your antibiotic prescribing with AI-powered recommendations based on the latest clinical guidelines, patient data, and local resistance patterns." 
                      : "Transformišite propisivanje antibiotika uz AI preporuke zasnovane na najnovijim kliničkim smernicama, podacima o pacijentima i lokalnim obrascima otpornosti."}
                  </p>
                  
                  {/* Key Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        {language === "en" ? "Instant Analysis" : "Trenutna Analiza"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        {language === "en" ? "Safety First" : "Sigurnost Prvo"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        {language === "en" ? "Trusted by 10K+" : "Poverenje 10K+"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link to="/auth?mode=signup">
                      <Button 
                        size="lg" 
                        className="rounded-full shadow-lg group"
                      >
                        {language === "en" ? "Start Free Trial" : "Počni Besplatno"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/advisor">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="rounded-full"
                      >
                        {language === "en" ? "View Demo" : "Pogledaj Demo"}
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
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-3xl blur-xl transform rotate-3"></div>
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-16 flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/e4119d6c-ac9d-4d72-b8cf-fb248447340e.png" 
                        alt="Horalix Logo" 
                        className="w-48 h-auto object-contain filter brightness-0 invert" 
                      />
                    </div>
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
                    {index === 1 ? (
                      <div className="relative">
                        <img 
                          src={clinicalPrecision} 
                          alt="Clinical Precision" 
                          className="w-full h-auto rounded-3xl shadow-xl" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl"></div>
                      </div>
                    ) : (
                      <div className="rounded-3xl p-12 flex items-center justify-center shadow-lg bg-card border">
                        {section.icon}
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 space-y-6">
                    <h3 className="text-3xl font-bold text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                    {index === 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-muted-foreground">
                            {language === "en" ? "Integration with EHR systems" : "Integracija sa EHR sistemima"}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-muted-foreground">
                            {language === "en" ? "Real-time clinical guidelines" : "Kliničke smernice u realnom vremenu"}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-muted-foreground">
                            {language === "en" ? "Customizable alert thresholds" : "Prilagodljivi pragovi upozorenja"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(217,91%,58%)_1px,transparent_0)] bg-[length:60px_60px] opacity-5"></div>
            </div>
            <div className="relative max-w-5xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.6 }} 
                viewport={{ once: true }} 
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-foreground">
                    {language === "en" 
                      ? "Ready to enhance patient care?" 
                      : "Spremni za poboljšanje brige o pacijentima?"}
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    {language === "en" 
                      ? "Join over 10,000 healthcare professionals who trust Horalix for evidence-based antibiotic recommendations." 
                      : "Pridružite se preko 10.000 zdravstvenih radnika koji veruju Horalixu za preporuke antibiotika zasnovane na dokazima."}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/auth?mode=signup">
                    <Button 
                      size="lg" 
                      className="rounded-full shadow-lg group min-w-[200px]"
                    >
                      {language === "en" 
                        ? "Start Free Trial" 
                        : "Počni Besplatno"}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button 
                      variant="outline"
                      size="lg" 
                      className="rounded-full min-w-[200px]"
                    >
                      {language === "en" 
                        ? "View Pricing" 
                        : "Pogledaj Cene"}
                    </Button>
                  </Link>
                </div>
                
                <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    {language === "en" ? "HIPAA Compliant" : "HIPAA Usklađeno"}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    {language === "en" ? "Setup in 5 minutes" : "Podešavanje za 5 minuta"}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
