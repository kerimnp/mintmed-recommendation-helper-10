import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Edit, Plus, CreditCard, Users, Calendar, DollarSign, Settings } from "lucide-react";

interface Subscription {
  id: string;
  user_id: string;
  org_id: number;
  plan_id: string;
  status: string;
  billing_cycle: string;
  current_period_start: string;
  current_period_end: string;
  credits_remaining: number;
  doctor_seats: number;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  metadata: any;
  plans: {
    name: string;
    plan_type: string;
    price_monthly: number;
    price_yearly: number;
  };
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  organizations?: {
    name: string;
  } | null;
}

export function SuperAdminSubscriptionEditor() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    status: '',
    credits_remaining: '',
    doctor_seats: '',
    current_period_end: '',
    notes: ''
  });
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
          plans (name, plan_type, price_monthly, price_yearly),
          profiles (first_name, last_name, email),
          organizations (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions((data as any) || []);
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

  const openEditDialog = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setEditForm({
      status: subscription.status,
      credits_remaining: subscription.credits_remaining?.toString() || '0',
      doctor_seats: subscription.doctor_seats?.toString() || '1',
      current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end).toISOString().split('T')[0] : '',
      notes: ''
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedSubscription) return;

    try {
      const updateData: any = {
        status: editForm.status,
        credits_remaining: parseInt(editForm.credits_remaining),
        doctor_seats: parseInt(editForm.doctor_seats),
        updated_at: new Date().toISOString()
      };

      if (editForm.current_period_end) {
        updateData.current_period_end = new Date(editForm.current_period_end).toISOString();
      }

      // Add notes to metadata
      if (editForm.notes) {
        updateData.metadata = {
          ...selectedSubscription.metadata,
          admin_notes: editForm.notes,
          last_modified_by: 'super_admin',
          last_modified_at: new Date().toISOString()
        };
      }

      const { error } = await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('id', selectedSubscription.id);

      if (error) throw error;

      // Log the admin action
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await supabase.from('admin_activity_logs').insert({
          admin_user_id: currentUser.data.user.id,
          action_type: 'subscription_modified',
          target_type: 'subscription',
          target_id: selectedSubscription.id,
          details: {
            subscription_id: selectedSubscription.id,
            changes: updateData,
            notes: editForm.notes,
            customer_email: selectedSubscription.profiles?.email || selectedSubscription.organizations?.name
          }
        });
      }

      toast({
        title: "Success",
        description: "Subscription updated successfully"
      });

      setIsEditDialogOpen(false);
      fetchSubscriptions();
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive"
      });
    }
  };

  const extendSubscription = async (subscriptionId: string, days: number) => {
    try {
      const subscription = subscriptions.find(s => s.id === subscriptionId);
      if (!subscription) return;

      const currentEnd = new Date(subscription.current_period_end);
      const newEnd = new Date(currentEnd.getTime() + (days * 24 * 60 * 60 * 1000));

      const { error } = await supabase
        .from('subscriptions')
        .update({
          current_period_end: newEnd.toISOString(),
          metadata: {
            ...subscription.metadata,
            extended_by_admin: true,
            extension_days: days,
            extended_at: new Date().toISOString()
          }
        })
        .eq('id', subscriptionId);

      if (error) throw error;

      // Log the admin action
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await supabase.from('admin_activity_logs').insert({
          admin_user_id: currentUser.data.user.id,
          action_type: 'subscription_extended',
          target_type: 'subscription',
          target_id: subscriptionId,
          details: {
            subscription_id: subscriptionId,
            extension_days: days,
            new_end_date: newEnd.toISOString(),
            customer_email: subscription.profiles?.email || subscription.organizations?.name
          }
        });
      }

      toast({
        title: "Success",
        description: `Subscription extended by ${days} days`
      });

      fetchSubscriptions();
    } catch (error) {
      console.error('Error extending subscription:', error);
      toast({
        title: "Error",
        description: "Failed to extend subscription",
        variant: "destructive"
      });
    }
  };

  const addCredits = async (subscriptionId: string, creditsToAdd: number) => {
    try {
      const subscription = subscriptions.find(s => s.id === subscriptionId);
      if (!subscription) return;

      const newCredits = (subscription.credits_remaining || 0) + creditsToAdd;

      const { error } = await supabase
        .from('subscriptions')
        .update({
          credits_remaining: newCredits,
          metadata: {
            ...subscription.metadata,
            credits_added_by_admin: true,
            credits_added: creditsToAdd,
            credits_added_at: new Date().toISOString()
          }
        })
        .eq('id', subscriptionId);

      if (error) throw error;

      // Log the admin action
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await supabase.from('admin_activity_logs').insert({
          admin_user_id: currentUser.data.user.id,
          action_type: 'credits_added',
          target_type: 'subscription',
          target_id: subscriptionId,
          details: {
            subscription_id: subscriptionId,
            credits_added: creditsToAdd,
            new_credit_balance: newCredits,
            customer_email: subscription.profiles?.email || subscription.organizations?.name
          }
        });
      }

      toast({
        title: "Success",
        description: `${creditsToAdd} credits added successfully`
      });

      fetchSubscriptions();
    } catch (error) {
      console.error('Error adding credits:', error);
      toast({
        title: "Error",
        description: "Failed to add credits",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'past_due': return 'bg-yellow-100 text-yellow-800';
      case 'unpaid': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              <div key={i} className="animate-pulse h-20 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Subscription Management
            <Badge variant="secondary">{subscriptions.length} subscriptions</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">
                      {subscription.profiles ? (
                        `${subscription.profiles.first_name} ${subscription.profiles.last_name}`
                      ) : subscription.organizations ? (
                        subscription.organizations.name
                      ) : (
                        'Unknown Customer'
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {subscription.profiles?.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(subscription.status)} variant="secondary">
                      {subscription.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(subscription)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Plan</div>
                    <div className="font-medium">{subscription.plans.name}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Credits</div>
                    <div className="font-medium flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      {subscription.credits_remaining || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Doctor Seats</div>
                    <div className="font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {subscription.doctor_seats}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Billing</div>
                    <div className="font-medium">{subscription.billing_cycle}</div>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-muted-foreground">Period</div>
                  <div>
                    {new Date(subscription.current_period_start).toLocaleDateString()} - {new Date(subscription.current_period_end).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => extendSubscription(subscription.id, 30)}
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Extend 30 days
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addCredits(subscription.id, 100)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add 100 credits
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={editForm.status} onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="past_due">Past Due</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Credits Remaining</label>
              <Input
                type="number"
                value={editForm.credits_remaining}
                onChange={(e) => setEditForm(prev => ({ ...prev, credits_remaining: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Doctor Seats</label>
              <Input
                type="number"
                value={editForm.doctor_seats}
                onChange={(e) => setEditForm(prev => ({ ...prev, doctor_seats: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Period End Date</label>
              <Input
                type="date"
                value={editForm.current_period_end}
                onChange={(e) => setEditForm(prev => ({ ...prev, current_period_end: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Admin Notes</label>
              <Textarea
                placeholder="Reason for changes..."
                value={editForm.notes}
                onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleUpdate} className="flex-1">
                Update Subscription
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}