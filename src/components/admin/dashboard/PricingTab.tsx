
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
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
  Info,
  CreditCard,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export const PricingTab = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [doctorCount, setDoctorCount] = useState(5);
  const [activeTab, setActiveTab] = useState('hospitals');
  const [isProcessing, setIsProcessing] = useState(false);

  const seatFeePerMonth = 25;
  const totalSeatFee = doctorCount * seatFeePerMonth;

  const hospitalCreditBundles = [
    {
      name: 'Starter',
      credits: 100,
      price: 51,
      costPerCredit: 1.00,
      popular: false,
      bestValue: false
    },
    {
      name: 'Basic',
      credits: 500,
      price: 204,
      costPerCredit: 0.80,
      popular: false,
      bestValue: false
    },
    {
      name: 'Pro',
      credits: 1000,
      price: 357,
      costPerCredit: 0.70,
      popular: true,
      bestValue: false
    },
    {
      name: 'Growth',
      credits: 2500,
      price: 765,
      costPerCredit: 0.60,
      popular: false,
      bestValue: true
    },
    {
      name: 'Scale',
      credits: 5000,
      price: 1403,
      costPerCredit: 0.55,
      popular: false,
      bestValue: false
    }
  ];

  const individualPlans = [
    {
      name: 'Basic',
      price: 51,
      credits: 200,
      extraCreditCost: 1.00,
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
        'Advanced guidelines access'
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

  const handleAddToHospitalPlan = async (bundle: typeof hospitalCreditBundles[0]) => {
    setIsProcessing(true);
    try {
      toast({
        title: "Processing Hospital Plan",
        description: `Adding ${bundle.name} bundle (${bundle.credits.toLocaleString()} credits) to your hospital plan...`,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Bundle Added Successfully",
        description: `${bundle.name} bundle has been added to your hospital plan. You'll be charged €${bundle.price} for ${bundle.credits.toLocaleString()} credits.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add bundle to hospital plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectIndividualPlan = async (plan: typeof individualPlans[0]) => {
    setIsProcessing(true);
    try {
      toast({
        title: "Processing Subscription",
        description: `Setting up your ${plan.name} subscription...`,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Subscription Activated",
        description: `Your ${plan.name} plan has been activated. ${plan.unlimited ? 'You now have unlimited usage.' : `You have ${plan.credits} credits per month.`}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGetCustomQuote = () => {
    const subject = encodeURIComponent('Enterprise Volume Discount Inquiry');
    const body = encodeURIComponent(`Hello,

I'm interested in enterprise volume discounts for our organization. We need 10,000+ credits and would like to discuss custom pricing options.

Current requirements:
- Estimated monthly credit usage: 10,000+
- Number of doctors: ${doctorCount}
- Organization: ${user?.email || 'Not specified'}

Please contact me to discuss volume pricing options.

Best regards`);
    
    window.open(`mailto:sales@horalix.com?subject=${subject}&body=${body}`, '_blank');
    
    toast({
      title: "Email Client Opened",
      description: "We've opened your email client with a pre-filled inquiry. Our sales team will respond within 24 hours.",
    });
  };

  const handleEarlyAccessWaitlist = () => {
    toast({
      title: "Added to Waitlist",
      description: "You've been added to the VR Training early access waitlist. We'll notify you when it's available!",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 pt-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Choose Your Plan' : 'Odaberite Svoj Plan'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Hospital-grade pricing designed for healthcare professionals and institutions'
              : 'Bolničke cijene dizajnirane za zdravstvene stručnjake i ustanove'}
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
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {language === 'en' ? 'Seat Fees (Required)' : 'Naknade po Sjedištu (Obavezno)'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-medical-primary mb-2">€25/month per doctor</div>
                  <p className="text-gray-600 dark:text-gray-300">
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
              </CardContent>
            </Card>

            {/* Hospital Credit Bundles */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                {language === 'en' ? 'Credit Bundles (Optional Add-ons)' : 'Paketi Kredita (Dodatni)'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {hospitalCreditBundles.map((bundle, index) => (
                  <Card key={index} className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700">
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
                      <div className="text-sm text-gray-600 dark:text-gray-400">€{bundle.costPerCredit.toFixed(2)}/credit</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-lg font-semibold">{bundle.credits.toLocaleString()} credits</div>
                      </div>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleAddToHospitalPlan(bundle)}
                        disabled={isProcessing}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Add to Hospital Plan' : 'Dodaj u Bolnički Plan'}
                      </Button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                        {language === 'en' ? 'Credits never expire. Shared across all doctors.' : 'Krediti nikad ne istječu. Dijeli se među svim liječnicima.'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enterprise CTA */}
            <Card className="bg-gradient-to-r from-medical-primary to-blue-700 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'en' ? 'Need 10,000+ credits?' : 'Trebate 10,000+ kredita?'}
                </h3>
                <p className="text-lg mb-6">
                  {language === 'en' 
                    ? 'Contact us for volume discounts (up to 20% off)' 
                    : 'Kontaktirajte nas za popuste na količinu (do 20% popusta)'}
                </p>
                <Button size="lg" variant="secondary" onClick={handleGetCustomQuote}>
                  <Mail className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Get Custom Quote' : 'Dobijte Prilagođenu Ponudu'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-12">
            {/* Individual Subscription Plans */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                {language === 'en' ? 'Subscription Plans' : 'Pretplatnički Planovi'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {individualPlans.map((plan, index) => (
                  <Card key={index} className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700 ${plan.name === 'Elite' ? 'ring-2 ring-medical-primary scale-105' : ''}`}>
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
                      <div className="text-sm text-gray-600 dark:text-gray-400">/month</div>
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
                        onClick={() => handleSelectIndividualPlan(plan)}
                        disabled={isProcessing}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Select Plan' : 'Odaberite Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <Card className="max-w-3xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700">
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
                      {language === 'en' 
                        ? 'Yes! Hospitals can combine seat fees with credit bundles. Individual doctors can supplement their subscription with additional credit purchases for extra flexibility.'
                        : 'Da! Bolnice mogu kombinirati naknade po sjedištu s paketima kredita. Individualni liječnici mogu dopuniti svoju pretplatu dodatnim kupnjama kredita za dodatnu fleksibilnost.'}
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
                        ? 'Subscription credits roll over to the next month (except Elite unlimited plan). Hospital credit bundles never expire.'
                        : 'Krediti iz pretplate se prenose u sljedeći mjesec (osim Elite neograničenog plana). Bolnički paketi kredita nikad ne istječu.'}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-6 w-6 text-green-600 dark:text-green-400" />
                <h4 className="text-lg font-semibold text-green-700 dark:text-green-300">
                  Coming Soon: VR Training Modules
                </h4>
              </div>
              <p className="text-green-600 dark:text-green-400 mb-4">
                Experience immersive virtual reality training scenarios including sterile technique, 
                infection control procedures, and complex patient consultations.
              </p>
              <Button variant="outline" onClick={handleEarlyAccessWaitlist}>
                Early Access Waitlist
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
