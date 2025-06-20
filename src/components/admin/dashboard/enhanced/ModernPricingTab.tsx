
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
  Award,
  Sparkles,
  Diamond,
  Gem
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UltraLuxuryCard, 
  UltraPremiumButton, 
  UltraPremiumBadge, 
  UltraPremiumMetricCard,
  ultraPremiumDesignSystem 
} from './UltraPremiumDesignSystem';
import { useToast } from '@/hooks/use-toast';

const individualPlans = [
  {
    id: 'basic',
    name: 'Essential',
    price: 29,
    period: 'month',
    credits: 200,
    features: [
      'AI-Powered Clinical Recommendations',
      '200 Monthly Analysis Credits',
      'Priority Email Support',
      'Evidence-Based Guidelines Access',
      'Credit Rollover Protection',
      'Mobile App Access'
    ],
    popular: false,
    icon: <Zap className="h-6 w-6" />,
    variant: 'crystal' as const,
    badge: 'Starter'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 89,
    period: 'month',
    credits: 500,
    features: [
      'Advanced AI Clinical Analysis',
      '500 Monthly Analysis Credits',
      '24/7 Priority Support',
      'Comprehensive Guidelines Library',
      'Full API Access & Integration',
      'Advanced Analytics Dashboard',
      'Credit Rollover Protection',
      'Team Collaboration Tools'
    ],
    popular: true,
    icon: <Crown className="h-6 w-6" />,
    variant: 'aurora' as const,
    badge: 'Most Popular'
  },
  {
    id: 'elite',
    name: 'Elite Unlimited',
    price: 179,
    period: 'month',
    unlimited: true,
    features: [
      'Unlimited AI Clinical Recommendations',
      'Dedicated Success Manager',
      'Real-Time Guideline Updates',
      'Advanced Predictive Analytics',
      'Custom Integration Support',
      'White-Label Solutions',
      'Priority Feature Access',
      'Exclusive Clinical Insights'
    ],
    popular: false,
    icon: <Diamond className="h-6 w-6" />,
    variant: 'gold' as const,
    badge: 'Premium'
  }
];

const hospitalPlans = [
  {
    id: 'starter',
    name: 'Hospital Starter',
    price: 299,
    period: 'month',
    seats: '5-10',
    features: [
      'Up to 10 Healthcare Providers',
      '2,000 Monthly Analysis Credits',
      'Comprehensive Analytics Dashboard',
      'Email & Phone Support',
      'Standard EHR Integration',
      'Basic Compliance Reporting'
    ],
    popular: false,
    icon: <Building2 className="h-6 w-6" />,
    variant: 'crystal' as const,
    badge: 'Small Teams'
  },
  {
    id: 'growth',
    name: 'Hospital Professional',
    price: 599,
    period: 'month',
    seats: '11-50',
    features: [
      'Up to 50 Healthcare Providers',
      '5,000 Monthly Analysis Credits',
      'Advanced Analytics & Reporting',
      '24/7 Priority Support',
      'Advanced EHR Integration',
      'Comprehensive Training Program',
      'Custom Workflow Integration',
      'Advanced Compliance Tools'
    ],
    popular: true,
    icon: <Shield className="h-6 w-6" />,
    variant: 'aurora' as const,
    badge: 'Recommended'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Hospital',
    price: 1299,
    period: 'month',
    seats: 'Unlimited',
    features: [
      'Unlimited Healthcare Providers',
      'Unlimited Analysis Credits',
      'Custom Analytics Dashboard',
      'Dedicated Account Manager',
      'Full Custom Integration Suite',
      'Advanced Training & Certification',
      'SLA Guarantee (99.9% Uptime)',
      'Priority Feature Development',
      'White-Label Deployment'
    ],
    popular: false,
    icon: <Award className="h-6 w-6" />,
    variant: 'gold' as const,
    badge: 'Enterprise'
  }
];

export const ModernPricingTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('individual');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectPlan = (planId: string, planName: string, price: number) => {
    setSelectedPlan(planId);
    toast({
      title: "Premium Plan Selected",
      description: `You've selected the ${planName} plan for $${price}/month. Preparing your premium experience...`,
    });
    console.log('Selected plan:', planId);
  };

  const PlanCard = ({ plan, type }: { plan: any; type: 'individual' | 'hospital' }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setHoveredPlan(plan.id)}
      onMouseLeave={() => setHoveredPlan(null)}
      className="relative"
    >
      <UltraLuxuryCard 
        variant={plan.variant} 
        className={`h-full relative transition-all duration-500 ${
          plan.popular ? 'ring-2 ring-purple-400/50 scale-105 z-10' : ''
        } ${hoveredPlan === plan.id ? 'scale-102' : ''}`}
        glow={plan.popular || hoveredPlan === plan.id}
        floating={plan.popular}
        shimmer={hoveredPlan === plan.id}
      >
        {plan.popular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
          >
            <UltraPremiumBadge variant="luxury" glow pulse>
              <Star className="h-3 w-3 mr-1" />
              {plan.badge}
            </UltraPremiumBadge>
          </motion.div>
        )}
        
        <CardHeader className="text-center pb-6 relative">
          <motion.div 
            className={`w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl`}
            style={{
              background: plan.variant === 'gold' 
                ? ultraPremiumDesignSystem.gradients.luxury.gold
                : plan.variant === 'aurora'
                ? ultraPremiumDesignSystem.gradients.luxury.aurora
                : ultraPremiumDesignSystem.gradients.luxury.crystal
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 10,
              boxShadow: ultraPremiumDesignSystem.shadows.luxury.glow
            }}
            transition={{ duration: 0.3 }}
          >
            {plan.icon}
          </motion.div>
          
          <CardTitle className="text-3xl font-bold mb-2" style={ultraPremiumDesignSystem.typography.luxury.heading}>
            {plan.name}
          </CardTitle>
          
          <div className="relative">
            <motion.div 
              className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              ${plan.price}
            </motion.div>
            <div className="text-gray-600 dark:text-gray-400 text-lg">/{plan.period}</div>
            {type === 'individual' && !plan.unlimited && (
              <motion.div 
                className="text-sm text-purple-600 dark:text-purple-400 mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {plan.credits} credits/month
              </motion.div>
            )}
            {type === 'hospital' && (
              <motion.div 
                className="text-sm text-purple-600 dark:text-purple-400 mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {plan.seats} providers
              </motion.div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 px-8 pb-8">
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature: string, index: number) => (
              <motion.li 
                key={index} 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.5 }}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <UltraPremiumButton
              onClick={() => handleSelectPlan(plan.id, plan.name, plan.price)}
              variant={plan.popular ? 'luxury' : plan.variant === 'gold' ? 'gold' : 'primary'}
              className="w-full text-lg py-4"
              size="lg"
              glow={plan.popular}
            >
              {selectedPlan === plan.id ? (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Gem className="h-5 w-5 mr-2" />
                  Choose {plan.name}
                </>
              )}
            </UltraPremiumButton>
          </motion.div>
        </CardContent>
      </UltraLuxuryCard>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/2 w-72 h-72 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 120, -60, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        />
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-12 relative z-10">
        {/* Luxury Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <motion.h1 
            className="text-6xl font-bold"
            style={{
              background: ultraPremiumDesignSystem.gradients.luxury.aurora,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              ...ultraPremiumDesignSystem.typography.luxury.display
            }}
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Premium Clinical Intelligence
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={ultraPremiumDesignSystem.typography.luxury.body}
          >
            Experience the future of medical decision-making with our AI-powered antibiotic recommendation system. 
            Trusted by leading healthcare institutions worldwide for superior patient outcomes.
          </motion.p>
        </motion.div>

        {/* Premium Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <UltraPremiumMetricCard
            title="Healthcare Providers"
            value="50,000+"
            subtitle="Trusted worldwide"
            icon={<User className="h-6 w-6" />}
            variant="crystal"
            realTime
          />
          <UltraPremiumMetricCard
            title="Clinical Accuracy"
            value="99.2%"
            subtitle="Evidence-based recommendations"
            trend="up"
            trendValue="0.3%"
            icon={<Shield className="h-6 w-6" />}
            variant="aurora"
            realTime
          />
          <UltraPremiumMetricCard
            title="Patient Outcomes"
            value="94%"
            subtitle="Improved treatment success"
            trend="up"
            trendValue="2.1%"
            icon={<Award className="h-6 w-6" />}
            variant="gold"
            realTime
          />
          <UltraPremiumMetricCard
            title="Cost Savings"
            value="$2.3M"
            subtitle="Average per hospital/year"
            trend="up"
            trendValue="12%"
            icon={<Sparkles className="h-6 w-6" />}
            variant="platinum"
            realTime
          />
        </motion.div>

        {/* Premium Plan Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl">
              <TabsTrigger 
                value="individual" 
                className="rounded-2xl flex items-center gap-3 text-base py-3 px-6 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                <User className="h-5 w-5" />
                Individual Doctors
              </TabsTrigger>
              <TabsTrigger 
                value="hospital" 
                className="rounded-2xl flex items-center gap-3 text-base py-3 px-6 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                <Building2 className="h-5 w-5" />
                Hospitals & Clinics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-8">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {individualPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  >
                    <PlanCard plan={plan} type="individual" />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="hospital" className="space-y-8">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {hospitalPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  >
                    <PlanCard plan={plan} type="hospital" />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Premium Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20"
        >
          <UltraLuxuryCard variant="aurora" className="p-12" glow>
            <motion.h3 
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Why Choose Our Premium Platform?
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Shield className="h-12 w-12" />,
                  title: "Evidence-Based Excellence",
                  description: "Every recommendation is backed by the latest clinical research, peer-reviewed studies, and international guidelines from IDSA, CDC, and WHO."
                },
                {
                  icon: <Zap className="h-12 w-12" />,
                  title: "Real-Time Intelligence",
                  description: "Get instant, personalized recommendations powered by advanced AI that considers patient-specific factors and local resistance patterns."
                },
                {
                  icon: <Award className="h-12 w-12" />,
                  title: "Trusted by Professionals",
                  description: "Used by over 50,000 healthcare providers worldwide, with proven improvements in patient outcomes and cost reduction."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="text-center space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.div 
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-white shadow-2xl mx-auto"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: ultraPremiumDesignSystem.shadows.luxury.glow
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </UltraLuxuryCard>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <UltraLuxuryCard variant="gold" className="text-center p-12" glow shimmer>
            <motion.h3 
              className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Need a Custom Enterprise Solution?
            </motion.h3>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Contact our enterprise team for custom pricing, white-label solutions, and tailored integrations designed specifically for your organization's unique requirements.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <UltraPremiumButton variant="obsidian" size="xl" glow>
                <Crown className="h-6 w-6 mr-2" />
                Contact Enterprise Sales
              </UltraPremiumButton>
            </motion.div>
          </UltraLuxuryCard>
        </motion.div>
      </div>
    </div>
  );
};
