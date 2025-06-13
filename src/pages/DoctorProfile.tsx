
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { EnhancedDoctorProfileCard } from '@/components/doctor/EnhancedDoctorProfileCard';
import { DoctorProfileForm } from '@/components/doctor/DoctorProfileForm';
import { useDoctorProfile, useUpdateDoctorProfile } from '@/hooks/useDoctorProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Loader2, User, Settings, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: doctorProfile, isLoading, error } = useDoctorProfile();
  const updateProfile = useUpdateDoctorProfile();

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
        <MainNavigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-medical-primary mx-auto" />
            <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
        <MainNavigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center p-8 space-y-4">
              <Shield className="h-12 w-12 text-red-500 mx-auto" />
              <h1 className="text-2xl font-bold text-red-600">Error Loading Profile</h1>
              <p className="text-gray-600 dark:text-gray-400">
                There was an error loading your profile. This might be because your profile hasn't been set up yet.
              </p>
              <div className="space-y-2">
                <Button onClick={() => navigate('/admin')} className="w-full">
                  Return to Dashboard
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
                  Retry Loading
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleFormSubmit = async (data: any) => {
    try {
      // Convert certification_expiry Date to string if present
      const submitData = {
        ...data,
        certification_expiry: data.certification_expiry 
          ? (data.certification_expiry instanceof Date 
              ? data.certification_expiry.toISOString().split('T')[0] 
              : data.certification_expiry)
          : undefined,
      };
      
      await updateProfile.mutateAsync(submitData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 mb-4 hover:bg-white dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {isEditing ? 'Edit Profile' : 'Doctor Profile'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {isEditing 
                  ? 'Update your professional information and credentials'
                  : 'Manage your professional information and credentials'
                }
              </p>
            </div>
            
            {!isEditing && doctorProfile && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {isEditing ? (
            <DoctorProfileForm
              doctor={doctorProfile}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsEditing(false)}
              isLoading={updateProfile.isPending}
            />
          ) : (
            doctorProfile && (
              <EnhancedDoctorProfileCard
                doctor={doctorProfile}
                onEdit={() => setIsEditing(true)}
                isOwnProfile={true}
              />
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorProfile;
