
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InviteDoctorModal } from './InviteDoctorModal';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Mail,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Loader2
} from 'lucide-react';

interface DoctorsManagementProps {
  user: User;
}

interface DoctorAffiliation {
  id: number;
  doctor_id: string;
  status: string;
  joined_at: string;
  invited_by: string | null;
  doctor: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    is_first_login: boolean | null;
  };
  inviter?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}

export const DoctorsManagement: React.FC<DoctorsManagementProps> = ({ user }) => {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<DoctorAffiliation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0
  });

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      
      // Get the hospital admin's organization
      const { data: adminAffiliation, error: affiliationError } = await supabase
        .from('affiliations')
        .select('org_id')
        .eq('doctor_id', user.id)
        .eq('status', 'active')
        .single();

      if (affiliationError || !adminAffiliation) {
        console.error('Error fetching admin organization:', affiliationError);
        toast({
          title: 'Error',
          description: 'Could not find your hospital organization.',
          variant: 'destructive',
        });
        return;
      }

      // Fetch all doctors affiliated with this organization
      const { data: doctorAffiliations, error } = await supabase
        .from('affiliations')
        .select(`
          id,
          doctor_id,
          status,
          joined_at,
          invited_by,
          doctor:profiles!affiliations_doctor_id_fkey (
            first_name,
            last_name,
            email,
            is_first_login
          ),
          inviter:profiles!affiliations_invited_by_fkey (
            first_name,
            last_name,
            email
          )
        `)
        .eq('org_id', adminAffiliation.org_id)
        .order('joined_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Fix the type casting issue by properly handling the data
      const formattedDoctors: DoctorAffiliation[] = (doctorAffiliations || []).map(affiliation => ({
        ...affiliation,
        inviter: affiliation.inviter && typeof affiliation.inviter === 'object' 
          ? affiliation.inviter as { first_name: string | null; last_name: string | null; email: string | null; }
          : null
      }));

      setDoctors(formattedDoctors);
      
      // Calculate stats
      const total = formattedDoctors.length;
      const active = formattedDoctors.filter(d => d.status === 'active').length;
      const pending = formattedDoctors.filter(d => d.status === 'pending').length;
      
      setStats({ total, active, pending });

    } catch (error: any) {
      console.error('Error fetching doctors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load doctors data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [user.id]);

  const handleDoctorCreated = () => {
    fetchDoctors(); // Refresh the list when a new doctor is created
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Doctors Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your hospital's medical staff
          </p>
        </div>
        <InviteDoctorModal user={user} onDoctorCreated={handleDoctorCreated} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Doctors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Doctors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Invites</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctors List */}
      <Card>
        <CardHeader>
          <CardTitle>All Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          {doctors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No doctors found. Start by inviting your first doctor.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {doctors.map((affiliation) => (
                <div key={affiliation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        {`${affiliation.doctor?.first_name?.[0] || ''}${affiliation.doctor?.last_name?.[0] || ''}`}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {`${affiliation.doctor?.first_name || ''} ${affiliation.doctor?.last_name || ''}`.trim() || 'Unknown'}
                      </h3>
                      <p className="text-sm text-gray-500">{affiliation.doctor?.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400">
                          Joined {new Date(affiliation.joined_at).toLocaleDateString()}
                        </p>
                        {affiliation.inviter && (
                          <p className="text-xs text-gray-400">
                            • Invited by {`${affiliation.inviter.first_name || ''} ${affiliation.inviter.last_name || ''}`.trim() || affiliation.inviter.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge variant={affiliation.status === 'active' ? 'default' : 'secondary'}>
                          {affiliation.status}
                        </Badge>
                        {affiliation.doctor?.is_first_login && (
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            First Login
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
