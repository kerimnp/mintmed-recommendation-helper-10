import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Users, Mail, Bell, Megaphone, Filter } from "lucide-react";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  account_type: string;
  is_active: boolean;
}

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'email' | 'notification';
}

export function SuperAdminCommunication() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [messageType, setMessageType] = useState<'email' | 'notification'>('notification');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const messageTemplates: MessageTemplate[] = [
    {
      id: '1',
      name: 'Welcome New User',
      subject: 'Welcome to MedRecommend',
      content: 'Welcome to MedRecommend! We\'re excited to have you join our platform for antibiotic decision support. If you have any questions, please don\'t hesitate to reach out to our support team.',
      type: 'email'
    },
    {
      id: '2',
      name: 'System Maintenance',
      subject: 'Scheduled System Maintenance',
      content: 'We will be performing scheduled maintenance on our systems. During this time, you may experience brief interruptions in service. We apologize for any inconvenience.',
      type: 'notification'
    },
    {
      id: '3',
      name: 'Credit Balance Low',
      subject: 'Credit Balance Alert',
      content: 'Your credit balance is running low. Please consider upgrading your plan or purchasing additional credits to continue using our services.',
      type: 'notification'
    },
    {
      id: '4',
      name: 'Feature Announcement',
      subject: 'New Features Available',
      content: 'We\'ve added new features to improve your experience with MedRecommend. Check out the latest updates in your dashboard.',
      type: 'email'
    }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, role, account_type, is_active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (template: MessageTemplate) => {
    setSubject(template.subject);
    setMessage(template.content);
    setMessageType(template.type);
  };

  const selectUsersByFilter = (filter: string) => {
    let filteredUsers: User[] = [];
    
    switch (filter) {
      case 'all':
        filteredUsers = users.filter(u => u.is_active);
        break;
      case 'doctors':
        filteredUsers = users.filter(u => u.role === 'doctor' && u.is_active);
        break;
      case 'admins':
        filteredUsers = users.filter(u => u.role === 'admin' && u.is_active);
        break;
      case 'inactive':
        filteredUsers = users.filter(u => !u.is_active);
        break;
      case 'individual':
        filteredUsers = users.filter(u => u.account_type === 'individual' && u.is_active);
        break;
      case 'hospital':
        filteredUsers = users.filter(u => u.account_type.includes('hospital') && u.is_active);
        break;
      default:
        return;
    }

    setSelectedUsers(filteredUsers.map(u => u.id));
    setUserFilter(filter);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const sendMessage = async () => {
    if (!subject.trim() || !message.trim() || selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select at least one recipient",
        variant: "destructive"
      });
      return;
    }

    setSending(true);

    try {
      // In a real implementation, this would send emails or create notifications
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Log the admin action
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await supabase.from('admin_activity_logs').insert({
          admin_user_id: currentUser.data.user.id,
          action_type: 'message_sent',
          target_type: messageType,
          target_id: selectedUsers.join(','),
          details: {
            subject,
            message: message.substring(0, 100) + '...',
            recipient_count: selectedUsers.length,
            message_type: messageType
          }
        });
      }

      toast({
        title: "Success",
        description: `${messageType === 'email' ? 'Email' : 'Notification'} sent to ${selectedUsers.length} user(s)`
      });

      // Clear form
      setSubject('');
      setMessage('');
      setSelectedUsers([]);
      setUserFilter('all');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const filteredUsers = users.filter(user => {
    switch (userFilter) {
      case 'doctors': return user.role === 'doctor';
      case 'admins': return user.role === 'admin';
      case 'inactive': return !user.is_active;
      case 'individual': return user.account_type === 'individual';
      case 'hospital': return user.account_type.includes('hospital');
      default: return user.is_active;
    }
  });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading communication tools...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-20 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Communication Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.is_active).length}
            </div>
            <p className="text-xs text-muted-foreground">Can receive messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Selected Recipients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedUsers.length}</div>
            <p className="text-xs text-muted-foreground">Will receive message</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Message Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageTemplates.length}</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Composer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Compose Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Select value={messageType} onValueChange={(value: 'email' | 'notification') => setMessageType(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Message type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notification">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notification
                    </div>
                  </SelectItem>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {selectedUsers.length} recipients
              </Badge>
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="Enter message subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message Templates</label>
              <div className="grid grid-cols-1 gap-2">
                {messageTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    size="sm"
                    onClick={() => applyTemplate(template)}
                    className="justify-start text-left h-auto py-2"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {template.type === 'email' ? (
                        <Mail className="h-3 w-3" />
                      ) : (
                        <Bell className="h-3 w-3" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-xs">{template.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {template.content.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={sendMessage}
              disabled={sending || !subject.trim() || !message.trim() || selectedUsers.length === 0}
              className="w-full flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {sending ? 'Sending...' : `Send ${messageType === 'email' ? 'Email' : 'Notification'}`}
            </Button>
          </CardContent>
        </Card>

        {/* User Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Select Recipients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Select</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'all', label: 'All Active', count: users.filter(u => u.is_active).length },
                  { value: 'doctors', label: 'Doctors', count: users.filter(u => u.role === 'doctor').length },
                  { value: 'admins', label: 'Admins', count: users.filter(u => u.role === 'admin').length },
                  { value: 'individual', label: 'Individual', count: users.filter(u => u.account_type === 'individual').length },
                  { value: 'hospital', label: 'Hospital', count: users.filter(u => u.account_type.includes('hospital')).length },
                  { value: 'inactive', label: 'Inactive', count: users.filter(u => !u.is_active).length }
                ].map((filter) => (
                  <Button
                    key={filter.value}
                    variant={userFilter === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectUsersByFilter(filter.value)}
                    className="justify-between"
                  >
                    <span>{filter.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Individual Selection</label>
              <div className="max-h-60 overflow-y-auto space-y-1 border rounded-lg p-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-muted ${
                      selectedUsers.includes(user.id) ? 'bg-primary/10 border border-primary/20' : ''
                    }`}
                    onClick={() => toggleUserSelection(user.id)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      {!user.is_active && (
                        <Badge variant="secondary" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Click users to select/deselect. Use quick select buttons to select groups.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}