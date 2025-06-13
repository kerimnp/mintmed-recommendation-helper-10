
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Phone, Mail, MapPin, Calendar, Shield, Edit3 } from 'lucide-react';
import { format, differenceInYears } from 'date-fns';

interface DoctorProfileCardProps {
  doctor: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    specialization?: string;
    hospital_affiliation?: string;
    license_number?: string;
    department_id?: string;
    role?: string;
    is_active?: boolean;
    certification_expiry?: string;
    created_at: string;
  };
  onEdit?: () => void;
  isOwnProfile?: boolean;
}

export const DoctorProfileCard: React.FC<DoctorProfileCardProps> = ({
  doctor,
  onEdit,
  isOwnProfile = false
}) => {
  const initials = `${doctor.first_name?.[0] || ''}${doctor.last_name?.[0] || ''}`;
  const yearsOfService = differenceInYears(new Date(), new Date(doctor.created_at));

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'senior_doctor':
        return 'bg-purple-100 text-purple-800';
      case 'doctor':
        return 'bg-blue-100 text-blue-800';
      case 'resident':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isCertificationExpiring = doctor.certification_expiry && 
    differenceInYears(new Date(doctor.certification_expiry), new Date()) < 1;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">
                Dr. {doctor.first_name} {doctor.last_name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                {doctor.role && (
                  <Badge className={getRoleBadgeColor(doctor.role)}>
                    {doctor.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                )}
                {doctor.is_active ? (
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                )}
                {isCertificationExpiring && (
                  <Badge className="bg-orange-100 text-orange-800">
                    Certification Expiring
                  </Badge>
                )}
              </div>
              {doctor.specialization && (
                <p className="text-sm text-gray-600 mt-1">
                  {doctor.specialization}
                </p>
              )}
            </div>
          </div>
          {(onEdit && isOwnProfile) && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            Contact Information
          </h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Email:</span>
              <span className="text-sm text-gray-600">{doctor.email}</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-500" />
            Professional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctor.hospital_affiliation && (
              <div>
                <span className="text-sm font-medium">Hospital:</span>
                <p className="text-sm text-gray-600">{doctor.hospital_affiliation}</p>
              </div>
            )}
            {doctor.license_number && (
              <div>
                <span className="text-sm font-medium">License Number:</span>
                <p className="text-sm text-gray-600">{doctor.license_number}</p>
              </div>
            )}
            <div>
              <span className="text-sm font-medium">Years of Service:</span>
              <p className="text-sm text-gray-600">{yearsOfService} years</p>
            </div>
            {doctor.certification_expiry && (
              <div>
                <span className="text-sm font-medium">Certification Expires:</span>
                <p className={`text-sm ${isCertificationExpiring ? 'text-orange-600' : 'text-gray-600'}`}>
                  {format(new Date(doctor.certification_expiry), 'MMMM dd, yyyy')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h4 className="font-medium mb-3">Quick Stats</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">--</div>
              <div className="text-xs text-blue-600">Patients</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">--</div>
              <div className="text-xs text-green-600">Prescriptions</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">--</div>
              <div className="text-xs text-purple-600">Success Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
