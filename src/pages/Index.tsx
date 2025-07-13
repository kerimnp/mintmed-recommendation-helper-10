import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from 'next-themes';
import { Button } from '../components/ui/button';
import { LanguageToggle } from '../components/LanguageToggle';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Brain, 
  Shield, 
  Users, 
  TrendingUp, 
  Award,
  Sun,
  Moon,
  Microscope,
  Activity,
  FileText,
  Database
} from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const translations = {
    en: {
      meta: {
        title: "Antibioteka - AI-Powered Antibiotic Recommendation System | Evidence-Based Clinical Decision Support",
        description: "Antibioteka revolutionizes antimicrobial stewardship with AI-powered antibiotic recommendations. Evidence-based clinical decision support for healthcare professionals worldwide.",
        keywords: "antibiotic recommendation system, antimicrobial stewardship, AI healthcare, clinical decision support, infectious disease management, hospital software, antibiotic resistance, evidence-based medicine, IDSA guidelines, CDC protocols, WHO recommendations"
      },
      hero: {
        title: "AI-Powered Antibiotic Recommendations",
        subtitle: "Evidence-based clinical decision support for optimal patient outcomes",
        button: "Start Clinical Assessment",
        learnMore: "Learn More"
      },
      features: {
        medical: {
          title: "Evidence-Based Medicine",
          description: "All recommendations follow IDSA, CDC, and WHO clinical guidelines with real-time updates from peer-reviewed research."
        },
        ai: {
          title: "Advanced AI Engine",
          description: "Sophisticated algorithms analyze patient data, pathogen patterns, and local resistance trends for personalized recommendations."
        },
        security: {
          title: "HIPAA-Compliant Security",
          description: "Enterprise-grade security with end-to-end encryption ensuring complete patient data protection and regulatory compliance."
        },
        collaboration: {
          title: "Clinical Workflow Integration",
          description: "Seamless integration with EHR systems and hospital workflows to support collaborative antimicrobial stewardship programs."
        }
      },
      sections: {
        analytics: {
          title: "Antimicrobial Resistance Monitoring",
          description: "Real-time tracking of local and regional resistance patterns helps optimize empirical therapy selections and supports evidence-based antibiotic stewardship decisions."
        },
        quality: {
          title: "Clinical Documentation",
          description: "Comprehensive audit trails and detailed rationale for every recommendation ensure transparency and support clinical decision-making with complete traceability."
        },
        team: {
          title: "Expert Clinical Validation",
          description: "Every recommendation is validated by board-certified infectious disease specialists and clinical pharmacists to ensure the highest standards of clinical accuracy."
        }
      },
      cta: {
        title: "Transform Your Antimicrobial Stewardship",
        subtitle: "Join leading hospitals worldwide in implementing evidence-based antibiotic recommendations to improve patient outcomes and combat resistance.",
        button: "Get Started"
      }
    },
    bs: {
      meta: {
        title: "Antibioteka - AI sistem za preporuke antibiotika | Klinička podrška zasnovana na dokazima",
        description: "Antibioteka revolucionizuje antimikrobno upravljanje sa AI preporukama antibiotika. Klinička podrška zasnovana na dokazima za zdravstvene profesionalce širom sveta.",
        keywords: "sistem preporuka antibiotika, antimikrobno upravljanje, AI zdravstvo, klinička podrška odlučivanju, upravljanje zaraznim bolestima, bolnički softver, otpornost na antibiotike, medicina zasnovana na dokazima"
      },
      hero: {
        title: "AI preporuke antibiotika",
        subtitle: "Klinička podrška zasnovana na dokazima za optimalne ishode pacijenata",
        button: "Počni kliničku procenu",
        learnMore: "Saznaj više"
      },
      features: {
        medical: {
          title: "Medicina zasnovana na dokazima",
          description: "Sve preporuke prate IDSA, CDC i WHO kliničke smernice sa ažuriranjima u realnom vremenu iz stručne literature."
        },
        ai: {
          title: "Napredni AI motor",
          description: "Sofisticirani algoritmi analiziraju podatke pacijenata, obrasce patogena i lokalne trendove otpornosti za personalizovane preporuke."
        },
        security: {
          title: "HIPAA usaglašena bezbednost",
          description: "Bezbednost na nivou preduzeća sa end-to-end enkripcijom obezbeđuje potpunu zaštitu podataka pacijenata i usaglašenost."
        },
        collaboration: {
          title: "Integracija kliničkog toka rada",
          description: "Besprekorna integracija sa EHR sistemima i bolničkim tokovima rada za podršku kolaborativnim programima antimikrobnog upravljanja."
        }
      },
      sections: {
        analytics: {
          title: "Praćenje antimikrobne otpornosti",
          description: "Praćenje u realnom vremenu lokalnih i regionalnih obrazaca otpornosti pomaže u optimizaciji selekcije empirijske terapije."
        },
        quality: {
          title: "Klinička dokumentacija",
          description: "Sveobuhvatni tragovi revizije i detaljno obrazloženje za svaku preporuku osiguravaju transparentnost i podržavaju kliničko odlučivanje."
        },
        team: {
          title: "Ekspertska klinička validacija",
          description: "Svaku preporuku validiraju sertifikovani specijalisti za zarazne bolesti i klinički farmaceuti za najviše standarde kliničke tačnosti."
        }
      },
      cta: {
        title: "Transformišite vaše antimikrobno upravljanje",
        subtitle: "Pridružite se vodećim bolnicama širom sveta u implementaciji preporuka antibiotika zasnovanih na dokazima.",
        button: "Počni"
      }
    }
  };

  const t = translations[language];

  const features = [
    {
      icon: Microscope,
      title: t.features.medical.title,
      description: t.features.medical.description,
    },
    {
      icon: Brain,
      title: t.features.ai.title,
      description: t.features.ai.description,
    },
    {
      icon: Shield,
      title: t.features.security.title,
      description: t.features.security.description,
    },
    {
      icon: Activity,
      title: t.features.collaboration.title,
      description: t.features.collaboration.description,
    },
  ];

  const sections = [
    {
      icon: Database,
      title: t.sections.analytics.title,
      description: t.sections.analytics.description,
    },
    {
      icon: FileText,
      title: t.sections.quality.title,
      description: t.sections.quality.description,
    },
    {
      icon: Stethoscope,
      title: t.sections.team.title,
      description: t.sections.team.description,
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
        <meta property="og:url" content="https://antibioteka.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <link rel="canonical" href="https://antibioteka.com" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center space-x-2">
            <Microscope className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Antibioteka</span>
          </div>
          
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* Navigation can be added here */}
            </div>
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Link to="/about">
                <Button variant="ghost" size="sm">
                  About
                </Button>
              </Link>
              <LanguageToggle />
              {user ? (
                <Button asChild size="sm">
                  <Link to="/admin">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-x-4"
            >
              <Button asChild size="lg">
                <Link to="/auth">{t.hero.button}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">{t.hero.learnMore}</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Core Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Comprehensive clinical decision support powered by evidence-based medicine
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <feature.icon className="h-12 w-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* In-depth Sections */}
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="grid gap-8 md:grid-cols-2 items-center"
              >
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center space-x-3">
                    <section.icon className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold">{section.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <div className={`flex justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="w-full max-w-md aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <section.icon className="h-24 w-24 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              {t.cta.title}
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              {t.cta.subtitle}
            </p>
            <Button asChild size="lg">
              <Link to="/auth">{t.cta.button}</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Microscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Antibioteka</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Antibioteka. All rights reserved. | AI-Powered Antibiotic Recommendation System
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary">About</Link>
            <a href="/humans.txt" className="hover:text-primary">Team</a>
            <a href="/security.txt" className="hover:text-primary">Security</a>
            <a href="/sitemap.xml" className="hover:text-primary">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;