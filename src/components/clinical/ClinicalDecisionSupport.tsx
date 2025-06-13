
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText,
  Activity,
  Shield,
  TrendingUp
} from 'lucide-react';

interface ClinicalDecisionSupportProps {
  patientData?: any;
  onRecommendationSelect?: (recommendation: any) => void;
}

export const ClinicalDecisionSupport: React.FC<ClinicalDecisionSupportProps> = ({
  patientData,
  onRecommendationSelect
}) => {
  const [activeTab, setActiveTab] = useState("guidelines");

  const clinicalGuidelines = [
    {
      id: 1,
      title: "Community-Acquired Pneumonia Guidelines",
      organization: "IDSA/ATS",
      lastUpdated: "2024-01-15",
      status: "current",
      adherenceScore: 98
    },
    {
      id: 2,
      title: "Urinary Tract Infection Management",
      organization: "IDSA",
      lastUpdated: "2023-12-01",
      status: "current",
      adherenceScore: 95
    },
    {
      id: 3,
      title: "Surgical Site Infection Prevention",
      organization: "CDC/SHEA",
      lastUpdated: "2024-02-10",
      status: "current",
      adherenceScore: 92
    }
  ];

  const riskAssessments = [
    {
      type: "Resistance Risk",
      score: 23,
      level: "Low",
      factors: ["No recent antibiotic use", "No hospitalization in 90 days"],
      color: "bg-green-500"
    },
    {
      type: "Drug Interaction Risk",
      score: 67,
      level: "Moderate",
      factors: ["Currently on warfarin", "History of QT prolongation"],
      color: "bg-yellow-500"
    },
    {
      type: "Adverse Event Risk",
      score: 15,
      level: "Low",
      factors: ["Normal renal function", "No known allergies"],
      color: "bg-green-500"
    }
  ];

  const recommendations = [
    {
      id: 1,
      antibiotic: "Amoxicillin/Clavulanate",
      dose: "875/125mg BID",
      duration: "7 days",
      confidence: 92,
      evidenceLevel: "A",
      reasoning: "First-line therapy for community-acquired pneumonia in outpatient setting"
    },
    {
      id: 2,
      antibiotic: "Azithromycin",
      dose: "500mg daily",
      duration: "5 days",
      confidence: 88,
      evidenceLevel: "A",
      reasoning: "Alternative for patients with beta-lactam allergy"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Clinical Decision Support
        </h2>
        <Badge className="bg-medical-primary text-white">
          <Activity className="h-4 w-4 mr-1" />
          Real-time Analysis
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="guidelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Active Clinical Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {clinicalGuidelines.map((guideline) => (
                <div key={guideline.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{guideline.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {guideline.organization} • Updated {guideline.lastUpdated}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {guideline.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Adherence Score</span>
                      <span>{guideline.adherenceScore}%</span>
                    </div>
                    <Progress value={guideline.adherenceScore} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-assessment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {riskAssessments.map((risk, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{risk.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{risk.score}</span>
                    <Badge className={`${risk.color} text-white`}>
                      {risk.level}
                    </Badge>
                  </div>
                  <Progress value={risk.score} className="h-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Contributing Factors:</p>
                    {risk.factors.map((factor, idx) => (
                      <p key={idx} className="text-xs text-gray-600 dark:text-gray-400">
                        • {factor}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Consider additional precautions for patients with moderate or high risk scores.
              Review contraindications and monitoring requirements carefully.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Evidence-Based Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-lg">{rec.antibiotic}</h4>
                      <p className="text-medical-primary font-medium">
                        {rec.dose} × {rec.duration}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className="bg-blue-100 text-blue-800">
                        Evidence Level {rec.evidenceLevel}
                      </Badge>
                      <div className="text-sm text-gray-600">
                        Confidence: {rec.confidence}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                    <p className="text-sm">{rec.reasoning}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => onRecommendationSelect?.(rec)}
                      className="bg-medical-primary hover:bg-medical-primary/90"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept Recommendation
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Therapy Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Treatment Duration</span>
                    <span className="text-sm font-medium">Day 3 of 7</span>
                  </div>
                  <Progress value={43} className="h-2" />
                </div>
                
                <div className="border-t pt-3 space-y-2">
                  <h5 className="font-medium">Next Monitoring Points:</h5>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Clinical response assessment (Day 3)</li>
                    <li>• Culture results review (Day 2-3)</li>
                    <li>• Renal function check (Day 5)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Guideline Adherence</span>
                    <span className="text-sm font-medium">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Clinical Success Rate</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-500">
                    Based on last 30 days of prescriptions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
