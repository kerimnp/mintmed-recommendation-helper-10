import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Shield, Zap, Users, ChevronRight, Star, ArrowRight, MessageSquare, Heart, Sparkles, Globe, Award, Clock, Sun, Moon, Microscope, Activity, FileText, Database, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { LanguageToggle } from "@/components/LanguageToggle";
import horalixLogo from "/lovable-uploads/03dd4946-134b-4dfe-8fc7-407235ed8685.png";

const Index = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const translations = {
    en: {
      meta: {
        title: "HORALIX Antibioteka - AI-Powered Antibiotic Recommendation System | Evidence-Based Clinical Decision Support",
        description: "HORALIX Antibioteka revolutionizes antimicrobial stewardship with AI-powered antibiotic recommendations. Evidence-based clinical decision support for healthcare professionals worldwide.",
        keywords: "antibiotic recommendation system, antimicrobial stewardship, AI healthcare, clinical decision support, infectious disease management, hospital software, antibiotic resistance, evidence-based medicine, IDSA guidelines, CDC protocols, WHO recommendations"
      },
      hero: {
        title: "Intelligent Antibiotic Recommendations",
        subtitle: "Evidence-based clinical decision support powered by AI for optimal patient outcomes and antimicrobial stewardship",
        button: "Start Clinical Assessment",
        learnMore: "Discover More",
        trusted: "Trusted by leading hospitals worldwide"
      },
      features: {
        medical: {
          title: "Evidence-Based Medicine",
          description: "All recommendations follow IDSA, CDC, and WHO clinical guidelines with real-time updates from peer-reviewed research.",
          icon: "🔬"
        },
        ai: {
          title: "Advanced AI Engine",
          description: "Sophisticated algorithms analyze patient data, pathogen patterns, and local resistance trends for personalized recommendations.",
          icon: "🧠"
        },
        security: {
          title: "HIPAA-Compliant Security",
          description: "Enterprise-grade security with end-to-end encryption ensuring complete patient data protection and regulatory compliance.",
          icon: "🛡️"
        },
        collaboration: {
          title: "Clinical Workflow Integration",
          description: "Seamless integration with EHR systems and hospital workflows to support collaborative antimicrobial stewardship programs.",
          icon: "⚡"
        }
      },
      sections: {
        analytics: {
          title: "Real-Time Resistance Monitoring",
          description: "Track local and regional resistance patterns with advanced analytics to optimize empirical therapy selections and support evidence-based decisions.",
          stats: "99.7% accuracy in resistance prediction"
        },
        quality: {
          title: "Complete Clinical Documentation",
          description: "Comprehensive audit trails and detailed rationale for every recommendation ensure transparency and support clinical decision-making with complete traceability.",
          stats: "100% audit compliance guaranteed"
        },
        team: {
          title: "Expert Clinical Validation",
          description: "Every recommendation is validated by board-certified infectious disease specialists and clinical pharmacists to ensure the highest standards of clinical accuracy.",
          stats: "500+ clinical experts worldwide"
        }
      },
      cta: {
        title: "Transform Your Antimicrobial Stewardship",
        subtitle: "Join leading hospitals worldwide in implementing evidence-based antibiotic recommendations to improve patient outcomes and combat resistance.",
        button: "Get Started Today",
        contact: "Schedule Demo"
      }
    },
    bs: {
      meta: {
        title: "HORALIX Antibioteka - AI sistem za preporuke antibiotika | Klinička podrška zasnovana na dokazima",
        description: "HORALIX Antibioteka revolucionizuje antimikrobno upravljanje sa AI preporukama antibiotika. Klinička podrška zasnovana na dokazima za zdravstvene profesionalce širom sveta.",
        keywords: "sistem preporuka antibiotika, antimikrobno upravljanje, AI zdravstvo, klinička podrška odlučivanju, upravljanje zaraznim bolestima, bolnički softver, otpornost na antibiotike, medicina zasnovana na dokazima"
      },
      hero: {
        title: "Inteligentne preporuke antibiotika",
        subtitle: "Klinička podrška zasnovana na dokazima pokretana AI za optimalne ishode pacijenata i antimikrobno upravljanje",
        button: "Počni kliničku procenu",
        learnMore: "Saznaj više",
        trusted: "Povereno od vodećih bolnica širom sveta"
      },
      features: {
        medical: {
          title: "Medicina zasnovana na dokazima",
          description: "Sve preporuke prate IDSA, CDC i WHO kliničke smernice sa ažuriranjima u realnom vremenu iz stručne literature.",
          icon: "🔬"
        },
        ai: {
          title: "Napredni AI motor",
          description: "Sofisticirani algoritmi analiziraju podatke pacijenata, obrasce patogena i lokalne trendove otpornosti za personalizovane preporuke.",
          icon: "🧠"
        },
        security: {
          title: "HIPAA usaglašena bezbednost",
          description: "Bezbednost na nivou preduzeća sa end-to-end enkripcijom obezbeđuje potpunu zaštitu podataka pacijenata i usaglašenost.",
          icon: "🛡️"
        },
        collaboration: {
          title: "Integracija kliničkog toka rada",
          description: "Besprekorna integracija sa EHR sistemima i bolničkim tokovima rada za podršku kolaborativnim programima antimikrobnog upravljanja.",
          icon: "⚡"
        }
      },
      sections: {
        analytics: {
          title: "Praćenje otpornosti u realnom vremenu",
          description: "Pratite lokalne i regionalne obrasce otpornosti sa naprednom analitikom za optimizaciju selekcije empirijske terapije.",
          stats: "99.7% tačnost u predviđanju otpornosti"
        },
        quality: {
          title: "Kompletna klinička dokumentacija",
          description: "Sveobuhvatni tragovi revizije i detaljno obrazloženje za svaku preporuku osiguravaju transparentnost i podržavaju kliničko odlučivanje.",
          stats: "100% garantovana usaglašenost revizije"
        },
        team: {
          title: "Ekspertska klinička validacija",
          description: "Svaku preporuku validiraju sertifikovani specijalisti za zarazne bolesti i klinički farmaceuti za najviše standarde kliničke tačnosti.",
          stats: "500+ kliničkih eksperata širom sveta"
        }
      },
      cta: {
        title: "Transformišite vaše antimikrobno upravljanje",
        subtitle: "Pridružite se vodećim bolnicama širom sveta u implementaciji preporuka antibiotika zasnovanih na dokazima.",
        button: "Počni danas",
        contact: "Zakaži demo"
      }
    }
  };

  const t = translations[language];

  const features = [
    {
      icon: Microscope,
      title: t.features.medical.title,
      description: t.features.medical.description,
      emoji: t.features.medical.icon,
      color: "from-ios-blue to-ios-purple"
    },
    {
      icon: Brain,
      title: t.features.ai.title,
      description: t.features.ai.description,
      emoji: t.features.ai.icon,
      color: "from-ios-purple to-ios-blue"
    },
    {
      icon: Shield,
      title: t.features.security.title,
      description: t.features.security.description,
      emoji: t.features.security.icon,
      color: "from-ios-green to-ios-blue"
    },
    {
      icon: Activity,
      title: t.features.collaboration.title,
      description: t.features.collaboration.description,
      emoji: t.features.collaboration.icon,
      color: "from-ios-orange to-ios-red"
    },
  ];

  const sections = [
    {
      icon: Database,
      title: t.sections.analytics.title,
      description: t.sections.analytics.description,
      stats: t.sections.analytics.stats,
      color: "bg-gradient-to-br from-ios-blue/10 to-ios-purple/10"
    },
    {
      icon: FileText,
      title: t.sections.quality.title,
      description: t.sections.quality.description,
      stats: t.sections.quality.stats,
      color: "bg-gradient-to-br from-ios-green/10 to-ios-blue/10"
    },
    {
      icon: Award,
      title: t.sections.team.title,
      description: t.sections.team.description,
      stats: t.sections.team.stats,
      color: "bg-gradient-to-br from-ios-orange/10 to-ios-red/10"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horalix.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <link rel="canonical" href="https://horalix.com" />
      </Helmet>

      {/* Header */}
      <header className="glass-nav sticky top-0 z-50 w-full">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="flex items-center space-x-3">
            <img src={horalixLogo} alt="HORALIX" className="h-10 w-10" />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-ios-blue bg-clip-text text-transparent">HORALIX</span>
              <span className="text-xs text-muted-foreground -mt-1">Antibioteka</span>
            </div>
          </div>
          
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/features" className="hover:text-primary transition-colors">Features</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="glass-button"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <LanguageToggle />
              {user ? (
                <Button asChild size="sm" className="bg-gradient-ios-blue text-white">
                  <Link to="/admin">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild size="sm" className="bg-gradient-ios-blue text-white">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container space-y-8 py-16 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-hero p-12 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center mb-8">
                <img src={horalixLogo} alt="HORALIX" className="h-20 w-20 mr-4" />
                <div className="text-left">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                    HORALIX
                  </h1>
                  <p className="text-xl text-muted-foreground mt-2">Antibioteka AI</p>
                </div>
              </div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6"
              >
                {t.hero.title}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="bg-gradient-ios-blue text-white text-lg px-8 py-3">
                  <Link to="/auth">{t.hero.button}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass-button text-lg px-8 py-3">
                  <Link to="/about">{t.hero.learnMore}</Link>
                </Button>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2"
              >
                <Star className="h-4 w-4 text-ios-orange fill-current" />
                {t.hero.trusted}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Core Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive clinical decision support powered by evidence-based medicine
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-8"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                    <span className="text-2xl">{feature.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* In-depth Sections */}
        <section className="container py-16 md:py-24">
          <div className="space-y-24">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="grid gap-12 lg:grid-cols-2 items-center"
              >
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-ios-blue flex items-center justify-center">
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{section.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-ios-green"></div>
                    <span className="text-sm font-medium text-ios-green">{section.stats}</span>
                  </div>
                </div>
                <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className={`w-full max-w-md aspect-square ${section.color} border-0`}>
                    <CardContent className="flex items-center justify-center h-full">
                      <section.icon className="h-32 w-32 text-primary opacity-50" />
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glass-hero p-12 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t.cta.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-ios-blue text-white text-lg px-8 py-3">
                <Link to="/auth">{t.cta.button}</Link>
              </Button>
              <Button variant="outline" size="lg" className="glass-button text-lg px-8 py-3">
                {t.cta.contact}
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src={horalixLogo} alt="HORALIX" className="h-8 w-8" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold bg-gradient-ios-blue bg-clip-text text-transparent">HORALIX</span>
              <span className="text-xs text-muted-foreground -mt-1">Antibioteka</span>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            © 2024 HORALIX. All rights reserved. | AI-Powered Antibiotic Recommendation System
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <a href="/humans.txt" className="hover:text-primary transition-colors">Team</a>
            <a href="/security.txt" className="hover:text-primary transition-colors">Security</a>
            <a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;