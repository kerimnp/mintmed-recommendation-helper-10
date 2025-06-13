
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Baby, 
  Heart, 
  Stethoscope, 
  Clock,
  Search,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';

interface PatientTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  commonScenarios: string[];
  preset: any;
}

interface PatientTemplatesProps {
  onSelectTemplate: (template: PatientTemplate) => void;
  onSkip: () => void;
}

export const PatientTemplates: React.FC<PatientTemplatesProps> = ({
  onSelectTemplate,
  onSkip
}) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates: PatientTemplate[] = [
    {
      id: 'healthy-adult',
      name: language === "en" ? "Healthy Adult" : "Zdrav Odrasli",
      description: language === "en" ? "Standard adult patient without comorbidities" : "Standardni odrasli pacijent bez komorbiditeta",
      icon: <User className="h-6 w-6" />,
      category: 'general',
      commonScenarios: ['UTI', 'Respiratory infections', 'Skin infections'],
      preset: {
        age: '35',
        gender: 'male',
        weight: '70',
        height: '175',
        kidneyDisease: false,
        liverDisease: false,
        diabetes: false,
        immunosuppressed: false
      }
    },
    {
      id: 'elderly-patient',
      name: language === "en" ? "Elderly Patient" : "Stariji Pacijent",
      description: language === "en" ? "Patient over 65 with potential comorbidities" : "Pacijent stariji od 65 s mogućim komorbiditetima",
      icon: <Clock className="h-6 w-6" />,
      category: 'special',
      commonScenarios: ['Pneumonia', 'UTI', 'Skin infections'],
      preset: {
        age: '75',
        gender: 'female',
        weight: '65',
        height: '160',
        kidneyDisease: true,
        liverDisease: false,
        diabetes: true,
        immunosuppressed: false
      }
    },
    {
      id: 'pediatric',
      name: language === "en" ? "Pediatric Patient" : "Pedijatrijski Pacijent",
      description: language === "en" ? "Child requiring weight-based dosing" : "Dijete koje zahtijeva doziranje prema težini",
      icon: <Baby className="h-6 w-6" />,
      category: 'pediatric',
      commonScenarios: ['Otitis media', 'Strep throat', 'Skin infections'],
      preset: {
        age: '8',
        gender: 'male',
        weight: '25',
        height: '125',
        kidneyDisease: false,
        liverDisease: false,
        diabetes: false,
        immunosuppressed: false
      }
    },
    {
      id: 'icu-patient',
      name: language === "en" ? "ICU Patient" : "Pacijent JIL-a",
      description: language === "en" ? "Critically ill patient requiring intensive care" : "Kritično bolestan pacijent koji zahtijeva intenzivnu njegu",
      icon: <Heart className="h-6 w-6" />,
      category: 'critical',
      commonScenarios: ['Sepsis', 'VAP', 'Catheter infections'],
      preset: {
        age: '55',
        gender: 'male',
        weight: '80',
        height: '180',
        kidneyDisease: true,
        liverDisease: false,
        diabetes: true,
        immunosuppressed: true,
        severity: 'severe'
      }
    }
  ];

  const categories = [
    { id: 'all', name: language === "en" ? "All Templates" : "Svi Predlošci" },
    { id: 'general', name: language === "en" ? "General" : "Opći" },
    { id: 'special', name: language === "en" ? "Special Populations" : "Posebne Populacije" },
    { id: 'pediatric', name: language === "en" ? "Pediatric" : "Pedijatrijski" },
    { id: 'critical', name: language === "en" ? "Critical Care" : "Intenzivna Skrb" }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === "en" ? "Quick Start Templates" : "Predlošci za Brzi Početak"}
        </h2>
        <p className="text-gray-600">
          {language === "en" 
            ? "Choose a template to pre-fill common patient scenarios, or skip to enter custom details"
            : "Odaberite predložak za unaprijed ispunjene česte pacijentske scenarije, ili preskočite za unos prilagođenih detalja"}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={language === "en" ? "Search templates..." : "Pretraži predloške..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map(template => (
          <Card 
            key={template.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-medical-primary/50"
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-medical-primary/10 rounded-lg text-medical-primary">
                    {template.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">{template.description}</p>
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">
                  {language === "en" ? "Common scenarios:" : "Česti scenariji:"}
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.commonScenarios.slice(0, 3).map((scenario, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {scenario}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skip Option */}
      <div className="text-center pt-4 border-t">
        <Button variant="ghost" onClick={onSkip} className="text-gray-600">
          {language === "en" ? "Skip templates and start fresh" : "Preskoči predloške i počni iznova"}
        </Button>
      </div>
    </div>
  );
};
