import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Plus, Trash2, Eye, EyeOff, AlertTriangle, CheckCircle, Lock, Activity, Settings } from "lucide-react";
import { HospitalGradeSecurityDashboard } from "@/components/security/HospitalGradeSecurityDashboard";
import { ClinicalDecisionSupport } from "@/components/security/ClinicalDecisionSupport";

interface SystemAdminEmail {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SecurityMetric {
  name: string;
  value: string | number;
  status: 'good' | 'warning' | 'critical';
  description: string;
}

export function SuperAdminSecurity() {
  const [adminEmails, setAdminEmails] = useState<SystemAdminEmail[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminEmails();
  }, []);

  const fetchAdminEmails = async () => {
    try {
      const { data, error } = await supabase
        .from('system_admin_emails')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdminEmails(data || []);
    } catch (error) {
      console.error('Error fetching admin emails:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin emails",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addAdminEmail = async () => {
    if (!newEmail.trim()) return;

    try {
      const { error } = await supabase
        .from('system_admin_emails')
        .insert({ email: newEmail.toLowerCase().trim() });

      if (error) throw error;

      await fetchAdminEmails();
      setNewEmail('');
      setIsAddDialogOpen(false);

      toast({
        title: "Success",
        description: "Admin email added successfully"
      });
    } catch (error: any) {
      console.error('Error adding admin email:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add admin email",
        variant: "destructive"
      });
    }
  };

  const toggleEmailStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('system_admin_emails')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      setAdminEmails(adminEmails.map(email => 
        email.id === id ? { ...email, is_active: !isActive } : email
      ));

      toast({
        title: "Success",
        description: `Admin email ${!isActive ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating email status:', error);
      toast({
        title: "Error",
        description: "Failed to update email status",
        variant: "destructive"
      });
    }
  };

  const removeAdminEmail = async (id: string) => {
    if (!confirm('Are you sure you want to remove this admin email?')) return;

    try {
      const { error } = await supabase
        .from('system_admin_emails')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAdminEmails(adminEmails.filter(email => email.id !== id));

      toast({
        title: "Success",
        description: "Admin email removed successfully"
      });
    } catch (error) {
      console.error('Error removing admin email:', error);
      toast({
        title: "Error",
        description: "Failed to remove admin email",
        variant: "destructive"
      });
    }
  };

  const securityMetrics: SecurityMetric[] = [
    {
      name: "Super Admin Emails",
      value: adminEmails.filter(e => e.is_active).length,
      status: adminEmails.filter(e => e.is_active).length >= 1 ? 'good' : 'warning',
      description: "Active super admin email addresses"
    },
    {
      name: "RLS Policies",
      value: "Enabled",
      status: 'good',
      description: "Row-level security is active on all tables"
    },
    {
      name: "Auto Domain Access",
      value: "@horalix.com",
      status: 'good',
      description: "Automatic super admin access for company domain"
    },
    {
      name: "Activity Logging",
      value: "Active",
      status: 'good',
      description: "All admin actions are being logged"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading security settings...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hospital-Grade EHR Security Center</h1>
          <p className="text-muted-foreground">
            Comprehensive security management, compliance monitoring, and clinical decision support
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          <Shield className="h-4 w-4 mr-2" />
          Super Admin
        </Badge>
      </div>

      {/* Main Security Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Security Dashboard</TabsTrigger>
          <TabsTrigger value="clinical">Clinical Decision Support</TabsTrigger>
          <TabsTrigger value="admin">Admin Management</TabsTrigger>
          <TabsTrigger value="compliance">Legacy Security</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <HospitalGradeSecurityDashboard />
        </TabsContent>

        <TabsContent value="clinical">
          <ClinicalDecisionSupport />
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          {/* Admin Email Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Super Admin Email Management
                </CardTitle>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Super Admin Email</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <Input
                          type="email"
                          placeholder="admin@example.com"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Users with this email will automatically receive super admin privileges.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addAdminEmail} disabled={!newEmail.trim()}>
                          Add Email
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsAddDialogOpen(false);
                            setNewEmail('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminEmails.map((email) => (
                    <TableRow key={email.id}>
                      <TableCell>
                        <div className="font-medium">{email.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={email.is_active ? "default" : "secondary"}>
                          {email.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(email.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleEmailStatus(email.id, email.is_active)}
                          >
                            {email.is_active ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeAdminEmail(email.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Legacy Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    {getStatusIcon(metric.status)}
                    {metric.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Legacy Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Row-Level Security (RLS) enabled on all tables</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Automatic role assignment based on email domain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Admin activity logging and audit trail</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Secure password reset for first-time users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Protected super admin routes and functions</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Hospital-Grade Enhancements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-medium text-green-800 mb-1">✅ Advanced Audit Logging</p>
                    <p className="text-green-700">Clinical audit events with HIPAA compliance tracking implemented.</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-medium text-green-800 mb-1">✅ Clinical Decision Support</p>
                    <p className="text-green-700">Drug interaction checking and evidence-based guidelines integrated.</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-medium text-blue-800 mb-1">🚧 Next: HL7 FHIR Integration</p>
                    <p className="text-blue-700">Implement HL7 FHIR R4 compliance and interoperability standards.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}