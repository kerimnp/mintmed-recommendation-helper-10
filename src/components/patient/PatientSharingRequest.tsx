import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  specialization: string;
}

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  medical_record_number: string;
}

interface SharingRequest {
  id: string;
  requesting_doctor_id: string;
  target_doctor_id: string;
  patient_id: string;
  request_reason: string;
  access_type: string;
  status: string;
  requested_at: string;
  responded_at: string;
  response_notes: string;
  expires_at: string;
  patients: Patient;
  requesting_doctor: Doctor;
  target_doctor: Doctor;
}

interface PatientSharingRequestProps {
  patientId?: string;
  currentUserId: string;
}

export function PatientSharingRequest({ patientId, currentUserId }: PatientSharingRequestProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [requests, setRequests] = useState<SharingRequest[]>([]);
  const [selectedPatient, setSelectedPatient] = useState(patientId || '');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [accessType, setAccessType] = useState('limited');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchRequests();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, specialization')
        .eq('role', 'doctor')
        .eq('is_active', true)
        .neq('id', currentUserId);

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('id, first_name, last_name, medical_record_number')
        .order('last_name');

      if (error) throw error;
      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_sharing_requests')
        .select(`
          *,
          patients (id, first_name, last_name, medical_record_number),
          requesting_doctor:profiles!requesting_doctor_id (id, first_name, last_name, email, specialization),
          target_doctor:profiles!target_doctor_id (id, first_name, last_name, email, specialization)
        `)
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const createSharingRequest = async () => {
    if (!selectedPatient || !selectedDoctor || !requestReason.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('patient_sharing_requests')
        .insert({
          requesting_doctor_id: currentUserId,
          target_doctor_id: selectedDoctor,
          patient_id: selectedPatient,
          request_reason: requestReason,
          access_type: accessType
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sharing request sent successfully"
      });

      // Reset form
      setSelectedPatient(patientId || '');
      setSelectedDoctor('');
      setRequestReason('');
      setAccessType('limited');
      setIsOpen(false);
      
      fetchRequests();
    } catch (error) {
      console.error('Error creating request:', error);
      toast({
        title: "Error",
        description: "Failed to create sharing request",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const respondToRequest = async (requestId: string, status: 'approved' | 'denied', responseNotes = '') => {
    try {
      const { error } = await supabase
        .from('patient_sharing_requests')
        .update({
          status,
          responded_at: new Date().toISOString(),
          responded_by: currentUserId,
          response_notes: responseNotes
        })
        .eq('id', requestId);

      if (error) throw error;

      // If approved, create patient access record
      if (status === 'approved') {
        const request = requests.find(r => r.id === requestId);
        if (request) {
          await supabase
            .from('doctor_patient_access')
            .insert({
              doctor_id: request.requesting_doctor_id,
              patient_id: request.patient_id,
              access_granted_by: currentUserId,
              access_reason: `Approved sharing request: ${request.request_reason}`,
              access_type: request.access_type
            });
        }
      }

      toast({
        title: "Success",
        description: `Request ${status} successfully`
      });

      fetchRequests();
    } catch (error) {
      console.error('Error responding to request:', error);
      toast({
        title: "Error",
        description: "Failed to respond to request",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'denied': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'expired': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const outgoingRequests = requests.filter(r => r.requesting_doctor_id === currentUserId);
  const incomingRequests = requests.filter(r => r.target_doctor_id === currentUserId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Patient Data Sharing</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Request Access
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Request Patient Data Access</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient</label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.first_name} {patient.last_name} ({patient.medical_record_number})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Target Doctor</label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        Dr. {doctor.first_name} {doctor.last_name} - {doctor.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Access Type</label>
                <Select value={accessType} onValueChange={setAccessType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limited">Limited Access</SelectItem>
                    <SelectItem value="full">Full Access</SelectItem>
                    <SelectItem value="emergency">Emergency Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Request Reason</label>
                <Textarea
                  placeholder="Explain why you need access to this patient's data..."
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  className="min-h-20"
                />
              </div>

              <Button 
                onClick={createSharingRequest}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outgoing Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              My Requests ({outgoingRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {outgoingRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground">No outgoing requests</p>
              ) : (
                outgoingRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">
                        {request.patients.first_name} {request.patients.last_name}
                      </div>
                      <Badge className={getStatusColor(request.status)} variant="secondary">
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status}</span>
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      To: Dr. {request.target_doctor.first_name} {request.target_doctor.last_name}
                    </div>
                    <div className="text-sm">{request.request_reason}</div>
                    {request.response_notes && (
                      <div className="text-sm italic text-muted-foreground">
                        Response: {request.response_notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Incoming Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Requests for Me ({incomingRequests.filter(r => r.status === 'pending').length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incomingRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground">No incoming requests</p>
              ) : (
                incomingRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">
                        {request.patients.first_name} {request.patients.last_name}
                      </div>
                      <Badge className={getStatusColor(request.status)} variant="secondary">
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status}</span>
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      From: Dr. {request.requesting_doctor.first_name} {request.requesting_doctor.last_name}
                    </div>
                    <div className="text-sm">{request.request_reason}</div>
                    <div className="text-xs text-muted-foreground">
                      Access Type: {request.access_type} | Expires: {new Date(request.expires_at).toLocaleDateString()}
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => respondToRequest(request.id, 'approved')}
                          className="flex-1"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => respondToRequest(request.id, 'denied')}
                          className="flex-1"
                        >
                          Deny
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}