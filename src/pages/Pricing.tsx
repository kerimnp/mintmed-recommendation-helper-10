
import React, { useState } from 'react';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Building2, 
  User, 
  Check, 
  Star, 
  Crown,
  Infinity,
  Calculator,
  Info
} from 'lucide-react';

const Pricing = () => {
  const { language } = useLanguage();
  const [doctorCount, setDoctorCount] = useState(5);
  const [activeTab, setActiveTab] = useState('individual');

  const seatFeePerMonth = 25;
  const totalSeatFee = doctorCount * seatFeePerMonth;

  const hospitalCreditBundles = [
    {
      name: 'Starter Bundle',
      credits: 100,
      price: 70,
      costPerCredit: 0.70,
      popular: false,
      bestValue: false
    },
    {
      name: 'Pro Bundle',
      credits: 1000,
      price: 600,
      costPerCredit: 0.60,
      popular: true,
      bestValue: false
    },
    {
      name: 'Scale Bundle',
      credits: 5000,
      price: 2500,
      costPerCredit: 0.50,
      popular: false,
      bestValue: true
    }
  ];

  const individualPlans = [
    {
      name: 'Basic',
      price: 51,
      credits: 200,
      features: [
        'Roll over unused credits',
        'Basic support',
        'Standard guidelines access'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: 102,
      credits: 500,
      extraCreditCost: 0.80,
      features: [
        'Roll over unused credits',
        'Priority support',
        'Advanced guidelines access',
        'Extra credits at €0.80 each'
      ],
      popular: true
    },
    {
      name: 'Elite',
      price: 179,
      unlimited: true,
      features: [
        'Unlimited usage',
        'Premium support',
        'Full guidelines access',
        'Real-time updates',
        'Advanced analytics'
      ],
      popular: false
    }
  ];

  const standaloneBundles = [
    {
      name: 'Starter',
      credits: 50,
      price: 40,
      costPerCredit: 0.80
    },
    {
      name: 'Basic',
      credits: 200,
      price: 140,
      costPerCredit: 0.70
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Choose Your Plan' : 'Odaberite Svoj Plan'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Flexible pricing designed for healthcare professionals and institutions'
              : 'Fleksibilne cijene dizajnirane za zdravstvene stručnjake i ustanove'}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="hospitals" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {language === 'en' ? 'Hospitals & Clinics' : 'Bolnice i Klinike'}
            </TabsTrigger>
            <TabsTrigger value="individual" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {language === 'en' ? 'Individual Doctors' : 'Individualni Liječnici'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hospitals" className="space-y-12">
            {/* Hospital Seat Fees */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-center mb-6">
                {language === 'en' ? 'Seat Fees (Required)' : 'Naknade po Sjedištu (Obavezno)'}
              </h2>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-medical-primary mb-2">€25/month per doctor</div>
                <p className="text-gray-600">
                  {language === 'en' ? 'Billed monthly. Required for all hospital accounts.' : 'Naplaćuje se mjesečno. Obavezno za sve bolničke račune.'}
                </p>
              </div>
              
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  <Select value={doctorCount.toString()} onValueChange={(value) => setDoctorCount(parseInt(value))}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {language === 'en' ? 'doctors' : 'liječnika'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-2xl">×</span>
                  <span className="text-2xl font-bold">€25</span>
                  <span className="text-2xl">=</span>
                  <div className="text-2xl font-bold text-medical-primary">€{totalSeatFee}/month</div>
                </div>
              </div>
            </div>

            {/* Hospital Credit Bundles */}
            <div>
              <h2 className="text-2xl font-bold text-center mb-8">
                {language === 'en' ? 'Credit Bundles (Optional Add-ons)' : 'Paketi Kredita (Dodatni)'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hospitalCreditBundles.map((bundle, index) => (
                  <Card key={index} className="relative">
                    {bundle.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {bundle.bestValue && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500">
                        <Crown className="h-3 w-3 mr-1" />
                        Best Value
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle>{bundle.name}</CardTitle>
                      <div className="text-3xl font-bold">€{bundle.price}</div>
                      <div className="text-sm text-gray-600">€{bundle.costPerCredit}/credit</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-lg font-semibold">{bundle.credits.toLocaleString()} credits</div>
                      </div>
                      <Button className="w-full" variant="outline">
                        {language === 'en' ? 'Add to Hospital Plan' : 'Dodaj u Bolnički Plan'}
                      </Button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        {language === 'en' ? 'Credits never expire. Shared across all doctors.' : 'Krediti nikad ne istječu. Dijeli se među svim liječnicima.'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enterprise CTA */}
            <div className="bg-gradient-to-r from-medical-primary to-blue-700 text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'en' ? 'Need 10,000+ credits?' : 'Trebate 10,000+ kredita?'}
              </h3>
              <p className="text-lg mb-6">
                {language === 'en' 
                  ? 'Contact us for volume discounts (up to 20% off)' 
                  : 'Kontaktirajte nas za popuste na količinu (do 20% popusta)'}
              </p>
              <Button size="lg" variant="secondary">
                {language === 'en' ? 'Get Custom Quote' : 'Dobijte Prilagođenu Ponudu'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="individual" className="space-y-12">
            {/* Individual Subscription Plans */}
            <div>
              <h2 className="text-2xl font-bold text-center mb-8">
                {language === 'en' ? 'Subscription Plans' : 'Pretplatnički Planovi'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {individualPlans.map((plan, index) => (
                  <Card key={index} className={`relative ${plan.name === 'Elite' ? 'ring-2 ring-medical-primary scale-105' : ''}`}>
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
                      <div className="text-sm text-gray-600">/month</div>
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
                        {plan.extraCreditCost && (
                          <div className="text-sm text-gray-600 mt-1">
                            + €{plan.extraCreditCost}/extra credit
                          </div>
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
                      <Button className="w-full" variant={plan.name === 'Elite' ? 'default' : 'outline'}>
                        {language === 'en' ? 'Select Plan' : 'Odaberite Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Standalone Credit Bundles */}
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">
                {language === 'en' ? 'Need more flexibility?' : 'Trebate više fleksibilnosti?'}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {language === 'en' ? 'Purchase standalone credits:' : 'Kupite samostalne kredite:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {standaloneBundles.map((bundle, index) => (
                  <Card key={index}>
                    <CardHeader className="text-center">
                      <CardTitle>{bundle.name}</CardTitle>
                      <div className="text-2xl font-bold">€{bundle.price}</div>
                      <div className="text-sm text-gray-600">€{bundle.costPerCredit}/credit</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-lg font-semibold">{bundle.credits} credits</div>
                      </div>
                      <Button className="w-full">
                        {language === 'en' ? 'Buy Now' : 'Kupite Sada'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">
                {language === 'en' ? 'Frequently Asked Questions' : 'Često Postavljana Pitanja'}
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {language === 'en' ? 'Can I mix subscriptions and bundles?' : 'Mogu li kombinirati pretplate i pakete?'}
                  </AccordionTrigger>
                  <AccordionContent>
                    {language === 'en' 
                      ? 'Yes! Hospitals can combine seat fees with credit bundles. Individual doctors can supplement their subscription with standalone credit bundles for extra flexibility.'
                      : 'Da! Bolnice mogu kombinirati naknade po sjedištu s paketima kredita. Individualni liječnici mogu dopuniti svoju pretplatu samostalnim paketima kredita za dodatnu fleksibilnost.'}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    {language === 'en' ? 'How are credits tracked?' : 'Kako se prate krediti?'}
                  </AccordionTrigger>
                  <AccordionContent>
                    {language === 'en' 
                      ? 'Real-time dashboard shows your credit balance, usage history, and renewal dates. Hospital administrators can view usage across all doctors.'
                      : 'Dashboard u realnom vremenu prikazuje stanje kredita, povijest korištenja i datume obnove. Administratori bolnica mogu vidjeti korištenje svih liječnika.'}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    {language === 'en' ? 'What happens to unused credits?' : 'Što se događa s nekorištenim kreditima?'}
                  </AccordionTrigger>
                  <AccordionContent>
                    {language === 'en' 
                      ? 'Subscription credits roll over to the next month (except Elite unlimited plan). Purchased credit bundles never expire.'
                      : 'Krediti iz pretplate se prenose u sljedeći mjesec (osim Elite neograničenog plana). Kupljeni paketi kredita nikad ne istječu.'}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Pricing;
