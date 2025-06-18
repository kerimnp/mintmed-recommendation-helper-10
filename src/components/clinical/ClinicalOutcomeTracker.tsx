
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { TrendingUp, Calendar, FileText, Save } from 'lucide-react';

interface ClinicalOutcome {
  id: string;
  prescription_id: string;
  patient_id: string;
  assessment_date: string;
  clinical_response: string;
  symptom_resolution?: any;
  laboratory_improvements?: any;
  culture_clearance?: boolean;
  length_of_stay?: number;
  readmission_30_days?: boolean;
  adverse_drug_reactions?: any;
  drug_level_monitoring?: any;
  cost_effectiveness_score?: number;
  physician_satisfaction_score?: number;
  patient_satisfaction_score?: number;
  notes?: string;
  recorded_by?: string;
  created_at: string;
}

interface ClinicalOutcomeTrackerProps {
  prescriptionId: string;
  patientId: string;
  className?: string;
}

export const ClinicalOutcomeTracker: React.FC<ClinicalOutcomeTrackerProps> = ({
  prescriptionId,
  patientId,
  className = ""
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddingOutcome, setIsAddingOutcome] = useState(false);
  const [newOutcome, setNewOutcome] = useState({
    clinical_response: '',
    culture_clearance: false,
    length_of_stay: '',
    notes: '',
    physician_satisfaction_score: '',
    patient_satisfaction_score: ''
  });

  const { data: outcomes, isLoading } = useQuery({
    queryKey: ['clinical-outcomes', prescriptionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clinical_outcomes')
        .select('*')
        .eq('prescription_id', prescriptionId)
        .order('assessment_date', { ascending: false });

      if (error) throw error;
      return data as ClinicalOutcome[];
    }
  });

  const addOutcomeMutation = useMutation({
    mutationFn: async (outcomeData: any) => {
      const { data, error } = await supabase
        .from('clinical_outcomes')
        .insert([{
          prescription_id: prescriptionId,
          patient_id: patientId,
          assessment_date: new Date().toISOString().split('T')[0],
          recorded_by: user?.id,
          ...outcomeData,
          length_of_stay: outcomeData.length_of_stay ? parseInt(outcomeData.length_of_stay) : null,
          physician_satisfaction_score: outcomeData.physician_satisfaction_score ? parseInt(outcomeData.physician_satisfaction_score) : null,
          patient_satisfaction_score: outcomeData.patient_satisfaction_score ? parseInt(outcomeData.patient_satisfaction_score) : null
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinical-outcomes', prescriptionId] });
      setIsAddingOutcome(false);
      setNewOutcome({
        clinical_response: '',
        culture_clearance: false,
        length_of_stay: '',
        notes: '',
        physician_satisfaction_score: '',
        patient_satisfaction_score: ''
      });
      toast({
        title: "Outcome Recorded",
        description: "Clinical outcome has been successfully recorded.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to record clinical outcome. Please try again.",
        variant: "destructive"
      });
    }
  });

  const getResponseColor = (response: string) => {
    switch (response.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitOutcome = () => {
    if (!newOutcome.clinical_response.trim()) {
      toast({
        title: "Validation Error",
        description: "Clinical response is required.",
        variant: "destructive"
      });
      return;
    }

    addOutcomeMutation.mutate(newOutcome);
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <p className="text-gray-500">Loading clinical outcomes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} />
            Clinical Outcomes
          </div>
          <Button 
            onClick={() => setIsAddingOutcome(true)}
            disabled={isAddingOutcome}
            size="sm"
          >
            Record Outcome
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAddingOutcome && (
          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Record New Outcome</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clinical_response">Clinical Response *</Label>
                <select
                  id="clinical_response"
                  value={newOutcome.clinical_response}
                  onChange={(e) => setNewOutcome(prev => ({ ...prev, clinical_response: e.target.value }))}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="">Select response...</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="length_of_stay">Length of Stay (days)</Label>
                  <Input
                    id="length_of_stay"
                    type="number"
                    value={newOutcome.length_of_stay}
                    onChange={(e) => setNewOutcome(prev => ({ ...prev, length_of_stay: e.target.value }))}
                    placeholder="Days"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="culture_clearance"
                    checked={newOutcome.culture_clearance}
                    onChange={(e) => setNewOutcome(prev => ({ ...prev, culture_clearance: e.target.checked }))}
                  />
                  <Label htmlFor="culture_clearance">Culture Clearance</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="physician_satisfaction">Physician Satisfaction (1-10)</Label>
                  <Input
                    id="physician_satisfaction"
                    type="number"
                    min="1"
                    max="10"
                    value={newOutcome.physician_satisfaction_score}
                    onChange={(e) => setNewOutcome(prev => ({ ...prev, physician_satisfaction_score: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="patient_satisfaction">Patient Satisfaction (1-10)</Label>
                  <Input
                    id="patient_satisfaction"
                    type="number"
                    min="1"
                    max="10"
                    value={newOutcome.patient_satisfaction_score}
                    onChange={(e) => setNewOutcome(prev => ({ ...prev, patient_satisfaction_score: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={newOutcome.notes}
                  onChange={(e) => setNewOutcome(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional observations, side effects, etc."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSubmitOutcome}
                  disabled={addOutcomeMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Outcome
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingOutcome(false)}
                  disabled={addOutcomeMutation.isPending}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {outcomes?.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-600">No clinical outcomes recorded yet</p>
            <p className="text-sm text-gray-500">
              Start tracking patient outcomes to improve treatment protocols
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {outcomes?.map((outcome) => (
              <Card key={outcome.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(outcome.assessment_date).toLocaleDateString()}
                      </span>
                    </div>
                    <Badge className={getResponseColor(outcome.clinical_response)}>
                      {outcome.clinical_response}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    {outcome.length_of_stay && (
                      <div className="text-sm">
                        <span className="text-gray-500">Length of Stay:</span>
                        <span className="ml-1 font-medium">{outcome.length_of_stay} days</span>
                      </div>
                    )}
                    
                    {outcome.culture_clearance !== null && (
                      <div className="text-sm">
                        <span className="text-gray-500">Culture Clearance:</span>
                        <Badge 
                          variant="outline" 
                          className={`ml-1 ${outcome.culture_clearance ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {outcome.culture_clearance ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                    )}
                    
                    {outcome.physician_satisfaction_score && (
                      <div className="text-sm">
                        <span className="text-gray-500">MD Satisfaction:</span>
                        <span className="ml-1 font-medium">{outcome.physician_satisfaction_score}/10</span>
                      </div>
                    )}
                    
                    {outcome.patient_satisfaction_score && (
                      <div className="text-sm">
                        <span className="text-gray-500">Patient Satisfaction:</span>
                        <span className="ml-1 font-medium">{outcome.patient_satisfaction_score}/10</span>
                      </div>
                    )}
                  </div>

                  {outcome.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <FileText size={16} className="text-gray-500 mt-0.5" />
                        <p className="text-sm">{outcome.notes}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
