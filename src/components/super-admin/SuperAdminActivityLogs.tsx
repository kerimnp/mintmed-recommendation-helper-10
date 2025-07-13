import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Activity, Eye, Shield, User, Calendar, Clock } from "lucide-react";

interface ActivityLog {
  id: string;
  admin_user_id: string;
  action_type: string;
  target_type: string;
  target_id: string;
  details: any;
  ip_address: string | null;
  user_agent: string;
  created_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export function SuperAdminActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('24h');
  const { toast } = useToast();

  useEffect(() => {
    fetchActivityLogs();
  }, [timeFilter]);

  const fetchActivityLogs = async () => {
    try {
      const timeLimit = getTimeLimit();
      
      const { data, error } = await supabase
        .from('admin_activity_logs')
        .select(`
          *,
          profiles (first_name, last_name, email)
        `)
        .gte('created_at', timeLimit.toISOString())
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs((data || []).map(log => ({
        ...log,
        ip_address: log.ip_address as string | null
      })));
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch activity logs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTimeLimit = () => {
    const now = new Date();
    switch (timeFilter) {
      case '1h': return new Date(now.getTime() - 1 * 60 * 60 * 1000);
      case '24h': return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d': return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default: return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
  };

  const getActionBadgeColor = (actionType: string) => {
    switch (actionType) {
      case 'user_created':
      case 'credit_added':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'user_deactivated':
      case 'credit_removed':
      case 'subscription_cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'role_changed':
      case 'subscription_modified':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'login':
      case 'view':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'login':
      case 'view':
        return <Eye className="h-3 w-3" />;
      case 'user_created':
      case 'user_modified':
      case 'user_deactivated':
        return <User className="h-3 w-3" />;
      case 'role_changed':
        return <Shield className="h-3 w-3" />;
      default:
        return <Activity className="h-3 w-3" />;
    }
  };

  const filteredLogs = logs.filter(log => {
    if (actionFilter !== 'all' && log.action_type !== actionFilter) return false;
    return true;
  });

  const uniqueActionTypes = [...new Set(logs.map(log => log.action_type))];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading activity logs...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-muted h-8 w-8"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Activity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground">In selected period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.map(log => log.admin_user_id)).size}
            </div>
            <p className="text-xs text-muted-foreground">Active administrators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Most Common Action
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.length > 0 ? 
                (() => {
                  const counts = logs.reduce((acc, log) => {
                    acc[log.action_type] = (acc[log.action_type] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);
                  const mostCommon = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
                  return mostCommon.replace('_', ' ').toUpperCase();
                })()
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">Action type</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.length > 0 ? 
                (() => {
                  const lastActivity = new Date(logs[0].created_at);
                  const now = new Date();
                  const diffMinutes = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60));
                  
                  if (diffMinutes < 1) return 'Now';
                  if (diffMinutes < 60) return `${diffMinutes}m ago`;
                  const diffHours = Math.floor(diffMinutes / 60);
                  if (diffHours < 24) return `${diffHours}h ago`;
                  const diffDays = Math.floor(diffHours / 24);
                  return `${diffDays}d ago`;
                })()
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">Time ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Logs
            </CardTitle>
            <div className="flex gap-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Time filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Action filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActionTypes.map(action => (
                    <SelectItem key={action} value={action}>
                      {action.replace('_', ' ').toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {log.profiles ? (
                      <div className="space-y-1">
                        <div className="font-medium">
                          {log.profiles.first_name} {log.profiles.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {log.profiles.email}
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground">Unknown Admin</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getActionBadgeColor(log.action_type)}>
                      <div className="flex items-center gap-1">
                        {getActionIcon(log.action_type)}
                        {log.action_type.replace('_', ' ').toUpperCase()}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{log.target_type}</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {log.target_id?.substring(0, 8)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm max-w-60">
                      {log.details && typeof log.details === 'object' ? (
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      ) : (
                        <span className="text-muted-foreground">No details</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <div>{new Date(log.created_at).toLocaleDateString()}</div>
                        <div className="text-muted-foreground text-xs">
                          {new Date(log.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">
                      {log.ip_address || 'Unknown'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="text-center py-10">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No activity logs found for the selected criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}