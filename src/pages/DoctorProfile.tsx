
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { DoctorProfileCard } from '@/components/doctor/DoctorProfileCard';
import { DoctorProfileForm } from '@/components/doctor/DoctorProfileForm';
import { useDoctorProfile, useUpdateDoctorProfile } from '@/hooks/useDoctorProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <MainNavigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-medical-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <MainNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
            <p className="text-gray-600 mb-4">There was an error loading your profile.</p>
            <Button onClick={() => navigate('/admin')}>
              Return to Dashboard
            </Button>
          </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isEditing ? 'Edit Profile' : 'Doctor Profile'}
            </h1>
            <p className="text-gray-600">
              {isEditing 
                ? 'Update your professional information and credentials'
                : 'Manage your professional information and credentials'
              }
            </p>
          </div>

          {isEditing ? (
            <DoctorProfileForm
              doctor={doctorProfile}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsEditing(false)}
              isLoading={updateProfile.isPending}
            />
          ) : (
            doctorProfile && (
              <DoctorProfileCard
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
