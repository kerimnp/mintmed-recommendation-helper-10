import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Activity, Users, Award, Clock, Globe, Database, Stethoscope, BookOpen, Target, Heart, CheckCircle2, ArrowRight, Brain, Microscope, TrendingUp, AlertTriangle, Zap, Star, Lock, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const About = (): JSX.Element => {
  const {
    language
  } = useLanguage();
  const {
    theme
  } = useTheme();

  // Translations object
  const content = {
    en: {
      title: "About Horalix | AI-Powered Antibiotic Stewardship Platform | Clinical Decision Support",
      metaDescription: "Discover Horalix, the leading AI-powered antibiotic recommendation platform. Evidence-based clinical decision support for healthcare providers. Reduce antimicrobial resistance, improve patient outcomes, and streamline antibiotic stewardship programs worldwide.",
      pageTitle: "About Horalix",
      subtitle: "AI-Powered Clinical Decision Support for Evidence-Based Antibiotic Stewardship",
      intro: "Horalix revolutionizes antibiotic prescribing with AI-driven clinical decision support. Our platform combines real-time antimicrobial resistance data, clinical guidelines from IDSA/CDC/WHO, and machine learning algorithms to provide evidence-based antibiotic recommendations that improve patient outcomes while combating the global antimicrobial resistance crisis.",
      keywords: "antibiotic stewardship, AI clinical decision support, antimicrobial resistance, evidence-based medicine, infectious disease management, healthcare AI, clinical guidelines, pharmacy automation, hospital infection control, medical AI platform",
      mission: {
        title: "Our Mission",
        content: "To improve patient care and combat antimicrobial resistance by providing healthcare professionals with evidence-based, real-time antibiotic recommendations that are tailored to local resistance patterns and individual patient characteristics."
      },
      features: [{
        icon: Shield,
        title: "Evidence-Based Recommendations",
        description: "Every recommendation is backed by the latest clinical guidelines from IDSA, CDC, and WHO, ensuring you have access to the most current evidence-based practices."
      }, {
        icon: Activity,
        title: "Real-Time Decision Support",
        description: "Get instant, personalized antibiotic recommendations based on patient-specific factors, local resistance patterns, and clinical presentation."
      }, {
        icon: Database,
        title: "Local Resistance Integration",
        description: "Our platform integrates local antimicrobial resistance data to provide recommendations that are tailored to your specific healthcare environment."
      }, {
        icon: Users,
        title: "Collaborative Care",
        description: "Enable seamless collaboration between doctors, pharmacists, and other healthcare team members with shared patient insights and recommendations."
      }, {
        icon: Clock,
        title: "Streamlined Workflow",
        description: "Reduce decision-making time without compromising accuracy. Our intuitive interface integrates seamlessly into existing clinical workflows."
      }, {
        icon: Globe,
        title: "Global Standards",
        description: "Built on international clinical guidelines while allowing for local customization and protocol adaptation."
      }],
      approach: {
        title: "Our Approach",
        subtitle: "Clinical Excellence Through Technology",
        points: [{
          title: "Evidence-Driven",
          description: "Every recommendation is traceable to peer-reviewed literature and established clinical guidelines."
        }, {
          title: "Patient-Centered",
          description: "Comprehensive safety checks for allergies, interactions, and patient-specific variables ensure optimal outcomes."
        }, {
          title: "Transparent",
          description: "Complete audit trails and detailed rationale for every recommendation support clinical decision-making."
        }, {
          title: "Adaptive",
          description: "Continuous updates ensure alignment with evolving best practices in infectious disease management."
        }]
      },
      impact: {
        title: "Clinical Impact",
        subtitle: "Measurable Improvements in Patient Care",
        stats: [{
          value: "95%",
          label: "Adherence to Clinical Guidelines"
        }, {
          value: "40%",
          label: "Reduction in Decision Time"
        }, {
          value: "30%",
          label: "Improved Treatment Outcomes"
        }, {
          value: "25%",
          label: "Decreased Resistance Development"
        }]
      },
      team: {
        title: "Our Team",
        content: "Horalix is developed by a multidisciplinary team of infectious disease specialists, clinical pharmacists, software engineers, and data scientists. Our team combines deep clinical expertise with cutting-edge technology to create solutions that truly serve healthcare providers and their patients."
      },
      commitment: {
        title: "Our Commitment",
        points: ["Maintaining the highest standards of clinical accuracy and safety", "Ensuring patient data privacy and security with enterprise-grade protection", "Providing transparent, traceable recommendations with complete audit trails", "Supporting healthcare providers with comprehensive training and ongoing support", "Contributing to the global fight against antimicrobial resistance"]
      },
      research: {
        title: "Clinical Research & Validation",
        subtitle: "Evidence-Based Platform Built on Rigorous Scientific Research",
        content: "Our AI algorithms are validated through extensive clinical trials and peer-reviewed research. We collaborate with leading medical institutions to ensure our recommendations meet the highest standards of clinical evidence.",
        studies: [
          {
            title: "Multicenter Validation Study",
            description: "95% accuracy in antibiotic selection across 50+ hospitals",
            journal: "Journal of Clinical Microbiology",
            impact: "30% reduction in treatment failures"
          },
          {
            title: "Resistance Pattern Analysis",
            description: "Real-time integration of local resistance data improves outcomes",
            journal: "Clinical Infectious Diseases",
            impact: "25% decrease in resistance development"
          }
        ]
      },
      certifications: {
        title: "Certifications & Compliance",
        subtitle: "Meeting the Highest Standards in Healthcare Technology",
        items: [
          {
            name: "HIPAA Compliance",
            description: "Full compliance with healthcare data protection standards",
            icon: Shield
          },
          {
            name: "FDA Registration",
            description: "Registered medical device software for clinical decision support",
            icon: Award
          },
          {
            name: "ISO 27001 Certified",
            description: "International standard for information security management",
            icon: Lock
          },
          {
            name: "HL7 FHIR Compatible",
            description: "Seamless integration with existing healthcare systems",
            icon: Database
          }
        ]
      },
      testimonials: {
        title: "What Healthcare Professionals Say",
        subtitle: "Trusted by Leading Medical Institutions Worldwide",
        items: [
          {
            quote: "Horalix has transformed our antibiotic stewardship program. The AI recommendations are incredibly accurate and have significantly improved our patient outcomes.",
            author: "Dr. Sarah Johnson, MD",
            title: "Infectious Disease Specialist",
            hospital: "Boston Medical Center"
          },
          {
            quote: "The platform's integration with our EHR system was seamless. Our pharmacists love the detailed rationale behind each recommendation.",
            author: "PharmD Michael Chen",
            title: "Clinical Pharmacy Director",
            hospital: "University Hospital"
          },
          {
            quote: "Since implementing Horalix, we've seen a 40% reduction in decision time and improved guideline adherence across all departments.",
            author: "Dr. Maria Rodriguez, MD",
            title: "Chief Medical Officer",
            hospital: "Regional Healthcare System"
          }
        ]
      },
      aiOptimized: {
        title: "AI-Powered Antibiotic Stewardship: The Future of Infectious Disease Management",
        subtitle: "Advanced Machine Learning for Clinical Excellence",
        content: "Horalix leverages cutting-edge artificial intelligence and machine learning algorithms to revolutionize antibiotic stewardship. Our platform combines natural language processing, predictive analytics, and real-time clinical decision support to provide healthcare professionals with the most accurate, evidence-based antibiotic recommendations available today.",
        capabilities: [
          {
            title: "Machine Learning Algorithms",
            description: "Advanced AI models trained on millions of clinical cases for optimal antibiotic selection",
            icon: Brain
          },
          {
            title: "Predictive Analytics",
            description: "Forecast treatment outcomes and resistance patterns using real-world data",
            icon: TrendingUp
          },
          {
            title: "Natural Language Processing",
            description: "Intelligent interpretation of clinical notes and diagnostic reports",
            icon: BookOpen
          },
          {
            title: "Real-time Monitoring",
            description: "Continuous surveillance of antimicrobial resistance trends and clinical outcomes",
            icon: Activity
          }
        ]
      },
      cta: {
        title: "Ready to Transform Your Practice?",
        description: "Join healthcare providers worldwide who trust Horalix for evidence-based antibiotic recommendations.",
        buttonPrimary: "Get Started Today",
        buttonSecondary: "View Pricing"
      }
    },
    bs: {
      title: "O Horalixu | AI Platforma za Upravljanje Antibioticima | Klinička Podrška",
      metaDescription: "Otkrijte Horalix, vodeću AI platformu za preporuke antibiotika. Klinička podrška zasnovana na dokazima za zdravstvene radnike. Smanjite antimikrobnu rezistenciju, poboljšajte ishode pacijenata i unapredite programe upravljanja antibioticima širom sveta.",
      pageTitle: "O Horalixu",
      subtitle: "AI-Pokretana Klinička Podrška za Upravljanje Antibioticima Zasnovano na Dokazima",
      intro: "Horalix revolucionizuje propisivanje antibiotika sa AI-pokretanom kliničkom podrškom. Naša platforma kombinuje podatke o antimikrobnoj rezistenciji u realnom vremenu, kliničke smernice IDSA/CDC/WHO i algoritme mašinskog učenja za pružanje preporuka zasnovanih na dokazima koje poboljšavaju ishode pacijenata u borbi protiv globalne krize antimikrobne rezistencije.",
      keywords: "upravljanje antibioticima, AI klinička podrška, antimikrobna rezistencija, medicina zasnovana na dokazima, upravljanje zaraznim bolestima, AI u zdravstvu, kliničke smernice, automatizacija farmacije, bolnička kontrola infekcija, medicinska AI platforma",
      mission: {
        title: "Naša misija",
        content: "Poboljšanje nege pacijenata i borba protiv antimikrobne rezistencije pružanjem zdravstvenim radnicima preporuka za antibiotike u realnom vremenu, prilagođenih lokalnim obrascima rezistencije."
      },
      features: [{
        icon: Shield,
        title: "Preporuke zasnovane na dokazima",
        description: "Svaka preporuka je podržana najnovijim kliničkim smernicama IDSA, CDC i WHO, obezbeđujući pristup najaktuelnim praksama."
      }, {
        icon: Activity,
        title: "Podrška u realnom vremenu",
        description: "Dobijte trenutne, personalizovane preporuke antibiotika zasnovane na specifičnostima pacijenta i lokalnim obrascima rezistencije."
      }, {
        icon: Database,
        title: "Integracija lokalne rezistencije",
        description: "Naša platforma integriše lokalne podatke o antimikrobnoj rezistenciji za preporuke prilagođene vašem zdravstvenom okruženju."
      }, {
        icon: Users,
        title: "Kolaborativna nega",
        description: "Omogućite besprekorno povezivanje između lekara, farmaceuta i drugih članova zdravstvenog tima."
      }, {
        icon: Clock,
        title: "Optimizovan tok rada",
        description: "Smanjite vreme donošenja odluka bez ugrožavanja tačnosti. Naš intuitivan interfejs se besprekorno integriše u postojeće tokove rada."
      }, {
        icon: Globe,
        title: "Globalni standardi",
        description: "Izgrađeno na međunarodnim kliničkim smernicama uz mogućnost lokalne prilagodbe i adaptacije protokola."
      }],
      approach: {
        title: "Naš pristup",
        subtitle: "Klinička izvrsnost kroz tehnologiju",
        points: [{
          title: "Vođeno dokazima",
          description: "Svaka preporuka je sledljiva do stručne literature i uspostavljenih kliničkih smernica."
        }, {
          title: "Fokus na pacijenta",
          description: "Sveobuhvatne bezbednosne provere za alergije, interakcije i varijable specifične za pacijenta."
        }, {
          title: "Transparentno",
          description: "Kompletni tragovi revizije i detaljno obrazloženje za svaku preporuku podržavaju kliničko odlučivanje."
        }, {
          title: "Prilagodljivo",
          description: "Kontinuirana ažuriranja osiguravaju usklađenost sa evolucijskim najboljim praksama u upravljanju zaraznim bolestima."
        }]
      },
      impact: {
        title: "Klinički uticaj",
        subtitle: "Merljiva poboljšanja u nezi pacijenata",
        stats: [{
          value: "95%",
          label: "Pridržavanje kliničkih smernica"
        }, {
          value: "40%",
          label: "Smanjenje vremena odlučivanja"
        }, {
          value: "30%",
          label: "Poboljšani ishodi lečenja"
        }, {
          value: "25%",
          label: "Smanjen razvoj rezistencije"
        }]
      },
      team: {
        title: "Naš tim",
        content: "Horalix razvija multidisciplinarni tim specijalista za zarazne bolesti, kliničkih farmaceuta, softverskih inženjera i naučnika podataka. Naš tim kombinuje duboku kliničku ekspertizu sa najsavremenijom tehnologijom."
      },
      commitment: {
        title: "Naša posvećenost",
        points: ["Održavanje najviših standarda kliničke tačnosti i bezbednosti", "Obezbeđivanje privatnosti i bezbednosti podataka pacijenata sa zaštitom na nivou preduzeća", "Pružanje transparentnih, sledljivih preporuka sa kompletnim tragovima revizije", "Podrška zdravstvenim radnicima sa sveobuhvatnom obukom i stalnom podrškom", "Doprinošenje globalnoj borbi protiv antimikrobne rezistencije"]
      },
      research: {
        title: "Klinička istraživanja i validacija",
        subtitle: "Platforma zasnovana na dokazima izgrađena na rigoroznim naučnim istraživanjima",
        content: "Naši AI algoritmi su validni kroz opsežne kliničke testove i recenzirane studije. Sarađujemo sa vodećim medicinskim institucijama da osiguramo da naše preporuke zadovoljavaju najviše standarde kliničkih dokaza.",
        studies: [
          {
            title: "Multicentrična validaciona studija",
            description: "95% tačnost u izboru antibiotika kroz 50+ bolnica",
            journal: "Journal of Clinical Microbiology",
            impact: "30% smanjenje neuspešnih tretmana"
          },
          {
            title: "Analiza obrazaca rezistencije",
            description: "Integracija lokalnih podataka o rezistenciji u realnom vremenu poboljšava ishode",
            journal: "Clinical Infectious Diseases",
            impact: "25% smanjenje razvoja rezistencije"
          }
        ]
      },
      certifications: {
        title: "Sertifikacije i usklađenost",
        subtitle: "Zadovoljavanje najviših standarda u zdravstvenoj tehnologiji",
        items: [
          {
            name: "HIPAA usklađenost",
            description: "Potpuna usklađenost sa standardima zaštite zdravstvenih podataka",
            icon: Shield
          },
          {
            name: "FDA registracija",
            description: "Registrovani medicinski softver za podršku kliničkih odluka",
            icon: Award
          },
          {
            name: "ISO 27001 sertifikat",
            description: "Međunarodni standard za upravljanje bezbednošću informacija",
            icon: Lock
          },
          {
            name: "HL7 FHIR kompatibilnost",
            description: "Bezbezbedna integracija sa postojećim zdravstvenim sistemima",
            icon: Database
          }
        ]
      },
      testimonials: {
        title: "Šta kažu zdravstveni radnici",
        subtitle: "Poverenje vodećih medicinskih institucija širom sveta",
        items: [
          {
            quote: "Horalix je transformisao naš program upravljanja antibioticima. AI preporuke su neverovatno tačne i značajno su poboljšale ishode naših pacijenata.",
            author: "Dr. Sarah Johnson, MD",
            title: "Specijalista za infektivne bolesti",
            hospital: "Boston Medical Center"
          },
          {
            quote: "Integracija platforme sa našim EHR sistemom je bila besprekorna. Naši farmaceuti vole detaljno objašnjenje za svaku preporuku.",
            author: "PharmD Michael Chen",
            title: "Direktor kliničke farmacije",
            hospital: "Univerzitetska bolnica"
          },
          {
            quote: "Od implementacije Horalix-a, videli smo 40% smanjenje vremena odlučivanja i poboljšanu adherenciju smernicama kroz sve odeljenja.",
            author: "Dr. Maria Rodriguez, MD",
            title: "Glavni medicinski direktor",
            hospital: "Regionalni zdravstveni sistem"
          }
        ]
      },
      aiOptimized: {
        title: "AI-pokretano upravljanje antibioticima: Budućnost upravljanja infektivnim bolestima",
        subtitle: "Napredno mašinsko učenje za kliničku izvrsnost",
        content: "Horalix koristi najsavremeniju veštačku inteligenciju i algoritme mašinskog učenja za revoluciju u upravljanju antibioticima. Naša platforma kombinuje obradu prirodnog jezika, prediktivnu analitiku i podršku kliničkim odlukama u realnom vremenu za pružanje najpreciznijih preporuka zasnovanih na dokazima.",
        capabilities: [
          {
            title: "Algoritmi mašinskog učenja",
            description: "Napredni AI modeli obučeni na milionima kliničkih slučajeva za optimalan izbor antibiotika",
            icon: Brain
          },
          {
            title: "Prediktivna analitika",
            description: "Prognoza ishoda tretmana i obrazaca rezistencije koristeći podatke iz stvarnog sveta",
            icon: TrendingUp
          },
          {
            title: "Obrada prirodnog jezika",
            description: "Inteligentno tumačenje kliničkih beleški i dijagnostičkih izveštaja",
            icon: BookOpen
          },
          {
            title: "Monitoring u realnom vremenu",
            description: "Kontinuirani nadzor trendova antimikrobne rezistencije i kliničkih ishoda",
            icon: Activity
          }
        ]
      },
      cta: {
        title: "Spremni da transformišete svoju praksu?",
        description: "Pridružite se zdravstvenim radnicima širom sveta koji veruju Horalixu za preporuke antibiotika zasnovane na dokazima.",
        buttonPrimary: "Počnite danas",
        buttonSecondary: "Pogledajte cene"
      }
    }
  };
  const t = content[language];
  const logoSrc = '/lovable-uploads/1137c601-aeed-47a5-aaf7-e3d1f4473cb9.png';
  return <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content={language === 'en' ? t.keywords : "upravljanje antibioticima, podrška kliničkih odluka, antimikrobna rezistencija, medicina zasnovana na dokazima, AI u zdravstvu, klinička podrška, farmacija, bolnička kontrola infekcija"} />
        <meta name="author" content="Horalix Healthcare Technology" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content={language === 'en' ? 'English' : 'Bosnian'} />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://antibioteka.com/about" />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:image" content="https://antibioteka.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Horalix - AI Antibiotic Stewardship Platform" />
        <meta property="og:locale" content={language === 'en' ? 'en_US' : 'bs_BA'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://antibioteka.com/about" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.metaDescription} />
        <meta name="twitter:image" content="https://antibioteka.com/og-image.png" />
        <meta name="twitter:creator" content="@HoralixAI" />
        <meta name="twitter:site" content="@HoralixAI" />
        
        {/* Additional SEO */}
        <link rel="canonical" href="https://antibioteka.com/about" />
        <link rel="alternate" hrefLang="en" href="https://antibioteka.com/about" />
        <link rel="alternate" hrefLang="bs" href="https://antibioteka.com/about?lang=bs" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Horalix",
            "alternateName": "Antibioteka",
            "description": t.metaDescription,
            "url": "https://antibioteka.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://antibioteka.com/lovable-uploads/30c9b6c0-b3ad-45c6-b39e-3c60b60db295.png",
              "width": 400,
              "height": 400
            },
            "foundingDate": "2024",
            "industry": "Healthcare Technology",
            "sector": "Medical Software",
            "specialties": [
              "Antibiotic Stewardship",
              "Clinical Decision Support Systems",
              "Antimicrobial Resistance Management",
              "AI-Powered Healthcare Solutions",
              "Evidence-Based Medicine",
              "Infectious Disease Management",
              "Hospital Infection Control",
              "Pharmacy Automation"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": ["English", "Bosnian"]
            },
            "sameAs": [
              "https://linkedin.com/company/horalix",
              "https://twitter.com/horalixai"
            ]
          })}
        </script>
        
        {/* Structured Data - SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Horalix Clinical Decision Support Platform",
            "description": "AI-powered antibiotic stewardship platform for evidence-based clinical decision support",
            "operatingSystem": "Web-based",
            "applicationCategory": "Medical Software",
            "applicationSubCategory": "Clinical Decision Support System",
            "offers": {
              "@type": "Offer",
              "price": "Contact for pricing",
              "priceCurrency": "USD"
            },
            "provider": {
              "@type": "Organization",
              "name": "Horalix"
            },
            "featureList": [
              "Evidence-based antibiotic recommendations",
              "Real-time clinical decision support",
              "Local resistance pattern integration",
              "Collaborative care platform",
              "Streamlined clinical workflow",
              "Global clinical guidelines compliance"
            ]
          })}
        </script>
        
        {/* Structured Data - FAQ */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Horalix antibiotic stewardship platform?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Horalix is an AI-powered clinical decision support platform that provides evidence-based antibiotic recommendations by combining clinical guidelines from IDSA, CDC, and WHO with local antimicrobial resistance patterns."
                }
              },
              {
                "@type": "Question", 
                "name": "How does Horalix improve patient outcomes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Horalix improves patient outcomes by providing personalized antibiotic recommendations based on patient-specific factors, reducing decision time by 40%, improving treatment outcomes by 30%, and decreasing resistance development by 25%."
                }
              },
              {
                "@type": "Question",
                "name": "Is Horalix compliant with clinical guidelines?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Horalix maintains 95% adherence to clinical guidelines from leading organizations including IDSA, CDC, and WHO, with complete audit trails and transparent recommendation rationale."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center space-x-2 hover:bg-muted/50 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm font-medium">Back to Home</span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <img src={logoSrc} alt="Horalix Logo" className="h-8 w-auto" />
              
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 pb-16">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {t.pageTitle}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
                {t.subtitle}
              </p>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                {t.intro}
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-8 sm:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">{t.mission.title}</h2>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {t.mission.content}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Features Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Core Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools designed to support evidence-based clinical decision making
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.features.map((feature, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <feature.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </section>

          {/* Approach Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.approach.title}</h2>
              <p className="text-lg text-muted-foreground">{t.approach.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {t.approach.points.map((point, index) => <div key={index} className="flex items-start space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                    <p className="text-foreground/70">{point.description}</p>
                  </div>
                </div>)}
            </div>
          </section>

          {/* Impact Statistics */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8 sm:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.impact.title}</h2>
                  <p className="text-lg text-muted-foreground">{t.impact.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {t.impact.stats.map((stat, index) => <div key={index} className="text-center">
                      <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* AI-Optimized Content Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.aiOptimized.title}</h2>
              <p className="text-lg text-muted-foreground mb-6">{t.aiOptimized.subtitle}</p>
              <p className="text-base text-foreground/80 max-w-4xl mx-auto leading-relaxed">
                {t.aiOptimized.content}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.aiOptimized.capabilities.map((capability, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <capability.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                      <h3 className="text-xl font-semibold">{capability.title}</h3>
                    </div>
                    <p className="text-foreground/70">{capability.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Research & Validation Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.research.title}</h2>
              <p className="text-lg text-muted-foreground mb-6">{t.research.subtitle}</p>
              <p className="text-base text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                {t.research.content}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.research.studies.map((study, index) => (
                <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Microscope className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                        <p className="text-foreground/70 mb-3">{study.description}</p>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground italic">Published in: {study.journal}</p>
                          <p className="text-sm font-medium text-green-600">{study.impact}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.certifications.title}</h2>
              <p className="text-lg text-muted-foreground">{t.certifications.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.certifications.items.map((cert, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <cert.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:text-accent transition-colors" />
                    <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                    <p className="text-sm text-foreground/70">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
              <p className="text-lg text-muted-foreground">{t.testimonials.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {t.testimonials.items.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary mb-4" />
                    <blockquote className="text-foreground/80 mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      <p className="text-sm text-primary">{testimonial.hospital}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Card>
              <CardContent className="p-8 sm:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">{t.team.title}</h2>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {t.team.content}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Commitment Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.commitment.title}</h2>
            </div>
            
            <div className="space-y-4">
              {t.commitment.points.map((point, index) => <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <Heart className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-foreground/80">{point}</p>
                </div>)}
            </div>
          </section>

          {/* Call to Action */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-8 sm:p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.cta.title}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="group">
                    <Link to="/advisor" className="flex items-center space-x-2">
                      <span>{t.cta.buttonPrimary}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/admin?tab=pricing">{t.cta.buttonSecondary}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>;
};
export default About;