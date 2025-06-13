
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AntibioticRecommendation } from '@/utils/antibioticRecommendations/types';
import { PrimaryRecommendation } from '@/components/AntibioticRecommendationSections/PrimaryRecommendation';
import { AlternativesList } from '@/components/AntibioticRecommendationSections/AlternativesList';
import { ClinicalRationale } from '@/components/AntibioticRecommendationSections/ClinicalRationale';
import { DoseCalculations } from '@/components/AntibioticRecommendationSections/DoseCalculations';
import { Precautions } from '@/components/AntibioticRecommendationSections/Precautions';
import { DrugFormularySelector } from '@/components/clinical/DrugFormularySelector';
import { ClinicalOutcomeTracker } from '@/components/clinical/ClinicalOutcomeTracker';
import { DrugInteractionAlerts } from '@/components/clinical/DrugInteractionAlerts';
import { Stethoscope, Database, AlertTriangle, TrendingUp } from 'lucide-react';

interface EnhancedAntibioticRecommendationProps {
  recommendation: AntibioticRecommendation;
  patientId?: string;
  prescriptionId?: string;
  className?: string;
}

export const EnhancedAntibioticRecommendation: React.FC<EnhancedAntibioticRecommendationProps> = ({
  recommendation,
  patientId,
  prescriptionId,
  className = ""
}) => {
  const [selectedFormulation, setSelectedFormulation] = useState(null);

  const handleSelectAlternative = (index: number) => {
    console.log('Selected alternative:', index, recommendation.alternatives[index]);
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <Tabs defaultValue="recommendation" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="recommendation" className="flex items-center gap-2">
              <Stethoscope size={16} />
              Recommendation
            </TabsTrigger>
            <TabsTrigger value="formulary" className="flex items-center gap-2">
              <Database size={16} />
              Formulary
            </TabsTrigger>
            <TabsTrigger value="interactions" className="flex items-center gap-2">
              <AlertTriangle size={16} />
              Interactions
            </TabsTrigger>
            <TabsTrigger value="outcomes" className="flex items-center gap-2">
              <TrendingUp size={16} />
              Outcomes
            </TabsTrigger>
            <TabsTrigger value="monitoring">
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendation" className="space-y-6 mt-6">
            <PrimaryRecommendation 
              recommendation={recommendation.primaryRecommendation}
              calculations={recommendation.calculations}
            />
            
            <AlternativesList 
              alternatives={recommendation.alternatives}
              onSelectAlternative={handleSelectAlternative}
            />
            
            <ClinicalRationale 
              rationale={recommendation.rationale || recommendation.reasoning}
            />
            
            <DoseCalculations calculations={recommendation.calculations} />
            
            <Precautions precautions={recommendation.precautions} />
          </TabsContent>

          <TabsContent value="formulary" className="mt-6">
            <DrugFormularySelector
              selectedDrug={recommendation.primaryRecommendation.name}
              onDrugSelect={setSelectedFormulation}
            />
          </TabsContent>

          <TabsContent value="interactions" className="mt-6">
            <DrugInteractionAlerts 
              prescriptionId={prescriptionId}
              selectedDrug={recommendation.primaryRecommendation.name}
            />
          </TabsContent>

          <TabsContent value="outcomes" className="mt-6">
            {patientId && prescriptionId ? (
              <ClinicalOutcomeTracker
                prescriptionId={prescriptionId}
                patientId={patientId}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                Patient and prescription IDs required for outcome tracking
              </div>
            )}
          </TabsContent>

          <TabsContent value="monitoring" className="mt-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Therapeutic Drug Monitoring</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <strong>Monitoring Recommendations:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Monitor renal function (creatinine, BUN) every 2-3 days</li>
                      <li>Check drug levels for vancomycin and aminoglycosides</li>
                      <li>Watch for signs of toxicity or adverse reactions</li>
                      <li>Assess clinical response within 48-72 hours</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Therapeutic drug monitoring features will be enhanced 
                      as we collect more patient-specific data and integrate with laboratory systems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
