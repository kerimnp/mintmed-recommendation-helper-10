
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClinicalOutcomes } from '@/hooks/useClinicalOutcomes';
import { ClinicalOutcomeForm } from './ClinicalOutcomeForm';
import { Plus, TrendingUp, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface ClinicalOutcomeTrackerProps {
  prescriptionId: string;
  patientId: string;
}

export const ClinicalOutcomeTracker: React.FC<ClinicalOutcomeTrackerProps> = ({
  prescriptionId,
  patientId
}) => {
  const [showForm, setShowForm] = useState(false);
  const { data: outcomes, isLoading, error } = useClinicalOutcomes(prescriptionId);

  const getResponseBadgeColor = (response: string) => {
    switch (response) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-orange-100 text-orange-800';
      case 'deterioration': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Loading clinical outcomes...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Failed to load clinical outcomes. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <CardTitle>Clinical Outcome Tracking</CardTitle>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {showForm ? 'Cancel' : 'Record Outcome'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="outcomes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="outcomes">Recorded Outcomes</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="outcomes" className="space-y-4">
              {showForm && (
                <ClinicalOutcomeForm
                  prescriptionId={prescriptionId}
                  patientId={patientId}
                  onSuccess={() => setShowForm(false)}
                />
              )}

              <div className="space-y-4">
                {outcomes && outcomes.length > 0 ? (
                  outcomes.map((outcome) => (
                    <Card key={outcome.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">
                              {format(new Date(outcome.assessment_date), 'PPP')}
                            </span>
                          </div>
                          <Badge className={getResponseBadgeColor(outcome.clinical_response)}>
                            {outcome.clinical_response.charAt(0).toUpperCase() + outcome.clinical_response.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          {outcome.length_of_stay && (
                            <div>
                              <span className="text-sm text-gray-500">Length of Stay</span>
                              <p className="font-medium">{outcome.length_of_stay} days</p>
                            </div>
                          )}
                          {outcome.physician_satisfaction_score && (
                            <div>
                              <span className="text-sm text-gray-500">Physician Satisfaction</span>
                              <p className="font-medium">{outcome.physician_satisfaction_score}/10</p>
                            </div>
                          )}
                          {outcome.patient_satisfaction_score && (
                            <div>
                              <span className="text-sm text-gray-500">Patient Satisfaction</span>
                              <p className="font-medium">{outcome.patient_satisfaction_score}/10</p>
                            </div>
                          )}
                        </div>

                        {outcome.readmission_30_days && (
                          <div className="mb-3">
                            <Badge variant="destructive">30-Day Readmission</Badge>
                          </div>
                        )}

                        {outcome.notes && (
                          <div className="border-t pt-3">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">Notes</span>
                            </div>
                            <p className="text-sm text-gray-600">{outcome.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">No outcomes recorded yet</h3>
                    <p className="text-sm">Record the first clinical outcome to start tracking treatment effectiveness.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {outcomes?.length || 0}
                    </div>
                    <p className="text-sm text-gray-600">Total Assessments</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {outcomes?.filter(o => o.clinical_response === 'excellent' || o.clinical_response === 'good').length || 0}
                    </div>
                    <p className="text-sm text-gray-600">Positive Responses</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-amber-600">
                      {outcomes?.reduce((sum, o) => sum + (o.length_of_stay || 0), 0) / (outcomes?.length || 1) || 0}
                    </div>
                    <p className="text-sm text-gray-600">Avg Length of Stay</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-purple-600">
                      {outcomes?.filter(o => o.readmission_30_days).length || 0}
                    </div>
                    <p className="text-sm text-gray-600">30-Day Readmissions</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-4">Treatment Effectiveness Summary</h4>
                  <div className="space-y-2">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Advanced analytics charts and trending data will be implemented 
                        as we collect more outcome data and integrate with reporting systems.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
