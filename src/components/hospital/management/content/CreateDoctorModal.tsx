
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { UserPlus, Loader2 } from 'lucide-react';

interface CreateDoctorModalProps {
  user: User;
  onDoctorCreated?: () => void;
}

export const CreateDoctorModal: React.FC<CreateDoctorModalProps> = ({ 
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
    tempPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTempPassword = () => {
    const password = 'TempPass' + Math.floor(Math.random() * 10000);
    setFormData(prev => ({ ...prev, tempPassword: password }));
  };

  const handleCreateDoctor = async () => {
    if (!formData.email.trim() || !formData.firstName.trim() || !formData.lastName.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get the hospital admin's organization
      const { data: adminAffiliation, error: affiliationError } = await supabase
        .from('affiliations')
        .select('org_id')
        .eq('doctor_id', user.id)
        .eq('status', 'active')
        .single();

      if (affiliationError || !adminAffiliation) {
        throw new Error('Could not find your hospital organization');
      }

      // Call the database function to create the doctor account
      const { data, error } = await supabase.rpc('create_admin_doctor_account', {
        p_email: formData.email,
        p_first_name: formData.firstName,
        p_last_name: formData.lastName,
        p_temp_password: formData.tempPassword || null,
        p_hospital_id: adminAffiliation.org_id,
        p_created_by: user.id
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Doctor Account Created!',
        description: `Account created for ${formData.firstName} ${formData.lastName}. Temporary password: ${formData.tempPassword || 'Generated automatically'}`,
      });

      // Reset form and close modal
      setFormData({ email: '', firstName: '', lastName: '', tempPassword: '' });
      setIsOpen(false);
      
      if (onDoctorCreated) {
        onDoctorCreated();
      }

    } catch (error: any) {
      console.error('Failed to create doctor account:', error);
      toast({
        title: 'Failed to Create Account',
        description: error.message || 'There was an error creating the doctor account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Create Doctor Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            Create Doctor Account
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
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tempPassword">Temporary Password</Label>
            <div className="flex gap-2">
              <Input
                id="tempPassword"
                type="text"
                placeholder="Leave empty to auto-generate"
                value={formData.tempPassword}
                onChange={(e) => handleInputChange('tempPassword', e.target.value)}
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={generateTempPassword}
                disabled={isLoading}
              >
                Generate
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              The doctor will be able to log in with the temporary password and will be prompted 
              to change it on their first login.
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
              onClick={handleCreateDoctor}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
