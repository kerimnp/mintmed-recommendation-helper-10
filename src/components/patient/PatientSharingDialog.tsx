import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRequestPatientAccess } from '@/hooks/usePatientAccess';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Share2, Loader2, Search } from 'lucide-react';

interface PatientSharingDialogProps {
  patientId: string;
  patientName?: string;
  trigger?: React.ReactNode;
}

interface Doctor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  specialization: string | null;
}

export const PatientSharingDialog: React.FC<PatientSharingDialogProps> = ({
  patientId,
  patientName,
  trigger
}) => {
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [accessType, setAccessType] = useState<'limited' | 'full'>('limited');
  const [reason, setReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { requestAccess } = useRequestPatientAccess();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadDoctors();
    }
  }, [open]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = doctors.filter(doctor => {
        const fullName = `${doctor.first_name || ''} ${doctor.last_name || ''}`.toLowerCase();
        const email = doctor.email?.toLowerCase() || '';
        const specialization = doctor.specialization?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return fullName.includes(search) || 
               email.includes(search) || 
               specialization.includes(search);
      });
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [searchTerm, doctors]);

  const loadDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, specialization')
        .eq('role', 'doctor')
        .eq('is_active', true)
        .order('last_name', { ascending: true });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error('Error loading doctors:', error);
      setError('Failed to load doctors list');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctorId || !reason.trim()) {
      setError('Please select a doctor and provide a reason for the request');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await requestAccess(patientId, selectedDoctorId, reason.trim(), accessType);
      
      toast({
        title: 'Access Request Sent',
        description: 'Your request for patient access has been sent successfully.',
      });

      // Reset form and close dialog
      setSelectedDoctorId('');
      setReason('');
      setAccessType('limited');
      setSearchTerm('');
      setOpen(false);
    } catch (error) {
      console.error('Error requesting access:', error);
      setError(error instanceof Error ? error.message : 'Failed to send access request');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Request Access
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Patient Access</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {patientName && (
            <div className="text-sm text-muted-foreground">
              Requesting access for: <strong>{patientName}</strong>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="search">Search Doctor</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name, email, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor to request access from" />
              </SelectTrigger>
              <SelectContent>
                {filteredDoctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    <div className="flex flex-col">
                      <span>
                        {doctor.first_name} {doctor.last_name}
                      </span>
                      {doctor.email && (
                        <span className="text-xs text-muted-foreground">
                          {doctor.email}
                        </span>
                      )}
                      {doctor.specialization && (
                        <span className="text-xs text-muted-foreground">
                          {doctor.specialization}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="access-type">Access Level</Label>
            <Select value={accessType} onValueChange={(value: 'limited' | 'full') => setAccessType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="limited">
                  <div className="flex flex-col">
                    <span>Limited Access</span>
                    <span className="text-xs text-muted-foreground">
                      Basic patient information only
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="full">
                  <div className="flex flex-col">
                    <span>Full Access</span>
                    <span className="text-xs text-muted-foreground">
                      Complete patient record access
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Please explain why you need access to this patient's information..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};