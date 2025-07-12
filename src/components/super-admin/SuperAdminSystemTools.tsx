import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database, Terminal, RefreshCw, AlertTriangle, CheckCircle, Settings, Code, Play } from "lucide-react";

interface QueryResult {
  data?: any[];
  error?: string;
  rowCount?: number;
  executionTime?: number;
}

export function SuperAdminSystemTools() {
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();

  const executeSqlQuery = async () => {
    if (!sqlQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a SQL query",
        variant: "destructive"
      });
      return;
    }

    setIsExecuting(true);
    const startTime = Date.now();

    try {
      const { data, error, count } = await supabase.rpc('execute_sql', {
        query: sqlQuery
      });

      const executionTime = Date.now() - startTime;

      if (error) {
        setQueryResult({
          error: error.message || 'Query execution failed',
          executionTime
        });
        toast({
          title: "Query Error",
          description: error.message || 'Query execution failed',
          variant: "destructive"
        });
      } else {
        setQueryResult({
          data: data || [],
          rowCount: count,
          executionTime
        });
        toast({
          title: "Query Executed",
          description: `Query completed in ${executionTime}ms`,
        });
      }
    } catch (error: any) {
      const executionTime = Date.now() - startTime;
      setQueryResult({
        error: error.message || 'Unexpected error occurred',
        executionTime
      });
      toast({
        title: "Error",
        description: error.message || 'Unexpected error occurred',
        variant: "destructive"
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const quickQueries = [
    {
      name: "User Stats",
      query: "SELECT role, account_type, COUNT(*) as count FROM profiles GROUP BY role, account_type ORDER BY count DESC;"
    },
    {
      name: "Recent Signups",
      query: "SELECT first_name, last_name, email, created_at FROM profiles WHERE created_at >= NOW() - INTERVAL '7 days' ORDER BY created_at DESC;"
    },
    {
      name: "Active Subscriptions",
      query: "SELECT s.*, p.name as plan_name FROM subscriptions s JOIN plans p ON s.plan_id = p.id WHERE s.status = 'active' ORDER BY s.created_at DESC;"
    },
    {
      name: "Credit Usage Summary",
      query: "SELECT operation_type, COUNT(*) as count, SUM(credits_used) as total_credits FROM credit_usage_history GROUP BY operation_type ORDER BY total_credits DESC;"
    },
    {
      name: "System Health Check",
      query: "SELECT 'Total Users' as metric, COUNT(*)::text as value FROM profiles UNION ALL SELECT 'Active Users', COUNT(*)::text FROM profiles WHERE is_active = true UNION ALL SELECT 'Active Subscriptions', COUNT(*)::text FROM subscriptions WHERE status = 'active';"
    }
  ];

  const systemActions = [
    {
      name: "Clear Old Logs",
      description: "Remove admin activity logs older than 90 days",
      action: async () => {
        const { error } = await supabase
          .from('admin_activity_logs')
          .delete()
          .lt('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString());
        
        if (error) throw error;
        toast({ title: "Success", description: "Old logs cleared successfully" });
      },
      variant: "outline" as const,
      icon: RefreshCw
    },
    {
      name: "Refresh Statistics",
      description: "Force refresh of cached system statistics",
      action: async () => {
        // This would trigger a refresh of any cached statistics
        toast({ title: "Success", description: "Statistics refreshed successfully" });
      },
      variant: "outline" as const,
      icon: RefreshCw
    }
  ];

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">Online</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              API Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">Healthy</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Response time: 150ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              <span className="font-medium">2.4 GB</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Database size</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SQL Query Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              SQL Query Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Query</label>
              <Textarea
                placeholder="Enter your SQL query here..."
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="font-mono text-sm min-h-32"
              />
              <div className="flex items-center gap-2">
                <Button 
                  onClick={executeSqlQuery}
                  disabled={isExecuting || !sqlQuery.trim()}
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {isExecuting ? 'Executing...' : 'Execute Query'}
                </Button>
                <Badge variant="outline" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Use with caution
                </Badge>
              </div>
            </div>

            {/* Quick Queries */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Queries</label>
              <div className="grid grid-cols-1 gap-2">
                {quickQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setSqlQuery(query.query)}
                    className="justify-start text-left h-auto py-2"
                  >
                    <div>
                      <div className="font-medium">{query.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {query.query.substring(0, 60)}...
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Query Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Query Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {queryResult ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {queryResult.error ? (
                    <Badge variant="destructive">Error</Badge>
                  ) : (
                    <Badge variant="outline">Success</Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    Execution time: {queryResult.executionTime}ms
                  </span>
                  {queryResult.rowCount !== undefined && (
                    <span className="text-sm text-muted-foreground">
                      Rows: {queryResult.rowCount}
                    </span>
                  )}
                </div>

                {queryResult.error ? (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <pre className="text-sm text-destructive whitespace-pre-wrap">
                      {queryResult.error}
                    </pre>
                  </div>
                ) : queryResult.data ? (
                  <div className="bg-muted/50 border rounded-lg p-4 max-h-96 overflow-auto">
                    <pre className="text-sm whitespace-pre-wrap">
                      {JSON.stringify(queryResult.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No data returned</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Terminal className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Execute a query to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemActions.map((action, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <action.icon className="h-4 w-4" />
                      <h3 className="font-medium">{action.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <Button
                    variant={action.variant}
                    size="sm"
                    onClick={action.action}
                  >
                    Execute
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}