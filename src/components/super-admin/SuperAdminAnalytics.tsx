import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Activity, Users, Building, CreditCard, FileText, Pill, Stethoscope, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface SystemStats {
  total_users: number;
  total_doctors: number;
  total_hospital_admins: number;
  total_super_admins: number;
  new_users_30_days: number;
  active_users: number;
  total_organizations: number;
  active_subscriptions: number;
  total_subscriptions: number;
  total_active_credits: number;
  total_patients: number;
  total_prescriptions: number;
  total_recommendations: number;
}

export function SuperAdminAnalytics() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userGrowthData, setUserGrowthData] = useState<any[]>([]);

  useEffect(() => {
    fetchSystemStats();
    fetchUserGrowthData();
  }, []);

  const fetchSystemStats = async () => {
    try {
      // Fetch system statistics
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;

      // Calculate stats manually since we can't use the view directly
      const totalUsers = data.length;
      const totalDoctors = data.filter(p => p.role === 'doctor').length;
      const totalHospitalAdmins = data.filter(p => p.role === 'admin').length;
      const totalSuperAdmins = data.filter(p => p.role === 'super_admin').length;
      const activeUsers = data.filter(p => p.is_active).length;
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const newUsers30Days = data.filter(p => new Date(p.created_at) >= thirtyDaysAgo).length;

      // Fetch additional stats
      const [orgData, subData, patientData, prescriptionData, recommendationData] = await Promise.all([
        supabase.from('organizations').select('*'),
        supabase.from('subscriptions').select('*'),
        supabase.from('patients').select('*'),
        supabase.from('prescriptions').select('*'),
        supabase.from('antibiotic_recommendations').select('*')
      ]);

      const activeSubscriptions = subData.data?.filter(s => s.status === 'active').length || 0;
      const totalActiveCredits = subData.data?.reduce((sum, s) => sum + (s.credits_remaining || 0), 0) || 0;

      setStats({
        total_users: totalUsers,
        total_doctors: totalDoctors,
        total_hospital_admins: totalHospitalAdmins,
        total_super_admins: totalSuperAdmins,
        new_users_30_days: newUsers30Days,
        active_users: activeUsers,
        total_organizations: orgData.data?.length || 0,
        active_subscriptions: activeSubscriptions,
        total_subscriptions: subData.data?.length || 0,
        total_active_credits: totalActiveCredits,
        total_patients: patientData.data?.length || 0,
        total_prescriptions: prescriptionData.data?.length || 0,
        total_recommendations: recommendationData.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching system stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserGrowthData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('created_at')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Group by month for the last 12 months
      const growthData = [];
      const now = new Date();
      
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const usersInMonth = data.filter(user => {
          const createdAt = new Date(user.created_at);
          return createdAt >= monthStart && createdAt <= monthEnd;
        }).length;

        growthData.push({
          month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          users: usersInMonth
        });
      }

      setUserGrowthData(growthData);
    } catch (error) {
      console.error('Error fetching user growth data:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.total_users || 0,
      icon: Users,
      change: `+${stats?.new_users_30_days || 0} this month`,
      changeType: "positive"
    },
    {
      title: "Active Users",
      value: stats?.active_users || 0,
      icon: Activity,
      change: `${((stats?.active_users || 0) / (stats?.total_users || 1) * 100).toFixed(1)}% of total`,
      changeType: "neutral"
    },
    {
      title: "Organizations",
      value: stats?.total_organizations || 0,
      icon: Building,
      change: "Hospital networks",
      changeType: "neutral"
    },
    {
      title: "Active Subscriptions",
      value: stats?.active_subscriptions || 0,
      icon: CreditCard,
      change: `${stats?.total_subscriptions || 0} total`,
      changeType: "positive"
    },
    {
      title: "Total Credits",
      value: stats?.total_active_credits || 0,
      icon: CreditCard,
      change: "Active credits",
      changeType: "neutral"
    },
    {
      title: "Patients",
      value: stats?.total_patients || 0,
      icon: Users,
      change: "In system",
      changeType: "neutral"
    },
    {
      title: "Prescriptions",
      value: stats?.total_prescriptions || 0,
      icon: Pill,
      change: "Total issued",
      changeType: "neutral"
    },
    {
      title: "Recommendations",
      value: stats?.total_recommendations || 0,
      icon: Stethoscope,
      change: "AI generated",
      changeType: "positive"
    }
  ];

  const roleDistribution = [
    { name: 'Doctors', value: stats?.total_doctors || 0, color: '#3b82f6' },
    { name: 'Hospital Admins', value: stats?.total_hospital_admins || 0, color: '#10b981' },
    { name: 'Super Admins', value: stats?.total_super_admins || 0, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'negative' ? 'text-red-600' : 
                'text-muted-foreground'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              User Growth (Last 12 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Role Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}