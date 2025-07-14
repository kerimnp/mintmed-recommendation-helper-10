import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, FileText, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 2024",
      subtitle: "Your privacy is our priority. Learn how we protect and handle your data.",
      backButton: "Back to Home",
      sections: [
        {
          title: "Information We Collect",
          icon: Database,
          content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This includes:
          
          • Personal information (name, email address, professional credentials)
          • Usage data and interaction patterns
          • Device and technical information
          • Clinical data processed through our AI systems (anonymized and encrypted)`
        },
        {
          title: "How We Use Your Information",
          icon: FileText,
          content: `We use the information we collect to:
          
          • Provide, maintain, and improve our services
          • Process transactions and send related information
          • Send technical notices, updates, and support messages
          • Respond to your comments, questions, and customer service requests
          • Develop new products and services`
        },
        {
          title: "Data Protection & Security",
          icon: Shield,
          content: `We implement comprehensive security measures including:
          
          • End-to-end encryption for all data transmission
          • HIPAA-compliant data handling procedures
          • Regular security audits and penetration testing
          • Access controls and authentication systems
          • Secure data centers with 24/7 monitoring`
        },
        {
          title: "Data Sharing & Disclosure",
          icon: Users,
          content: `We do not sell, trade, or otherwise transfer your personal information to third parties except:
          
          • With your explicit consent
          • To comply with legal obligations
          • To protect our rights, property, or safety
          • With service providers under strict confidentiality agreements
          • In connection with a business transfer or acquisition`
        },
        {
          title: "Your Rights & Choices",
          icon: Eye,
          content: `You have the right to:
          
          • Access and update your personal information
          • Request deletion of your data
          • Opt-out of certain communications
          • Data portability
          • Lodge a complaint with supervisory authorities
          • Withdraw consent where applicable`
        },
        {
          title: "Data Retention",
          icon: Lock,
          content: `We retain your information for as long as necessary to:
          
          • Provide our services
          • Comply with legal obligations
          • Resolve disputes and enforce agreements
          • Meet regulatory requirements
          
          Clinical data is typically retained for 7 years in accordance with healthcare regulations.`
        }
      ],
      contact: {
        title: "Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us:",
        email: "privacy@horalix.com",
        phone: "+387 33 456 789",
        address: "Sarajevo Technology Park, Sarajevo, Bosnia and Herzegovina"
      }
    },
    bs: {
      title: "Politika Privatnosti",
      lastUpdated: "Poslednje ažuriranje: Decembar 2024",
      subtitle: "Vaša privatnost je naš prioritet. Saznajte kako štitimo i rukujemo vašim podacima.",
      backButton: "Nazad na početnu",
      sections: [
        {
          title: "Informacije koje prikupljamo",
          icon: Database,
          content: `Prikupljamo informacije koje nam direktno pružate, kao što su kada kreirate nalog, koristite naše usluge ili nas kontaktirate. Ovo uključuje:
          
          • Lične informacije (ime, email adresa, profesionalni podaci)
          • Podatke o korišćenju i obrascima interakcije
          • Informacije o uređaju i tehničke podatke
          • Klinički podaci obrađeni kroz naše AI sisteme (anonimizirani i šifrovani)`
        },
        {
          title: "Kako koristimo vaše informacije",
          icon: FileText,
          content: `Koristimo prikupljene informacije za:
          
          • Pružanje, održavanje i poboljšavanje naših usluga
          • Obradu transakcija i slanje povezanih informacija
          • Slanje tehničkih obaveštenja, ažuriranja i poruka podrške
          • Odgovaranje na vaše komentare, pitanja i zahteve za korisničku podršku
          • Razvoj novih proizvoda i usluga`
        },
        {
          title: "Zaštita i sigurnost podataka",
          icon: Shield,
          content: `Implementiramo sveobuhvatne sigurnosne mere uključujući:
          
          • End-to-end šifrovanje za sav prenos podataka
          • HIPAA-usklađene procedure rukovanja podacima
          • Redovne sigurnosne revizije i testiranje probijanja
          • Kontrole pristupa i sistem autentifikacije
          • Sigurni data centri sa 24/7 nadzorom`
        },
        {
          title: "Deljenje i otkrivanje podataka",
          icon: Users,
          content: `Ne prodajemo, ne trgujemo, niti na drugi način prenosimo vaše lične informacije trećim licima osim:
          
          • Uz vašu eksplicitnu saglasnost
          • Za poštovanje zakonskih obaveza
          • Za zaštitu naših prava, imovine ili sigurnosti
          • Sa pružaocima usluga pod strogim ugovorima o poverljivosti
          • U vezi sa poslovnim transferom ili akvizicijom`
        },
        {
          title: "Vaša prava i izbori",
          icon: Eye,
          content: `Imate pravo da:
          
          • Pristupite i ažurirate svoje lične informacije
          • Zatražite brisanje svojih podataka
          • Optujete iz određenih komunikacija
          • Portabilnost podataka
          • Podnesete žalbu nadzornim organima
          • Povučete saglasnost gde je to primenjivo`
        },
        {
          title: "Čuvanje podataka",
          icon: Lock,
          content: `Čuvamo vaše informacije onoliko dugo koliko je potrebno da:
          
          • Pružimo naše usluge
          • Poštujemo zakonske obaveze
          • Rešavamo sporove i sprovodimo sporazume
          • Ispunimo regulatorne zahteve
          
          Klinički podaci se obično čuvaju 7 godina u skladu sa zdravstvenim propisima.`
        }
      ],
      contact: {
        title: "Kontaktirajte nas",
        content: "Ako imate bilo kakva pitanja o ovoj Politici privatnosti, molimo kontaktirajte nas:",
        email: "privacy@horalix.com",
        phone: "+387 33 456 789",
        address: "Sarajevo Technology Park, Sarajevo, Bosna i Hercegovina"
      }
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
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

          {/* Contact Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                {currentContent.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{currentContent.contact.content}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${currentContent.contact.email}`} className="text-primary hover:underline">
                    {currentContent.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{currentContent.contact.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-4 w-4 mt-0.5">📍</div>
                  <span>{currentContent.contact.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;