
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X,
  Clock,
  Shield,
  Database,
  Server,
  Users,
  Activity
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  category: 'system' | 'security' | 'clinical' | 'user' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  actionRequired: boolean;
  expiresAt?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Drug Database Update Available',
    message: 'A new version of the drug interaction database is available. Update recommended within 24 hours.',
    timestamp: '2024-01-15T10:30:00Z',
    category: 'system',
    priority: 'high',
    isRead: false,
    actionRequired: true,
    expiresAt: '2024-01-16T10:30:00Z'
  },
  {
    id: '2',
    type: 'critical',
    title: 'Security Alert: Multiple Failed Login Attempts',
    message: 'Unusual login activity detected from IP 192.168.1.100. Security review recommended.',
    timestamp: '2024-01-15T09:15:00Z',
    category: 'security',
    priority: 'urgent',
    isRead: false,
    actionRequired: true
  },
  {
    id: '3',
    type: 'success',
    title: 'Backup Completed Successfully',
    message: 'Daily system backup completed at 2:00 AM. All data secured.',
    timestamp: '2024-01-15T02:00:00Z',
    category: 'system',
    priority: 'low',
    isRead: true,
    actionRequired: false
  },
  {
    id: '4',
    type: 'info',
    title: 'New Clinical Guidelines Available',
    message: 'Updated IDSA guidelines for HAP/VAP treatment have been published.',
    timestamp: '2024-01-14T16:45:00Z',
    category: 'clinical',
    priority: 'medium',
    isRead: false,
    actionRequired: false
  },
  {
    id: '5',
    type: 'warning',
    title: 'Scheduled Maintenance Tonight',
    message: 'System maintenance scheduled for tonight 11 PM - 1 AM EST. Brief service interruption expected.',
    timestamp: '2024-01-14T14:30:00Z',
    category: 'maintenance',
    priority: 'medium',
    isRead: true,
    actionRequired: false,
    expiresAt: '2024-01-15T01:00:00Z'
  }
];

export const SystemNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<string>('all');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const { toast } = useToast();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'critical': return <Shield className="h-4 w-4 text-red-600" />;
    }
  };

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'system': return <Server className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'clinical': return <Activity className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      case 'maintenance': return <Database className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification list has been updated.",
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed.",
    });
  };

  const handleAction = (notification: Notification) => {
    switch (notification.category) {
      case 'system':
        toast({
          title: "System Action",
          description: "Initiating system update process...",
        });
        break;
      case 'security':
        toast({
          title: "Security Review",
          description: "Opening security incident report...",
        });
        break;
      default:
        toast({
          title: "Action Initiated",
          description: "Processing your request...",
        });
    }
    markAsRead(notification.id);
  };

  const filteredNotifications = notifications.filter(notif => {
    const categoryMatch = filter === 'all' || notif.category === filter;
    const readMatch = !showOnlyUnread || !notif.isRead;
    return categoryMatch && readMatch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">System Notifications</h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Bell className="h-3 w-3" />
              {unreadCount} Unread
            </Badge>
            {urgentCount > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {urgentCount} Urgent
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowOnlyUnread(!showOnlyUnread)}
          >
            {showOnlyUnread ? 'Show All' : 'Unread Only'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Notifications</CardTitle>
            <select 
              className="p-1 border rounded text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="system">System</option>
              <option value="security">Security</option>
              <option value="clinical">Clinical</option>
              <option value="user">User</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <Card 
                  key={notification.id} 
                  className={`border-l-4 ${
                    notification.type === 'critical' ? 'border-l-red-500' :
                    notification.type === 'warning' ? 'border-l-yellow-500' :
                    notification.type === 'success' ? 'border-l-green-500' :
                    notification.type === 'error' ? 'border-l-red-500' :
                    'border-l-blue-500'
                  } ${!notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getIcon(notification.type)}
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <Badge className={getPriorityColor(notification.priority)} variant="default">
                            {notification.priority}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getCategoryIcon(notification.category)}
                            {notification.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                          {notification.expiresAt && (
                            <span className="text-orange-600">
                              Expires: {new Date(notification.expiresAt).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {notification.actionRequired && (
                          <Button 
                            size="sm" 
                            onClick={() => handleAction(notification)}
                          >
                            Take Action
                          </Button>
                        )}
                        {!notification.isRead && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
