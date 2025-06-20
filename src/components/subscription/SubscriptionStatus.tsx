
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { Subscription } from '@/hooks/useSubscriptions';
import { format } from 'date-fns';

interface SubscriptionStatusProps {
  subscription: Subscription | null;
  onManageSubscription?: () => void;
  onUpgrade?: () => void;
}

export const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({
  subscription,
  onManageSubscription,
  onUpgrade,
}) => {
  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            No Active Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You don't have an active subscription. Choose a plan to get started.
          </p>
          {onUpgrade && (
            <Button onClick={onUpgrade}>
              View Plans
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const isExpiringSoon = subscription.current_period_end && 
    new Date(subscription.current_period_end) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Current Subscription
          </div>
          <Badge className={getStatusColor(subscription.status)}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Plan</h4>
            <p className="font-semibold">{subscription.plan?.name || 'Unknown Plan'}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Billing</h4>
            <p className="font-semibold capitalize">{subscription.billing_cycle}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Credits Remaining</h4>
            <p className="font-semibold">{subscription.credits_remaining}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Next Billing Date</h4>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <p className={`font-semibold ${isExpiringSoon ? 'text-yellow-600' : ''}`}>
                {format(new Date(subscription.current_period_end), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>

        {isExpiringSoon && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Your subscription expires soon. Make sure your payment method is up to date.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {onManageSubscription && (
            <Button variant="outline" onClick={onManageSubscription}>
              <CreditCard className="h-4 w-4 mr-2" />
              Manage Billing
            </Button>
          )}
          {onUpgrade && (
            <Button onClick={onUpgrade}>
              Upgrade Plan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
