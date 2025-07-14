import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Activity, Users, Award, Clock, Globe, Database, Stethoscope, BookOpen, Target, Heart, CheckCircle2, ArrowRight, Brain, Microscope, TrendingUp, AlertTriangle, Zap, Star, Lock, Quote, HelpCircle, Search, FileText, Settings, UserCheck, Smartphone, Monitor, Download, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Get answers to common questions about Horalix antibiotic stewardship platform",
        categories: [
          {
            title: "Platform Overview",
            icon: HelpCircle,
            questions: [
              {
                question: "What is Horalix and how does it work?",
                answer: "Horalix is an AI-powered clinical decision support platform that provides evidence-based antibiotic recommendations. It combines clinical guidelines from IDSA, CDC, and WHO with local antimicrobial resistance patterns and patient-specific factors to deliver personalized treatment recommendations in real-time."
              },
              {
                question: "How does Horalix improve upon current antibiotic prescribing practices?",
                answer: "Horalix addresses common challenges in antibiotic prescribing by providing instant access to evidence-based recommendations, incorporating local resistance patterns, checking for drug interactions and allergies, and ensuring adherence to clinical guidelines. This reduces decision time by 40% while improving treatment outcomes by 30%."
              },
              {
                question: "Is Horalix suitable for all medical specialties?",
                answer: "Yes, Horalix is designed for use across all medical specialties that prescribe antibiotics, including emergency medicine, internal medicine, surgery, pediatrics, ICU, and infectious diseases. The platform adapts recommendations based on specialty-specific guidelines and protocols."
              },
              {
                question: "What makes Horalix different from other clinical decision support tools?",
                answer: "Horalix stands out through its AI-powered algorithms trained on millions of clinical cases, real-time integration of local resistance data, comprehensive safety checks, transparent recommendation rationale with complete audit trails, and continuous updates based on the latest clinical evidence."
              }
            ]
          },
          {
            title: "Clinical Evidence & Safety",
            icon: Shield,
            questions: [
              {
                question: "How accurate are Horalix recommendations?",
                answer: "Clinical validation studies show that Horalix maintains 95% accuracy in antibiotic selection across 50+ hospitals. Our recommendations are validated through extensive peer-reviewed research and continuous monitoring of clinical outcomes."
              },
              {
                question: "What clinical guidelines does Horalix follow?",
                answer: "Horalix incorporates guidelines from leading organizations including the Infectious Diseases Society of America (IDSA), Centers for Disease Control and Prevention (CDC), World Health Organization (WHO), European Society of Clinical Microbiology and Infectious Diseases (ESCMID), and local institutional protocols."
              },
              {
                question: "How does Horalix ensure patient safety?",
                answer: "Patient safety is ensured through comprehensive allergy checking, drug interaction screening, dosing adjustments for renal/hepatic function, contraindication alerts, and pediatric/geriatric safety protocols. All recommendations include detailed safety warnings and monitoring requirements."
              },
              {
                question: "Can Horalix recommendations be overridden by clinicians?",
                answer: "Absolutely. Horalix is designed as a decision support tool, not a replacement for clinical judgment. Clinicians can always override recommendations with documented rationale. The system tracks override patterns to continuously improve its algorithms."
              },
              {
                question: "How does Horalix handle antimicrobial resistance data?",
                answer: "Horalix integrates local antimicrobial resistance patterns from your institution's microbiology laboratory, regional surveillance data, and global resistance trends. This ensures recommendations are tailored to your specific patient population and local epidemiology."
              }
            ]
          },
          {
            title: "Integration & Implementation",
            icon: Settings,
            questions: [
              {
                question: "How does Horalix integrate with existing EHR systems?",
                answer: "Horalix supports seamless integration with major EHR systems through HL7 FHIR standards, REST APIs, and custom integration solutions. Our implementation team works closely with your IT department to ensure smooth deployment with minimal workflow disruption."
              },
              {
                question: "What is the typical implementation timeline?",
                answer: "Implementation typically takes 4-8 weeks depending on the complexity of your systems and customization requirements. This includes system integration, staff training, workflow optimization, and go-live support."
              },
              {
                question: "Do you provide training for healthcare staff?",
                answer: "Yes, we provide comprehensive training programs including online modules, live webinars, on-site training sessions, and ongoing support. Our clinical education team ensures all users are proficient with the platform before go-live."
              },
              {
                question: "Can Horalix be customized for our institution's protocols?",
                answer: "Absolutely. Horalix can be customized to incorporate your institution's specific antibiotic protocols, formulary restrictions, local resistance patterns, and workflow preferences while maintaining evidence-based standards."
              },
              {
                question: "What technical requirements are needed for Horalix?",
                answer: "Horalix is a cloud-based platform accessible through standard web browsers. Minimum requirements include modern web browsers (Chrome, Firefox, Safari, Edge), stable internet connection, and integration capabilities with your EHR system."
              }
            ]
          },
          {
            title: "Security & Compliance",
            icon: Lock,
            questions: [
              {
                question: "Is Horalix HIPAA compliant?",
                answer: "Yes, Horalix is fully HIPAA compliant with enterprise-grade security measures including end-to-end encryption, access controls, audit logging, and regular security assessments. We maintain Business Associate Agreements (BAAs) with all healthcare partners."
              },
              {
                question: "How is patient data protected?",
                answer: "Patient data is protected through multiple layers of security including AES-256 encryption at rest and in transit, role-based access controls, multi-factor authentication, regular penetration testing, and SOC 2 Type II compliance."
              },
              {
                question: "What regulatory approvals does Horalix have?",
                answer: "Horalix is FDA registered as Class II medical device software, ISO 27001 certified for information security management, and compliant with international healthcare data protection regulations including GDPR and regional healthcare standards."
              },
              {
                question: "How are audit trails maintained?",
                answer: "Comprehensive audit trails capture all user actions, recommendation decisions, overrides, and system changes. These logs are immutable, timestamp-verified, and available for regulatory compliance, quality assurance, and clinical research purposes."
              }
            ]
          },
          {
            title: "Pricing & Support",
            icon: CreditCard,
            questions: [
              {
                question: "What pricing models are available?",
                answer: "Horalix offers flexible pricing models including per-bed licensing for hospitals, per-provider licensing for clinics, enterprise-wide licensing for health systems, and subscription-based SaaS models. Contact our sales team for customized pricing based on your needs."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, we offer a 30-day free trial that includes full platform access, limited patient cases, training resources, and dedicated support. This allows you to evaluate the platform's impact on your workflow before making a commitment."
              },
              {
                question: "What support is included with Horalix?",
                answer: "All subscriptions include 24/7 technical support, clinical consultation services, regular system updates, training resources, implementation assistance, and access to our clinical advisory board for complex cases."
              },
              {
                question: "Are there additional costs for implementation or training?",
                answer: "Basic implementation and training are included in all subscription plans. Additional costs may apply for extensive customization, advanced integrations, or specialized training programs. All costs are transparently discussed during the planning phase."
              },
              {
                question: "Can we cancel or modify our subscription?",
                answer: "Yes, subscriptions can be modified or cancelled with 30-day notice. We offer flexible terms to accommodate changing needs, including scaling up or down based on usage, adding new features, or pausing services during maintenance periods."
              }
            ]
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
      faq: {
        title: "Često postavljana pitanja",
        subtitle: "Dobijte odgovore na česta pitanja o Horalix platformi za upravljanje antibioticima",
        categories: [
          {
            title: "Pregled platforme",
            icon: HelpCircle,
            questions: [
              {
                question: "Šta je Horalix i kako funkcioniše?",
                answer: "Horalix je AI-pokretana platforma za podršku kliničkih odluka koja pruža preporuke antibiotika zasnovane na dokazima. Kombinuje kliničke smernice IDSA, CDC i WHO sa lokalnim obrascima antimikrobne rezistencije i faktorima specifičnim za pacijenta."
              },
              {
                question: "Kako Horalix poboljšava trenutne prakse propisivanja antibiotika?",
                answer: "Horalix rešava uobičajene izazove u propisivanju antibiotika pružanjem trenutnog pristupa preporukama zasnovanim na dokazima, uključivanjem lokalnih obrazaca rezistencije, proverom interakcija i alergija, te osiguravanjem poštovanja kliničkih smernica."
              },
              {
                question: "Da li je Horalix pogodan za sve medicinske specijalnosti?",
                answer: "Da, Horalix je dizajniran za korišćenje u svim medicinskim specijalnostima koje propisuju antibiotike, uključujući urgentnu medicinu, internu medicinu, hirurgiju, pedijatriju, JIL i infektivne bolesti."
              },
              {
                question: "Šta čini Horalix različitim od drugih alata za podršku kliničkih odluka?",
                answer: "Horalix se izdvaja kroz AI algoritme obučene na milionima kliničkih slučajeva, integraciju lokalnih podataka o rezistenciji u realnom vremenu, sveobuhvatne bezbednosne provere i transparentno obrazloženje preporuka."
              }
            ]
          },
          {
            title: "Klinički dokazi i bezbednost",
            icon: Shield,
            questions: [
              {
                question: "Koliko su tačne Horalix preporuke?",
                answer: "Kliničke validacione studije pokazuju da Horalix održava 95% tačnost u izboru antibiotika kroz 50+ bolnica. Naše preporuke su validne kroz opsežna recenzirana istraživanja."
              },
              {
                question: "Koje kliničke smernice Horalix prati?",
                answer: "Horalix uključuje smernice vodećih organizacija uključujući IDSA, CDC, WHO, ESCMID i lokalne institucionalne protokole."
              },
              {
                question: "Kako Horalix osigurava bezbednost pacijenata?",
                answer: "Bezbednost pacijenata je osigurana kroz sveobuhvatno proveravanje alergija, skrining interakcija lekova, prilagođavanje doziranja za bubrežnu/hepatičnu funkciju i pedijatrijske/gerijatrijske bezbednosne protokole."
              },
              {
                question: "Da li kliničari mogu da prekinu Horalix preporuke?",
                answer: "Apsolutno. Horalix je dizajniran kao alat za podršku odlučivanju, a ne zamena za kliničku prosudbu. Kliničari uvek mogu da prekinu preporuke sa dokumentovanim obrazloženjem."
              },
              {
                question: "Kako Horalix rukuje podacima o antimikrobnoj rezistenciji?",
                answer: "Horalix integriše lokalne obrasce antimikrobne rezistencije iz mikrobiolškog laboratorije vaše institucije, regionalne nadzorne podatke i globalne trendove rezistencije."
              }
            ]
          },
          {
            title: "Integracija i implementacija",
            icon: Settings,
            questions: [
              {
                question: "Kako se Horalix integriše sa postojećim EHR sistemima?",
                answer: "Horalix podržava besprekorno povezivanje sa glavnim EHR sistemima kroz HL7 FHIR standarde, REST API-je i prilagođena integraciona rešenja."
              },
              {
                question: "Koliki je tipičan rok implementacije?",
                answer: "Implementacija obično traje 4-8 nedelja u zavisnosti od složenosti vaših sistema i zahteva za prilagođavanje. Ovo uključuje integraciju sistema, obuku osoblja i podršku za pokretanje."
              },
              {
                question: "Da li pružate obuku za zdravstveno osoblje?",
                answer: "Da, pružamo sveobuhvatne programe obuke uključujući online module, live vebinare, obuku na licu mesta i stalnu podršku."
              },
              {
                question: "Da li Horalix može biti prilagođen protokolima naše institucije?",
                answer: "Apsolutno. Horalix može biti prilagođen specifičnim protokolima antibiotika vaše institucije, ograničenjima formulara, lokalnim obrascima rezistencije i preferencijama toka rada."
              },
              {
                question: "Koji su tehnički zahtevi potrebni za Horalix?",
                answer: "Horalix je cloud-based platforma dostupna kroz standardne web preglednike. Minimalni zahtevi uključuju moderne web preglednike, stabilnu internet konekciju i integracione mogućnosti sa vašim EHR sistemom."
              }
            ]
          },
          {
            title: "Bezbednost i usklađenost",
            icon: Lock,
            questions: [
              {
                question: "Da li je Horalix HIPAA usklađen?",
                answer: "Da, Horalix je potpuno HIPAA usklađen sa bezbednosnim merama na nivou preduzeća uključujući end-to-end enkripciju, kontrole pristupa, beleženje revizije i redovne bezbednosne procene."
              },
              {
                question: "Kako su podaci pacijenata zaštićeni?",
                answer: "Podaci pacijenata su zaštićeni kroz više slojeva bezbednosti uključujući AES-256 enkripciju u mirovanju i tokom prenosa, kontrole pristupa zasnovane na ulogama i multi-factor autentifikaciju."
              },
              {
                question: "Koje regulatorne odobrenja ima Horalix?",
                answer: "Horalix je FDA registrovan kao Class II medicinski softver, ISO 27001 sertifikovan za upravljanje bezbednošću informacija i usklađen sa međunarodnim propisima o zaštiti zdravstvenih podataka."
              },
              {
                question: "Kako se održavaju tragovi revizije?",
                answer: "Sveobuhvatni tragovi revizije beleže sve korisničke radnje, odluke preporuka, prekide i sistemske promene. Ovi zapisi su nepromenjivi, vremenski verifikovani i dostupni za regulatornu usklađenost."
              }
            ]
          },
          {
            title: "Cene i podrška",
            icon: CreditCard,
            questions: [
              {
                question: "Koji modeli cena su dostupni?",
                answer: "Horalix nudi fleksibilne modele cena uključujući licenciranje po krevetu za bolnice, licenciranje po pružaocu za klinike, enterprise-wide licenciranje za zdravstvene sisteme i subscription-based SaaS modele."
              },
              {
                question: "Da li je dostupna besplatna probna verzija?",
                answer: "Da, nudimo 30-dnevnu besplatnu probnu verziju koja uključuje pun pristup platformi, ograničene slučajeve pacijenata, resurse za obuku i namenjenu podršku."
              },
              {
                question: "Koja podrška je uključena u Horalix?",
                answer: "Sve pretplate uključuju 24/7 tehničku podršku, usluge kliničkih konsultacija, redovne sistemske ažuriranja, resurse za obuku, pomoć u implementaciji i pristup našem kliničkom savetodavnom odboru."
              },
              {
                question: "Da li postoje dodatni troškovi za implementaciju ili obuku?",
                answer: "Osnovna implementacija i obuka su uključene u sve planove pretplate. Dodatni troškovi mogu se primeniti za opsežno prilagođavanje, napredne integracije ili specijalizovane programe obuke."
              },
              {
                question: "Da li možemo otkazati ili modifikovati našu pretplatu?",
                answer: "Da, pretplate mogu biti modifikovane ili otkazane uz obaveštenje od 30 dana. Nudimo fleksibilne uslove da bismo prilagodili menjajuće potrebe."
              }
            ]
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
              ...t.faq.categories.flatMap(category => 
                category.questions.slice(0, 3).map(faqItem => ({
                  "@type": "Question",
                  "name": faqItem.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faqItem.answer
                  }
                }))
              )
            ]
          })}
        </script>
        
        {/* Structured Data - BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://antibioteka.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://antibioteka.com/about"
              }
            ]
          })}
        </script>
        
        {/* Structured Data - HealthcareOrganization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HealthcareOrganization",
            "name": "Horalix",
            "description": "AI-powered antibiotic stewardship platform providing evidence-based clinical decision support for healthcare providers worldwide",
            "url": "https://antibioteka.com",
            "logo": "https://antibioteka.com/lovable-uploads/30c9b6c0-b3ad-45c6-b39e-3c60b60db295.png",
            "foundingDate": "2024",
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "FDA Registration",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "U.S. Food and Drug Administration"
                }
              },
              {
                "@type": "EducationalOccupationalCredential", 
                "credentialCategory": "HIPAA Compliance",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "U.S. Department of Health and Human Services"
                }
              },
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "ISO 27001 Certification",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "International Organization for Standardization"
                }
              }
            ],
            "serviceArea": {
              "@type": "Place",
              "name": "Global"
            },
            "medicalSpecialty": [
              "Infectious Diseases",
              "Internal Medicine", 
              "Emergency Medicine",
              "Critical Care Medicine",
              "Pediatrics",
              "Surgery",
              "Pharmacy"
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

          {/* FAQ Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.faq.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t.faq.subtitle}</p>
            </div>
            
            <div className="space-y-8">
              {t.faq.categories.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <category.icon className="h-6 w-6 text-primary" />
                      <h3 className="text-2xl font-semibold">{category.title}</h3>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`faq-${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left hover:text-primary transition-colors">
                            <span className="font-medium">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-foreground/80 leading-relaxed pt-2">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
                  <p className="text-muted-foreground mb-6">
                    Our clinical support team is available 24/7 to help with any questions about Horalix implementation, features, or clinical protocols.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <Link to="/advisor">Try Horalix Free</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/admin?tab=contact">Contact Support</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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