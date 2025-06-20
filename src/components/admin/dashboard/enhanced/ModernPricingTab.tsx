
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  User, 
  Check, 
  Star, 
  Crown,
  Infinity,
  Shield,
  Zap,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ModernGlassCard, ModernFloatingButton, modernDesignSystem } from './ModernDesignSystem';
import { useToast } from '@/hooks/use-toast';

const individualPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    period: 'month',
    credits: 200,
    features: [
      'Basic AI Recommendations',
      '200 Credits per month',
      'Email Support',
      'Standard Guidelines Access',
      'Roll over unused credits'
    ],
    popular: false,
    icon: <Zap className="h-6 w-6" />,
    gradient: modernDesignSystem.gradients.success
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 89,
    period: 'month',
    credits: 500,
    features: [
      'Advanced AI Analysis',
      '500 Credits per month',
      'Priority Support',
      'Advanced Guidelines Access',
      'API Access',
      'Roll over unused credits'
    ],
    popular: true,
    icon: <Crown className="h-6 w-6" />,
    gradient: modernDesignSystem.gradients.primary
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 179,
    period: 'month',
    unlimited: true,
    features: [
      'Unlimited AI Recommendations',
      'Premium Support',
      'Full Guidelines Access',
      'Real-time Updates',
      'Advanced Analytics',
      'Custom Integration Support'
    ],
    popular: false,
    icon: <Star className="h-6 w-6" />,
    gradient: modernDesignSystem.gradients.premium
  }
];

const hospitalPlans = [
  {
    id: 'starter',
    name: 'Starter Hospital',
    price: 299,
    period: 'month',
    seats: '5-10',
    features: [
      'Up to 10 healthcare providers',
      '2,000 Credits per month',
      'Basic Analytics Dashboard',
      'Email Support',
      'Standard Integration'
    ],
    popular: false,
    icon: <Building2 className="h-6 w-6" />,
    gradient: modernDesignSystem.gradients.success
  },
  {
    id: 'growth',
    name: 'Growth Hospital',
    price: 599,
    period: 'month',
    seats: '11-50',
    features: [
      'Up to 50 healthcare providers',
      '5,000 Credits per month',
      'Advanced Analytics Dashboard',
      'Priority Support',
      'Advanced Integration',
      'Training & Onboarding'
    ],
    popular: true,
    icon: <Shield className="h-6 w-6" />,
    gradient: modernDesignSystem.gradients.primary
  },
  {
    id: 'enterprise',
    name: 'Enterprise Hospital',
    price: 1299,
    period: 'month',
    seats: 'Unlimited',
    features: [
      'Unlimited healthcare providers',
      'Unlimited Credits',
      'Custom Analytics Dashboard',
      'Dedicated Support Manager',
      'Custom Integration',
      'Advanced Training Program',
      'SLA Guarantee'
    ],
    popular: false,
    icon: <Award className="h-6 w-6" />,
    gradient: modernDesignSystem.gradients.medical
  }
];

export const ModernPricingTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('individual');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectPlan = (planId: string, planName: string, price: number) => {
    setSelectedPlan(planId);
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planName} plan for $${price}/month. Redirecting to checkout...`,
    });
    // Here you would integrate with your payment provider (Stripe, etc.)
    console.log('Selected plan:', planId);
  };

  const PlanCard = ({ plan, type }: { plan: any; type: 'individual' | 'hospital' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ModernGlassCard className={`h-full relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
        {plan.popular && (
          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        )}
        <CardHeader className="text-center pb-4">
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white ${plan.gradient}`}>
            {plan.icon}
          </div>
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          <div className="mt-4">
            <div className="text-4xl font-bold">${plan.price}</div>
            <div className="text-gray-600 dark:text-gray-400">/{plan.period}</div>
            {type === 'individual' && !plan.unlimited && (
              <div className="text-sm text-gray-500 mt-1">{plan.credits} credits/month</div>
            )}
            {type === 'hospital' && (
              <div className="text-sm text-gray-500 mt-1">{plan.seats} providers</div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <ModernFloatingButton
            onClick={() => handleSelectPlan(plan.id, plan.name, plan.price)}
            variant={plan.popular ? 'primary' : 'secondary'}
            className="w-full"
            size="lg"
          >
            {selectedPlan === plan.id ? 'Processing...' : 'Choose Plan'}
          </ModernFloatingButton>
        </CardContent>
      </ModernGlassCard>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Select the perfect plan for your medical practice. All plans include our advanced AI-powered antibiotic recommendation system.
          </p>
        </motion.div>

        {/* Plan Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
              <TabsTrigger value="individual" className="rounded-xl flex items-center gap-2">
                <User className="h-4 w-4" />
                Individual Doctors
              </TabsTrigger>
              <TabsTrigger value="hospital" className="rounded-xl flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Hospitals & Clinics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {individualPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} type="individual" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hospital" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {hospitalPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} type="hospital" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <ModernGlassCard className="p-8">
            <h3 className="text-3xl font-bold text-center mb-8">Why Choose Our AI System?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mx-auto">
                  <Shield className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold">Evidence-Based</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  All recommendations are based on the latest clinical guidelines and peer-reviewed research.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white mx-auto">
                  <Zap className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold">Real-Time Analysis</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Get instant, personalized antibiotic recommendations based on patient-specific factors.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold">Trusted by Professionals</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Used by thousands of healthcare providers worldwide for better patient outcomes.
                </p>
              </div>
            </div>
          </ModernGlassCard>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernGlassCard className="text-center p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Contact our team for enterprise pricing and custom integrations tailored to your organization's needs.
            </p>
            <ModernFloatingButton variant="primary" size="lg">
              Contact Sales Team
            </ModernFloatingButton>
          </ModernGlassCard>
        </motion.div>
      </div>
    </div>
  );
};
