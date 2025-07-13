
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Crown, Zap, Users, Briefcase, Building, CheckCircle } from 'lucide-react';
import { seatFeePerMonth } from './PricingData';
import { useToast } from '@/hooks/use-toast';

const hospitalPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small clinics',
    priceMonthly: 199,
    priceYearly: 1990,
    creditsPerMonth: 1000,
    maxDoctors: 5,
    features: [
      'Up to 5 doctors',
      '1,000 monthly recommendations',
      'Basic analytics',
      'Email support'
    ],
    icon: Users,
    color: 'text-green-500'
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'For growing practices',
    priceMonthly: 349,
    priceYearly: 3490,
    creditsPerMonth: 2000,
    maxDoctors: 10,
    features: [
      'Up to 10 doctors',
      '2,000 monthly recommendations',
      'Standard analytics',
      'Priority email support'
    ],
    icon: Briefcase,
    color: 'text-purple-500'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for medium hospitals',
    priceMonthly: 499,
    priceYearly: 4990,
    creditsPerMonth: 3000,
    maxDoctors: 25,
    features: [
      'Up to 25 doctors',
      '3,000 monthly recommendations',
      'Advanced analytics',
      'Priority support',
      'Custom branding'
    ],
    popular: true,
    icon: Zap,
    color: 'text-blue-500'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'For large medical centers',
    priceMonthly: 749,
    priceYearly: 7490,
    creditsPerMonth: 5000,
    maxDoctors: 50,
    features: [
      'Up to 50 doctors',
      '5,000 monthly recommendations',
      'Premium analytics',
      'Phone & chat support',
      'API access',
      'Custom integrations'
    ],
    recommended: true,
    icon: Building,
    color: 'text-green-600'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large hospital systems',
    priceMonthly: 999,
    priceYearly: 9990,
    creditsPerMonth: 8000,
    maxDoctors: null, // Unlimited
    features: [
      'Unlimited doctors',
      '8,000+ monthly recommendations',
      'Enterprise analytics',
      '24/7 dedicated support',
      'Full API access',
      'Custom integrations',
      'Dedicated account manager'
    ],
    icon: Crown,
    color: 'text-yellow-500'
  }
];

export const HospitalPricingSection: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [doctorCount, setDoctorCount] = useState(5);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const totalSeatFee = doctorCount * seatFeePerMonth;

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
      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="bg-muted p-1 rounded-lg">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
            <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Hospital Plans */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {language === 'en' ? 'Hospital Subscription Plans' : 'Planovi Pretplate za Bolnice'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {hospitalPlans.map((plan) => {
            const IconComponent = plan.icon;
            const monthlyPrice = billingCycle === 'yearly' ? Math.round(plan.priceYearly / 12) : plan.priceMonthly;
            
            return (
              <Card key={plan.id} className={`relative bg-card backdrop-blur-lg ${plan.popular ? 'ring-2 ring-primary' : ''} ${plan.recommended ? 'ring-2 ring-green-500' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
                {plan.recommended && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500">
                    <Crown className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent className={`h-6 w-6 ${plan.color} mr-2`} />
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold">${monthlyPrice}</div>
                  <div className="text-sm text-muted-foreground">
                    per month {billingCycle === 'yearly' && '(billed annually)'}
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-xs text-green-600">
                      Save ${(plan.priceMonthly * 12) - plan.priceYearly}/year
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleSelectPlan(plan.name, monthlyPrice)}
                  >
                    {language === 'en' ? 'Choose Plan' : 'Odaberite Plan'}
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    {language === 'en' ? 'Plus $19/month per doctor seat' : 'Plus $19/mjesec po liječničkom mjestu'}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Hospital Seat Fees Calculator */}
      <Card className="bg-card backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {language === 'en' ? 'Doctor Seat Calculator' : 'Kalkulator Liječničkih Mjesta'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-medical-primary mb-2">€19/month per doctor</div>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Additional seat fees apply to all plans' : 'Dodatne naknade za mjesta vrijede za sve planove'}
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Select value={doctorCount.toString()} onValueChange={value => setDoctorCount(parseInt(value))}>
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
              <span className="text-2xl font-bold">€19</span>
              <span className="text-2xl">=</span>
              <div className="text-2xl font-bold text-medical-primary">€{totalSeatFee}/month</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise CTA */}
      <Card className="bg-gradient-to-r from-medical-primary to-blue-700 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Need a custom solution?' : 'Trebate prilagođeno rješenje?'}
          </h3>
          <p className="text-lg mb-6">
            {language === 'en' ? 'Contact us for custom enterprise solutions and volume discounts' : 'Kontaktirajte nas za prilagođena enterprise rješenja i popuste na količinu'}
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => handleSelectPlan('Enterprise', 999)}
          >
            {language === 'en' ? 'Contact Sales' : 'Kontaktirajte Prodaju'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
