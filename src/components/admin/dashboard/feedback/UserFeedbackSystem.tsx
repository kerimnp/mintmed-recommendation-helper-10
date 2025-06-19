
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  User,
  Send,
  Filter
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'suggestion' | 'bug' | 'feature' | 'general';
  title: string;
  description: string;
  rating: number;
  status: 'pending' | 'reviewed' | 'implemented' | 'rejected';
  category: string;
  submittedBy: string;
  submittedAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    type: 'feature',
    title: 'Add dark mode to drug interaction checker',
    description: 'The drug interaction checker would benefit from a dark mode option for night shifts.',
    rating: 5,
    status: 'pending',
    category: 'UI/UX',
    submittedBy: 'Dr. Sarah Johnson',
    submittedAt: '2024-01-15T10:30:00Z',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'bug',
    title: 'Search results not loading in guidelines',
    description: 'When searching for "pneumonia" in guidelines, results take too long to load.',
    rating: 3,
    status: 'reviewed',
    category: 'Performance',
    submittedBy: 'Dr. Michael Chen',
    submittedAt: '2024-01-14T15:45:00Z',
    priority: 'high'
  },
  {
    id: '3',
    type: 'suggestion',
    title: 'Include pediatric dosing calculations',
    description: 'Would be helpful to have automatic pediatric dosing calculations based on weight.',
    rating: 5,
    status: 'implemented',
    category: 'Clinical Features',
    submittedBy: 'Dr. Emily Rodriguez',
    submittedAt: '2024-01-13T09:15:00Z',
    priority: 'medium'
  }
];

interface UserFeedbackSystemProps {
  isAdminView?: boolean;
}

export const UserFeedbackSystem: React.FC<UserFeedbackSystemProps> = ({ isAdminView = false }) => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(mockFeedback);
  const [newFeedback, setNewFeedback] = useState({
    type: 'general' as FeedbackItem['type'],
    title: '',
    description: '',
    rating: 5,
    category: 'General'
  });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const { toast } = useToast();

  const handleSubmitFeedback = () => {
    if (!newFeedback.title.trim() || !newFeedback.description.trim()) {
      toast({
        title: "Incomplete Feedback",
        description: "Please fill in both title and description.",
        variant: "destructive"
      });
      return;
    }

    const feedback: FeedbackItem = {
      id: Date.now().toString(),
      ...newFeedback,
      status: 'pending',
      submittedBy: 'Current User',
      submittedAt: new Date().toISOString(),
      priority: 'medium'
    };

    setFeedbackItems(prev => [feedback, ...prev]);
    setNewFeedback({
      type: 'general',
      title: '',
      description: '',
      rating: 5,
      category: 'General'
    });

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We'll review it soon.",
    });
  };

  const handleStatusUpdate = (id: string, newStatus: FeedbackItem['status']) => {
    setFeedbackItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    );

    toast({
      title: "Status Updated",
      description: `Feedback status changed to ${newStatus}.`,
    });
  };

  const getStatusIcon = (status: FeedbackItem['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'reviewed': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'implemented': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: FeedbackItem['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
    }
  };

  const filteredFeedback = feedbackItems.filter(item => {
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    const typeMatch = filterType === 'all' || item.type === filterType;
    return statusMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">User Feedback System</h2>
        <div className="flex gap-2">
          <Badge variant="outline">{feedbackItems.length} Total</Badge>
          <Badge variant="outline">{feedbackItems.filter(f => f.status === 'pending').length} Pending</Badge>
        </div>
      </div>

      {!isAdminView && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Submit Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Type</label>
                <select 
                  className="w-full mt-1 p-2 border rounded"
                  value={newFeedback.type}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, type: e.target.value as FeedbackItem['type'] }))}
                >
                  <option value="general">General Feedback</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="w-full mt-1 p-2 border rounded"
                  value={newFeedback.category}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="General">General</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Performance">Performance</option>
                  <option value="Clinical Features">Clinical Features</option>
                  <option value="Data Accuracy">Data Accuracy</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Brief summary of your feedback"
                value={newFeedback.title}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Please provide detailed feedback..."
                value={newFeedback.description}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setNewFeedback(prev => ({ ...prev, rating }))}
                    className={`p-1 ${rating <= newFeedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            
            <Button onClick={handleSubmitFeedback} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Feedback Overview</CardTitle>
            <div className="flex gap-2">
              <select 
                className="p-1 border rounded text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="implemented">Implemented</option>
                <option value="rejected">Rejected</option>
              </select>
              <select 
                className="p-1 border rounded text-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="suggestion">Suggestions</option>
                <option value="bug">Bug Reports</option>
                <option value="feature">Feature Requests</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFeedback.map(item => (
              <Card key={item.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge variant="outline" className="capitalize">{item.type}</Badge>
                        <Badge className={getPriorityColor(item.priority)} variant="default">
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.submittedBy}
                        </span>
                        <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                        <span>{item.category}</span>
                        <div className="flex">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <Badge variant="outline" className="capitalize">{item.status}</Badge>
                    </div>
                  </div>
                  
                  {isAdminView && (
                    <div className="flex gap-2 mt-3">
                      {item.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(item.id, 'reviewed')}>
                            Review
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(item.id, 'implemented')}>
                            Implement
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(item.id, 'rejected')}>
                            Reject
                          </Button>
                        </>
                      )}
                      {item.status === 'reviewed' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(item.id, 'implemented')}>
                            Mark Implemented
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(item.id, 'rejected')}>
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
