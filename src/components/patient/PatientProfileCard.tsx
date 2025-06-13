
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Phone, Mail, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { format, differenceInYears } from 'date-fns';

interface PatientProfileCardProps {
  patient: {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender?: string;
    contact_phone?: string;
    contact_email?: string;
    address?: string;
    blood_type?: string;
    allergies?: Array<{ substance: string; severity: string; reaction: string }>;
    medical_record_number?: string;
    isolation_status?: string;
  };
  onEdit?: () => void;
}

export const PatientProfileCard: React.FC<PatientProfileCardProps> = ({
  patient,
  onEdit
}) => {
  const age = differenceInYears(new Date(), new Date(patient.date_of_birth));
  const initials = `${patient.first_name?.[0] || ''}${patient.last_name?.[0] || ''}`;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe':
      case 'life-threatening':
        return 'bg-red-100 text-red-800';
      case 'moderate':
        return 'bg-orange-100 text-orange-800';
      case 'mild':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
                {patient.first_name} {patient.last_name}
              </CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-600">
                  Age: {age} years
                </span>
                {patient.gender && (
                  <span className="text-sm text-gray-600">
                    Gender: {patient.gender}
                  </span>
                )}
                {patient.blood_type && (
                  <Badge variant="outline">
                    {patient.blood_type}
                  </Badge>
                )}
              </div>
              {patient.medical_record_number && (
                <p className="text-sm text-gray-500 mt-1">
                  MRN: {patient.medical_record_number}
                </p>
              )}
            </div>
          </div>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div>
          <h4 className="font-medium mb-3">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patient.contact_phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{patient.contact_phone}</span>
              </div>
            )}
            {patient.contact_email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{patient.contact_email}</span>
              </div>
            )}
            {patient.address && (
              <div className="flex items-start gap-2 md:col-span-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="text-sm">{patient.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <h4 className="font-medium mb-2">Date of Birth</h4>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {format(new Date(patient.date_of_birth), 'MMMM dd, yyyy')}
            </span>
          </div>
        </div>

        {/* Allergies */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h4 className="font-medium text-red-700">Allergies</h4>
            </div>
            <div className="space-y-2">
              {patient.allergies.map((allergy, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div>
                    <span className="font-medium text-red-800">{allergy.substance}</span>
                    {allergy.reaction && (
                      <p className="text-sm text-red-600 mt-1">{allergy.reaction}</p>
                    )}
                  </div>
                  <Badge className={getSeverityColor(allergy.severity)}>
                    {allergy.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Isolation Status */}
        {patient.isolation_status && patient.isolation_status !== 'none' && (
          <div>
            <h4 className="font-medium mb-2">Isolation Status</h4>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {patient.isolation_status.toUpperCase()}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
