
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users } from 'lucide-react';
import { hospitalPlans } from './PricingData';

export const HospitalPricingSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {language === 'en' ? 'Hospital & Clinic Plans' : 'Planovi za Bolnice i Klinike'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {language === 'en' ? 'Comprehensive solutions for healthcare institutions' : 'Sveobuhvatna rješenja za zdravstvene ustanove'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {hospitalPlans.map((plan, index) => (
          <Card key={index} className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700 ${plan.popular ? 'ring-2 ring-medical-primary' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-medical-primary">
                <Star className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Most Popular' : 'Najpopularniji'}
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-medical-primary">
                €{plan.price}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {plan.credits} credits per month
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Users className="h-3 w-3" />
                Up to {plan.doctorSeats} doctors
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-medical-primary hover:bg-medical-primary/90" size="sm">
                {language === 'en' ? `Choose ${plan.name}` : `Odaberite ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="bg-gradient-to-r from-medical-primary to-blue-700 text-white max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">
              {language === 'en' ? 'Need a Custom Solution?' : 'Trebate Prilagođeno Rješenje?'}
            </h3>
            <p className="mb-4">
              {language === 'en' 
                ? 'For larger institutions with 50+ doctors or special requirements, contact us for custom pricing.'
                : 'Za veće ustanove s 50+ liječnika ili posebnim zahtjevima, kontaktirajte nas za prilagođene cijene.'}
            </p>
            <Button size="lg" variant="secondary">
              {language === 'en' ? 'Contact Sales' : 'Kontaktirajte Prodaju'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          {language === 'en' 
            ? 'All hospital plans include multi-user management, shared credit pools, and dedicated support.' 
            : 'Svi bolnički planovi uključuju upravljanje više korisnika, dijeljene grupe kredita i posvećenu podršku.'}
        </p>
      </div>
    </div>
  );
};
