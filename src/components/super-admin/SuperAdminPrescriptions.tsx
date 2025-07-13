import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Download, Eye, Calendar, User, Pill, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface Prescription {
  id: string;
  created_at: string;
  patient_id: string;
  doctor_id: string;
  antibiotic_name: string;
  dosage: string;
  route: string;
  frequency: string;
  duration: string;
  status: string;
  indication?: string;
  notes?: string;
  reason_for_prescription?: string;
  start_date: string;
  end_date?: string;
  approval_required?: boolean;
  approved_by?: string;
  approval_date?: string;
  prescriber_notes?: string;
  updated_at?: string;
  // Related data
  patient?: {
    first_name: string;
    last_name: string;
    medical_record_number?: string;
  } | null;
  doctor?: {
    first_name: string;
    last_name: string;
    email: string;
    specialization?: string;
  } | null;
}

export function SuperAdminPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrescriptions();
    setupRealtimeSubscription();
  }, []);

  useEffect(() => {
    filterPrescriptions();
  }, [prescriptions, searchTerm, statusFilter]);

  const fetchPrescriptions = async () => {
    try {
      // Use explicit LEFT JOINs for better query reliability
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          patient:patients!prescriptions_patient_id_fkey (first_name, last_name, medical_record_number),
          doctor:profiles!prescriptions_doctor_id_fkey (first_name, last_name, email, specialization)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched prescriptions data:', data?.length || 0, 'records');
      setPrescriptions((data as any[]) || []);
    } catch (error: any) {
      console.error('Error fetching prescriptions:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to load prescriptions. Please check your permissions and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('super-admin-prescriptions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prescriptions'
        },
        () => {
          fetchPrescriptions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const filterPrescriptions = () => {
    let filtered = prescriptions;

    if (searchTerm) {
      filtered = filtered.filter(prescription =>
        prescription.antibiotic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.patient?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.patient?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.doctor?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.doctor?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.indication?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.patient?.medical_record_number?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(prescription => prescription.status === statusFilter);
    }

    setFilteredPrescriptions(filtered);
  };

  const handleViewDetails = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsDetailModalOpen(true);
  };

  const exportPrescriptions = () => {
    const csvContent = [
      // Header
      'Date,Patient,Doctor,Antibiotic,Dosage,Frequency,Duration,Status,Indication',
      // Data rows
      ...filteredPrescriptions.map(p => [
        format(new Date(p.created_at), 'yyyy-MM-dd'),
        `${p.patient?.first_name || ''} ${p.patient?.last_name || ''}`,
        `${p.doctor?.first_name || ''} ${p.doctor?.last_name || ''}`,
        p.antibiotic_name,
        p.dosage,
        p.frequency,
        p.duration,
        p.status,
        p.indication || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescriptions_export_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Prescriptions data has been exported successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      completed: { variant: 'secondary' as const, icon: CheckCircle, color: 'text-blue-600' },
      discontinued: { variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-600' },
      pending: { variant: 'outline' as const, icon: AlertCircle, color: 'text-yellow-600' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">All Prescriptions</h2>
          <p className="text-sm text-muted-foreground">
            Monitor and manage all prescriptions across the system
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportPrescriptions} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Total Prescriptions</p>
                <p className="text-2xl font-bold">{prescriptions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">
                  {prescriptions.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {prescriptions.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Unique Antibiotics</p>
                <p className="text-2xl font-bold">
                  {new Set(prescriptions.map(p => p.antibiotic_name)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by patient, doctor, antibiotic, or MRN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Prescriptions ({filteredPrescriptions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Antibiotic</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {format(new Date(prescription.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {prescription.patient?.first_name} {prescription.patient?.last_name}
                        </p>
                        {prescription.patient?.medical_record_number && (
                          <p className="text-xs text-muted-foreground">
                            MRN: {prescription.patient.medical_record_number}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {prescription.doctor?.first_name} {prescription.doctor?.last_name}
                        </p>
                        {prescription.doctor?.specialization && (
                          <p className="text-xs text-muted-foreground">
                            {prescription.doctor.specialization}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{prescription.antibiotic_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{prescription.dosage}</p>
                        <p className="text-xs text-muted-foreground">{prescription.frequency}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{prescription.duration}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(prescription.status)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(prescription)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No prescriptions match your search criteria'
                  : 'No prescriptions found'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prescription Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Prescription Details
            </DialogTitle>
          </DialogHeader>
          {selectedPrescription && (
            <div className="space-y-6">
              {/* Patient & Doctor Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Patient Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Name</label>
                      <p className="font-medium">
                        {selectedPrescription.patient?.first_name} {selectedPrescription.patient?.last_name}
                      </p>
                    </div>
                    {selectedPrescription.patient?.medical_record_number && (
                      <div>
                        <label className="text-xs text-muted-foreground">Medical Record Number</label>
                        <p className="font-medium">{selectedPrescription.patient.medical_record_number}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Prescribing Doctor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Name</label>
                      <p className="font-medium">
                        {selectedPrescription.doctor?.first_name} {selectedPrescription.doctor?.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Email</label>
                      <p className="font-medium">{selectedPrescription.doctor?.email}</p>
                    </div>
                    {selectedPrescription.doctor?.specialization && (
                      <div>
                        <label className="text-xs text-muted-foreground">Specialization</label>
                        <p className="font-medium">{selectedPrescription.doctor.specialization}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Prescription Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    Prescription Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Antibiotic</label>
                    <p className="font-medium">{selectedPrescription.antibiotic_name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Dosage</label>
                    <p className="font-medium">{selectedPrescription.dosage}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Route</label>
                    <p className="font-medium">{selectedPrescription.route}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Frequency</label>
                    <p className="font-medium">{selectedPrescription.frequency}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Duration</label>
                    <p className="font-medium">{selectedPrescription.duration}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedPrescription.status)}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Start Date</label>
                    <p className="font-medium">
                      {format(new Date(selectedPrescription.start_date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  {selectedPrescription.end_date && (
                    <div>
                      <label className="text-xs text-muted-foreground">End Date</label>
                      <p className="font-medium">
                        {format(new Date(selectedPrescription.end_date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Information */}
              {(selectedPrescription.indication || selectedPrescription.reason_for_prescription || selectedPrescription.notes) && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedPrescription.indication && (
                      <div>
                        <label className="text-xs text-muted-foreground">Indication</label>
                        <p className="font-medium">{selectedPrescription.indication}</p>
                      </div>
                    )}
                    {selectedPrescription.reason_for_prescription && (
                      <div>
                        <label className="text-xs text-muted-foreground">Reason for Prescription</label>
                        <p className="font-medium">{selectedPrescription.reason_for_prescription}</p>
                      </div>
                    )}
                    {selectedPrescription.notes && (
                      <div>
                        <label className="text-xs text-muted-foreground">Notes</label>
                        <p className="font-medium">{selectedPrescription.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Metadata */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Metadata</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Prescription ID</label>
                    <p className="font-mono text-sm">{selectedPrescription.id}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Created At</label>
                    <p className="font-medium">
                      {format(new Date(selectedPrescription.created_at), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}