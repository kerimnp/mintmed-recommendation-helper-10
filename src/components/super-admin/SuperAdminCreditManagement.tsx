import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Plus, Minus, History, TrendingDown, Users, Building } from "lucide-react";

interface CreditUsage {
  id: string;
  doctor_id: string;
  credits_used: number;
  operation_type: string;
  operation_details: any;
  created_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface UserCredits {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  free_credits_left: number;
  role: string;
  account_type: string;
}

export function SuperAdminCreditManagement() {
  const [creditUsage, setCreditUsage] = useState<CreditUsage[]>([]);
  const [userCredits, setUserCredits] = useState<UserCredits[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserCredits | null>(null);
  const [creditAmount, setCreditAmount] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch recent credit usage
      const { data: usageData, error: usageError } = await supabase
        .from('credit_usage_history')
        .select(`
          *,
          profiles (first_name, last_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (usageError) throw usageError;

      // Fetch user credits
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, free_credits_left, role, account_type')
        .order('free_credits_left', { ascending: false });

      if (userError) throw userError;

      setCreditUsage(usageData || []);
      setUserCredits(userData || []);
    } catch (error) {
      console.error('Error fetching credit data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch credit data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const adjustUserCredits = async (userId: string, adjustment: number, type: 'add' | 'subtract') => {
    try {
      const user = userCredits.find(u => u.id === userId);
      if (!user) return;

      const newAmount = type === 'add' 
        ? user.free_credits_left + adjustment 
        : Math.max(0, user.free_credits_left - adjustment);

      const { error } = await supabase
        .from('profiles')
        .update({ free_credits_left: newAmount })
        .eq('id', userId);

      if (error) throw error;

      // Log the admin action
      await supabase.from('admin_activity_logs').insert({
        admin_user_id: (await supabase.auth.getUser()).data.user?.id,
        action_type: type === 'add' ? 'credit_added' : 'credit_removed',
        target_type: 'user_credits',
        target_id: userId,
        details: {
          previous_amount: user.free_credits_left,
          adjustment: adjustment,
          new_amount: newAmount,
          user_email: user.email
        }
      });

      setUserCredits(userCredits.map(u => 
        u.id === userId ? { ...u, free_credits_left: newAmount } : u
      ));

      toast({
        title: "Success",
        description: `${type === 'add' ? 'Added' : 'Removed'} ${adjustment} credits ${type === 'add' ? 'to' : 'from'} ${user.first_name} ${user.last_name}`
      });

      setIsAddDialogOpen(false);
      setCreditAmount('');
      setSelectedUser(null);
    } catch (error) {
      console.error('Error adjusting credits:', error);
      toast({
        title: "Error",
        description: "Failed to adjust credits",
        variant: "destructive"
      });
    }
  };

  const getTotalCreditsInSystem = () => {
    return userCredits.reduce((sum, user) => sum + user.free_credits_left, 0);
  };

  const getTotalCreditsUsedToday = () => {
    const today = new Date().toDateString();
    return creditUsage
      .filter(usage => new Date(usage.created_at).toDateString() === today)
      .reduce((sum, usage) => sum + usage.credits_used, 0);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading credit data...</CardTitle>
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
      {/* Credit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Credits in System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalCreditsInSystem().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available to users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Credits Used Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalCreditsUsedToday()}</div>
            <p className="text-xs text-muted-foreground">Operations performed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Credits per User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userCredits.length > 0 ? Math.round(getTotalCreditsInSystem() / userCredits.length) : 0}
            </div>
            <p className="text-xs text-muted-foreground">Per active user</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Users with Low Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userCredits.filter(u => u.free_credits_left < 5).length}
            </div>
            <p className="text-xs text-muted-foreground">Less than 5 credits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Credits Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              User Credits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userCredits.slice(0, 10).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.free_credits_left}</span>
                        {user.free_credits_left < 5 && (
                          <Badge variant="destructive" className="text-xs">
                            Low
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Adjust Credits</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Current credits: {user.free_credits_left}
                                </p>
                                <p className="font-medium">
                                  {user.first_name} {user.last_name}
                                </p>
                              </div>
                              <div>
                                <Input
                                  type="number"
                                  placeholder="Credits to add/remove"
                                  value={creditAmount}
                                  onChange={(e) => setCreditAmount(e.target.value)}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => adjustUserCredits(user.id, parseInt(creditAmount) || 0, 'add')}
                                  disabled={!creditAmount || parseInt(creditAmount) <= 0}
                                  className="flex-1"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add Credits
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => adjustUserCredits(user.id, parseInt(creditAmount) || 0, 'subtract')}
                                  disabled={!creditAmount || parseInt(creditAmount) <= 0}
                                  className="flex-1"
                                >
                                  <Minus className="h-3 w-3 mr-1" />
                                  Remove Credits
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Credit Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditUsage.slice(0, 10).map((usage) => (
                  <TableRow key={usage.id}>
                    <TableCell>
                      {usage.profiles ? (
                        <div className="text-sm">
                          <div className="font-medium">
                            {usage.profiles.first_name} {usage.profiles.last_name}
                          </div>
                          <div className="text-muted-foreground">
                            {usage.profiles.email}
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground">Unknown User</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {usage.operation_type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3 text-red-500" />
                        <span className="font-medium">{usage.credits_used}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(usage.created_at).toLocaleString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}