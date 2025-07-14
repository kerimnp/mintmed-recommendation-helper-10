import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ProfileDropdown } from "@/components/admin/dashboard/layout/ProfileDropdown";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Sun, Moon, LogIn, ArrowRight, Brain, Microscope, Globe, BookOpen, Hospital, HeartPulse, GraduationCap, Euro } from "lucide-react";
import { translations } from "@/translations";

const Index = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const t = translations[language];
  
  const features = [
    {
      icon: Brain,
      title: language === "en" ? "AI-Powered Recommendations" : "Preporuke Temeljene na AI",
      description: language === "en" 
        ? "Get evidence-based antibiotic recommendations tailored to each patient's unique profile." 
        : "Dobijte preporuke antibiotika temeljene na dokazima i prilagođene jedinstvenom profilu svakog pacijenta."
    },
    {
      icon: Microscope,
      title: language === "en" ? "Clinical Precision" : "Klinička Preciznost",
      description: language === "en" 
        ? "Factor in allergies, renal function, and comorbidities for safer prescribing." 
        : "Uzmite u obzir alergije, bubrežnu funkciju i komorbiditete za sigurnije propisivanje."
    },
    {
      icon: Globe,
      title: language === "en" ? "Regional Adaptation" : "Regionalna Prilagodba",
      description: language === "en" 
        ? "Recommendations consider local resistance patterns for optimal outcomes." 
        : "Preporuke uzimaju u obzir lokalne obrasce otpornosti za optimalne ishode."
    },
    {
      icon: BookOpen,
      title: language === "en" ? "Continuous Learning" : "Kontinuirano Učenje",
      description: language === "en" 
        ? "Access educational resources to stay updated with the latest clinical guidelines." 
        : "Pristupite obrazovnim resursima kako biste bili u toku s najnovijim kliničkim smjernicama."
    }
  ];
  
  const sections = [
    {
      icon: Hospital,
      title: language === "en" ? "Clinical Decision Support" : "Podrška Kliničkom Odlučivanju",
      description: language === "en" 
        ? "Our system integrates the latest clinical guidelines with patient-specific data to provide personalized antibiotic recommendations that optimize treatment outcomes while minimizing risks." 
        : "Naš sustav integrira najnovije kliničke smjernice s podacima specifičnim za pacijenta kako bi pružio personalizirane preporuke antibiotika koje optimiziraju ishode liječenja uz minimiziranje rizika.",
      features: [
        language === "en" ? "Evidence-based protocols" : "Protokoli temeljeni na dokazima",
        language === "en" ? "Patient-specific recommendations" : "Preporuke specifične za pacijenta",
        language === "en" ? "Risk assessment integration" : "Integracija procjene rizika"
      ]
    },
    {
      icon: HeartPulse,
      title: language === "en" ? "Patient Safety Focus" : "Fokus na Sigurnost Pacijenata",
      description: language === "en" 
        ? "Every recommendation accounts for patient allergies, drug interactions, renal/hepatic function, and other critical factors to ensure the safest possible antibiotic regimen for each individual." 
        : "Svaka preporuka uzima u obzir alergije pacijenta, interakcije lijekova, bubrežnu/jetrenu funkciju i druge kritične faktore kako bi se osigurao najsigurniji mogući režim antibiotika za svakog pojedinca.",
      features: [
        language === "en" ? "Allergy screening" : "Provjera alergija",
        language === "en" ? "Drug interaction alerts" : "Upozorenja o interakcijama lijekova",
        language === "en" ? "Organ function monitoring" : "Praćenje funkcije organa"
      ]
    },
    {
      icon: GraduationCap,
      title: language === "en" ? "Educational Resources" : "Obrazovni Resursi",
      description: language === "en" 
        ? "Beyond recommendations, we provide comprehensive educational materials to help clinicians stay current with evolving best practices in antibiotic stewardship and infectious disease management." 
        : "Osim preporuka, pružamo sveobuhvatne obrazovne materijale kako bismo pomogli kliničarima da ostanu u toku s evolucijom najboljih praksi u upravljanju antibioticima i zaraznim bolestima.",
      features: [
        language === "en" ? "Latest clinical guidelines" : "Najnovije kliničke smjernice",
        language === "en" ? "Continuing education" : "Kontinuirana edukacija",
        language === "en" ? "Expert insights" : "Stručni uvidi"
      ]
    }
  ];

  const isAuthenticated = !!user;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Helmet>
          <title>Horalix - Advanced AI Medical Decision Support</title>
          <meta name="description" content="Evidence-based antibiotic recommendations powered by AI for healthcare professionals" />
          <meta property="og:title" content="Horalix - Advanced AI Medical Decision Support" />
          <meta property="og:description" content="Evidence-based antibiotic recommendations powered by AI for healthcare professionals" />
          <meta property="og:image" content="/og-image.png" />
          <meta property="og:url" content="https://horalix.lovable.app" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Horalix - Advanced AI Medical Decision Support" />
          <meta name="twitter:description" content="Evidence-based antibiotic recommendations powered by AI for healthcare professionals" />
          <meta name="twitter:image" content="/og-image.png" />
          <link rel="canonical" href="https://horalix.lovable.app" />
        </Helmet>

        {/* Header */}
        <header className="w-full px-4 lg:px-6 h-20 flex items-center justify-between glass-card border-0 border-b border-glass-border">
          <Link className="flex items-center justify-center" to="/">
            <img 
              src={theme === "dark" ? "/lovable-uploads/3b15bc71-cc46-4d9b-9e09-6b81f6ff7c6e.png" : "/lovable-uploads/92c5f2b1-19c5-4f1e-a056-55f1d63ebeff.png"}
              alt="Horalix Logo" 
              className="h-10 w-auto hover-glow transition-all duration-300"
            />
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <LanguageToggle />
            <Link className="text-sm font-medium hover:text-primary transition-colors duration-300 flex items-center gap-2" to="/pricing">
              <Euro className="w-4 h-4" />
              {language === "en" ? "Pricing" : "Cijene"}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-10 h-10 hover-glow"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Link to="/auth">
                <Button variant="premium" size="sm" className="animate-glow">
                  <LogIn className="w-4 h-4 mr-2" />
                  {language === "en" ? "Sign In" : "Prijava"}
                </Button>
              </Link>
            )}
          </nav>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-20 md:py-32 lg:py-40 xl:py-56 relative overflow-hidden">
            <div className="absolute inset-0 hero-gradient opacity-30"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <motion.div 
                className="flex flex-col items-center space-y-8 text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="space-y-6">
                  <motion.h1 
                    className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-gradient"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                  >
                    {language === "en" ? "Evidence-Based Antibiotic Recommendations" : "Preporuke Antibiotika Temeljene na Dokazima"}
                  </motion.h1>
                  <motion.p 
                    className="mx-auto max-w-[800px] text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    {language === "en" ? "Advanced AI-powered clinical decision support for optimal patient care" : "Napredna AI podrška za kliničke odluke za optimalnu skrb o pacijentima"}
                  </motion.p>
                </div>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <Button variant="premium" size="xl" className="group">
                        {language === "en" ? "Enter Application" : "Uđi u Aplikaciju"}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <Button variant="premium" size="xl" className="group">
                        {language === "en" ? "Get Started" : "Počni"}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                  <Link to="/pricing">
                    <Button variant="glass" size="xl">
                      {language === "en" ? "Learn More" : "Saznaj Više"}
                    </Button>
                  </Link>
                </motion.div>
                
                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-40 right-20 w-12 h-12 bg-accent/20 rounded-full blur-lg animate-float" style={{animationDelay: "2s"}}></div>
                <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-primary-glow/30 rounded-full blur-sm animate-float" style={{animationDelay: "4s"}}></div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full py-20 md:py-32 lg:py-40 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <motion.div 
                className="flex flex-col items-center justify-center space-y-6 text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="space-y-4">
                  <motion.h2 
                    className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-gradient"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {language === "en" ? "Advanced Features" : "Napredne Značajke"}
                  </motion.h2>
                  <motion.p 
                    className="max-w-[900px] text-lg md:text-xl text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {language === "en" ? "Cutting-edge technology meets clinical expertise for optimal patient outcomes" : "Najnovija tehnologija spaja se s kliničkom stručnošću za optimalne ishode pacijenata"}
                  </motion.p>
                </div>
              </motion.div>
              <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-4 lg:gap-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`card-premium p-8 text-center group hover-lift animate-fade-in stagger-${index + 1}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="feature-icon w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-10 w-10 text-primary mx-auto" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* In-depth Sections */}
          <section className="w-full py-20 md:py-32 lg:py-40">
            <div className="container px-4 md:px-6">
              <div className="grid gap-20 lg:gap-32">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <motion.div 
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="feature-icon">
                          <section.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-gradient">{section.title}</h2>
                      </motion.div>
                      <motion.p 
                        className="max-w-[600px] text-lg md:text-xl text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {section.description}
                      </motion.p>
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        {section.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-4 group">
                            <div className="h-3 w-3 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                            <span className="text-foreground group-hover:text-primary transition-colors duration-300">{feature}</span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                    <motion.div 
                      className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="glass-hero aspect-video rounded-2xl flex items-center justify-center p-12 group hover-glow">
                        <section.icon className="h-24 w-24 text-primary group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <motion.div 
                className="glass-hero max-w-4xl mx-auto p-12 md:p-16 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  <motion.h2 
                    className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-gradient"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {language === "en" ? "Ready to Transform Healthcare?" : "Spremni Transformirati Zdravstvo?"}
                  </motion.h2>
                  <motion.p 
                    className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {language === "en" ? "Join healthcare professionals worldwide who trust Horalix for evidence-based care" : "Pridružite se zdravstvenim djelatnicima širom svijeta koji vjeruju Horalixu"}
                  </motion.p>
                </div>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <Button variant="premium" size="xl" className="group">
                        {language === "en" ? "Enter Application" : "Uđi u Aplikaciju"}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <Button variant="premium" size="xl" className="group">
                        {language === "en" ? "Get Started" : "Počni"}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                  <Link to="/pricing">
                    <Button variant="accent" size="xl">
                      {language === "en" ? "Pricing" : "Cijene"}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-20 left-20 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-float" style={{animationDelay: "3s"}}></div>
          </section>
        </main>

        {/* Footer */}
        <footer className="glass-card border-0 border-t border-glass-border mt-20">
          <div className="container px-4 md:px-6 py-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={theme === "dark" ? "/lovable-uploads/3b15bc71-cc46-4d9b-9e09-6b81f6ff7c6e.png" : "/lovable-uploads/92c5f2b1-19c5-4f1e-a056-55f1d63ebeff.png"}
                  alt="Horalix Logo" 
                  className="h-8 w-auto opacity-80"
                />
                <p className="text-sm text-muted-foreground">
                  © 2024 Horalix. All rights reserved.
                </p>
              </div>
              <nav className="flex gap-6">
                <Link className="text-sm hover:text-primary transition-colors duration-300" to="/terms">
                  Terms of Service
                </Link>
                <Link className="text-sm hover:text-primary transition-colors duration-300" to="/privacy">
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;