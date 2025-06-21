
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Receipt,
  Download,
  CreditCard,
  Calendar,
  DollarSign
} from 'lucide-react';

interface BillingManagementProps {
  user: User;
}

export const BillingManagement: React.FC<BillingManagementProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Billing Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your subscription and billing information
          </p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Update Payment Method
        </Button>
      </div>

      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Professional Plan</h3>
              <p className="text-gray-600">1,200 monthly recommendations</p>
              <p className="text-sm text-gray-500">Next billing: January 15, 2025</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">$399/month</p>
              <Badge variant="default">Active</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Change Plan</Button>
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">$399</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Year to Date</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">$4,788</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Next Payment</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">$399</p>
                <p className="text-xs text-gray-500">Jan 15, 2025</p>
              </div>
              <Receipt className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-12-15', amount: '$399.00', status: 'paid', invoice: 'INV-2024-12-001' },
              { date: '2024-11-15', amount: '$399.00', status: 'paid', invoice: 'INV-2024-11-001' },
              { date: '2024-10-15', amount: '$399.00', status: 'paid', invoice: 'INV-2024-10-001' },
              { date: '2024-09-15', amount: '$399.00', status: 'paid', invoice: 'INV-2024-09-001' },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{invoice.invoice}</h3>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{invoice.amount}</p>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
