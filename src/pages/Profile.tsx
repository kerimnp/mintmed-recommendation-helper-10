
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDoctorProfile, useUpdateDoctorProfile } from '@/hooks/useDoctorProfile';
import { DoctorProfileForm } from '@/components/doctor/DoctorProfileForm';
import { PasswordChangeForm } from '@/components/profile/PasswordChangeForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Loader2, User, Lock } from 'lucide-react';
import { useTheme } from 'next-themes';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useDoctorProfile();
  const updateProfile = useUpdateDoctorProfile();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Redirect to auth if not authenticated
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
        <Loader2 className="h-12 w-12 animate-spin text-medical-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleProfileUpdate = (data: any) => {
    updateProfile.mutate(data);
  };

  const handleGoBack = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                  : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
                } 
                alt="Horalix Logo" 
                className="h-8 w-auto" 
              />
              <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Profile Settings
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your profile information and security
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            User Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Update your personal information and security settings
          </p>
        </div>

        {/* Current User Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                <p className="text-gray-900 dark:text-white">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Created</label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile Information
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <DoctorProfileForm
              doctor={profile}
              onSubmit={handleProfileUpdate}
              isLoading={updateProfile.isPending}
            />
          </TabsContent>
          
          <TabsContent value="security">
            <PasswordChangeForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
