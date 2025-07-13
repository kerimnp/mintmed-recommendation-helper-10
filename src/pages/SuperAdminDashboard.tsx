import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Users, Activity, CreditCard, Settings, Database, Eye, MessageSquare, Building } from "lucide-react";
import { SuperAdminUserManagement } from "@/components/super-admin/SuperAdminUserManagement";
import { SuperAdminAnalytics } from "@/components/super-admin/SuperAdminAnalytics";
import { SuperAdminSubscriptions } from "@/components/super-admin/SuperAdminSubscriptions";
import { SuperAdminOrganizations } from "@/components/super-admin/SuperAdminOrganizations";
import { SuperAdminCreditManagement } from "@/components/super-admin/SuperAdminCreditManagement";
import { SuperAdminActivityLogs } from "@/components/super-admin/SuperAdminActivityLogs";
import { SuperAdminSystemTools } from "@/components/super-admin/SuperAdminSystemTools";
import { SuperAdminSecurity } from "@/components/super-admin/SuperAdminSecurity";
import { SuperAdminCommunication } from "@/components/super-admin/SuperAdminCommunication";
import { SuperAdminSubscriptionEditor } from "@/components/super-admin/SuperAdminSubscriptionEditor";

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSuperAdminAccess = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, email')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setLoading(false);
          return;
        }

        setUserRole(profile.role);
        setLoading(false);
      } catch (error) {
        console.error('Error in super admin check:', error);
        setLoading(false);
      }
    };

    checkSuperAdminAccess();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || userRole !== 'super_admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-6 w-6" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You do not have super administrator privileges. This section is restricted to authorized personnel only.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Super Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              System-wide administration and monitoring
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Super Admin</span>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid grid-cols-5 lg:grid-cols-9 w-full h-auto p-1 bg-muted/50">
            <TabsTrigger value="analytics" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="organizations" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Orgs</span>
            </TabsTrigger>
            <TabsTrigger value="credits" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Credits</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2 py-3 px-2 text-xs lg:text-sm">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Comm</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <SuperAdminAnalytics />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <SuperAdminUserManagement />
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
                <SuperAdminSubscriptions />
                <SuperAdminSubscriptionEditor />
          </TabsContent>

          <TabsContent value="organizations" className="space-y-6">
            <SuperAdminOrganizations />
          </TabsContent>

          <TabsContent value="credits" className="space-y-6">
            <SuperAdminCreditManagement />
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <SuperAdminActivityLogs />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SuperAdminSystemTools />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SuperAdminSecurity />
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <SuperAdminCommunication />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}