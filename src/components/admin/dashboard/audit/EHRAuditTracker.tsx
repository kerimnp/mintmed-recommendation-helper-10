
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Database, 
  FileText, 
  Clock, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  User,
  Server
} from 'lucide-react';

interface EHRAuditEvent {
  id: string;
  operation_type: string;
  resource_type?: string;
  resource_count: number;
  status: string;
  error_message?: string;
  duration_ms?: number;
  metadata?: any;
  created_at: string;
  ehr_systems?: { name: string; system_type: string };
}

interface FHIRResource {
  id: string;
  resource_type: string;
  resource_id: string;
  version_id?: string;
  last_updated: string;
  patient_id?: string;
  created_at: string;
}

interface AuditMetrics {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  totalResources: number;
  avgDuration: number;
}

export const EHRAuditTracker: React.FC = () => {
  const [auditEvents, setAuditEvents] = useState<EHRAuditEvent[]>([]);
  const [fhirResources, setFhirResources] = useState<FHIRResource[]>([]);
  const [metrics, setMetrics] = useState<AuditMetrics>({
    totalOperations: 0,
    successfulOperations: 0,
    failedOperations: 0,
    totalResources: 0,
    avgDuration: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAuditData();
  }, []);

  const fetchAuditData = async () => {
    try {
      // Fetch EHR integration logs with system info
      const { data: logsData, error: logsError } = await supabase
        .from('ehr_integration_logs')
        .select(`
          *,
          ehr_systems:ehr_system_id(name, system_type)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (logsError) throw logsError;

      // Fetch FHIR resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('fhir_resources')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (resourcesError) throw resourcesError;

      setAuditEvents(logsData || []);
      setFhirResources(resourcesData || []);

      // Calculate metrics
      if (logsData) {
        const successCount = logsData.filter(log => log.status === 'success').length;
        const failedCount = logsData.filter(log => log.status === 'failed').length;
        const totalResources = logsData.reduce((sum, log) => sum + (log.resource_count || 0), 0);
        const avgDuration = logsData.reduce((sum, log) => sum + (log.duration_ms || 0), 0) / logsData.length;

        setMetrics({
          totalOperations: logsData.length,
          successfulOperations: successCount,
          failedOperations: failedCount,
          totalResources,
          avgDuration: Math.round(avgDuration)
        });
      }
    } catch (error) {
      console.error('Error fetching audit data:', error);
      toast({
        title: "Error",
        description: "Failed to load audit data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-600';
      case 'partial': return 'bg-yellow-600';
      case 'failed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold">EHR Audit Trail</h3>
        <Badge variant="outline" className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          FHIR Compliant
        </Badge>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Operations</p>
                <p className="text-2xl font-bold">{metrics.totalOperations}</p>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-green-600">{metrics.successfulOperations}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{metrics.failedOperations}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resources</p>
                <p className="text-2xl font-bold">{metrics.totalResources}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold">{metrics.avgDuration}ms</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* EHR Integration Audit Events */}
      <Card>
        <CardHeader>
          <CardTitle>EHR Integration Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditEvents.map(event => (
              <Card key={event.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(event.status)}
                        <h4 className="font-medium">
                          {event.operation_type.replace(/_/g, ' ').toUpperCase()}
                        </h4>
                        <Badge className={getStatusColor(event.status)} variant="default">
                          {event.status.toUpperCase()}
                        </Badge>
                        {event.ehr_systems && (
                          <Badge variant="outline">
                            {event.ehr_systems.system_type.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Server className="h-3 w-3" />
                          {event.ehr_systems?.name || 'Unknown System'}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {event.resource_type || 'Multiple'} ({event.resource_count} resources)
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.duration_ms}ms
                        </div>
                        <div>
                          {new Date(event.created_at).toLocaleString()}
                        </div>
                      </div>

                      {event.error_message && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                          <strong>Error:</strong> {event.error_message}
                        </div>
                      )}

                      {event.metadata && Object.keys(event.metadata).length > 0 && (
                        <div className="mt-2">
                          <details className="text-sm">
                            <summary className="cursor-pointer font-medium">Metadata</summary>
                            <pre className="mt-1 p-2 bg-gray-50 border rounded overflow-auto text-xs">
                              {JSON.stringify(event.metadata, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FHIR Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Recent FHIR Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fhirResources.map(resource => (
              <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{resource.resource_type}</Badge>
                  <div>
                    <div className="font-medium">Resource ID: {resource.resource_id}</div>
                    <div className="text-sm text-gray-600">
                      {resource.version_id && `Version: ${resource.version_id} • `}
                      {resource.patient_id && `Patient: ${resource.patient_id} • `}
                      Updated: {new Date(resource.last_updated).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(resource.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
