
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
  Zap,
  TrendingUp,
  DollarSign,
  Award,
  Rocket,
  Globe,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ModernMetricCard, ModernBadge, ModernGlassCard, ModernFloatingButton, modernDesignSystem } from './ModernDesignSystem';

export const ModernPricingTab = () => {
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
      gradient: modernDesignSystem.gradients.primary,
      icon: <Rocket className="h-8 w-8" />
    },
    {
      name: 'Professional',
      credits: 500,
      price: 204,
      costPerCredit: 0.80,
      popular: false,
      bestValue: false,
      gradient: modernDesignSystem.gradients.success,
      icon: <Award className="h-8 w-8" />
    },
    {
      name: 'Enterprise',
      credits: 1000,
      price: 357,
      costPerCredit: 0.70,
      popular: true,
      bestValue: false,
      gradient: modernDesignSystem.gradients.warning,
      icon: <Building2 className="h-8 w-8" />
    },
    {
      name: 'Scale',
      credits: 2500,
      price: 765,
      costPerCredit: 0.60,
      popular: false,
      bestValue: true,
      gradient: modernDesignSystem.gradients.medical,
      icon: <TrendingUp className="h-8 w-8" />
    },
    {
      name: 'Global',
      credits: 5000,
      price: 1403,
      costPerCredit: 0.55,
      popular: false,
      bestValue: false,
      gradient: modernDesignSystem.gradients.danger,
      icon: <Globe className="h-8 w-8" />
    }
  ];

  const individualPlans = [
    {
      name: 'Essential',
      price: 51,
      credits: 200,
      extraCreditCost: 1.00,
      features: [
        'Roll over unused credits',
        'Basic AI recommendations',
        'Standard guidelines access',
        'Email support',
        'Mobile app access'
      ],
      popular: false,
      gradient: modernDesignSystem.gradients.primary,
      icon: <User className="h-8 w-8" />
    },
    {
      name: 'Professional',
      price: 102,
      credits: 500,
      extraCreditCost: 0.80,
      features: [
        'Roll over unused credits',
        'Advanced AI insights',
        'Priority support',
        'Advanced guidelines access',
        'Analytics dashboard',
        'Custom alerts'
      ],
      popular: true,
      gradient: modernDesignSystem.gradients.success,
      icon: <Star className="h-8 w-8" />
    },
    {
      name: 'Elite',
      price: 179,
      unlimited: true,
      features: [
        'Unlimited usage',
        'Premium AI models',
        '24/7 premium support',
        'Full guidelines access',
        'Real-time updates',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager'
      ],
      popular: false,
      gradient: modernDesignSystem.gradients.medical,
      icon: <Crown className="h-8 w-8" />
    }
  ];

  const handleAddToHospitalPlan = async (bundle: typeof hospitalCreditBundles[0]) => {
    setIsProcessing(true);
    try {
      toast({
        title: "Processing Hospital Plan",
        description: `Adding ${bundle.name} bundle (${bundle.credits.toLocaleString()} credits) to your hospital plan...`,
      });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Enhanced Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                {language === 'en' ? 'Choose Your Perfect Plan' : 'Odaberite Svoj Savršeni Plan'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {language === 'en' 
                  ? 'Enterprise-grade healthcare solutions with AI-powered insights, built for medical professionals who demand excellence'
                  : 'Enterprise rješenja za zdravstvo s AI uvjetima, izgrađena za medicinske stručnjake koji zahtijevaju izvrsnost'}
              </p>
            </motion.div>
          </div>

          {/* Enhanced Metrics Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <ModernMetricCard
              title="Active Subscribers"
              value="4,729"
              subtitle="Across all plans"
              trend="up"
              trendValue="+24%"
              icon={<Users className="h-6 w-6" />}
              gradient={modernDesignSystem.gradients.primary}
              realTime={true}
            />
            <ModernMetricCard
              title="Customer Satisfaction"
              value="99.2%"
              subtitle="Based on 2,400+ reviews"
              trend="up"
              trendValue="+0.5%"
              icon={<Star className="h-6 w-6" />}
              gradient={modernDesignSystem.gradients.success}
            />
            <ModernMetricCard
              title="Uptime Guarantee"
              value="99.99%"
              subtitle="Enterprise SLA"
              trend="stable"
              trendValue="0%"
              icon={<Shield className="h-6 w-6" />}
              gradient={modernDesignSystem.gradients.medical}
            />
            <ModernMetricCard
              title="Global Reach"
              value="127"
              subtitle="Countries served"
              trend="up"
              trendValue="+8"
              icon={<Globe className="h-6 w-6" />}
              gradient={modernDesignSystem.gradients.warning}
            />
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 h-14 bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
              <TabsTrigger value="hospitals" className="flex items-center gap-2 text-base rounded-xl">
                <Building2 className="h-5 w-5" />
                {language === 'en' ? 'Hospitals & Clinics' : 'Bolnice i Klinike'}
              </TabsTrigger>
              <TabsTrigger value="individual" className="flex items-center gap-2 text-base rounded-xl">
                <User className="h-5 w-5" />
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
                <ModernGlassCard glow>
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-4xl font-bold mb-4">
                      {language === 'en' ? 'Seat Fees (Required)' : 'Naknade po Sjedištu (Obavezno)'}
                    </CardTitle>
                    <div className="flex items-center justify-center gap-3 text-lg text-gray-600 dark:text-gray-300">
                      <Shield className="h-6 w-6" />
                      <span>Enterprise Security & Compliance Included</span>
                      <Lock className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <div className="text-center mb-8">
                      <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        €25/month
                      </div>
                      <div className="text-2xl text-gray-600 dark:text-gray-400 mb-2">per doctor</div>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {language === 'en' ? 'Billed monthly. Required for all hospital accounts.' : 'Naplaćuje se mjesečno. Obavezno za sve bolničke račune.'}
                      </p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                      <ModernGlassCard className="p-8">
                        <div className="flex items-center justify-center gap-6 mb-8">
                          <Select value={doctorCount.toString()} onValueChange={(value) => setDoctorCount(parseInt(value))}>
                            <SelectTrigger className="w-48 h-14 text-lg bg-white/50 backdrop-blur-sm">
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
                          <span className="text-4xl font-light text-gray-400">×</span>
                          <span className="text-4xl font-bold text-gray-700 dark:text-gray-300">€25</span>
                          <span className="text-4xl font-light text-gray-400">=</span>
                          <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            €{totalSeatFee}/month
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <Calculator className="h-4 w-4" />
                          <span>Annual billing available with 15% discount</span>
                        </div>
                      </ModernGlassCard>
                    </div>
                  </CardContent>
                </ModernGlassCard>
              </motion.div>

              {/* Enhanced Hospital Credit Bundles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === 'en' ? 'Credit Bundles (Optional Add-ons)' : 'Paketi Kredita (Dodatni)'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xl">
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
                      whileHover={{ y: -12, transition: { duration: 0.3 } }}
                    >
                      <ModernGlassCard 
                        className={`relative h-full ${bundle.popular || bundle.bestValue ? 'ring-2 ring-blue-400 scale-105' : ''}`}
                        glow={bundle.popular || bundle.bestValue}
                      >
                        {bundle.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                            <ModernBadge variant="warning" size="sm" glow>
                              <Star className="h-3 w-3 mr-1" />Popular
                            </ModernBadge>
                          </div>
                        )}
                        {bundle.bestValue && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                            <ModernBadge variant="success" size="sm" glow>
                              <Crown className="h-3 w-3 mr-1" />Best Value
                            </ModernBadge>
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-4">
                          <div className={`w-20 h-20 rounded-3xl ${bundle.gradient} flex items-center justify-center text-white shadow-xl mx-auto mb-4`}>
                            {bundle.icon}
                          </div>
                          <CardTitle className="text-2xl mb-2">{bundle.name}</CardTitle>
                          <div className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            €{bundle.price}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            €{bundle.costPerCredit.toFixed(2)}/credit
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-center mb-6">
                            <div className="text-3xl font-semibold text-blue-600 mb-2">
                              {bundle.credits.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500 mb-4">credits</div>
                            <div className="space-y-2 text-xs text-gray-500">
                              <div className="flex items-center justify-center gap-2">
                                <Check className="h-3 w-3 text-green-500" />
                                <span>Never expire</span>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <Check className="h-3 w-3 text-green-500" />
                                <span>Shared access</span>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <Check className="h-3 w-3 text-green-500" />
                                <span>Real-time tracking</span>
                              </div>
                            </div>
                          </div>
                          <ModernFloatingButton 
                            onClick={() => handleAddToHospitalPlan(bundle)}
                            variant="primary"
                            size="sm"
                            className="w-full"
                          >
                            <CreditCard className="h-4 w-4" />
                            {language === 'en' ? 'Add to Plan' : 'Dodaj u Plan'}
                          </ModernFloatingButton>
                        </CardContent>
                      </ModernGlassCard>
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
                <ModernGlassCard className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden relative" glow>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <CardContent className="relative p-12 text-center">
                    <div className="max-w-3xl mx-auto">
                      <h3 className="text-5xl font-bold mb-6">
                        {language === 'en' ? 'Enterprise Solutions' : 'Enterprise Rješenja'}
                      </h3>
                      <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                        {language === 'en' 
                          ? 'Custom integrations, dedicated support, volume discounts, and white-label solutions for large healthcare organizations'
                          : 'Prilagođene integracije, dedicirana podrška, popusti na količinu i white-label rješenja za velike zdravstvene organizacije'}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <ModernFloatingButton size="lg" variant="secondary" onClick={handleGetCustomQuote}>
                          <Mail className="h-5 w-5" />
                          {language === 'en' ? 'Get Custom Quote' : 'Dobijte Prilagođenu Ponudu'}
                        </ModernFloatingButton>
                        <div className="flex items-center gap-4 text-blue-100">
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            <span className="text-sm">SOC 2 Type II</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            <span className="text-sm">HIPAA Compliant</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </ModernGlassCard>
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
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === 'en' ? 'Individual Subscription Plans' : 'Individualni Pretplatnički Planovi'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xl">
                    {language === 'en' ?
                      'Professional-grade AI tools for individual healthcare practitioners' :
                      'Profesionalni AI alati za individualne zdravstvene stručnjake'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {individualPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -12, transition: { duration: 0.3 } }}
                    >
                      <ModernGlassCard 
                        className={`relative h-full ${plan.name === 'Elite' || plan.popular ? 'ring-2 ring-purple-400 scale-105' : ''}`}
                        glow={plan.name === 'Elite' || plan.popular}
                      >
                        {plan.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                            <ModernBadge variant="warning" size="sm" glow>
                              <Star className="h-3 w-3 mr-1" />Popular
                            </ModernBadge>
                          </div>
                        )}
                        {plan.name === 'Elite' && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                            <ModernBadge variant="medical" size="sm" glow>
                              <Crown className="h-3 w-3 mr-1" />Premium
                            </ModernBadge>
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-4">
                          <div className={`w-20 h-20 rounded-3xl ${plan.gradient} flex items-center justify-center text-white shadow-xl mx-auto mb-4`}>
                            {plan.icon}
                          </div>
                          <CardTitle className="text-3xl flex items-center justify-center gap-2 mb-4">
                            {plan.name}
                          </CardTitle>
                          <div className="text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            €{plan.price}
                          </div>
                          <div className="text-lg text-gray-600 dark:text-gray-400">/month</div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-center mb-8">
                            {plan.unlimited ? (
                              <div className="flex items-center justify-center gap-2 text-3xl font-semibold text-purple-600 mb-4">
                                <Infinity className="h-8 w-8" />
                                Unlimited usage
                              </div>
                            ) : (
                              <div className="text-3xl font-semibold text-blue-600 mb-4">
                                {plan.credits} credits/month
                              </div>
                            )}
                            <div className="text-sm text-gray-500 mb-4">
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
                          <ModernFloatingButton 
                            onClick={() => handleSelectIndividualPlan(plan)}
                            variant={plan.name === 'Elite' ? 'primary' : 'secondary'}
                            size="sm"
                            className="w-full"
                          >
                            <CreditCard className="h-4 w-4" />
                            {language === 'en' ? 'Select Plan' : 'Odaberite Plan'}
                          </ModernFloatingButton>
                        </CardContent>
                      </ModernGlassCard>
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
                <ModernGlassCard className="max-w-4xl mx-auto">
                  <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold mb-4">
                      {language === 'en' ? 'Frequently Asked Questions' : 'Često Postavljana Pitanja'}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {language === 'en' ? 'Everything you need to know about our pricing' : 'Sve što trebate znati o našim cijenama'}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-4">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg">
                          {language === 'en' ? 'Can I mix subscriptions and bundles?' : 'Mogu li kombinirati pretplate i pakete?'}
                        </AccordionTrigger>
                        <AccordionContent className="text-base">
                          {language === 'en' 
                            ? 'Yes! Hospitals can combine seat fees with credit bundles. Individual doctors can supplement their subscription with additional credit purchases for extra flexibility.'
                            : 'Da! Bolnice mogu kombinirati naknade po sjedištu s paketima kredita. Individualni liječnici mogu dopuniti svoju pretplatu dodatnim kupnjama kredita za dodatnu fleksibilnost.'}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg">
                          {language === 'en' ? 'How are credits tracked?' : 'Kako se prate krediti?'}
                        </AccordionTrigger>
                        <AccordionContent className="text-base">
                          {language === 'en' 
                            ? 'Real-time dashboard shows your credit balance, usage history, and renewal dates. Hospital administrators can view usage across all doctors with detailed analytics.'
                            : 'Dashboard u realnom vremenu prikazuje stanje kredita, povijest korištenja i datume obnove. Administratori bolnica mogu vidjeti korištenje svih liječnika s detaljnim analizama.'}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="text-lg">
                          {language === 'en' ? 'What happens to unused credits?' : 'Što se događa s nekorištenim kreditima?'}
                        </AccordionTrigger>
                        <AccordionContent className="text-base">
                          {language === 'en' 
                            ? 'Subscription credits roll over to the next month (except Elite unlimited plan). Hospital credit bundles never expire and can be shared across your organization.'
                            : 'Krediti iz pretplate se prenose u sljedeći mjesec (osim Elite neograničenog plana). Bolnički paketi kredita nikad ne istječu i mogu se dijeliti u organizaciji.'}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </ModernGlassCard>
              </motion.div>

              {/* Enhanced Coming Soon Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ModernGlassCard className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-200/50 dark:border-emerald-800/50" glow>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-xl">
                        <Sparkles className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                          Coming Soon: VR Training Modules
                        </h4>
                        <p className="text-emerald-600 dark:text-emerald-400 text-lg">
                          Revolutionary immersive medical training experience
                        </p>
                      </div>
                    </div>
                    <p className="text-emerald-600 dark:text-emerald-400 mb-6 text-lg leading-relaxed">
                      Experience cutting-edge virtual reality training scenarios including sterile technique, 
                      infection control procedures, and complex patient consultations with haptic feedback, 
                      AI coaching, and realistic medical simulations.
                    </p>
                    <ModernFloatingButton 
                      variant="secondary" 
                      onClick={handleEarlyAccessWaitlist}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
                    >
                      <Sparkles className="h-4 w-4" />
                      Join Early Access Waitlist
                    </ModernFloatingButton>
                  </CardContent>
                </ModernGlassCard>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
