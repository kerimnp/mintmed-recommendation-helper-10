import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Building, Users, CreditCard, Calendar, Edit } from "lucide-react";

interface Organization {
  id: number;
  name: string;
  billing_address: string;
  created_by: string;
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  member_count?: number;
  active_subscriptions?: number;
  total_credits?: number;
}

export function SuperAdminOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      // Fetch organizations with creator profile
      const { data: orgsData, error: orgsError } = await supabase
        .from('organizations')
        .select(`
          *,
          profiles!organizations_created_by_fkey (
            first_name,
            last_name, 
            email
          )
        `);

      if (orgsError) throw orgsError;

      // Fetch additional data for each organization
      const organizationsWithStats = await Promise.all(
        (orgsData || []).map(async (org) => {
          // Get member count
          const { count: memberCount } = await supabase
            .from('affiliations')
            .select('*', { count: 'exact' })
            .eq('org_id', org.id)
            .eq('status', 'active');

          // Get active subscriptions
          const { count: activeSubscriptions } = await supabase
            .from('subscriptions')
            .select('*', { count: 'exact' })
            .eq('org_id', org.id)
            .eq('status', 'active');

          // Get total credits
          const { data: subscriptions } = await supabase
            .from('subscriptions')
            .select('credits_remaining')
            .eq('org_id', org.id)
            .eq('status', 'active');

          const totalCredits = subscriptions?.reduce(
            (sum, sub) => sum + (sub.credits_remaining || 0), 
            0
          ) || 0;

          return {
            ...org,
            member_count: memberCount || 0,
            active_subscriptions: activeSubscriptions || 0,
            total_credits: totalCredits
          };
        })
      );

      setOrganizations(organizationsWithStats);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch organizations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading organizations...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
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
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizations.length}</div>
            <p className="text-xs text-muted-foreground">Hospital networks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.reduce((sum, org) => sum + (org.member_count || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all organizations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.reduce((sum, org) => sum + (org.active_subscriptions || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Organization subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.reduce((sum, org) => sum + (org.total_credits || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Available credits</p>
          </CardContent>
        </Card>
      </div>

      {/* Organizations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Organization Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Subscriptions</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Billing Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {org.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {org.profiles ? (
                      <div>
                        <div className="font-medium">
                          {org.profiles.first_name} {org.profiles.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {org.profiles.email}
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground">Unknown</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{org.member_count}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{org.active_subscriptions}</span>
                    </div>
                    {org.active_subscriptions > 0 && (
                      <Badge variant="outline" className="mt-1">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{org.total_credits?.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm max-w-40 truncate">
                      {org.billing_address || 'Not provided'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {organizations.length === 0 && (
        <Card>
          <CardContent className="text-center py-10">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No organizations found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}