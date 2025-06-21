
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InviteDoctorModal } from './InviteDoctorModal';
import { 
  Users, 
  Mail,
  MoreHorizontal,
  CheckCircle,
  Clock
} from 'lucide-react';

interface DoctorsManagementProps {
  user: User;
}

export const DoctorsManagement: React.FC<DoctorsManagementProps> = ({ user }) => {
  // Mock data for doctors
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com', status: 'active', joinDate: '2024-01-15', recommendations: 45 },
    { id: 2, name: 'Dr. Michael Chen', email: 'michael.chen@hospital.com', status: 'active', joinDate: '2024-02-03', recommendations: 32 },
    { id: 3, name: 'Dr. Emily Davis', email: 'emily.davis@hospital.com', status: 'inactive', joinDate: '2024-03-12', recommendations: 18 },
    { id: 4, name: 'Dr. James Wilson', email: 'james.wilson@hospital.com', status: 'active', joinDate: '2024-01-28', recommendations: 67 }
  ];

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
        <InviteDoctorModal user={user} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Doctors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
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
                <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
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
                <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
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
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-600">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{doctor.name}</h3>
                    <p className="text-sm text-gray-500">{doctor.email}</p>
                    <p className="text-xs text-gray-400">Joined {doctor.joinDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{doctor.recommendations} recommendations</p>
                    <Badge variant={doctor.status === 'active' ? 'default' : 'secondary'}>
                      {doctor.status}
                    </Badge>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
