import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, Edit, Trash, FileDown, Printer, Share, Shield, Calendar } from "lucide-react";

interface AuditLog {
  id: string;
  user_id: string;
  patient_id: string;
  action_type: string;
  resource_type: string;
  resource_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  access_method: string;
  data_accessed: any;
  success: boolean;
  error_details: string | null;
  session_id: string | null;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
  patient: {
    first_name: string;
    last_name: string;
    medical_record_number: string;
  };
}

interface PatientAuditLogsProps {
  patientId?: string;
  showAllPatients?: boolean;
}

export function PatientAuditLogs({ patientId, showAllPatients = false }: PatientAuditLogsProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7days');
  const [userFilter, setUserFilter] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchAuditLogs();
  }, [patientId, showAllPatients, dateFilter]);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, actionFilter, resourceFilter, userFilter]);

  const fetchAuditLogs = async () => {
    try {
      let query = supabase
        .from('patient_data_audit_logs')
        .select(`
          *,
          user:profiles!user_id (first_name, last_name, email, role),
          patient:patients!patient_id (first_name, last_name, medical_record_number)
        `)
        .order('created_at', { ascending: false });

      // Filter by patient if specified
      if (patientId && !showAllPatients) {
        query = query.eq('patient_id', patientId);
      }

      // Filter by date range
      const now = new Date();
      let startDate = new Date();
      switch (dateFilter) {
        case '1day':
          startDate.setDate(now.getDate() - 1);
          break;
        case '7days':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          startDate.setDate(now.getDate() - 90);
          break;
        default:
          startDate.setDate(now.getDate() - 7);
      }

      if (dateFilter !== 'all') {
        query = query.gte('created_at', startDate.toISOString());
      }

      const { data, error } = await query.limit(1000);

      if (error) throw error;
      setLogs((data as any) || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch audit logs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = [...logs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.patient.medical_record_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip_address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Action filter
    if (actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action_type === actionFilter);
    }

    // Resource filter
    if (resourceFilter !== 'all') {
      filtered = filtered.filter(log => log.resource_type === resourceFilter);
    }

    // User filter
    if (userFilter) {
      filtered = filtered.filter(log => 
        `${log.user.first_name} ${log.user.last_name}`.toLowerCase().includes(userFilter.toLowerCase()) ||
        log.user.email.toLowerCase().includes(userFilter.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return <Eye className="h-3 w-3" />;
      case 'create': return <Edit className="h-3 w-3" />;
      case 'update': return <Edit className="h-3 w-3" />;
      case 'delete': return <Trash className="h-3 w-3" />;
      case 'export': return <FileDown className="h-3 w-3" />;
      case 'print': return <Printer className="h-3 w-3" />;
      case 'share': return <Share className="h-3 w-3" />;
      default: return <Shield className="h-3 w-3" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view': return 'bg-blue-100 text-blue-800';
      case 'create': return 'bg-green-100 text-green-800';
      case 'update': return 'bg-yellow-100 text-yellow-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'export': return 'bg-purple-100 text-purple-800';
      case 'print': return 'bg-gray-100 text-gray-800';
      case 'share': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'nurse': return 'bg-green-100 text-green-800';
      case 'pharmacist': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportLogs = () => {
    const csvContent = [
      'Date,User,Role,Patient,Action,Resource,IP Address,Success,Details',
      ...filteredLogs.map(log => [
        new Date(log.created_at).toLocaleString(),
        `${log.user.first_name} ${log.user.last_name}`,
        log.user.role,
        `${log.patient.first_name} ${log.patient.last_name} (${log.patient.medical_record_number})`,
        log.action_type,
        log.resource_type,
        log.ip_address || 'N/A',
        log.success ? 'Yes' : 'No',
        log.error_details || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient_audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const uniqueUsers = Array.from(new Set(logs.map(log => `${log.user.first_name} ${log.user.last_name}`)));

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading audit logs...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse h-16 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Patient Data Audit Logs
              <Badge variant="secondary">{filteredLogs.length} entries</Badge>
            </div>
            <Button onClick={exportLogs} variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="export">Export</SelectItem>
                <SelectItem value="print">Print</SelectItem>
                <SelectItem value="share">Share</SelectItem>
              </SelectContent>
            </Select>

            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Resources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="patient_info">Patient Info</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="recommendation">Recommendation</SelectItem>
                <SelectItem value="clinical_outcome">Clinical Outcome</SelectItem>
                <SelectItem value="full_record">Full Record</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">Last 24 Hours</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Filter by user..."
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            />

            <Button onClick={fetchAuditLogs} variant="outline">
              Refresh
            </Button>
          </div>

          {/* Logs Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">Date/Time</th>
                    <th className="text-left p-3 font-medium">User</th>
                    <th className="text-left p-3 font-medium">Patient</th>
                    <th className="text-left p-3 font-medium">Action</th>
                    <th className="text-left p-3 font-medium">Resource</th>
                    <th className="text-left p-3 font-medium">IP Address</th>
                    <th className="text-left p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-muted-foreground">
                        No audit logs found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="border-t hover:bg-muted/50">
                        <td className="p-3">
                          <div className="text-sm">
                            {new Date(log.created_at).toLocaleString()}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {log.user.first_name} {log.user.last_name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {log.user.email}
                            </div>
                            <Badge className={getRoleColor(log.user.role)} variant="secondary">
                              {log.user.role}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {log.patient.first_name} {log.patient.last_name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              MRN: {log.patient.medical_record_number}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getActionColor(log.action_type)} variant="secondary">
                            {getActionIcon(log.action_type)}
                            <span className="ml-1">{log.action_type}</span>
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">{log.resource_type}</div>
                          {log.resource_id && (
                            <div className="text-xs text-muted-foreground">
                              ID: {log.resource_id.substring(0, 8)}...
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="text-sm">{log.ip_address || 'N/A'}</div>
                          <div className="text-xs text-muted-foreground">
                            {log.access_method}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant={log.success ? "secondary" : "destructive"}>
                            {log.success ? 'Success' : 'Failed'}
                          </Badge>
                          {log.error_details && (
                            <div className="text-xs text-red-600 mt-1">
                              {log.error_details}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}