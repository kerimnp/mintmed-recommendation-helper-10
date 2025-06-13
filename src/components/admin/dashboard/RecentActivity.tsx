
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, User, Pill, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'prescription' | 'alert' | 'outcome' | 'interaction';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'prescription',
    title: 'New prescription created',
    description: 'Amoxicillin 500mg prescribed for patient John D.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    user: 'Dr. Smith',
    status: 'success'
  },
  {
    id: '2',
    type: 'alert',
    title: 'Drug interaction detected',
    description: 'Potential interaction between Warfarin and Ciprofloxacin',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    user: 'System',
    status: 'warning'
  },
  {
    id: '3',
    type: 'outcome',
    title: 'Treatment completed successfully',
    description: 'Patient Mary J. completed 7-day course of Azithromycin',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    user: 'Dr. Johnson',
    status: 'success'
  },
  {
    id: '4',
    type: 'interaction',
    title: 'Dosage adjustment recommended',
    description: 'Renal function requires Vancomycin dose modification',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    user: 'Clinical Pharmacist',
    status: 'info'
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'prescription':
      return <Pill className="h-4 w-4" />;
    case 'alert':
      return <AlertTriangle className="h-4 w-4" />;
    case 'outcome':
      return <CheckCircle className="h-4 w-4" />;
    case 'interaction':
      return <User className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status?: ActivityItem['status']) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'info':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${getStatusColor(activity.status)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <Badge variant="outline" className="text-xs">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                {activity.user && (
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">
                        {activity.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
