
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { individualPlans } from './PricingData';

export const IndividualPricingSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {language === 'en' ? 'Individual Doctor Plans' : 'Planovi za Individualne Liječnike'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {language === 'en' ? 'Monthly subscription plans for individual healthcare providers' : 'Mjesečni planovi pretplate za individualne zdravstvene radnike'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {individualPlans.map((plan, index) => (
          <Card key={index} className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700 ${plan.popular ? 'ring-2 ring-medical-primary' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-medical-primary">
                <Star className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Most Popular' : 'Najpopularniji'}
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-4xl font-bold text-medical-primary">
                €{plan.price}
                <span className="text-lg font-normal text-gray-500">/month</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {plan.credits} credits per month
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-medical-primary hover:bg-medical-primary/90">
                {language === 'en' ? `Choose ${plan.name}` : `Odaberite ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          {language === 'en' 
            ? 'All plans include automatic monthly renewals. Cancel anytime.' 
            : 'Svi planovi uključuju automatsko mjesečno obnavljanje. Otkažite u bilo koje vrijeme.'}
        </p>
      </div>
    </div>
  );
};
