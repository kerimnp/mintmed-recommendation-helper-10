import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, FileText, Scale, Shield, AlertTriangle, Users, CreditCard, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: December 2024",
      subtitle: "Please read these terms carefully before using our services.",
      backButton: "Back to Home",
      sections: [
        {
          title: "Acceptance of Terms",
          icon: FileText,
          content: `By accessing and using Horalix services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          
          These terms apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.`
        },
        {
          title: "Medical Disclaimer",
          icon: AlertTriangle,
          content: `IMPORTANT: Horalix is a clinical decision support tool and is not intended to replace professional medical judgment.
          
          • Our AI recommendations are advisory only
          • Always consult with qualified healthcare professionals
          • Final treatment decisions remain with licensed physicians
          • We are not liable for medical outcomes
          • Use clinical judgment in all situations`
        },
        {
          title: "User Responsibilities",
          icon: Users,
          content: `As a user of our service, you agree to:
          
          • Provide accurate and complete information
          • Maintain the confidentiality of your account
          • Use the service only for legitimate medical purposes
          • Comply with all applicable laws and regulations
          • Respect patient privacy and confidentiality
          • Report any security concerns immediately`
        },
        {
          title: "Intellectual Property",
          icon: Shield,
          content: `The service and its original content, features, and functionality are and will remain the exclusive property of Horalix and its licensors.
          
          • Our AI algorithms and medical databases are proprietary
          • You may not reproduce, distribute, or create derivative works
          • Limited license granted for authorized use only
          • User-generated content remains subject to our privacy policy`
        },
        {
          title: "Payment Terms",
          icon: CreditCard,
          content: `For paid services:
          
          • All fees are non-refundable unless otherwise stated
          • Automatic renewal for subscription services
          • Price changes with 30 days notice
          • Suspension of service for non-payment
          • Credits do not expire but are non-transferable`
        },
        {
          title: "Prohibited Uses",
          icon: Ban,
          content: `You may not use our service:
          
          • For any unlawful purpose or to solicit others to unlawful acts
          • To violate any international, federal, provincial, or state regulations or laws
          • To transmit, or procure the sending of, any advertising or promotional material without our prior written consent
          • To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity
          • In any way that infringes upon the rights of others`
        },
        {
          title: "Limitation of Liability",
          icon: Scale,
          content: `In no case shall Horalix, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages.
          
          Our liability is limited to the amount paid for our services in the 12 months preceding any claim. This limitation applies regardless of the legal theory on which the claim is based.`
        }
      ]
    },
    bs: {
      title: "Uslovi Korišćenja",
      lastUpdated: "Poslednje ažuriranje: Decembar 2024",
      subtitle: "Molimo pažljivo pročitajte ove uslove pre korišćenja naših usluga.",
      backButton: "Nazad na početnu",
      sections: [
        {
          title: "Prihvatanje uslova",
          icon: FileText,
          content: `Pristupanjem i korišćenjem Horalix usluga, prihvatate i slažete se da budete vezani uslovima i odredbama ovog sporazuma. Ako se ne slažete sa navedenim, molimo ne koristite ovu uslugu.
          
          Ovi uslovi se primenjuju na sve korisnike usluge, uključujući bez ograničenja korisnike koji su pregledači, prodavci, kupci, trgovci i/ili saradnici sadržaja.`
        },
        {
          title: "Medicinska napomena",
          icon: AlertTriangle,
          content: `VAŽNO: Horalix je alat za podršku kliničkih odluka i nije namenjen da zameni profesionalno medicinsko mišljenje.
          
          • Naše AI preporuke su samo savetodavne
          • Uvek se konsultujte sa kvalifikovanim zdravstvenim radnicima
          • Konačne odluke o lečenju ostaju sa licenciranim lekarima
          • Nismo odgovorni za medicinske ishode
          • Koristite kliničko rasuđivanje u svim situacijama`
        },
        {
          title: "Odgovornosti korisnika",
          icon: Users,
          content: `Kao korisnik naše usluge, slažete se da ćete:
          
          • Pružiti tačne i potpune informacije
          • Održati poverljivost vašeg naloga
          • Koristiti uslugu samo u legitimne medicinske svrhe
          • Poštovati sve primenjive zakone i propise
          • Poštovati privatnost i poverljivost pacijenata
          • Odmah prijaviti sve sigurnosne probleme`
        },
        {
          title: "Intelektualna svojina",
          icon: Shield,
          content: `Usluga i njen originalni sadržaj, funkcije i funkcionalnost su i ostaće ekskluzivna svojina Horalix-a i njegovih davalaca licenci.
          
          • Naši AI algoritmi i medicinske baze podataka su vlasništvo
          • Ne smete reprodukovati, distribuirati ili kreirati izvedena dela
          • Ograničena licenca data samo za ovlašćeno korišćenje
          • Sadržaj koji generiše korisnik ostaje predmet naše politike privatnosti`
        },
        {
          title: "Uslovi plaćanja",
          icon: CreditCard,
          content: `Za plaćene usluge:
          
          • Sve naknade se ne vraćaju osim ako nije drugačije navedeno
          • Automatska obnova za pretplatne usluge
          • Promene cena uz obaveštenje od 30 dana
          • Suspendovanje usluge zbog neplaćanja
          • Krediti ne isteku ali nisu prenosivi`
        },
        {
          title: "Zabranjena korišćenja",
          icon: Ban,
          content: `Ne smete koristiti našu uslugu:
          
          • Za bilo koju nezakonitu svrhu ili da navedete druge na nezakonite radnje
          • Da prekršite bilo koje međunarodne, federalne, pokrajinske ili državne propise ili zakone
          • Da transmitujete ili nabavite slanje bilo kakvog reklamnog ili promotivnog materijala bez našeg prethodnog pisanog pristanka
          • Da se lažno predstavljate kao kompanija, zaposleni kompanije, drugi korisnik ili bilo koje drugo lice ili entitet
          • Na bilo koji način koji krši prava drugih`
        },
        {
          title: "Ograničenje odgovornosti",
          icon: Scale,
          content: `Ni u kom slučaju Horalix, niti njegovi direktori, zaposleni, partneri, agenti, dobavljači ili saradnici, neće biti odgovorni za bilo kakve indirektne, slučajne, kaznene, posledične ili posebne štete.
          
          Naša odgovornost je ograničena na iznos plaćen za naše usluge u 12 meseci pre bilo kog zahteva. Ovo ograničenje se primenjuje bez obzira na pravnu teoriju na kojoj se zahtev zasniva.`
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
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;