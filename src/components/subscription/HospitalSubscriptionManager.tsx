
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, CreditCard, History, Settings, Plus, AlertCircle } from 'lucide-react';
import { useCurrentSubscription } from '@/hooks/useSubscriptions';
import { 
  useHospitalDoctors, 
  useDoctorSeatAllocations, 
  useAllocateCredits,
  useCreditUsageHistory,
  useUpdateSubscriptionSeats 
} from '@/hooks/useHospitalSubscriptions';
import { useToast } from '@/components/ui/use-toast';

export const HospitalSubscriptionManager = () => {
  const { toast } = useToast();
  const { data: currentSubscription, isLoading: subscriptionLoading } = useCurrentSubscription();
  const { data: hospitalDoctors, isLoading: doctorsLoading } = useHospitalDoctors();
  const { data: seatAllocations, isLoading: allocationsLoading } = useDoctorSeatAllocations(currentSubscription?.id || null);
  const { data: usageHistory, isLoading: historyLoading } = useCreditUsageHistory(currentSubscription?.id || null);
  
  const allocateCredits = useAllocateCredits();
  const updateSeats = useUpdateSubscriptionSeats();
  
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [creditsToAllocate, setCreditsToAllocate] = useState('');
  const [newSeatCount, setNewSeatCount] = useState('');
  const [isAllocateDialogOpen, setIsAllocateDialogOpen] = useState(false);

  const handleAllocateCredits = async () => {
    if (!selectedDoctor || !creditsToAllocate || !currentSubscription) {
      toast({
        title: 'Missing Information',
        description: 'Please select a doctor and enter credit amount.',
        variant: 'destructive',
      });
      return;
    }

    const credits = parseInt(creditsToAllocate);
    if (credits <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Credits must be a positive number.',
        variant: 'destructive',
      });
      return;
    }

    await allocateCredits.mutateAsync({
      subscriptionId: currentSubscription.id,
      doctorId: selectedDoctor,
      allocatedCredits: credits
    });

    setSelectedDoctor('');
    setCreditsToAllocate('');
    setIsAllocateDialogOpen(false);
  };

  const handleUpdateSeats = async () => {
    if (!newSeatCount || !currentSubscription) return;

    const seats = parseInt(newSeatCount);
    if (seats <= 0) {
      toast({
        title: 'Invalid Seat Count',
        description: 'Seat count must be a positive number.',
        variant: 'destructive',
      });
      return;
    }

    await updateSeats.mutateAsync({
      subscriptionId: currentSubscription.id,
      doctorSeats: seats
    });

    setNewSeatCount('');
  };

  if (subscriptionLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscription details...</p>
        </CardContent>
      </Card>
    );
  }

  if (!currentSubscription) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
          <p className="text-gray-600">You need an active hospital subscription to manage doctor seats and credits.</p>
        </CardContent>
      </Card>
    );
  }

  const totalAllocatedCredits = seatAllocations?.reduce((sum, allocation) => sum + allocation.allocated_credits, 0) || 0;
  const totalUsedCredits = seatAllocations?.reduce((sum, allocation) => sum + allocation.credits_used, 0) || 0;
  const availableCredits = currentSubscription.credits_remaining || 0;

  return (
    <div className="space-y-6">
      {/* Subscription Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Hospital Subscription Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{currentSubscription.plan?.name}</div>
              <div className="text-sm text-gray-600">Current Plan</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{availableCredits}</div>
              <div className="text-sm text-gray-600">Available Credits</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{currentSubscription.doctor_seats}</div>
              <div className="text-sm text-gray-600">Doctor Seats</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{seatAllocations?.length || 0}</div>
              <div className="text-sm text-gray-600">Active Allocations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="allocations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="allocations">Doctor Allocations</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="allocations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Doctor Credit Allocations
                </CardTitle>
                <Dialog open={isAllocateDialogOpen} onOpenChange={setIsAllocateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Allocate Credits
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Allocate Credits to Doctor</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="doctor-select">Select Doctor</Label>
                        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {hospitalDoctors?.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {doctor.first_name} {doctor.last_name} ({doctor.email})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="credits-input">Credits to Allocate</Label>
                        <Input
                          id="credits-input"
                          type="number"
                          value={creditsToAllocate}
                          onChange={(e) => setCreditsToAllocate(e.target.value)}
                          placeholder="Enter number of credits"
                          min="1"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAllocateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAllocateCredits} disabled={allocateCredits.isPending}>
                          {allocateCredits.isPending ? 'Allocating...' : 'Allocate Credits'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {allocationsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading allocations...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Allocated Credits</TableHead>
                      <TableHead>Used Credits</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seatAllocations?.map((allocation) => (
                      <TableRow key={allocation.id}>
                        <TableCell className="font-medium">
                          {allocation.doctor?.first_name} {allocation.doctor?.last_name}
                        </TableCell>
                        <TableCell>{allocation.doctor?.email}</TableCell>
                        <TableCell>{allocation.allocated_credits}</TableCell>
                        <TableCell>{allocation.credits_used}</TableCell>
                        <TableCell>{allocation.allocated_credits - allocation.credits_used}</TableCell>
                        <TableCell>
                          <Badge variant={allocation.is_active ? 'default' : 'secondary'}>
                            {allocation.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Credit Usage History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading usage history...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Operation</TableHead>
                      <TableHead>Credits Used</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageHistory?.map((usage) => (
                      <TableRow key={usage.id}>
                        <TableCell>
                          {new Date(usage.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {usage.profiles?.first_name} {usage.profiles?.last_name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{usage.operation_type}</Badge>
                        </TableCell>
                        <TableCell>{usage.credits_used}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {JSON.stringify(usage.operation_details)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Subscription Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seat-count">Update Doctor Seats</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    id="seat-count"
                    type="number"
                    value={newSeatCount}
                    onChange={(e) => setNewSeatCount(e.target.value)}
                    placeholder={`Current: ${currentSubscription.doctor_seats}`}
                    min="1"
                  />
                  <Button onClick={handleUpdateSeats} disabled={updateSeats.isPending}>
                    {updateSeats.isPending ? 'Updating...' : 'Update'}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Current seat count: {currentSubscription.doctor_seats}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Subscription Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span>{currentSubscription.plan?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing Cycle:</span>
                    <span className="capitalize">{currentSubscription.billing_cycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Period Ends:</span>
                    <span>{new Date(currentSubscription.current_period_end).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant={currentSubscription.status === 'active' ? 'default' : 'secondary'}>
                      {currentSubscription.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
