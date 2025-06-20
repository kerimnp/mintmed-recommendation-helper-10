
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePlans, useCurrentSubscription, useTransactions } from '@/hooks/useSubscriptions';
import { PlanCard } from '@/components/subscription/PlanCard';
import { SubscriptionStatus } from '@/components/subscription/SubscriptionStatus';
import { TransactionHistory } from '@/components/subscription/TransactionHistory';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ArrowLeft, CreditCard } from 'lucide-react';
import { useTheme } from 'next-themes';

const Subscription = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanType, setSelectedPlanType] = useState<'individual' | 'hospital'>('individual');

  const { data: plans, isLoading: plansLoading } = usePlans();
  const { data: currentSubscription, isLoading: subscriptionLoading } = useCurrentSubscription();
  const { data: transactions, isLoading: transactionsLoading } = useTransactions();

  // Redirect to auth if not authenticated
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  if (authLoading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
        <Loader2 className="h-12 w-12 animate-spin text-medical-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSelectPlan = (planId: string, cycle: 'monthly' | 'yearly') => {
    console.log('Selected plan:', planId, 'Billing cycle:', cycle);
    // TODO: Implement Stripe checkout integration
  };

  const handleManageSubscription = () => {
    console.log('Manage subscription');
    // TODO: Implement Stripe customer portal
  };

  const handleUpgrade = () => {
    const plansTab = document.querySelector('[value="plans"]') as HTMLElement;
    if (plansTab) {
      plansTab.click();
    }
  };

  const filteredPlans = plans?.filter(plan => plan.plan_type === selectedPlanType) || [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                  : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
                } 
                alt="Horalix Logo" 
                className="h-8 w-auto" 
              />
              <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Subscription Management
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your subscription and billing
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SubscriptionStatus
              subscription={currentSubscription}
              onManageSubscription={handleManageSubscription}
              onUpgrade={handleUpgrade}
            />
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Choose Your Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Type Selection */}
                <div className="flex justify-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedPlanType === 'individual'
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                      onClick={() => setSelectedPlanType('individual')}
                    >
                      Individual
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedPlanType === 'hospital'
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                      onClick={() => setSelectedPlanType('hospital')}
                    >
                      Hospital
                    </button>
                  </div>
                </div>

                {/* Billing Cycle Toggle */}
                <div className="flex justify-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        billingCycle === 'monthly'
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                      onClick={() => setBillingCycle('monthly')}
                    >
                      Monthly
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        billingCycle === 'yearly'
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400'
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

                {/* Plans Grid */}
                {plansLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlans.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        isCurrentPlan={currentSubscription?.plan_id === plan.id}
                        billingCycle={billingCycle}
                        onSelectPlan={handleSelectPlan}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory
              transactions={transactions || []}
              isLoading={transactionsLoading}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Subscription;
