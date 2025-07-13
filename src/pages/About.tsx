import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, Users, Award, Globe, Heart, Shield, Zap, Microscope, Brain, Stethoscope, TrendingUp, Activity, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const About = (): JSX.Element => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const content = {
    en: {
      title: "About Antibioteka - AI-Powered Antibiotic Recommendation System",
      description: "Discover how Antibioteka revolutionizes antimicrobial stewardship through evidence-based AI recommendations, improving patient outcomes and reducing antibiotic resistance.",
      hero: {
        title: "Pioneering AI-Driven Antimicrobial Stewardship",
        subtitle: "Antibioteka empowers healthcare professionals with evidence-based antibiotic recommendations, combining clinical expertise with advanced AI to optimize patient care and combat antibiotic resistance."
      },
      mission: {
        title: "Our Clinical Mission",
        content: "To revolutionize antimicrobial stewardship by providing healthcare professionals with AI-powered, evidence-based antibiotic recommendations that improve patient outcomes, reduce resistance, and ensure optimal therapeutic choices."
      },
      features: [
        {
          icon: Microscope,
          title: "Evidence-Based Recommendations",
          description: "All antibiotic recommendations are grounded in the latest clinical guidelines from IDSA, CDC, and WHO, ensuring scientifically-backed therapeutic decisions."
        },
        {
          icon: Brain,
          title: "Advanced AI Clinical Engine",
          description: "Sophisticated machine learning algorithms analyze patient data, pathogen patterns, and resistance trends to provide personalized antibiotic recommendations."
        },
        {
          icon: Shield,
          title: "HIPAA-Compliant Security",
          description: "Enterprise-grade security infrastructure with end-to-end encryption, ensuring complete patient data protection and regulatory compliance."
        },
        {
          icon: TrendingUp,
          title: "Antimicrobial Stewardship",
          description: "Comprehensive tools for monitoring antibiotic usage, tracking resistance patterns, and implementing stewardship programs across healthcare institutions."
        }
      ],
      approach: {
        title: "Our Clinical Methodology",
        subtitle: "Evidence-driven antibiotic stewardship through advanced AI",
        items: [
          {
            title: "Clinical Guidelines Integration",
            description: "Seamlessly incorporates IDSA, CDC, and WHO guidelines with real-time updates ensuring recommendations align with the latest clinical standards."
          },
          {
            title: "Patient-Specific Analysis",
            description: "Comprehensive evaluation of patient factors including allergies, comorbidities, renal function, and drug interactions for personalized recommendations."
          },
          {
            title: "Resistance Pattern Monitoring",
            description: "Continuous analysis of local and regional antimicrobial resistance patterns to optimize empirical therapy selections."
          },
          {
            title: "Outcome Tracking & Learning",
            description: "Machine learning algorithms continuously improve recommendations based on treatment outcomes and emerging clinical evidence."
          }
        ]
      },
      impact: {
        title: "Clinical Impact & Outcomes",
        subtitle: "Transforming antimicrobial stewardship across healthcare institutions",
        stats: [
          {
            number: "2M+",
            label: "Antibiotic Recommendations",
            description: "Evidence-based therapeutic decisions supported globally"
          },
          {
            number: "800+",
            label: "Healthcare Institutions",
            description: "Hospitals and medical centers using Antibioteka worldwide"
          },
          {
            number: "97%",
            label: "Clinical Accuracy",
            description: "Validated against infectious disease specialist recommendations"
          },
          {
            number: "35%",
            label: "Resistance Reduction",
            description: "Average decrease in inappropriate antibiotic usage"
          }
        ]
      },
      team: {
        title: "Clinical & Technology Experts",
        subtitle: "Infectious disease specialists and AI researchers collaborating for better patient care",
        description: "Our multidisciplinary team includes board-certified infectious disease physicians, clinical pharmacists, AI researchers, and healthcare informaticists. Together, we ensure that every recommendation meets the highest standards of clinical excellence and technological innovation."
      },
      commitment: {
        title: "Our Clinical Commitment",
        items: [
          "Adherence to evidence-based medicine and latest clinical guidelines (IDSA, CDC, WHO)",
          "Continuous validation of AI recommendations by infectious disease specialists",
          "Complete transparency in clinical decision-making algorithms and rationale",
          "HIPAA-compliant security with enterprise-grade patient data protection",
          "Real-time integration with hospital EHR systems and clinical workflows",
          "Ongoing clinical education and antimicrobial stewardship support"
        ]
      },
      cta: {
        title: "Optimize Your Antimicrobial Stewardship",
        subtitle: "Join leading hospitals worldwide in implementing evidence-based antibiotic recommendations.",
        button: "Request Clinical Demo"
      }
    },
    bs: {
      title: "O Antibioteki - AI sistem za preporuke antibiotika",
      description: "Otkrijte kako Antibioteka revolucionizuje antimikrobno upravljanje kroz AI preporuke zasnovane na dokazima, poboljšavajući ishode pacijenata i smanjujući otpornost na antibiotike.",
      hero: {
        title: "Pionirsko AI-pokretano antimikrobno upravljanje",
        subtitle: "Antibioteka osposobljava zdravstvene profesionalce sa preporukama antibiotika zasnovanim na dokazima, kombinujući kliničku ekspertizu sa naprednom AI za optimizaciju nege pacijenata."
      },
      mission: {
        title: "Naša klinička misija",
        content: "Revolucionizacija antimikrobnog upravljanja pružanjem zdravstvenim profesionalcima AI-pokretanih preporuka antibiotika zasnovanih na dokazima koje poboljšavaju ishode pacijenata."
      },
      features: [
        {
          icon: Microscope,
          title: "Preporuke zasnovane na dokazima",
          description: "Sve preporuke antibiotika su utemeljene na najnovijim kliničkim smernicama IDSA, CDC i WHO, osiguravajući naučno podržane terapijske odluke."
        },
        {
          icon: Brain,
          title: "Napredni AI klinički motor",
          description: "Sofisticirani algoritmi mašinskog učenja analiziraju podatke pacijenata, obrasce patogena i trendove otpornosti za personalizovane preporuke."
        },
        {
          icon: Shield,
          title: "HIPAA usaglašena bezbednost",
          description: "Bezbednosna infrastruktura na nivou preduzeća sa end-to-end enkripcijom, obezbeđujući potpunu zaštitu podataka pacijenata."
        },
        {
          icon: TrendingUp,
          title: "Antimikrobno upravljanje",
          description: "Sveobuhvatni alati za praćenje upotrebe antibiotika, praćenje obrazaca otpornosti i implementaciju programa upravljanja."
        }
      ],
      approach: {
        title: "Naša klinička metodologija",
        subtitle: "Antimikrobno upravljanje vođeno dokazima kroz naprednu AI",
        items: [
          {
            title: "Integracija kliničkih smernica",
            description: "Besprekorno uključuje IDSA, CDC i WHO smernice sa ažuriranjima u realnom vremenu."
          },
          {
            title: "Analiza specifična za pacijenta",
            description: "Sveobuhvatna evaluacija faktora pacijenta uključujući alergije, komorbiditete, bubrežnu funkciju."
          },
          {
            title: "Praćenje obrazaca otpornosti",
            description: "Kontinuirana analiza lokalnih i regionalnih obrazaca antimikrobne otpornosti."
          },
          {
            title: "Praćenje ishoda i učenje",
            description: "Algoritmi mašinskog učenja kontinuirano poboljšavaju preporuke na osnovu ishoda lečenja."
          }
        ]
      },
      impact: {
        title: "Klinički uticaj i ishodi",
        subtitle: "Transformacija antimikrobnog upravljanja kroz zdravstvene institucije",
        stats: [
          {
            number: "2M+",
            label: "Preporuke antibiotika",
            description: "Terapijske odluke zasnovane na dokazima podržane globalno"
          },
          {
            number: "800+",
            label: "Zdravstvene institucije",
            description: "Bolnice i medicinski centri koji koriste Antibioteku širom sveta"
          },
          {
            number: "97%",
            label: "Klinička tačnost",
            description: "Validovano protiv preporuka specijalista za zarazne bolesti"
          },
          {
            number: "35%",
            label: "Smanjenje otpornosti",
            description: "Prosečno smanjenje neadekvatne upotrebe antibiotika"
          }
        ]
      },
      team: {
        title: "Klinički i tehnološki eksperti",
        subtitle: "Specijalisti za zarazne bolesti i AI istraživači koji sarađuju za bolju negu pacijenata",
        description: "Naš multidisciplinarni tim uključuje sertifikovane lekare specijaliste za zarazne bolesti, kliničke farmaceute, AI istraživače i zdravstvene informatičare."
      },
      commitment: {
        title: "Naša klinička predanost",
        items: [
          "Pridržavanje medicine zasnovane na dokazima i najnovijih kliničkih smernica",
          "Kontinuirana validacija AI preporuka od strane specijalista za zarazne bolesti",
          "Potpuna transparentnost u algoritmima kliničkog odlučivanja",
          "HIPAA usaglašena bezbednost sa zaštitom podataka na nivou preduzeća",
          "Integracija u realnom vremenu sa bolničkim EHR sistemima",
          "Kontinuirana klinička edukacija i podrška antimikrobnog upravljanja"
        ]
      },
      cta: {
        title: "Optimizujte vaše antimikrobno upravljanje",
        subtitle: "Pridružite se vodećim bolnicama širom sveta u implementaciji preporuka antibiotika zasnovanih na dokazima.",
        button: "Zatražite kliničku demonstraciju"
      }
    }
  };

  const t = content[language];

  return (
    <>
      <Helmet>
        <title>{t.title} | Antibioteka</title>
        <meta name="description" content={t.description} />
        <meta name="keywords" content="antibiotic recommendation, antimicrobial stewardship, clinical decision support, AI healthcare, infectious disease, hospital software, antibiotic resistance, evidence-based medicine, IDSA guidelines, CDC protocols" />
        <meta property="og:title" content={`${t.title} | Antibioteka`} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://antibioteka.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t.title} | Antibioteka`} />
        <meta name="twitter:description" content={t.description} />
        <link rel="canonical" href="https://antibioteka.com/about" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Antibioteka",
            "alternateName": "Antibioteka AI",
            "description": t.description,
            "url": "https://antibioteka.com",
            "logo": "https://antibioteka.com/logo.png",
            "foundingDate": "2024",
            "industry": "Healthcare Technology",
            "applicationCategory": "Clinical Decision Support",
            "operatingSystem": "Web-based",
            "medicalSpecialty": ["Infectious Disease", "Antimicrobial Stewardship", "Clinical Pharmacy"],
            "targetAudience": {
              "@type": "Audience",
              "audienceType": "Healthcare Professionals"
            },
            "sameAs": [
              "https://linkedin.com/company/antibioteka",
              "https://twitter.com/antibioteka"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-bold text-primary">Antibioteka</span>
            </Link>
          </div>
        </header>

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
          </div>
        </section>

        {/* Mission Section */}
        <section className="container py-8 md:py-12">
          <Card className="p-6 md:p-8">
            <div className="flex items-center space-x-4 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">{t.mission.title}</h2>
            </div>
            <p className="text-lg text-muted-foreground">{t.mission.content}</p>
          </Card>
        </section>

        {/* Features Section */}
        <section className="container py-8 md:py-12">
          <div className="mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced clinical decision support powered by evidence-based medicine
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center space-x-3 mb-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Approach Section */}
        <section className="container py-8 md:py-12">
          <div className="mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.approach.title}</h2>
            <p className="text-lg text-muted-foreground">{t.approach.subtitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {t.approach.items.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="container py-8 md:py-12">
          <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{t.impact.title}</h2>
              <p className="text-lg text-muted-foreground">{t.impact.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {t.impact.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Team Section */}
        <section className="container py-8 md:py-12">
          <Card className="p-6 md:p-8">
            <div className="flex items-center space-x-4 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">{t.team.title}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-4">{t.team.subtitle}</p>
            <p className="text-muted-foreground">{t.team.description}</p>
          </Card>
        </section>

        {/* Commitment Section */}
        <section className="container py-8 md:py-12">
          <div className="mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t.commitment.title}</h2>
          </div>
          <div className="grid gap-4">
            {t.commitment.items.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-8 md:py-12">
          <Card className="p-6 md:p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-6">{t.cta.subtitle}</p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/auth">{t.cta.button}</Link>
            </Button>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40">
          <div className="container flex h-14 max-w-screen-2xl items-center justify-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Antibioteka. All rights reserved. | <Link to="/" className="hover:text-primary">AI-Powered Antibiotic Recommendations</Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;