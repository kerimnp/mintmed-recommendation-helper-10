
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  CreditCard, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Crown,
  Star,
  Zap,
  Loader2,
  Briefcase,
  Building
} from 'lucide-react';

interface HospitalOnboardingProps {
  user: User;
  onComplete: () => void;
}

interface PlanOption {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  creditsPerMonth: number;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
}

const plans: PlanOption[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small clinics',
    priceMonthly: 199,
    priceYearly: 1990,
    creditsPerMonth: 1000,
    features: [
      'Up to 5 doctors',
      '1,000 monthly recommendations',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'For growing practices',
    priceMonthly: 349,
    priceYearly: 3490,
    creditsPerMonth: 2000,
    features: [
      'Up to 10 doctors',
      '2,000 monthly recommendations',
      'Standard analytics',
      'Priority email support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for medium hospitals',
    priceMonthly: 499,
    priceYearly: 4990,
    creditsPerMonth: 3000,
    features: [
      'Up to 25 doctors',
      '3,000 monthly recommendations',
      'Advanced analytics',
      'Priority support',
      'Custom branding'
    ],
    popular: true
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'For large medical centers',
    priceMonthly: 749,
    priceYearly: 7490,
    creditsPerMonth: 5000,
    features: [
      'Up to 50 doctors',
      '5,000 monthly recommendations',
      'Premium analytics',
      'Phone & chat support',
      'API access',
      'Custom integrations'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large hospital systems',
    priceMonthly: 999,
    priceYearly: 9990,
    creditsPerMonth: 8000,
    features: [
      'Unlimited doctors',
      '8,000+ monthly recommendations',
      'Enterprise analytics',
      '24/7 dedicated support',
      'Full API access',
      'Custom integrations',
      'Dedicated account manager'
    ]
  }
];

export const HospitalOnboarding: React.FC<HospitalOnboardingProps> = ({
  user,
  onComplete
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [numberOfDoctors, setNumberOfDoctors] = useState(5);
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const hospitalName = user.user_metadata?.hospital_name || 'Your Hospital';

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    // Mock payment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Successful!",
      description: `Welcome to ${hospitalName}! Your subscription is now active.`,
    });
    
    setIsProcessingPayment(false);
    setCurrentStep(4); // Move to completion step
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const totalPrice = billingCycle === 'monthly' 
    ? selectedPlanData?.priceMonthly || 0
    : selectedPlanData?.priceYearly || 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to {hospitalName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Let's set up your hospital's antibiotic management system
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }
                  `}>
                    {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-8 h-px ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Doctor Count */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>How many doctors will use the system?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="doctors">Number of Doctors</Label>
                    <Input
                      id="doctors"
                      type="number"
                      min="1"
                      max="1000"
                      value={numberOfDoctors}
                      onChange={(e) => setNumberOfDoctors(parseInt(e.target.value) || 1)}
                      className="text-center text-lg"
                    />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      You can always adjust the number of doctors later in your dashboard.
                    </p>
                  </div>
                  <Button onClick={handleNext} className="w-full" size="lg">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Plan Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                    onClick={() => setBillingCycle('monthly')}
                    size="sm"
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={billingCycle === 'yearly' ? 'default' : 'outline'}
                    onClick={() => setBillingCycle('yearly')}
                    size="sm"
                    className="relative"
                  >
                    Yearly
                    <Badge className="ml-2 bg-green-500">Save 20%</Badge>
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.id 
                        ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                        : 'hover:shadow-md'
                    } ${plan.popular ? 'border-blue-500' : ''} ${plan.recommended ? 'border-green-500' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-500 flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-green-500 flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          Recommended
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-2">
                      <div className="flex items-center justify-center mb-2">
                        {plan.id === 'enterprise' && <Crown className="h-5 w-5 text-yellow-500 mr-2" />}
                        {plan.id === 'advanced' && <Building className="h-5 w-5 text-green-500 mr-2" />}
                        {plan.id === 'professional' && <Zap className="h-5 w-5 text-blue-500 mr-2" />}
                        {plan.id === 'basic' && <Briefcase className="h-5 w-5 text-purple-500 mr-2" />}
                        {plan.id === 'starter' && <Users className="h-5 w-5 text-green-500 mr-2" />}
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {plan.description}
                      </p>
                      <div className="mt-3">
                        <div className="text-2xl font-bold">
                          ${billingCycle === 'monthly' ? plan.priceMonthly : Math.round(plan.priceYearly / 12)}
                          <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                        {billingCycle === 'yearly' && (
                          <div className="text-xs text-gray-500">
                            ${plan.priceYearly}/year
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-xs">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4 max-w-md mx-auto">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Complete Your Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span className="font-medium">{selectedPlanData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Billing:</span>
                      <span className="font-medium capitalize">{billingCycle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doctors:</span>
                      <span className="font-medium">{numberOfDoctors}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${totalPrice}/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      🎉 This is a UI demo. In production, this would integrate with Stripe for secure payment processing.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleBack} variant="outline" className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handlePayment} 
                      className="flex-1"
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Payment
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Completion */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="max-w-md mx-auto text-center">
                <CardContent className="pt-8 pb-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Welcome Aboard! 🎉</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your {hospitalName} subscription is now active. 
                    You can start inviting doctors and managing your organization.
                  </p>
                  <Button onClick={onComplete} size="lg" className="w-full">
                    Enter Dashboard
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
