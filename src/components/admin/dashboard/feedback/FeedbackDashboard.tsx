
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Star, ThumbsUp, AlertCircle } from 'lucide-react';

export const FeedbackDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">User Feedback</h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          Reviews
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold">4.6</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Positive Reviews</p>
                <p className="text-2xl font-bold text-green-600">89%</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Issues</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Excellent recommendation accuracy</div>
                <div className="text-sm text-gray-600">Dr. Sarah Johnson • 5 stars</div>
              </div>
              <Badge className="bg-green-600">Positive</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">User interface could be improved</div>
                <div className="text-sm text-gray-600">Dr. Mike Chen • 3 stars</div>
              </div>
              <Badge className="bg-yellow-600">Neutral</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Great clinical decision support</div>
                <div className="text-sm text-gray-600">Dr. Lisa Park • 5 stars</div>
              </div>
              <Badge className="bg-green-600">Positive</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
