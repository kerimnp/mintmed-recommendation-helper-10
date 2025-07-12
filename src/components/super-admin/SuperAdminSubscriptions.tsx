import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Edit, Calendar, DollarSign, Users, Building, TrendingUp } from "lucide-react";

interface Subscription {
  id: string;
  user_id?: string;
  org_id?: number;
  plan_id: string;
  status: string;
  billing_cycle: string;
  current_period_start: string;
  current_period_end: string;
  credits_remaining: number;
  doctor_seats: number;
  created_at: string;
  plans?: {
    name: string;
    price_monthly?: number;
    price_yearly?: number;
  };
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  organizations?: {
    name: string;
  };
}

export function SuperAdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plans (name, price_monthly, price_yearly),
          profiles (first_name, last_name, email),
          organizations (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subscriptions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (subscriptionId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: newStatus })
        .eq('id', subscriptionId);

      if (error) throw error;

      setSubscriptions(subscriptions.map(sub =>
        sub.id === subscriptionId ? { ...sub, status: newStatus } : sub
      ));

      toast({
        title: "Success",
        description: `Subscription status updated to ${newStatus}`
      });
    } catch (error) {
      console.error('Error updating subscription status:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'past_due': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'trialing': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
    if (typeFilter === 'individual' && sub.org_id) return false;
    if (typeFilter === 'organization' && !sub.org_id) return false;
    return true;
  });

  const getTotalRevenue = () => {
    return subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => {
        const plan = sub.plans;
        if (!plan) return total;
        
        const price = sub.billing_cycle === 'yearly' 
          ? plan.price_yearly || 0 
          : plan.price_monthly || 0;
        return total + price;
      }, 0);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading subscriptions...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
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
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${getTotalRevenue().toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Active subscriptions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptions.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
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
              {subscriptions.filter(s => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Credits Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscriptions.reduce((sum, s) => sum + (s.credits_remaining || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Management
            </CardTitle>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="past_due">Past Due</SelectItem>
                  <SelectItem value="trialing">Trialing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Billing</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div className="space-y-1">
                      {subscription.organizations ? (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{subscription.organizations.name}</div>
                            <div className="text-sm text-muted-foreground">Organization</div>
                          </div>
                        </div>
                      ) : subscription.profiles ? (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">
                              {subscription.profiles.first_name} {subscription.profiles.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {subscription.profiles.email}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground">Unknown Customer</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{subscription.plans?.name || 'Unknown Plan'}</div>
                    <div className="text-sm text-muted-foreground">
                      ${subscription.billing_cycle === 'yearly' 
                        ? subscription.plans?.price_yearly || 0 
                        : subscription.plans?.price_monthly || 0
                      }/{subscription.billing_cycle === 'yearly' ? 'year' : 'month'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(subscription.status)}>
                      {subscription.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {subscription.billing_cycle.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{subscription.credits_remaining}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{subscription.doctor_seats}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(subscription.current_period_start).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">
                        to {new Date(subscription.current_period_end).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Subscription</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Status</label>
                            <Select 
                              defaultValue={subscription.status}
                              onValueChange={(newStatus) => 
                                updateSubscriptionStatus(subscription.id, newStatus)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="past_due">Past Due</SelectItem>
                                <SelectItem value="trialing">Trialing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}