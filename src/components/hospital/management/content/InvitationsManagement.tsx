
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

interface InvitationsManagementProps {
  user: User;
}

export const InvitationsManagement: React.FC<InvitationsManagementProps> = ({ user }) => {
  // Mock invitation data
  const invitations = [
    { id: 1, email: 'dr.smith@example.com', sentDate: '2024-12-18', status: 'pending', expiresIn: '5 days' },
    { id: 2, email: 'dr.brown@example.com', sentDate: '2024-12-15', status: 'accepted', acceptedDate: '2024-12-16' },
    { id: 3, email: 'dr.taylor@example.com', sentDate: '2024-12-10', status: 'expired', expiresIn: 'Expired' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Invitations Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage doctor invitations
          </p>
        </div>
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Send New Invitation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expired</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invitations List */}
      <Card>
        <CardHeader>
          <CardTitle>All Invitations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <Mail className="h-8 w-8 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{invitation.email}</h3>
                    <p className="text-sm text-gray-500">Sent on {invitation.sentDate}</p>
                    {invitation.status === 'accepted' && (
                      <p className="text-xs text-green-600">Accepted on {invitation.acceptedDate}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge 
                      variant={
                        invitation.status === 'accepted' ? 'default' : 
                        invitation.status === 'pending' ? 'secondary' : 
                        'destructive'
                      }
                      className="mb-1"
                    >
                      {invitation.status}
                    </Badge>
                    <p className="text-xs text-gray-400">{invitation.expiresIn}</p>
                  </div>
                  
                  {invitation.status === 'pending' && (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resend
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
