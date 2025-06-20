
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { Plan } from '@/hooks/useSubscriptions';

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan?: boolean;
  billingCycle: 'monthly' | 'yearly';
  onSelectPlan: (planId: string, billingCycle: 'monthly' | 'yearly') => void;
  isLoading?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isCurrentPlan,
  billingCycle,
  onSelectPlan,
  isLoading,
}) => {
  const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_yearly;
  const monthlyPrice = billingCycle === 'yearly' && plan.price_yearly 
    ? plan.price_yearly / 12 
    : plan.price_monthly;

  return (
    <Card className={`relative ${isCurrentPlan ? 'ring-2 ring-medical-primary' : ''}`}>
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-medical-primary">
            <Star className="h-3 w-3 mr-1" />
            Current Plan
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        {plan.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {plan.description}
          </p>
        )}
        <div className="mt-4">
          <div className="text-3xl font-bold">
            ${monthlyPrice?.toFixed(0) || '0'}
            <span className="text-lg font-normal text-gray-500">/month</span>
          </div>
          {billingCycle === 'yearly' && plan.price_yearly && (
            <div className="text-sm text-gray-500">
              Billed annually (${plan.price_yearly}/year)
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm">{plan.credits_included} credits included</span>
          </div>
          
          {plan.plan_type === 'hospital' && (
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm">Up to {plan.doctor_seats} doctor seats</span>
            </div>
          )}

          {plan.features && plan.features.length > 0 && (
            <>
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <Button
          className="w-full"
          onClick={() => onSelectPlan(plan.id, billingCycle)}
          disabled={isCurrentPlan || isLoading}
          variant={isCurrentPlan ? 'secondary' : 'default'}
        >
          {isCurrentPlan ? 'Current Plan' : `Select ${plan.name}`}
        </Button>
      </CardContent>
    </Card>
  );
};
