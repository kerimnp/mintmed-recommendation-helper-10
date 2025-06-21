
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

interface CreditsManagementProps {
  user: User;
}

export const CreditsManagement: React.FC<CreditsManagementProps> = ({ user }) => {
  const currentCredits = 1200;
  const monthlyLimit = 1500;
  const usagePercentage = (currentCredits / monthlyLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Credits Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage your credit usage
          </p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Purchase Credits
        </Button>
      </div>

      {/* Credit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Remaining Credits</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{currentCredits.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Limit</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{monthlyLimit.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Usage This Month</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">300</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Doctors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Credits Used</span>
              <span>{300} / {monthlyLimit}</span>
            </div>
            <Progress value={20} className="h-2" />
          </div>
          <p className="text-sm text-gray-600">
            You've used 20% of your monthly credit allocation. Resets on January 1, 2025.
          </p>
        </CardContent>
      </Card>

      {/* Credit History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Credit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-12-20', doctor: 'Dr. Sarah Johnson', credits: 5, type: 'recommendation' },
              { date: '2024-12-20', doctor: 'Dr. Michael Chen', credits: 3, type: 'recommendation' },
              { date: '2024-12-19', doctor: 'Dr. Emily Davis', credits: 7, type: 'recommendation' },
              { date: '2024-12-19', doctor: 'Dr. James Wilson', credits: 4, type: 'recommendation' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{activity.doctor}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-{activity.credits} credits</p>
                  <p className="text-xs text-gray-400 capitalize">{activity.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
