import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Activity, Users, CreditCard, FileText, AlertTriangle, TrendingUp, Clock, Database } from "lucide-react";

interface MetricData {
  totalUsers: number;
  activeUsers: number;
  totalPatients: number;
  totalPrescriptions: number;
  totalRecommendations: number;
  pendingSharingRequests: number;
  auditLogsToday: number;
  systemHealth: 'good' | 'warning' | 'error';
  lastUpdated: Date;
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<MetricData>({
    totalUsers: 0,
    activeUsers: 0,
    totalPatients: 0,
    totalPrescriptions: 0,
    totalRecommendations: 0,
    pendingSharingRequests: 0,
    auditLogsToday: 0,
    systemHealth: 'good',
    lastUpdated: new Date()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      // Fetch all metrics in parallel
      const [
        usersResult,
        patientsResult,
        prescriptionsResult,
        recommendationsResult,
        sharingRequestsResult,
        auditLogsResult
      ] = await Promise.all([
        // Total and active users
        supabase
          .from('profiles')
          .select('is_active', { count: 'exact' }),
        
        // Total patients
        supabase
          .from('patients')
          .select('id', { count: 'exact' }),
        
        // Total prescriptions
        supabase
          .from('prescriptions')
          .select('id', { count: 'exact' }),
        
        // Total recommendations
        supabase
          .from('antibiotic_recommendations')
          .select('id', { count: 'exact' }),
        
        // Pending sharing requests
        supabase
          .from('patient_sharing_requests')
          .select('id', { count: 'exact' })
          .eq('status', 'pending'),
        
        // Audit logs today
        supabase
          .from('patient_data_audit_logs')
          .select('id', { count: 'exact' })
          .gte('created_at', new Date().toISOString().split('T')[0])
      ]);

      // Calculate active users
      const activeUsersCount = usersResult.data?.filter(user => user.is_active).length || 0;

      setMetrics({
        totalUsers: usersResult.count || 0,
        activeUsers: activeUsersCount,
        totalPatients: patientsResult.count || 0,
        totalPrescriptions: prescriptionsResult.count || 0,
        totalRecommendations: recommendationsResult.count || 0,
        pendingSharingRequests: sharingRequestsResult.count || 0,
        auditLogsToday: auditLogsResult.count || 0,
        systemHealth: determineSystemHealth(activeUsersCount, prescriptionsResult.count || 0),
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const determineSystemHealth = (activeUsers: number, prescriptions: number): 'good' | 'warning' | 'error' => {
    if (activeUsers === 0) return 'error';
    if (activeUsers < 5 || prescriptions < 10) return 'warning';
    return 'good';
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'good': return <Activity className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="animate-pulse h-4 bg-muted rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="animate-pulse h-3 bg-muted rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Health Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Real-Time System Metrics</h3>
        <div className="flex items-center gap-2">
          <Badge className={getHealthColor(metrics.systemHealth)} variant="secondary">
            {getHealthIcon(metrics.systemHealth)}
            <span className="ml-1 capitalize">{metrics.systemHealth}</span>
          </Badge>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Updated: {metrics.lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeUsers} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalUsers > 0 ? Math.round((metrics.activeUsers / metrics.totalUsers) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPatients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Registered in system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPrescriptions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total issued
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalRecommendations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              AI-generated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.pendingSharingRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Data sharing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Database className="h-4 w-4" />
              Audit Logs Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.auditLogsToday.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Security events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className={getHealthColor(metrics.systemHealth)} variant="secondary">
                {getHealthIcon(metrics.systemHealth)}
                <span className="ml-1 capitalize">{metrics.systemHealth}</span>
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall status
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}