
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { checkInteractions } from '../utils/interactionUtils';
import { SeverityBadge } from './SeverityBadge';
import { antibioticsList, commonMedications } from '../data/medicationsData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, AlertCircle, Check } from 'lucide-react';

export interface InteractionResultsProps {
  selectedDrugs: string[];
}

export const InteractionResults: React.FC<InteractionResultsProps> = ({ selectedDrugs }) => {
  const allDrugs = [...antibioticsList, ...commonMedications];
  const drugNames = selectedDrugs.map(drugId => {
    const drug = allDrugs.find(d => d.id === drugId);
    return drug ? drug.name : drugId;
  });

  const interactions = checkInteractions(selectedDrugs);
  
  if (selectedDrugs.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interaction Results</CardTitle>
          <CardDescription>Select at least two medications to view potential interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Not enough medications selected</AlertTitle>
            <AlertDescription>Please select at least two medications to check for interactions.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (interactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interaction Results</CardTitle>
          <CardDescription>Potential interactions between selected medications</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="default" className="bg-green-50 text-green-800 dark:bg-green-950/20 dark:text-green-300 border-green-200 dark:border-green-800">
            <Check className="h-4 w-4" />
            <AlertTitle>No significant interactions found</AlertTitle>
            <AlertDescription>
              No significant interactions were found between {drugNames.join(', ')}.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interaction Results</CardTitle>
        <CardDescription>Potential interactions between selected medications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {interactions.map((interaction, index) => (
          <Alert key={index} className="mb-4">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>
              {interaction.drug1} and {interaction.drug2}
            </AlertTitle>
            <AlertDescription>
              {interaction.description}
              <div className="mt-2">
                Severity: <SeverityBadge severity={interaction.severity} />
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};
