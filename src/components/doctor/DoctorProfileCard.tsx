
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Mail, MapPin, Calendar, Shield, Edit3, Stethoscope, Building, Award } from 'lucide-react';
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
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'senior_doctor':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'doctor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'resident':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const isCertificationExpiring = doctor.certification_expiry && 
    differenceInYears(new Date(doctor.certification_expiry), new Date()) < 1;

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-medical-primary to-blue-600 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Dr. {doctor.first_name} {doctor.last_name}
                </CardTitle>
                <div className="flex items-center gap-3 flex-wrap">
                  {doctor.role && (
                    <Badge className={`${getRoleBadgeColor(doctor.role)} font-medium`}>
                      {doctor.role.replace('_', ' ').toUpperCase()}
                    </Badge>
                  )}
                  {doctor.is_active ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      Inactive
                    </Badge>
                  )}
                  {isCertificationExpiring && (
                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      <Award className="h-3 w-3 mr-1" />
                      Certification Expiring
                    </Badge>
                  )}
                </div>
                {doctor.specialization && (
                  <div className="flex items-center gap-2 text-lg text-blue-700 dark:text-blue-300 font-medium">
                    <Stethoscope className="h-5 w-5" />
                    {doctor.specialization}
                  </div>
                )}
                {doctor.hospital_affiliation && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Building className="h-4 w-4" />
                    {doctor.hospital_affiliation}
                  </div>
                )}
              </div>
            </div>
            {(onEdit && isOwnProfile) && (
              <Button variant="outline" size="sm" onClick={onEdit} className="shrink-0">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
              <Mail className="h-5 w-5 text-blue-600" />
              Contact Information
            </h4>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">Email:</span>
                  <span className="text-sm text-gray-900 dark:text-gray-100 font-mono bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
                    {doctor.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
              <Shield className="h-5 w-5 text-green-600" />
              Professional Information
            </h4>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctor.hospital_affiliation && (
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Hospital:</span>
                    <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
                      {doctor.hospital_affiliation}
                    </p>
                  </div>
                )}
                {doctor.license_number && (
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">License Number:</span>
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-mono bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
                      {doctor.license_number}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Years of Service:</span>
                  <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
                    {yearsOfService} years
                  </p>
                </div>
                {doctor.certification_expiry && (
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Certification Expires:</span>
                    <p className={`text-sm px-3 py-2 rounded ${isCertificationExpiring ? 'text-orange-800 bg-orange-50 dark:text-orange-200 dark:bg-orange-900' : 'text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700'}`}>
                      {format(new Date(doctor.certification_expiry), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Stats */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-gray-900 dark:text-gray-100">Professional Stats</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">--</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">Active Patients</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-green-700 dark:text-green-300">--</div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">Total Prescriptions</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">--</div>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
