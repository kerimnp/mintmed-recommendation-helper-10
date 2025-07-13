import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { 
  Activity, 
  Shield, 
  Database, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Wifi,
  Server
} from 'lucide-react';

interface SystemStatus {
  overallHealth: 'healthy' | 'warning' | 'critical';
  database: 'connected' | 'degraded' | 'offline';
  authentication: 'healthy' | 'issues' | 'offline';
  realtime: 'connected' | 'reconnecting' | 'offline';
  activeUsers: number;
  recentErrors: string[];
  lastUpdated: Date;
}

export const SystemStatusMonitor: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>({
    overallHealth: 'healthy',
    database: 'connected',
    authentication: 'healthy',
    realtime: 'connected',
    activeUsers: 0,
    recentErrors: [],
    lastUpdated: new Date()
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSystemStatus();
    
    // Set up real-time monitoring
    const interval = setInterval(checkSystemStatus, 30000); // Check every 30 seconds
    
    // Monitor Supabase connection status
    const channel = supabase
      .channel('system-monitor')
      .on('presence', { event: 'sync' }, () => {
        setStatus(prev => ({ 
          ...prev, 
          realtime: 'connected',
          lastUpdated: new Date()
        }));
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setStatus(prev => ({ ...prev, realtime: 'connected' }));
        } else if (status === 'CLOSED') {
          setStatus(prev => ({ ...prev, realtime: 'offline' }));
        } else {
          setStatus(prev => ({ ...prev, realtime: 'reconnecting' }));
        }
      });

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  const checkSystemStatus = async () => {
    try {
      setLoading(true);
      const errors: string[] = [];
      let dbStatus: 'connected' | 'degraded' | 'offline' = 'connected';
      let authStatus: 'healthy' | 'issues' | 'offline' = 'healthy';

      // Test database connection
      try {
        const { error: dbError } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);
        
        if (dbError) {
          dbStatus = 'degraded';
          errors.push(`Database: ${dbError.message}`);
        }
      } catch (err) {
        dbStatus = 'offline';
        errors.push('Database connection failed');
      }

      // Test authentication
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        if (authError) {
          authStatus = 'issues';
          errors.push(`Auth: ${authError.message}`);
        }
      } catch (err) {
        authStatus = 'offline';
        errors.push('Authentication service unavailable');
      }

      // Get active users count (approximate)
      let activeUsers = 0;
      try {
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);
        
        activeUsers = count || 0;
      } catch (err) {
        errors.push('Failed to fetch user statistics');
      }

      // Determine overall health
      let overallHealth: 'healthy' | 'warning' | 'critical' = 'healthy';
      if (dbStatus === 'offline' || authStatus === 'offline') {
        overallHealth = 'critical';
      } else if (dbStatus === 'degraded' || authStatus === 'issues' || errors.length > 0) {
        overallHealth = 'warning';
      }

      setStatus({
        overallHealth,
        database: dbStatus,
        authentication: authStatus,
        realtime: status.realtime, // Keep current realtime status
        activeUsers,
        recentErrors: errors.slice(0, 5), // Keep last 5 errors
        lastUpdated: new Date()
      });

    } catch (error) {
      console.error('System status check failed:', error);
      setStatus(prev => ({
        ...prev,
        overallHealth: 'critical',
        recentErrors: ['System monitoring failed', ...prev.recentErrors.slice(0, 4)],
        lastUpdated: new Date()
      }));
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (componentStatus: string, component: string) => {
    const iconClass = "h-4 w-4";
    
    switch (componentStatus) {
      case 'healthy':
      case 'connected':
        return <CheckCircle className={`${iconClass} text-green-600`} />;
      case 'warning':
      case 'issues':
      case 'degraded':
      case 'reconnecting':
        return <AlertTriangle className={`${iconClass} text-yellow-600`} />;
      case 'critical':
      case 'offline':
        return <AlertTriangle className={`${iconClass} text-red-600`} />;
      default:
        return <Clock className={`${iconClass} text-gray-600`} />;
    }
  };

  const getStatusColor = (componentStatus: string) => {
    switch (componentStatus) {
      case 'healthy':
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
      case 'issues':
      case 'degraded':
      case 'reconnecting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Status</h2>
        <Badge className={getStatusColor(status.overallHealth)}>
          {getStatusIcon(status.overallHealth, 'overall')}
          <span className="ml-1 capitalize">{status.overallHealth}</span>
        </Badge>
      </div>

      {/* Overall System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Horalix Antibioteka System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Database Status */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Database</p>
                  <p className="text-xs text-muted-foreground capitalize">{status.database}</p>
                </div>
              </div>
              {getStatusIcon(status.database, 'database')}
            </div>

            {/* Authentication Status */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Authentication</p>
                  <p className="text-xs text-muted-foreground capitalize">{status.authentication}</p>
                </div>
              </div>
              {getStatusIcon(status.authentication, 'auth')}
            </div>

            {/* Real-time Status */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Real-time</p>
                  <p className="text-xs text-muted-foreground capitalize">{status.realtime}</p>
                </div>
              </div>
              {getStatusIcon(status.realtime, 'realtime')}
            </div>

            {/* Active Users */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Active Users</p>
                  <p className="text-xs text-muted-foreground">{status.activeUsers} registered</p>
                </div>
              </div>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Errors */}
      {status.recentErrors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Recent Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {status.recentErrors.map((error, index) => (
                <Alert key={index} variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Environment</p>
              <p className="text-muted-foreground">Production</p>
            </div>
            <div>
              <p className="font-medium">Version</p>
              <p className="text-muted-foreground">Horalix Antibioteka v2.0</p>
            </div>
            <div>
              <p className="font-medium">Last Updated</p>
              <p className="text-muted-foreground">
                {status.lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Hospital-grade antibiotic decision support system with real-time monitoring and audit trails.
              All patient data access is logged and monitored for compliance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};