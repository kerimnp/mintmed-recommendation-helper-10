import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Mail, Phone, MapPin, Send, Clock, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Get in touch with our team. We're here to help with your questions and support needs.",
      backButton: "Back to Home",
      contactInfo: {
        title: "Contact Information",
        email: "contact@horalix.com",
        phone: "+387 33 456 789",
        address: "Sarajevo Technology Park, Sarajevo, Bosnia and Herzegovina",
        hours: "Monday - Friday: 9:00 AM - 6:00 PM CET"
      },
      departments: [
        {
          title: "General Inquiries",
          icon: MessageSquare,
          email: "contact@horalix.com",
          description: "General questions and information requests"
        },
        {
          title: "Technical Support",
          icon: Users,
          email: "support@horalix.com",
          description: "Technical assistance and troubleshooting"
        },
        {
          title: "Sales & Partnerships",
          icon: Mail,
          email: "sales@horalix.com",
          description: "Pricing, demos, and partnership opportunities"
        }
      ],
      form: {
        title: "Send us a message",
        name: "Full Name",
        email: "Email Address",
        organization: "Organization",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        namePlaceholder: "Enter your full name",
        emailPlaceholder: "Enter your email address",
        organizationPlaceholder: "Enter your organization name",
        subjectPlaceholder: "What is this regarding?",
        messagePlaceholder: "Tell us how we can help you...",
        success: "Message sent successfully! We'll get back to you soon.",
        error: "Failed to send message. Please try again."
      }
    },
    bs: {
      title: "Kontaktirajte nas",
      subtitle: "Stupite u kontakt sa našim timom. Tu smo da pomognemo sa vašim pitanjima i potrebama za podrškom.",
      backButton: "Nazad na početnu",
      contactInfo: {
        title: "Kontakt informacije",
        email: "contact@horalix.com",
        phone: "+387 33 456 789",
        address: "Sarajevo Technology Park, Sarajevo, Bosna i Hercegovina",
        hours: "Ponedeljak - Petak: 9:00 - 18:00 CET"
      },
      departments: [
        {
          title: "Opšti upiti",
          icon: MessageSquare,
          email: "contact@horalix.com",
          description: "Opšta pitanja i zahtevi za informacije"
        },
        {
          title: "Tehnička podrška",
          icon: Users,
          email: "support@horalix.com",
          description: "Tehnička pomoć i rešavanje problema"
        },
        {
          title: "Prodaja i partnerstva",
          icon: Mail,
          email: "sales@horalix.com",
          description: "Cene, demo i mogućnosti partnerstva"
        }
      ],
      form: {
        title: "Pošaljite nam poruku",
        name: "Puno ime",
        email: "Email adresa",
        organization: "Organizacija",
        subject: "Tema",
        message: "Poruka",
        send: "Pošalji poruku",
        namePlaceholder: "Unesite vaše puno ime",
        emailPlaceholder: "Unesite vašu email adresu",
        organizationPlaceholder: "Unesite naziv vaše organizacije",
        subjectPlaceholder: "O čemu se radi?",
        messagePlaceholder: "Recite nam kako možemo da vam pomognemo...",
        success: "Poruka je uspešno poslata! Uskoro ćemo vam se javiti.",
        error: "Slanje poruke nije uspelo. Molimo pokušajte ponovo."
      }
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    try {
      // Here you would normally send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: currentContent.form.success,
        description: "We typically respond within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: currentContent.form.error,
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentContent.backButton}
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">{currentContent.title}</h1>
          <p className="text-muted-foreground text-lg">{currentContent.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Main Contact Info */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>{currentContent.contactInfo.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${currentContent.contactInfo.email}`} className="text-primary hover:underline">
                    {currentContent.contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{currentContent.contactInfo.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span>{currentContent.contactInfo.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{currentContent.contactInfo.hours}</span>
                </div>
              </CardContent>
            </Card>

            {/* Departments */}
            <div className="space-y-4">
              {currentContent.departments.map((dept, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <dept.icon className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{dept.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                        <a href={`mailto:${dept.email}`} className="text-primary text-sm hover:underline">
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {currentContent.form.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{currentContent.form.name}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.namePlaceholder}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">{currentContent.form.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.emailPlaceholder}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="organization">{currentContent.form.organization}</Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.organizationPlaceholder}
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">{currentContent.form.subject}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.subjectPlaceholder}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">{currentContent.form.message}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.messagePlaceholder}
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {currentContent.form.send}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;