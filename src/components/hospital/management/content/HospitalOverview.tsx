
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  UserPlus,
  BarChart3,
  Activity,
  DollarSign,
  Loader2
} from 'lucide-react';

interface HospitalOverviewProps {
  user: User;
}

export const HospitalOverview: React.FC<HospitalOverviewProps> = ({ user }) => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    activeDoctors: 0,
    pendingInvitations: 0,
    creditsRemaining: 0,
    creditsUsedThisMonth: 0,
    monthlyLimit: 0,
    totalRecommendations: 0,
    successRate: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const hospitalName = user.user_metadata?.hospital_name || 'Horalix Antibioteka';

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time subscriptions
    const channel = supabase
      .channel('hospital-dashboard')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'antibiotic_recommendations'
      }, () => {
        fetchDashboardData();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'affiliations'
      }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user.id]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get hospital organization
      const { data: orgData } = await supabase
        .from('affiliations')
        .select('org_id, organizations(*)')
        .eq('doctor_id', user.id)
        .eq('status', 'active')
        .single();

      if (!orgData?.org_id) {
        console.log('No organization found for user');
        setLoading(false);
        return;
      }

      const orgId = orgData.org_id;

      // Fetch doctor statistics
      const { data: affiliations } = await supabase
        .from('affiliations')
        .select(`
          id,
          status,
          doctor_id,
          profiles(first_name, last_name, is_active, created_at)
        `)
        .eq('org_id', orgId);

      const totalDoctors = affiliations?.length || 0;
      const activeDoctors = affiliations?.filter(a => 
        a.status === 'active' && a.profiles?.is_active
      ).length || 0;
      const pendingInvitations = affiliations?.filter(a => 
        a.status === 'pending'
      ).length || 0;

      // Fetch subscription and credit data
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('credits_remaining, doctor_seats')
        .eq('org_id', orgId)
        .eq('status', 'active')
        .single();

      // Fetch recommendations data for this organization
      const doctorIds = affiliations?.map(a => a.doctor_id).filter(Boolean) || [];
      
      const { data: recommendations } = await supabase
        .from('antibiotic_recommendations')
        .select('id, created_at, is_accepted')
        .in('doctor_id', doctorIds);

      const totalRecommendations = recommendations?.length || 0;
      const acceptedRecommendations = recommendations?.filter(r => r.is_accepted).length || 0;
      const successRate = totalRecommendations > 0 
        ? Math.round((acceptedRecommendations / totalRecommendations) * 100)
        : 0;

      // Fetch credit usage for current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: creditUsage } = await supabase
        .from('credit_usage_history')
        .select('credits_used')
        .in('doctor_id', doctorIds)
        .gte('created_at', startOfMonth.toISOString());

      const creditsUsedThisMonth = creditUsage?.reduce((sum, usage) => 
        sum + (usage.credits_used || 0), 0
      ) || 0;

      // Fetch recent activity
      const { data: recentRecs } = await supabase
        .from('antibiotic_recommendations')
        .select(`
          id,
          created_at,
          profiles(first_name, last_name)
        `)
        .in('doctor_id', doctorIds)
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalDoctors,
        activeDoctors,
        pendingInvitations,
        creditsRemaining: subscription?.credits_remaining || 0,
        creditsUsedThisMonth,
        monthlyLimit: (subscription?.doctor_seats || 1) * 100, // Assume 100 credits per seat
        totalRecommendations,
        successRate
      });

      setRecentActivity(recentRecs || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back to {hospitalName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time dashboard for your hospital management system
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
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">
                        Recommendation by Dr. {activity.profiles?.first_name || 'Unknown'} {activity.profiles?.last_name || ''}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.created_at).toLocaleDateString()} at {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  {index === 0 && <Badge variant="secondary">Latest</Badge>}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No recent activity</p>
              </div>
            )}
            
            {stats.creditsUsedThisMonth / stats.monthlyLimit > 0.8 && stats.monthlyLimit > 0 && (
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">High credit usage detected</p>
                    <p className="text-xs text-gray-500">
                      {Math.round((stats.creditsUsedThisMonth / stats.monthlyLimit) * 100)}% of monthly credits used
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-yellow-600">Warning</Badge>
              </div>
            )}
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
            {stats.pendingInvitations > 0 && (
              <div className="flex items-center justify-between p-3 border border-orange-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium">
                    {stats.pendingInvitations} pending invitation{stats.pendingInvitations !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-500">Awaiting doctor responses</p>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg">
              <div>
                <p className="text-sm font-medium">Hospital Performance Report</p>
                <p className="text-xs text-gray-500">Generate current month analytics</p>
              </div>
              <Button size="sm" variant="outline">
                Generate
              </Button>
            </div>

            {stats.creditsRemaining < stats.monthlyLimit * 0.2 && stats.monthlyLimit > 0 && (
              <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Low credit balance</p>
                  <p className="text-xs text-gray-500">
                    Only {stats.creditsRemaining} credits remaining
                  </p>
                </div>
                <Button size="sm" variant="destructive">
                  Top Up
                </Button>
              </div>
            )}

            {stats.pendingInvitations === 0 && stats.creditsRemaining >= stats.monthlyLimit * 0.2 && (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No pending actions</p>
                <p className="text-xs text-gray-400">Your hospital is running smoothly</p>
              </div>
            )}
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
