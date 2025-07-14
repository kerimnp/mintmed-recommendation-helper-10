import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Shield, Lock, FileText, Eye, Database, CheckCircle, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Compliance: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Compliance & Certifications",
      lastUpdated: "Last updated: December 2024",
      subtitle: "Our commitment to the highest standards of healthcare data security and regulatory compliance.",
      backButton: "Back to Home",
      certifications: [
        {
          name: "HIPAA",
          icon: Shield,
          status: "Compliant",
          description: "Health Insurance Portability and Accountability Act compliance for patient data protection."
        },
        {
          name: "GDPR",
          icon: Eye,
          status: "Compliant",
          description: "General Data Protection Regulation compliance for European Union data privacy."
        },
        {
          name: "ISO 27001",
          icon: Lock,
          status: "Certified",
          description: "Information Security Management System international standard."
        },
        {
          name: "SOC 2 Type II",
          icon: FileText,
          status: "Audited",
          description: "Service Organization Control 2 security, availability, and confidentiality audit."
        }
      ],
      sections: [
        {
          title: "Healthcare Compliance",
          icon: Shield,
          content: `Our platform adheres to stringent healthcare industry standards:
          
          • HIPAA compliance for all patient health information
          • FDA guidance for clinical decision support software
          • HL7 FHIR standards for health information exchange
          • 21 CFR Part 11 for electronic records and signatures
          • Clinical data governance and audit trails`
        },
        {
          title: "Data Protection & Privacy",
          icon: Lock,
          content: `We implement comprehensive data protection measures:
          
          • End-to-end encryption (AES-256) for data at rest and in transit
          • Multi-factor authentication and role-based access controls
          • Regular penetration testing and vulnerability assessments
          • Data anonymization and pseudonymization techniques
          • Secure data deletion and retention policies`
        },
        {
          title: "International Standards",
          icon: Globe,
          content: `Our compliance extends across international jurisdictions:
          
          • GDPR compliance for European operations
          • PIPEDA compliance for Canadian privacy requirements
          • Medical Device Regulation (MDR) considerations
          • ISO 13485 quality management for medical devices
          • Regional healthcare data localization requirements`
        },
        {
          title: "Audit & Monitoring",
          icon: Eye,
          content: `Continuous monitoring and regular audits ensure ongoing compliance:
          
          • 24/7 security monitoring and incident response
          • Quarterly internal security assessments
          • Annual third-party security audits
          • Continuous compliance monitoring tools
          • Detailed audit logs and reporting capabilities`
        },
        {
          title: "Quality Management",
          icon: Award,
          content: `Our quality management system ensures reliable and safe operations:
          
          • Risk management frameworks (ISO 14971)
          • Clinical evaluation and post-market surveillance
          • Software lifecycle processes (IEC 62304)
          • Change control and configuration management
          • Adverse event reporting and analysis`
        },
        {
          title: "Data Governance",
          icon: Database,
          content: `Robust data governance policies protect patient information:
          
          • Data classification and handling procedures
          • Minimum necessary principle for data access
          • Regular data quality assessments
          • Cross-border data transfer safeguards
          • Patient consent management systems`
        }
      ]
    },
    bs: {
      title: "Usklađenost i Sertifikacije",
      lastUpdated: "Poslednje ažuriranje: Decembar 2024",
      subtitle: "Naša posvećenost najvećim standardima sigurnosti zdravstvenih podataka i regulatorne usklađenosti.",
      backButton: "Nazad na početnu",
      certifications: [
        {
          name: "HIPAA",
          icon: Shield,
          status: "Usklađeno",
          description: "Usklađenost sa Zakonom o prenosivosti i odgovornosti zdravstvenog osiguranja za zaštitu podataka pacijenata."
        },
        {
          name: "GDPR",
          icon: Eye,
          status: "Usklađeno",
          description: "Usklađenost sa Opštom uredbom o zaštiti podataka za privatnost podataka Evropske unije."
        },
        {
          name: "ISO 27001",
          icon: Lock,
          status: "Sertifikovano",
          description: "Međunarodni standard za sistem upravljanja bezbednošću informacija."
        },
        {
          name: "SOC 2 Type II",
          icon: FileText,
          status: "Revidirano",
          description: "Revizija bezbednosti, dostupnosti i poverljivosti Service Organization Control 2."
        }
      ],
      sections: [
        {
          title: "Zdravstvena usklađenost",
          icon: Shield,
          content: `Naša platforma se pridržava strogih standarda zdravstvene industrije:
          
          • HIPAA usklađenost za sve zdravstvene informacije pacijenata
          • FDA smernice za softver za podršku kliničkih odluka
          • HL7 FHIR standardi za razmenu zdravstvenih informacija
          • 21 CFR Part 11 za elektronske zapise i potpise
          • Upravljanje kliničkim podacima i revizorske staze`
        },
        {
          title: "Zaštita podataka i privatnost",
          icon: Lock,
          content: `Implementiramo sveobuhvatne mere zaštite podataka:
          
          • End-to-end šifrovanje (AES-256) za podatke u mirovanju i u tranzitu
          • Višefaktorska autentifikacija i kontrole pristupa zasnovane na ulogama
          • Redovno testiranje probijanja i procene ranjivosti
          • Tehnike anonimizacije i pseudonimizacije podataka
          • Sigurne politike brisanja i čuvanja podataka`
        },
        {
          title: "Međunarodni standardi",
          icon: Globe,
          content: `Naša usklađenost se proteže kroz međunarodne jurisdikcije:
          
          • GDPR usklađenost za evropske operacije
          • PIPEDA usklađenost za kanadske zahteve privatnosti
          • Razmatranja Uredbe o medicinskim uređajima (MDR)
          • ISO 13485 upravljanje kvalitetom za medicinske uređaje
          • Regionalni zahtevi za lokalizaciju zdravstvenih podataka`
        },
        {
          title: "Revizija i praćenje",
          icon: Eye,
          content: `Kontinuirano praćenje i redovne revizije osiguravaju tekuću usklađenost:
          
          • 24/7 sigurnosno praćenje i odgovor na incidente
          • Kvartalne interne sigurnosne procene
          • Godišnje revizije bezbednosti od strane treće strane
          • Alati za kontinuirano praćenje usklađenosti
          • Detaljni revizorski zapisi i mogućnosti izveštavanja`
        },
        {
          title: "Upravljanje kvalitetom",
          icon: Award,
          content: `Naš sistem upravljanja kvalitetom osigurava pouzdane i bezbedne operacije:
          
          • Okviri za upravljanje rizicima (ISO 14971)
          • Klinička evaluacija i post-marketing nadzor
          • Procesi životnog ciklusa softvera (IEC 62304)
          • Kontrola promena i upravljanje konfiguracijom
          • Izveštavanje i analiza neželjenih događaja`
        },
        {
          title: "Upravljanje podacima",
          icon: Database,
          content: `Robusne politike upravljanja podacima štite informacije pacijenata:
          
          • Postupci klasifikacije i rukovanja podacima
          • Princip minimalnog potrebnog za pristup podacima
          • Redovne procene kvaliteta podataka
          • Zaštitne mere za prekograničan transfer podataka
          • Sistemi za upravljanje pristankom pacijenata`
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentContent.backButton}
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">{currentContent.title}</h1>
          <p className="text-muted-foreground text-lg mb-2">{currentContent.subtitle}</p>
          <p className="text-sm text-muted-foreground">{currentContent.lastUpdated}</p>
        </div>
      </div>

      {/* Certifications Overview */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentContent.certifications.map((cert, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <cert.icon className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">{cert.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {cert.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {currentContent.sections.map((section, index) => (
            <Card key={index} className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {section.content.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 last:mb-0 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compliance;