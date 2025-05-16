
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorProfileDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // This page should be protected, redirect if not logged in
    // Or handle this with a ProtectedRoute component higher up
    navigate('/auth'); // Or to the new login modal logic
    return null; 
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Redirect to home after sign out
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Doctor Profile Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Welcome, Dr. {user.email?.split('@')[0] || 'User'}!</p>
          <p className="mb-4 text-muted-foreground">
            This is a placeholder for your innovative dashboard. Features like real-time patient metrics,
            dynamic timelines, AI-powered clinical panes, and multi-modal input will be developed here.
          </p>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Patient Workload', 'Therapy Progress', 'AI Suggestions', 'Reminders'].map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle>{item}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Content for {item} will appear here.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorProfileDashboard;
