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
  Users,
  Check, 
  Star, 
  Crown,
  Infinity,
  Calculator,
  Info,
  CreditCard,
  Mail,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard, EnhancedBadge, designSystem } from './enhanced/DesignSystem';

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
      bestValue: false,
      gradient: designSystem.gradients.primary
    },
    {
      name: 'Basic',
      credits: 500,
      price: 204,
      costPerCredit: 0.80,
      popular: false,
      bestValue: false,
      gradient: designSystem.gradients.success
    },
    {
      name: 'Pro',
      credits: 1000,
      price: 357,
      costPerCredit: 0.70,
      popular: true,
      bestValue: false,
      gradient: designSystem.gradients.warning
    },
    {
      name: 'Growth',
      credits: 2500,
      price: 765,
      costPerCredit: 0.60,
      popular: false,
      bestValue: true,
      gradient: designSystem.gradients.medical
    },
    {
      name: 'Scale',
      credits: 5000,
      price: 1403,
      costPerCredit: 0.55,
      popular: false,
      bestValue: false,
      gradient: designSystem.gradients.danger
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
      popular: false,
      gradient: designSystem.gradients.primary
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
      popular: true,
      gradient: designSystem.gradients.success
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
      popular: false,
      gradient: designSystem.gradients.medical
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
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              {language === 'en' ? 'Choose Your Plan' : 'Odaberite Svoj Plan'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {language === 'en' 
                ? 'Hospital-grade pricing designed for healthcare professionals and institutions with enterprise-level security and compliance'
                : 'Bolničke cijene dizajnirane za zdravstvene stručnjake i ustanove s enterprise sigurnošću i usklađenošću'}
            </p>
          </motion.div>
        </div>

        {/* Enhanced Metrics Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <MetricCard
            title="Active Subscribers"
            value="2,847"
            subtitle="Across all plans"
            trend="up"
            trendValue="+18%"
            icon={<Users className="h-6 w-6" />}
            gradient={designSystem.gradients.primary}
          />
          <MetricCard
            title="Customer Satisfaction"
            value="98.7%"
            subtitle="Based on 1,200+ reviews"
            trend="up"
            trendValue="+0.3%"
            icon={<Star className="h-6 w-6" />}
            gradient={designSystem.gradients.success}
          />
          <MetricCard
            title="Uptime Guarantee"
            value="99.9%"
            subtitle="Enterprise SLA"
            trend="stable"
            trendValue="0%"
            icon={<Shield className="h-6 w-6" />}
            gradient={designSystem.gradients.medical}
          />
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 h-12">
            <TabsTrigger value="hospitals" className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4" />
              {language === 'en' ? 'Hospitals & Clinics' : 'Bolnice i Klinike'}
            </TabsTrigger>
            <TabsTrigger value="individual" className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              {language === 'en' ? 'Individual Doctors' : 'Individualni Liječnici'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hospitals" className="space-y-12">
            {/* Enhanced Hospital Seat Fees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className={`${designSystem.shadows.medium} border-0 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-800 dark:via-blue-900/10 dark:to-gray-800`}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl font-bold mb-2">
                    {language === 'en' ? 'Seat Fees (Required)' : 'Naknade po Sjedištu (Obavezno)'}
                  </CardTitle>
                  <div className="flex items-center justify-center gap-2 text-lg text-gray-600 dark:text-gray-300">
                    <Shield className="h-5 w-5" />
                    <span>Enterprise Security & Compliance Included</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      €25/month per doctor
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      {language === 'en' ? 'Billed monthly. Required for all hospital accounts.' : 'Naplaćuje se mjesečno. Obavezno za sve bolničke račune.'}
                    </p>
                  </div>
                  
                  <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-inner">
                    <div className="flex items-center gap-4 mb-6">
                      <Select value={doctorCount.toString()} onValueChange={(value) => setDoctorCount(parseInt(value))}>
                        <SelectTrigger className="flex-1 h-12 text-lg">
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
                      <span className="text-3xl font-light text-gray-400">×</span>
                      <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">€25</span>
                      <span className="text-3xl font-light text-gray-400">=</span>
                      <div className="text-3xl font-bold text-blue-600">€{totalSeatFee}/month</div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Calculator className="h-4 w-4" />
                      <span>Annual savings available with yearly billing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Hospital Credit Bundles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'en' ? 'Credit Bundles (Optional Add-ons)' : 'Paketi Kredita (Dodatni)'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {language === 'en' ?
                    'Flexible credit packages that scale with your organization\'s needs' :
                    'Fleksibilni paketi kredita koji se prilagođavaju potrebama vaše organizacije'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {hospitalCreditBundles.map((bundle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <Card className={`relative ${designSystem.shadows.soft} hover:${designSystem.shadows.strong} transition-all duration-300 border-0 overflow-hidden h-full`}>
                      {bundle.popular && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500"></div>
                      )}
                      {bundle.bestValue && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                      )}
                      
                      {(bundle.popular || bundle.bestValue) && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                          <EnhancedBadge 
                            variant={bundle.popular ? 'warning' : 'success'}
                            size="sm"
                          >
                            {bundle.popular && <><Star className="h-3 w-3 mr-1" />Popular</>}
                            {bundle.bestValue && <><Crown className="h-3 w-3 mr-1" />Best Value</>}
                          </EnhancedBadge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        <div className={`w-16 h-16 rounded-2xl ${bundle.gradient} flex items-center justify-center text-white shadow-lg mx-auto mb-4`}>
                          <Sparkles className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-xl">{bundle.name}</CardTitle>
                        <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                          €{bundle.price}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          €{bundle.costPerCredit.toFixed(2)}/credit
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-center mb-6">
                          <div className="text-2xl font-semibold text-blue-600 mb-2">
                            {bundle.credits.toLocaleString()} credits
                          </div>
                          <div className="text-sm text-gray-500">
                            Never expire • Shared access
                          </div>
                        </div>
                        <Button 
                          className="w-full h-12 text-base font-medium" 
                          variant="outline"
                          onClick={() => handleAddToHospitalPlan(bundle)}
                          disabled={isProcessing}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Add to Plan' : 'Dodaj u Plan'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Enterprise CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <CardContent className="relative p-12 text-center">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-4xl font-bold mb-6">
                      {language === 'en' ? 'Enterprise Solutions' : 'Enterprise Rješenja'}
                    </h3>
                    <p className="text-xl mb-8 text-blue-100">
                      {language === 'en' 
                        ? 'Custom integrations, dedicated support, and volume discounts for large healthcare organizations'
                        : 'Prilagođene integracije, dedicirana podrška i popusti na količinu za velike zdravstvene organizacije'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button size="lg" variant="secondary" onClick={handleGetCustomQuote} className="text-lg px-8 py-4">
                        <Mail className="h-5 w-5 mr-2" />
                        {language === 'en' ? 'Get Custom Quote' : 'Dobijte Prilagođenu Ponudu'}
                      </Button>
                      <div className="flex items-center gap-2 text-blue-100">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm">SOC 2 Type II Certified</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="individual" className="space-y-12">
            {/* Enhanced Individual Subscription Plans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'en' ? 'Individual Subscription Plans' : 'Individualni Pretplatnički Planovi'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {language === 'en' ?
                    'Professional-grade tools for individual healthcare practitioners' :
                    'Profesionalni alati za individualne zdravstvene stručnjake'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {individualPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <Card className={`relative ${designSystem.shadows.soft} hover:${designSystem.shadows.strong} transition-all duration-300 border-0 overflow-hidden h-full ${plan.name === 'Elite' ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                      {plan.popular && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500"></div>
                      )}
                      {plan.name === 'Elite' && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                      )}
                      
                      {(plan.popular || plan.name === 'Elite') && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                          <EnhancedBadge 
                            variant={plan.popular ? 'warning' : 'medical'}
                            size="sm"
                          >
                            {plan.popular && <><Star className="h-3 w-3 mr-1" />Popular</>}
                            {plan.name === 'Elite' && <><Crown className="h-3 w-3 mr-1" />Premium</>}
                          </EnhancedBadge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        <div className={`w-16 h-16 rounded-2xl ${plan.gradient} flex items-center justify-center text-white shadow-lg mx-auto mb-4`}>
                          {plan.name === 'Elite' ? <Crown className="h-8 w-8" /> : 
                           plan.name === 'Pro' ? <Zap className="h-8 w-8" /> : 
                           <User className="h-8 w-8" />}
                        </div>
                        <CardTitle className="text-2xl flex items-center justify-center gap-2">
                          {plan.name}
                        </CardTitle>
                        <div className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                          €{plan.price}
                        </div>
                        <div className="text-base text-gray-600 dark:text-gray-400">/month</div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-center mb-8">
                          {plan.unlimited ? (
                            <div className="flex items-center justify-center gap-2 text-2xl font-semibold text-blue-600 mb-2">
                              <Infinity className="h-6 w-6" />
                              Unlimited usage
                            </div>
                          ) : (
                            <div className="text-2xl font-semibold text-blue-600 mb-2">
                              {plan.credits} credits/month
                            </div>
                          )}
                          <div className="text-sm text-gray-500">
                            {plan.unlimited ? '24/7 Premium Support' : 'Roll over unused credits'}
                          </div>
                        </div>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-3 text-sm">
                              <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Check className="h-3 w-3 text-green-600" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className={`w-full h-12 text-base font-medium ${plan.name === 'Elite' ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}`}
                          variant={plan.name === 'Elite' ? 'default' : 'outline'}
                          onClick={() => handleSelectIndividualPlan(plan)}
                          disabled={isProcessing}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Select Plan' : 'Odaberite Plan'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className={`max-w-4xl mx-auto ${designSystem.shadows.soft} border-0`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold mb-2">
                    {language === 'en' ? 'Frequently Asked Questions' : 'Često Postavljana Pitanja'}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Everything you need to know about our pricing' : 'Sve što trebate znati o našim cijenama'}
                  </p>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
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
            </motion.div>

            {/* Enhanced Coming Soon Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className={`p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 ${designSystem.shadows.soft}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white shadow-lg">
                    <Info className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-green-700 dark:text-green-300">
                      Coming Soon: VR Training Modules
                    </h4>
                    <p className="text-green-600 dark:text-green-400">
                      Revolutionary medical training experience
                    </p>
                  </div>
                </div>
                <p className="text-green-600 dark:text-green-400 mb-6 text-lg leading-relaxed">
                  Experience immersive virtual reality training scenarios including sterile technique, 
                  infection control procedures, and complex patient consultations with haptic feedback and AI coaching.
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleEarlyAccessWaitlist}
                  className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-900/30"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Join Early Access Waitlist
                </Button>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
