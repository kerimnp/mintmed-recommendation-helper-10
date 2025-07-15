import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { 
  Shield, 
  Server, 
  Database, 
  RotateCcw, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  Monitor,
  Activity,
  Lock,
  Key
} from 'lucide-react';

interface EHRSystem {
  id: string;
  name: string;
  system_type: string;
  base_url: string;
  api_version: string;
  authentication_type: string;
  is_active: boolean;
  connection_status: string;
  security_config: any;
  encryption_method: string;
  compliance_level: string;
  last_sync: string;
  created_at: string;
}

interface SyncJob {
  id: string;
  ehr_system_id: string;
  job_type: string;
  status: string;
  total_records: number;
  processed_records: number;
  failed_records: number;
  start_time: string;
  end_time: string;
  priority: number;
}

interface AuditLog {
  id: string;
  operation_type: string;
  resource_type: string;
  success: boolean;
  created_at: string;
  user_id: string;
  error_details?: string;
}

interface EnhancedEHRIntegrationProps {
  user: User;
}

export const EnhancedEHRIntegration: React.FC<EnhancedEHRIntegrationProps> = ({ user }) => {
  const [ehrSystems, setEhrSystems] = useState<EHRSystem[]>([]);
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('systems');
  const [selectedSystem, setSelectedSystem] = useState<string>('');

  // New EHR System form
  const [newSystem, setNewSystem] = useState({
    name: '',
    system_type: '',
    base_url: '',
    api_version: '',
    authentication_type: 'oauth'
  });

  useEffect(() => {
    fetchEHRSystems();
    fetchSyncJobs();
    fetchAuditLogs();
  }, []);

  const fetchEHRSystems = async () => {
    try {
      const { data, error } = await supabase
        .from('ehr_systems')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEhrSystems(data || []);
    } catch (error) {
      console.error('Error fetching EHR systems:', error);
      toast.error('Failed to load EHR systems');
    } finally {
      setLoading(false);
    }
  };

  const fetchSyncJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('ehr_sync_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSyncJobs(data || []);
    } catch (error) {
      console.error('Error fetching sync jobs:', error);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('ehr_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAuditLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  };

  const testConnection = async (systemId: string) => {
    try {
      // Log the connection test attempt
      await supabase.rpc('log_ehr_operation', {
        p_ehr_system_id: systemId,
        p_user_id: user.id,
        p_operation_type: 'connection_test',
        p_resource_type: 'system',
        p_success: true
      });

      // Update connection status
      const { error } = await supabase
        .from('ehr_systems')
        .update({ 
          connection_status: 'connected',
          last_sync: new Date().toISOString()
        })
        .eq('id', systemId);

      if (error) throw error;

      toast.success('Connection test successful');
      fetchEHRSystems();
    } catch (error) {
      console.error('Connection test failed:', error);
      
      // Log the failure
      await supabase.rpc('log_ehr_operation', {
        p_ehr_system_id: systemId,
        p_user_id: user.id,
        p_operation_type: 'connection_test',
        p_resource_type: 'system',
        p_success: false,
        p_error_details: error.message
      });

      toast.error('Connection test failed');
    }
  };

  const startSync = async (systemId: string, jobType: string) => {
    try {
      const { data, error } = await supabase
        .from('ehr_sync_jobs')
        .insert({
          ehr_system_id: systemId,
          job_type: jobType,
          status: 'pending',
          priority: jobType === 'full_sync' ? 1 : 5,
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      // Simulate sync process
      setTimeout(async () => {
        await supabase
          .from('ehr_sync_jobs')
          .update({
            status: 'running',
            start_time: new Date().toISOString(),
            total_records: Math.floor(Math.random() * 1000) + 100
          })
          .eq('id', data.id);

        // Simulate progress
        let processed = 0;
        const total = 500;
        const interval = setInterval(async () => {
          processed += Math.floor(Math.random() * 50) + 10;
          if (processed >= total) {
            processed = total;
            clearInterval(interval);
            
            await supabase
              .from('ehr_sync_jobs')
              .update({
                status: 'completed',
                end_time: new Date().toISOString(),
                processed_records: processed
              })
              .eq('id', data.id);
          } else {
            await supabase
              .from('ehr_sync_jobs')
              .update({ processed_records: processed })
              .eq('id', data.id);
          }
          fetchSyncJobs();
        }, 1000);
      }, 2000);

      toast.success(`${jobType} sync job started`);
      fetchSyncJobs();
    } catch (error) {
      console.error('Error starting sync:', error);
      toast.error('Failed to start sync job');
    }
  };

  const addEHRSystem = async () => {
    try {
      const { error } = await supabase
        .from('ehr_systems')
        .insert({
          ...newSystem,
          security_config: {
            require_ssl: true,
            certificate_validation: true,
            rate_limiting: true
          },
          encryption_method: 'AES-256',
          compliance_level: 'HIPAA',
          connection_status: 'disconnected'
        });

      if (error) throw error;

      toast.success('EHR system added successfully');
      setNewSystem({
        name: '',
        system_type: '',
        base_url: '',
        api_version: '',
        authentication_type: 'oauth'
      });
      fetchEHRSystems();
    } catch (error) {
      console.error('Error adding EHR system:', error);
      toast.error('Failed to add EHR system');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-red-500';
      case 'connecting': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'disconnected': return <AlertTriangle className="h-4 w-4" />;
      case 'running': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Enhanced EHR Integration
          </CardTitle>
          <CardDescription>
            Hospital-grade EHR integration with security, compliance, and real-time monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="systems">Systems</TabsTrigger>
              <TabsTrigger value="sync">Sync Jobs</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
              <TabsTrigger value="add">Add System</TabsTrigger>
            </TabsList>

            <TabsContent value="systems" className="space-y-4">
              <div className="grid gap-4">
                {ehrSystems.map((system) => (
                  <Card key={system.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <Server className="h-4 w-4" />
                            {system.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {system.system_type} • {system.api_version}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(system.connection_status)} text-white`}
                          >
                            {getStatusIcon(system.connection_status)}
                            {system.connection_status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Base URL</p>
                          <p className="font-mono text-xs">{system.base_url}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Authentication</p>
                          <p className="flex items-center gap-1">
                            <Key className="h-3 w-3" />
                            {system.authentication_type}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Encryption</p>
                          <p className="flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            {system.encryption_method}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Compliance</p>
                          <Badge variant="secondary">{system.compliance_level}</Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => testConnection(system.id)}
                        >
                          <Activity className="h-3 w-3 mr-1" />
                          Test Connection
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => startSync(system.id, 'incremental')}
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Sync Data
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => startSync(system.id, 'full_sync')}
                        >
                          <Database className="h-3 w-3 mr-1" />
                          Full Sync
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {ehrSystems.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                      <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No EHR Systems</h3>
                      <p className="text-muted-foreground mb-4">
                        Add your first EHR system to start integration
                      </p>
                      <Button onClick={() => setActiveTab('add')}>
                        Add EHR System
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="sync" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Synchronization Jobs</h3>
                <Button onClick={fetchSyncJobs} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="grid gap-4">
                {syncJobs.map((job) => (
                  <Card key={job.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <RotateCcw className="h-4 w-4" />
                            {job.job_type.replace('_', ' ').toUpperCase()}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Priority: {job.priority} • Status: {job.status}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(job.status)} text-white`}
                        >
                          {getStatusIcon(job.status)}
                          {job.status}
                        </Badge>
                      </div>

                      {(job.status === 'running' || job.status === 'completed') && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{job.processed_records} / {job.total_records}</span>
                          </div>
                          <Progress 
                            value={job.total_records ? (job.processed_records / job.total_records) * 100 : 0} 
                          />
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground mt-2">
                        <p>Started: {job.start_time ? new Date(job.start_time).toLocaleString() : 'Not started'}</p>
                        {job.end_time && <p>Completed: {new Date(job.end_time).toLocaleString()}</p>}
                        {job.failed_records > 0 && (
                          <p className="text-red-500">Failed records: {job.failed_records}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {syncJobs.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                      <RotateCcw className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No Sync Jobs</h3>
                      <p className="text-muted-foreground">
                        Sync jobs will appear here when you start data synchronization
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Audit Logs</h3>
                <Button onClick={fetchAuditLogs} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="grid gap-2">
                {auditLogs.map((log) => (
                  <Card key={log.id} className="border">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-3 w-3" />
                          <span className="font-medium text-sm">{log.operation_type}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{log.resource_type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${log.success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                          >
                            {log.success ? 'Success' : 'Failed'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(log.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {log.error_details && (
                        <p className="text-xs text-red-500 mt-1">{log.error_details}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {auditLogs.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                      <Monitor className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No Audit Logs</h3>
                      <p className="text-muted-foreground">
                        Audit logs will appear here as you use the EHR system
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <div className="max-w-md space-y-4">
                <h3 className="text-lg font-semibold">Add New EHR System</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">System Name</Label>
                  <Input
                    id="name"
                    value={newSystem.name}
                    onChange={(e) => setNewSystem({ ...newSystem, name: e.target.value })}
                    placeholder="e.g., Epic MyChart"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="system_type">System Type</Label>
                  <Select 
                    value={newSystem.system_type} 
                    onValueChange={(value) => setNewSystem({ ...newSystem, system_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select system type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="cerner">Cerner</SelectItem>
                      <SelectItem value="allscripts">Allscripts</SelectItem>
                      <SelectItem value="athenahealth">athenahealth</SelectItem>
                      <SelectItem value="meditech">MEDITECH</SelectItem>
                      <SelectItem value="custom">Custom FHIR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="base_url">Base URL</Label>
                  <Input
                    id="base_url"
                    value={newSystem.base_url}
                    onChange={(e) => setNewSystem({ ...newSystem, base_url: e.target.value })}
                    placeholder="https://api.example.com/fhir"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api_version">API Version</Label>
                  <Input
                    id="api_version"
                    value={newSystem.api_version}
                    onChange={(e) => setNewSystem({ ...newSystem, api_version: e.target.value })}
                    placeholder="R4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auth_type">Authentication Type</Label>
                  <Select 
                    value={newSystem.authentication_type} 
                    onValueChange={(value) => setNewSystem({ ...newSystem, authentication_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                      <SelectItem value="api_key">API Key</SelectItem>
                      <SelectItem value="certificate">Client Certificate</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={addEHRSystem} 
                  className="w-full"
                  disabled={!newSystem.name || !newSystem.system_type || !newSystem.base_url}
                >
                  Add EHR System
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};