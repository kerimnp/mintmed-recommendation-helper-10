
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, TrendingUp, CreditCard } from 'lucide-react';

export const PricingDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Pricing & Billing</h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <DollarSign className="h-3 w-3" />
          Revenue
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">$45,280</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">+12%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Payment Issues</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Basic Plan</div>
                <div className="text-sm text-gray-600">$29/month • 45 subscribers</div>
              </div>
              <Badge className="bg-blue-600">Popular</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Professional Plan</div>
                <div className="text-sm text-gray-600">$89/month • 78 subscribers</div>
              </div>
              <Badge className="bg-green-600">Growing</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Enterprise Plan</div>
                <div className="text-sm text-gray-600">$299/month • 33 subscribers</div>
              </div>
              <Badge className="bg-purple-600">Premium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
