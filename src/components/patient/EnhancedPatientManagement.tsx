
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientProfileCard } from './PatientProfileCard';
import { ClinicalOutcomeTracker } from '@/components/clinical/ClinicalOutcomeTracker';
import { 
  Search, 
  Plus, 
  Filter, 
  Users, 
  AlertTriangle, 
  Calendar,
  FileText,
  Activity
} from 'lucide-react';

interface Patient {
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
  admission_date?: string;
  severity_score?: number;
}

interface EnhancedPatientManagementProps {
  patients?: Patient[];
  onAddPatient?: () => void;
  onSelectPatient?: (patient: Patient) => void;
}

export const EnhancedPatientManagement: React.FC<EnhancedPatientManagementProps> = ({
  patients = [],
  onAddPatient,
  onSelectPatient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredPatients = patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.medical_record_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUrgencyBadge = (patient: Patient) => {
    if (patient.severity_score && patient.severity_score >= 8) {
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    }
    if (patient.severity_score && patient.severity_score >= 5) {
      return <Badge className="bg-orange-100 text-orange-800">Moderate</Badge>;
    }
    if (patient.allergies && patient.allergies.length > 0) {
      return <Badge className="bg-yellow-100 text-yellow-800">Allergies</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Stable</Badge>;
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    onSelectPatient?.(patient);
  };

  if (selectedPatient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPatient(null)}
              className="mb-4"
            >
              ← Back to Patient List
            </Button>
            <h2 className="text-2xl font-bold">
              {selectedPatient.first_name} {selectedPatient.last_name}
            </h2>
            <p className="text-gray-600">MRN: {selectedPatient.medical_record_number}</p>
          </div>
          {getUrgencyBadge(selectedPatient)}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clinical">Clinical</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PatientProfileCard patient={selectedPatient} />
          </TabsContent>

          <TabsContent value="clinical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Clinical Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Current Status</h4>
                    <div className="space-y-2">
                      {selectedPatient.admission_date && (
                        <p className="text-sm">
                          <span className="font-medium">Admitted:</span> {new Date(selectedPatient.admission_date).toLocaleDateString()}
                        </p>
                      )}
                      {selectedPatient.severity_score && (
                        <p className="text-sm">
                          <span className="font-medium">Severity Score:</span> {selectedPatient.severity_score}/10
                        </p>
                      )}
                      {selectedPatient.isolation_status && selectedPatient.isolation_status !== 'none' && (
                        <p className="text-sm">
                          <span className="font-medium">Isolation:</span> {selectedPatient.isolation_status}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Medical Information</h4>
                    <div className="space-y-2">
                      {selectedPatient.blood_type && (
                        <p className="text-sm">
                          <span className="font-medium">Blood Type:</span> {selectedPatient.blood_type}
                        </p>
                      )}
                      <p className="text-sm">
                        <span className="font-medium">Allergies:</span> {selectedPatient.allergies?.length || 0} documented
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outcomes" className="space-y-6">
            <ClinicalOutcomeTracker 
              prescriptionId="" // This would come from actual prescription data
              patientId={selectedPatient.id}
            />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Medical History</h3>
                  <p className="text-sm">Patient medical history and timeline will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <CardTitle>Patient Management</CardTitle>
            </div>
            {onAddPatient && (
              <Button onClick={onAddPatient} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Patient
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients by name or MRN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="space-y-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Card 
                  key={patient.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-medium text-lg">
                            {patient.first_name} {patient.last_name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>MRN: {patient.medical_record_number}</span>
                            {patient.date_of_birth && (
                              <span>DOB: {new Date(patient.date_of_birth).toLocaleDateString()}</span>
                            )}
                            {patient.gender && <span>{patient.gender}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getUrgencyBadge(patient)}
                        {patient.allergies && patient.allergies.length > 0 && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                    </div>
                    
                    {patient.admission_date && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Admitted: {new Date(patient.admission_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No patients found</h3>
                <p className="text-sm">
                  {searchTerm 
                    ? 'No patients match your search criteria.'
                    : 'No patients have been added yet.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
