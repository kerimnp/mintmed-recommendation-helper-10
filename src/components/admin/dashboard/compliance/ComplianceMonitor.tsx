
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText,
  Settings,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface ComplianceMetric {
  id: string;
  name: string;
  description: string;
  category: 'hipaa' | 'fda' | 'cdc' | 'internal';
  status: 'compliant' | 'warning' | 'non-compliant';
  score: number;
  lastChecked: string;
  nextCheck: string;
  requirements: string[];
  actions: string[];
}

const complianceMetrics: ComplianceMetric[] = [
  {
    id: 'hipaa-audit',
    name: 'HIPAA Audit Trail',
    description: 'Comprehensive audit logging for all patient data access',
    category: 'hipaa',
    status: 'compliant',
    score: 95,
    lastChecked: '2024-01-15T10:00:00Z',
    nextCheck: '2024-01-16T10:00:00Z',
    requirements: [
      'All patient data access must be logged',
      'Audit logs must be tamper-proof',
      'Regular audit log reviews required'
    ],
    actions: []
  },
  {
    id: 'data-encryption',
    name: 'Data Encryption Standards',
    description: 'End-to-end encryption for all sensitive data',
    category: 'hipaa',
    status: 'warning',
    score: 85,
    lastChecked: '2024-01-15T09:30:00Z',
    nextCheck: '2024-01-15T18:00:00Z',
    requirements: [
      'AES-256 encryption for data at rest',
      'TLS 1.3 for data in transit',
      'Key rotation every 90 days'
    ],
    actions: [
      'Update key rotation schedule',
      'Verify all endpoints use TLS 1.3'
    ]
  },
  {
    id: 'clinical-validation',
    name: 'Clinical Decision Validation',
    description: 'Evidence-based validation of all clinical recommendations',
    category: 'fda',
    status: 'compliant',
    score: 92,
    lastChecked: '2024-01-15T08:00:00Z',
    nextCheck: '2024-01-16T08:00:00Z',
    requirements: [
      'All recommendations must cite evidence sources',
      'Clinical override tracking required',
      'Regular validation against latest guidelines'
    ],
    actions: []
  }
];

export const ComplianceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<ComplianceMetric[]>(complianceMetrics);
  const [selectedMetric, setSelectedMetric] = useState<ComplianceMetric | null>(null);
  const { toast } = useToast();

  const overallScore = Math.round(
    metrics.reduce((sum, metric) => sum + metric.score, 0) / metrics.length
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'non-compliant': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'non-compliant': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleRunCompleteCheck = () => {
    toast({
      title: "Compliance Check Started",
      description: "Running comprehensive compliance validation across all systems...",
    });
    
    // Simulate check completion
    setTimeout(() => {
      toast({
        title: "Compliance Check Complete",
        description: "All compliance metrics have been updated successfully.",
      });
    }, 3000);
  };

  const handleRemediate = (metricId: string) => {
    toast({
      title: "Remediation Started",
      description: "Initiating automated compliance remediation procedures...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Compliance Monitor</h2>
          <Badge 
            className={`${overallScore >= 90 ? 'bg-green-600' : overallScore >= 80 ? 'bg-yellow-600' : 'bg-red-600'}`}
            variant="default"
          >
            {overallScore}% Compliant
          </Badge>
        </div>
        
        <Button onClick={handleRunCompleteCheck}>
          <Shield className="h-4 w-4 mr-2" />
          Run Complete Check
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Overall Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{overallScore}%</div>
            <Progress value={overallScore} className="mb-2" />
            <p className="text-sm text-gray-600">
              {metrics.filter(m => m.status === 'compliant').length} of {metrics.length} metrics compliant
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2 text-yellow-600">
              {metrics.filter(m => m.status === 'warning').length}
            </div>
            <p className="text-sm text-gray-600">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Next Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold mb-2">
              {new Date().toLocaleDateString()}
            </div>
            <p className="text-sm text-gray-600">
              Automated daily compliance scan
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.map(metric => (
              <Card key={metric.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(metric.status)}
                        <h4 className="font-medium">{metric.name}</h4>
                        <Badge className={getStatusColor(metric.status)} variant="default">
                          {metric.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{metric.category.toUpperCase()}</Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{metric.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Score: {metric.score}%</span>
                        <span>Last Check: {new Date(metric.lastChecked).toLocaleString()}</span>
                        <span>Next: {new Date(metric.nextCheck).toLocaleString()}</span>
                      </div>

                      {metric.actions.length > 0 && (
                        <div className="mt-2">
                          <h5 className="text-sm font-semibold text-yellow-700">Required Actions:</h5>
                          <ul className="list-disc list-inside text-xs text-yellow-600 ml-2">
                            {metric.actions.map((action, index) => (
                              <li key={index}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedMetric(metric)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      {metric.actions.length > 0 && (
                        <Button 
                          size="sm"
                          onClick={() => handleRemediate(metric.id)}
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Remediate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedMetric && (
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle>Compliance Requirements: {selectedMetric.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Requirements:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedMetric.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Category:</strong> {selectedMetric.category.toUpperCase()}
                </div>
                <div>
                  <strong>Score:</strong> {selectedMetric.score}%
                </div>
                <div>
                  <strong>Status:</strong> {selectedMetric.status}
                </div>
                <div>
                  <strong>Last Checked:</strong> {new Date(selectedMetric.lastChecked).toLocaleString()}
                </div>
              </div>
            </div>
            
            <Button 
              className="mt-4" 
              variant="outline" 
              onClick={() => setSelectedMetric(null)}
            >
              Close Details
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
