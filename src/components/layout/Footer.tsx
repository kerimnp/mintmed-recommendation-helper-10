import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { Mail, Phone, MapPin, Globe, Twitter, Linkedin, Facebook, Shield, Lock, FileText, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const footerLinks = {
    product: {
      title: language === 'en' ? 'Product' : 'Proizvod',
      links: [
        { name: language === 'en' ? 'Features' : 'Značajke', href: '#features' },
        { name: language === 'en' ? 'Pricing' : 'Cijene', href: '/pricing' },
        { name: language === 'en' ? 'API Documentation' : 'API Dokumentacija', href: '/docs' },
        { name: language === 'en' ? 'System Status' : 'Status Sistema', href: '/status' },
      ]
    },
    company: {
      title: language === 'en' ? 'Company' : 'Kompanija',
      links: [
        { name: language === 'en' ? 'About Us' : 'O Nama', href: '/about' },
        { name: language === 'en' ? 'Careers' : 'Karijere', href: '/careers' },
        { name: language === 'en' ? 'Blog' : 'Blog', href: '/blog' },
        { name: language === 'en' ? 'Press' : 'Mediji', href: '/press' },
      ]
    },
    support: {
      title: language === 'en' ? 'Support' : 'Podrška',
      links: [
        { name: language === 'en' ? 'Help Center' : 'Centar za Pomoć', href: '/help' },
        { name: language === 'en' ? 'Contact Us' : 'Kontaktiraj Nas', href: '/contact' },
        { name: language === 'en' ? 'Training' : 'Obuka', href: '/training' },
        { name: language === 'en' ? 'Community' : 'Zajednica', href: '/community' },
      ]
    },
    legal: {
      title: language === 'en' ? 'Legal' : 'Pravno',
      links: [
        { name: language === 'en' ? 'Privacy Policy' : 'Politika Privatnosti', href: '/privacy' },
        { name: language === 'en' ? 'Terms of Service' : 'Uslovi Korišćenja', href: '/terms' },
        { name: language === 'en' ? 'Security' : 'Sigurnost', href: '/security' },
        { name: language === 'en' ? 'Compliance' : 'Usklađenost', href: '/compliance' },
      ]
    }
  };

  const contactInfo = {
    email: 'info@horalix.com',
    phone: '+387 33 123 456',
    address: language === 'en' 
      ? 'Medical Innovation District, Sarajevo, Bosnia and Herzegovina'
      : 'Medicinski Inovacijski Okrug, Sarajevo, Bosna i Hercegovina'
  };

  const certifications = [
    { name: 'HIPAA', icon: Shield },
    { name: 'ISO 27001', icon: Lock },
    { name: 'SOC 2', icon: FileText },
    { name: 'GDPR', icon: Shield },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                    : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
                  } 
                  alt="Horalix Logo" 
                  className="h-8 w-auto" 
                />
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {language === 'en' 
                  ? 'Leading AI-powered clinical decision support system for evidence-based antibiotic recommendations. Trusted by healthcare professionals worldwide.'
                  : 'Vodeći AI sistem za podršku kliničkih odluka za preporuke antibiotika zasnovane na dokazima. Poverenje zdravstvenih radnika širom sveta.'
                }
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-3 text-primary" />
                  {contactInfo.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-3 text-primary" />
                  {contactInfo.phone}
                </div>
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                  <span>{contactInfo.address}</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="py-8 border-t border-border">
          <div className="text-center mb-6">
            <h4 className="font-semibold text-foreground mb-2">
              {language === 'en' ? 'Certified & Compliant' : 'Sertifikovano i Usklađeno'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? 'Meeting the highest standards in healthcare data security and privacy'
                : 'Ispunjava najviše standarde sigurnosti i privatnosti zdravstvenih podataka'
              }
            </p>
          </div>
          <div className="flex justify-center items-center space-x-8">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <cert.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Horalix. {language === 'en' ? 'All rights reserved.' : 'Sva prava zadržana.'}
              </p>
              <div className="flex items-center space-x-4">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Available worldwide' : 'Dostupno širom sveta'}
                </span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://twitter.com/horalix" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/horalix" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/horalix" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};