import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Activity, Users, Award, Clock, Globe, Database, Stethoscope, BookOpen, Target, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = (): JSX.Element => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  // Translations object
  const content = {
    en: {
      title: "About Horalix - Evidence-Based Antibiotic Decision Support",
      metaDescription: "Learn about Horalix, the AI-powered antibiotic recommendation platform that combines clinical guidelines with local resistance patterns to optimize patient care and combat antimicrobial resistance.",
      pageTitle: "About Horalix",
      subtitle: "Transforming Healthcare Through Evidence-Based Antibiotic Stewardship",
      intro: "Horalix is a cutting-edge clinical decision support system designed to revolutionize antibiotic prescribing practices. By combining the latest clinical guidelines with local antimicrobial resistance patterns, we empower healthcare providers to make evidence-based decisions that optimize patient outcomes while combating the global threat of antimicrobial resistance.",
      
      mission: {
        title: "Our Mission",
        content: "To improve patient care and combat antimicrobial resistance by providing healthcare professionals with evidence-based, real-time antibiotic recommendations that are tailored to local resistance patterns and individual patient characteristics."
      },

      features: [
        {
          icon: Shield,
          title: "Evidence-Based Recommendations",
          description: "Every recommendation is backed by the latest clinical guidelines from IDSA, CDC, and WHO, ensuring you have access to the most current evidence-based practices."
        },
        {
          icon: Activity,
          title: "Real-Time Decision Support",
          description: "Get instant, personalized antibiotic recommendations based on patient-specific factors, local resistance patterns, and clinical presentation."
        },
        {
          icon: Database,
          title: "Local Resistance Integration",
          description: "Our platform integrates local antimicrobial resistance data to provide recommendations that are tailored to your specific healthcare environment."
        },
        {
          icon: Users,
          title: "Collaborative Care",
          description: "Enable seamless collaboration between doctors, pharmacists, and other healthcare team members with shared patient insights and recommendations."
        },
        {
          icon: Clock,
          title: "Streamlined Workflow",
          description: "Reduce decision-making time without compromising accuracy. Our intuitive interface integrates seamlessly into existing clinical workflows."
        },
        {
          icon: Globe,
          title: "Global Standards",
          description: "Built on international clinical guidelines while allowing for local customization and protocol adaptation."
        }
      ],

      approach: {
        title: "Our Approach",
        subtitle: "Clinical Excellence Through Technology",
        points: [
          {
            title: "Evidence-Driven",
            description: "Every recommendation is traceable to peer-reviewed literature and established clinical guidelines."
          },
          {
            title: "Patient-Centered",
            description: "Comprehensive safety checks for allergies, interactions, and patient-specific variables ensure optimal outcomes."
          },
          {
            title: "Transparent",
            description: "Complete audit trails and detailed rationale for every recommendation support clinical decision-making."
          },
          {
            title: "Adaptive",
            description: "Continuous updates ensure alignment with evolving best practices in infectious disease management."
          }
        ]
      },

      impact: {
        title: "Clinical Impact",
        subtitle: "Measurable Improvements in Patient Care",
        stats: [
          { value: "95%", label: "Adherence to Clinical Guidelines" },
          { value: "40%", label: "Reduction in Decision Time" },
          { value: "30%", label: "Improved Treatment Outcomes" },
          { value: "25%", label: "Decreased Resistance Development" }
        ]
      },

      team: {
        title: "Our Team",
        content: "Horalix is developed by a multidisciplinary team of infectious disease specialists, clinical pharmacists, software engineers, and data scientists. Our team combines deep clinical expertise with cutting-edge technology to create solutions that truly serve healthcare providers and their patients."
      },

      commitment: {
        title: "Our Commitment",
        points: [
          "Maintaining the highest standards of clinical accuracy and safety",
          "Ensuring patient data privacy and security with enterprise-grade protection",
          "Providing transparent, traceable recommendations with complete audit trails",
          "Supporting healthcare providers with comprehensive training and ongoing support",
          "Contributing to the global fight against antimicrobial resistance"
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
      title: "O Horalixu - Podrška za odlučivanje o antibioticima zasnovana na dokazima",
      metaDescription: "Saznajte više o Horalixu, AI platformi za preporuke antibiotika koja kombinuje kliničke smernice sa lokalnim obrascima rezistencije za optimizaciju nege pacijenata.",
      pageTitle: "O Horalixu",
      subtitle: "Transformacija zdravstvene zaštite kroz upravljanje antibioticima zasnovano na dokazima",
      intro: "Horalix je najsavremeniji sistem za podršku kliničkih odluka dizajniran da revolucionizuje praksu propisivanja antibiotika. Kombinujući najnovije kliničke smernice sa lokalnim obrascima antimikrobne rezistencije, osposobljavamo zdravstvene radnike da donose odluke zasnovane na dokazima koje optimizuju ishode pacijenata.",
      
      mission: {
        title: "Naša misija",
        content: "Poboljšanje nege pacijenata i borba protiv antimikrobne rezistencije pružanjem zdravstvenim radnicima preporuka za antibiotike u realnom vremenu, prilagođenih lokalnim obrascima rezistencije."
      },

      features: [
        {
          icon: Shield,
          title: "Preporuke zasnovane na dokazima",
          description: "Svaka preporuka je podržana najnovijim kliničkim smernicama IDSA, CDC i WHO, obezbeđujući pristup najaktuelnim praksama."
        },
        {
          icon: Activity,
          title: "Podrška u realnom vremenu",
          description: "Dobijte trenutne, personalizovane preporuke antibiotika zasnovane na specifičnostima pacijenta i lokalnim obrascima rezistencije."
        },
        {
          icon: Database,
          title: "Integracija lokalne rezistencije",
          description: "Naša platforma integriše lokalne podatke o antimikrobnoj rezistenciji za preporuke prilagođene vašem zdravstvenom okruženju."
        },
        {
          icon: Users,
          title: "Kolaborativna nega",
          description: "Omogućite besprekorno povezivanje između lekara, farmaceuta i drugih članova zdravstvenog tima."
        },
        {
          icon: Clock,
          title: "Optimizovan tok rada",
          description: "Smanjite vreme donošenja odluka bez ugrožavanja tačnosti. Naš intuitivan interfejs se besprekorno integriše u postojeće tokove rada."
        },
        {
          icon: Globe,
          title: "Globalni standardi",
          description: "Izgrađeno na međunarodnim kliničkim smernicama uz mogućnost lokalne prilagodbe i adaptacije protokola."
        }
      ],

      approach: {
        title: "Naš pristup",
        subtitle: "Klinička izvrsnost kroz tehnologiju",
        points: [
          {
            title: "Vođeno dokazima",
            description: "Svaka preporuka je sledljiva do stručne literature i uspostavljenih kliničkih smernica."
          },
          {
            title: "Fokus na pacijenta",
            description: "Sveobuhvatne bezbednosne provere za alergije, interakcije i varijable specifične za pacijenta."
          },
          {
            title: "Transparentno",
            description: "Kompletni tragovi revizije i detaljno obrazloženje za svaku preporuku podržavaju kliničko odlučivanje."
          },
          {
            title: "Prilagodljivo",
            description: "Kontinuirana ažuriranja osiguravaju usklađenost sa evolucijskim najboljim praksama u upravljanju zaraznim bolestima."
          }
        ]
      },

      impact: {
        title: "Klinički uticaj",
        subtitle: "Merljiva poboljšanja u nezi pacijenata",
        stats: [
          { value: "95%", label: "Pridržavanje kliničkih smernica" },
          { value: "40%", label: "Smanjenje vremena odlučivanja" },
          { value: "30%", label: "Poboljšani ishodi lečenja" },
          { value: "25%", label: "Smanjen razvoj rezistencije" }
        ]
      },

      team: {
        title: "Naš tim",
        content: "Horalix razvija multidisciplinarni tim specijalista za zarazne bolesti, kliničkih farmaceuta, softverskih inženjera i naučnika podataka. Naš tim kombinuje duboku kliničku ekspertizu sa najsavremenijom tehnologijom."
      },

      commitment: {
        title: "Naša posvećenost",
        points: [
          "Održavanje najviših standarda kliničke tačnosti i bezbednosti",
          "Obezbeđivanje privatnosti i bezbednosti podataka pacijenata sa zaštitom na nivou preduzeća",
          "Pružanje transparentnih, sledljivih preporuka sa kompletnim tragovima revizije",
          "Podrška zdravstvenim radnicima sa sveobuhvatnom obukom i stalnom podrškom",
          "Doprinošenje globalnoj borbi protiv antimikrobne rezistencije"
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
  const logoSrc = theme === 'dark' ? '/lovable-uploads/30c9b6c0-b3ad-45c6-b39e-3c60b60db295.png' : '/lovable-uploads/30c9b6c0-b3ad-45c6-b39e-3c60b60db295.png';

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content="antibiotic stewardship, clinical decision support, antimicrobial resistance, evidence-based medicine, healthcare technology, infectious disease, pharmacy, hospital management" />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horalix.lovable.app/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.metaDescription} />
        <link rel="canonical" href="https://horalix.lovable.app/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Horalix",
            "description": t.metaDescription,
            "url": "https://horalix.lovable.app",
            "logo": "https://horalix.lovable.app/lovable-uploads/30c9b6c0-b3ad-45c6-b39e-3c60b60db295.png",
            "industry": "Healthcare Technology",
            "foundingDate": "2024",
            "specialties": ["Antibiotic Stewardship", "Clinical Decision Support", "Healthcare Technology"]
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
              <img 
                src="/lovable-uploads/f70528f5-2815-484f-a8de-2b1f18fefb86.png" 
                alt="Horalix Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Horalix
              </span>
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
              {t.features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <feature.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Approach Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.approach.title}</h2>
              <p className="text-lg text-muted-foreground">{t.approach.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {t.approach.points.map((point, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                    <p className="text-foreground/70">{point.description}</p>
                  </div>
                </div>
              ))}
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
                  {t.impact.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
              {t.commitment.points.map((point, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <Heart className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-foreground/80">{point}</p>
                </div>
              ))}
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
                    <Link to="/pricing">{t.cta.buttonSecondary}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
};

export default About;