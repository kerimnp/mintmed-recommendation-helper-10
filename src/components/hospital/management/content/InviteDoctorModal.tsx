
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { UserPlus, Loader2, Mail } from 'lucide-react';
import { CreateDoctorModal } from './CreateDoctorModal';

interface InviteDoctorModalProps {
  user: User;
  onDoctorCreated?: () => void;
}

export const InviteDoctorModal: React.FC<InviteDoctorModalProps> = ({ 
  user, 
  onDoctorCreated 
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    message: ''
  });

  const hospitalName = user.user_metadata?.hospital_name || 'Your Hospital';
  const adminName = `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() || user.email;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendInvitation = async () => {
    if (!formData.email.trim()) {
      toast({
        title: 'Email Required',
        description: 'Please enter the doctor\'s email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate a unique invitation token
      const invitationToken = crypto.randomUUID();
      
      // Call the edge function to send the invitation email
      const { data, error } = await supabase.functions.invoke('send-doctor-invitation', {
        body: {
          doctorEmail: formData.email,
          doctorFirstName: formData.firstName,
          doctorLastName: formData.lastName,
          hospitalName,
          adminName,
          customMessage: formData.message,
          invitationToken,
          hospitalAdminId: user.id
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Invitation Sent!',
        description: `Invitation email has been sent to ${formData.email}`,
      });

      // Reset form and close modal
      setFormData({ email: '', firstName: '', lastName: '', message: '' });
      setIsOpen(false);
      
      if (onDoctorCreated) {
        onDoctorCreated();
      }

    } catch (error: any) {
      console.error('Failed to send invitation:', error);
      toast({
        title: 'Failed to Send Invitation',
        description: error.message || 'There was an error sending the invitation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <CreateDoctorModal user={user} onDoctorCreated={onDoctorCreated} />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Doctor
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Invite Doctor to {hospitalName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Welcome to our team! We're excited to have you join us..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={3}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                The doctor will receive an email invitation with instructions on how to join {hospitalName} 
                and create their account.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendInvitation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invitation
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
