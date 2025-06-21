
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  UserPlus,
  BarChart3,
  Activity,
  DollarSign
} from 'lucide-react';

interface HospitalOverviewProps {
  user: User;
}

export const HospitalOverview: React.FC<HospitalOverviewProps> = ({ user }) => {
  const hospitalName = user.user_metadata?.hospital_name || 'Your Hospital';

  // Mock data - would come from API in real implementation
  const stats = {
    totalDoctors: 12,
    activeDoctors: 8,
    pendingInvitations: 3,
    creditsRemaining: 1200,
    creditsUsedThisMonth: 300,
    monthlyLimit: 1500,
    totalRecommendations: 1834,
    successRate: 98.5
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back to {hospitalName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your organization
          </p>
        </div>
        <div className="flex gap-3">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Doctor
          </Button>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Doctors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.activeDoctors}
                </p>
                <p className="text-xs text-gray-500">
                  of {stats.totalDoctors} total
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Credits Remaining</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.creditsRemaining.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  of {stats.monthlyLimit.toLocaleString()} monthly
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recommendations</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalRecommendations.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">
                  +12% this month
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.successRate}%
                </p>
                <p className="text-xs text-green-600">
                  +0.3% improvement
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Dr. Smith invited</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <Badge variant="secondary">New</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">45 recommendations completed</p>
                  <p className="text-xs text-gray-500">Today</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Credit usage at 80%</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
              <Badge variant="outline" className="text-yellow-600">Warning</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-orange-200 rounded-lg">
              <div>
                <p className="text-sm font-medium">3 pending invitations</p>
                <p className="text-xs text-gray-500">Sent 2-5 days ago</p>
              </div>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg">
              <div>
                <p className="text-sm font-medium">Subscription renewal</p>
                <p className="text-xs text-gray-500">Due in 15 days</p>
              </div>
              <Button size="sm">
                Renew
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-purple-200 rounded-lg">
              <div>
                <p className="text-sm font-medium">Monthly report ready</p>
                <p className="text-xs text-gray-500">October 2024</p>
              </div>
              <Button size="sm" variant="outline">
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Usage Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Usage This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Credit usage chart would go here</p>
              <p className="text-sm text-gray-400 mt-1">
                {stats.creditsUsedThisMonth} of {stats.monthlyLimit} credits used ({Math.round(stats.creditsUsedThisMonth / stats.monthlyLimit * 100)}%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
