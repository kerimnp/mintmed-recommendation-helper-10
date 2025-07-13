
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Star, Crown, Infinity } from 'lucide-react';
import { individualPlans } from './PricingData';
import { useToast } from '@/hooks/use-toast';

export const IndividualPricingSection: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();

  const handleSelectPlan = (planName: string, price: number) => {
    toast({
      title: language === 'en' ? 'Contact Support' : 'Kontaktirajte Podršku',
      description: language === 'en' 
        ? `Thank you for your interest in the ${planName} plan! Please contact our sales team at support@horalix.com to set up your subscription.`
        : `Hvala vam na zanimanju za ${planName} plan! Molimo kontaktirajte naš prodajni tim na support@horalix.com da postavite vašu pretplatu.`,
      duration: 6000,
    });
  };

  return (
    <div className="space-y-12">
      {/* Individual Subscription Plans */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {language === 'en' ? 'Subscription Plans' : 'Pretplatnički Planovi'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {individualPlans.map((plan, index) => (
            <Card key={index} className={`relative bg-card backdrop-blur-lg ${plan.name === 'Elite' ? 'ring-2 ring-primary scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  {plan.name}
                  {plan.name === 'Elite' && <Crown className="h-5 w-5 text-yellow-500" />}
                </CardTitle>
                <div className="text-3xl font-bold">€{plan.price}</div>
                <div className="text-sm text-muted-foreground">/month</div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  {plan.unlimited ? (
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                      <Infinity className="h-5 w-5" />
                      Unlimited usage
                    </div>
                  ) : (
                    <div className="text-lg font-semibold">{plan.credits} credits/month</div>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.name === 'Elite' ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan(plan.name, plan.price)}
                >
                  {language === 'en' ? 'Select Plan' : 'Odaberite Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Card className="max-w-3xl mx-auto bg-card backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {language === 'en' ? 'Frequently Asked Questions' : 'Često Postavljana Pitanja'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {language === 'en' ? 'Can I mix subscriptions and bundles?' : 'Mogu li kombinirati pretplate i pakete?'}
              </AccordionTrigger>
              <AccordionContent>
                {language === 'en' ? 'Yes! Hospitals can combine seat fees with credit bundles. Individual doctors can supplement their subscription with additional credit purchases for extra flexibility.' : 'Da! Bolnice mogu kombinirati naknade po sjedištu s paketima kredita. Individualni liječnici mogu dopuniti svoju pretplatu dodatnim kupnjama kredita za dodatnu fleksibilnost.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                {language === 'en' ? 'How are credits tracked?' : 'Kako se prate krediti?'}
              </AccordionTrigger>
              <AccordionContent>
                {language === 'en' ? 'Real-time dashboard shows your credit balance, usage history, and renewal dates. Hospital administrators can view usage across all doctors.' : 'Dashboard u realnom vremenu prikazuje stanje kredita, povijest korištenja i datume obnove. Administratori bolnica mogu vidjeti korištenje svih liječnika.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                {language === 'en' ? 'What happens to unused credits?' : 'Što se događa s nekorištenim kreditima?'}
              </AccordionTrigger>
              <AccordionContent>
                {language === 'en' ? 'Subscription credits roll over to the next month (except Elite unlimited plan). Hospital credit bundles never expire.' : 'Krediti iz pretplate se prenose u sljedeći mjesec (osim Elite neograničenog plana). Bolnički paketi kredita nikad ne istječu.'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
