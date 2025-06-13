import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useClinicalOutcomes, useCreateClinicalOutcome } from '@/hooks/useClinicalOutcomes';
import { ClinicalOutcome } from '@/utils/antibioticRecommendations/types/databaseTypes';
import { useAuth } from '@/contexts/AuthContext';
import { Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

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
  const { data: outcomes, isLoading } = useClinicalOutcomes(prescriptionId);
  const createOutcome = useCreateClinicalOutcome();

  const [newOutcome, setNewOutcome] = useState({
    clinical_response: '',
    culture_clearance: false,
    length_of_stay: '',
    readmission_30_days: false,
    physician_satisfaction_score: '',
    patient_satisfaction_score: '',
    notes: '',
  });

  const handleSubmitOutcome = async () => {
    if (!newOutcome.clinical_response) return;

    const outcomeData = {
      prescription_id: prescriptionId,
      patient_id: patientId,
      assessment_date: new Date().toISOString().split('T')[0],
      clinical_response: newOutcome.clinical_response as ClinicalOutcome['clinical_response'],
      culture_clearance: newOutcome.culture_clearance,
      length_of_stay: newOutcome.length_of_stay ? parseInt(newOutcome.length_of_stay) : null,
      readmission_30_days: newOutcome.readmission_30_days,
      physician_satisfaction_score: newOutcome.physician_satisfaction_score ? 
        parseInt(newOutcome.physician_satisfaction_score) : null,
      patient_satisfaction_score: newOutcome.patient_satisfaction_score ? 
        parseInt(newOutcome.patient_satisfaction_score) : null,
      notes: newOutcome.notes || null,
      recorded_by: user?.id,
    };

    await createOutcome.mutateAsync(outcomeData);
    
    // Reset form
    setNewOutcome({
      clinical_response: '',
      culture_clearance: false,
      length_of_stay: '',
      readmission_30_days: false,
      physician_satisfaction_score: '',
      patient_satisfaction_score: '',
      notes: '',
    });
  };

  const getResponseIcon = (response: string) => {
    switch (response) {
      case 'complete': return <CheckCircle className="text-green-600" size={16} />;
      case 'partial': return <TrendingUp className="text-yellow-600" size={16} />;
      case 'no_response': return <Activity className="text-orange-600" size={16} />;
      case 'worsened': return <AlertTriangle className="text-red-600" size={16} />;
      default: return null;
    }
  };

  const getResponseColor = (response: string) => {
    switch (response) {
      case 'complete': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'no_response': return 'bg-orange-100 text-orange-800';
      case 'worsened': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity size={20} />
          Clinical Outcomes Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Outcomes */}
        {outcomes && outcomes.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Previous Assessments</h3>
            {outcomes.map((outcome) => (
              <div key={outcome.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getResponseIcon(outcome.clinical_response)}
                    <Badge className={getResponseColor(outcome.clinical_response)}>
                      {outcome.clinical_response.replace('_', ' ')}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(outcome.assessment_date).toLocaleDateString()}
                  </span>
                </div>
                {outcome.notes && (
                  <p className="text-sm text-gray-600 mt-2">{outcome.notes}</p>
                )}
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  {outcome.culture_clearance && (
                    <span>✓ Culture cleared</span>
                  )}
                  {outcome.length_of_stay && (
                    <span>LOS: {outcome.length_of_stay} days</span>
                  )}
                  {outcome.physician_satisfaction_score && (
                    <span>MD Satisfaction: {outcome.physician_satisfaction_score}/10</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Outcome Form */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Record New Assessment</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clinical_response">Clinical Response</Label>
              <Select 
                value={newOutcome.clinical_response} 
                onValueChange={(value) => setNewOutcome(prev => ({ ...prev, clinical_response: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select response" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">Complete Response</SelectItem>
                  <SelectItem value="partial">Partial Response</SelectItem>
                  <SelectItem value="no_response">No Response</SelectItem>
                  <SelectItem value="worsened">Worsened</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                placeholder="1-10"
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
                placeholder="1-10"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="culture_clearance"
                checked={newOutcome.culture_clearance}
                onCheckedChange={(checked) => setNewOutcome(prev => ({ ...prev, culture_clearance: checked }))}
              />
              <Label htmlFor="culture_clearance">Culture Clearance</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="readmission"
                checked={newOutcome.readmission_30_days}
                onCheckedChange={(checked) => setNewOutcome(prev => ({ ...prev, readmission_30_days: checked }))}
              />
              <Label htmlFor="readmission">30-day Readmission</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Clinical Notes</Label>
            <Textarea
              id="notes"
              value={newOutcome.notes}
              onChange={(e) => setNewOutcome(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional clinical observations..."
              rows={3}
            />
          </div>

          <Button 
            onClick={handleSubmitOutcome}
            disabled={!newOutcome.clinical_response || createOutcome.isPending}
            className="w-full"
          >
            {createOutcome.isPending ? 'Recording...' : 'Record Clinical Outcome'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
