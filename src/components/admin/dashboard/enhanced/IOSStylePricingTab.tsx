
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
  Shield,
  Zap,
  Award,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
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
    icon: <Zap className="h-5 w-5" />,
    color: 'blue'
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
    icon: <Shield className="h-5 w-5" />,
    color: 'purple'
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
    icon: <Award className="h-5 w-5" />,
    color: 'gold'
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
    icon: <Building2 className="h-5 w-5" />,
    color: 'blue'
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
    icon: <Shield className="h-5 w-5" />,
    color: 'purple'
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
    icon: <Award className="h-5 w-5" />,
    color: 'gold'
  }
];

export const IOSStylePricingTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('individual');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectPlan = (planId: string, planName: string, price: number) => {
    setSelectedPlan(planId);
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planName} plan for $${price}/month.`,
    });
  };

  const getColorClasses = (color: string, isPopular: boolean) => {
    const baseClasses = "transition-all duration-300 hover:shadow-lg";
    
    if (isPopular) {
      return `${baseClasses} ring-2 ring-blue-500 shadow-lg scale-105`;
    }
    
    switch (color) {
      case 'purple':
        return `${baseClasses} hover:shadow-purple-200`;
      case 'gold':
        return `${baseClasses} hover:shadow-yellow-200`;
      default:
        return `${baseClasses} hover:shadow-blue-200`;
    }
  };

  const getButtonClasses = (color: string, isPopular: boolean) => {
    if (isPopular) {
      return "bg-blue-600 hover:bg-blue-700 text-white";
    }
    
    switch (color) {
      case 'purple':
        return "bg-purple-600 hover:bg-purple-700 text-white";
      case 'gold':
        return "bg-yellow-600 hover:bg-yellow-700 text-white";
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  const PlanCard = ({ plan, type }: { plan: any; type: 'individual' | 'hospital' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative h-full"
    >
      <Card className={`h-full relative ${getColorClasses(plan.color, plan.popular)}`}>
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-blue-600 text-white px-3 py-1 flex items-center gap-1">
              <Star className="h-3 w-3" />
              Most Popular
            </Badge>
          </div>
        )}
        
        <CardHeader className="text-center pb-4">
          <motion.div 
            className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white ${
              plan.color === 'purple' ? 'bg-purple-500' :
              plan.color === 'gold' ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {plan.icon}
          </motion.div>
          
          <CardTitle className="text-2xl font-semibold mb-2 text-gray-900">
            {plan.name}
          </CardTitle>
          
          <div className="mb-4">
            <div className="text-4xl font-bold text-gray-900 mb-1">
              ${plan.price}
            </div>
            <div className="text-gray-600">/{plan.period}</div>
            {type === 'individual' && !plan.unlimited && (
              <div className="text-sm text-gray-500 mt-1">
                {plan.credits} credits/month
              </div>
            )}
            {type === 'hospital' && (
              <div className="text-sm text-gray-500 mt-1">
                {plan.seats} providers
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="h-2.5 w-2.5 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          
          <Button
            onClick={() => handleSelectPlan(plan.id, plan.name, plan.price)}
            className={`w-full ${getButtonClasses(plan.color, plan.popular)}`}
            disabled={selectedPlan === plan.id}
          >
            {selectedPlan === plan.id ? (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Processing...
              </>
            ) : (
              `Choose ${plan.name}`
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience advanced clinical intelligence with our AI-powered antibiotic recommendation system
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">50,000+</div>
            <div className="text-sm text-gray-600">Healthcare Providers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">99.2%</div>
            <div className="text-sm text-gray-600">Clinical Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <div className="text-sm text-gray-600">Patient Outcomes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">$2.3M</div>
            <div className="text-sm text-gray-600">Average Savings</div>
          </div>
        </motion.div>

        {/* Plan Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-white shadow-sm">
              <TabsTrigger 
                value="individual" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <User className="h-4 w-4" />
                Individual
              </TabsTrigger>
              <TabsTrigger 
                value="hospital" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Building2 className="h-4 w-4" />
                Hospitals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {individualPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <PlanCard plan={plan} type="individual" />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hospital">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hospitalPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <PlanCard plan={plan} type="hospital" />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Why Choose Our Platform?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Evidence-Based",
                  description: "Every recommendation backed by latest clinical research and guidelines"
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Real-Time Intelligence",
                  description: "Instant personalized recommendations powered by advanced AI"
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: "Trusted Worldwide",
                  description: "Used by 50,000+ healthcare providers with proven outcomes"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mx-auto">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
