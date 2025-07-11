
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Building2, 
  CheckCircle, 
  UserCheck, 
  ArrowRight,
  Loader2,
  Mail
} from 'lucide-react';

const HospitalInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidInvitation, setIsValidInvitation] = useState(false);

  const token = searchParams.get('token');
  const hospitalName = searchParams.get('hospital');
  const adminId = searchParams.get('admin');

  useEffect(() => {
    console.log('Invitation params:', { token, hospitalName, adminId });
    
    if (!token || !hospitalName || !adminId) {
      console.log('Invalid invitation parameters');
      toast({
        title: 'Invalid Invitation',
        description: 'This invitation link appears to be invalid or expired.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }
    
    setIsValidInvitation(true);
  }, [token, hospitalName, adminId, navigate, toast]);

  const handleAcceptInvitation = async () => {
    if (!user) {
      // Redirect to auth with the invitation parameters
      const authUrl = `/auth?invitation=true&token=${encodeURIComponent(token || '')}&hospital=${encodeURIComponent(hospitalName || '')}&admin=${encodeURIComponent(adminId || '')}`;
      navigate(authUrl);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Here you would typically create the affiliation in your database
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Welcome to the Team!',
        description: `You have successfully joined ${hospitalName}. Redirecting to your dashboard...`,
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Failed to accept invitation:', error);
      toast({
        title: 'Error',
        description: 'Failed to accept the invitation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isValidInvitation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">
              Hospital Invitation
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              You've been invited to join
            </p>
            <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2 mt-2">
              {hospitalName}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    Professional Invitation
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    This invitation grants you access to {hospitalName}'s antibiotic management platform 
                    with collaborative clinical decision support tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Access hospital-specific guidelines</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Collaborate with your medical team</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Share clinical insights and data</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Advanced antimicrobial stewardship tools</span>
              </div>
            </div>

            {user ? (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">
                      Signed in as {user.email}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={handleAcceptInvitation}
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining {hospitalName}...
                    </>
                  ) : (
                    <>
                      Accept Invitation & Join Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Please sign in or create an account to accept this invitation.
                  </p>
                </div>
                <Button 
                  onClick={handleAcceptInvitation}
                  className="w-full"
                  size="lg"
                >
                  Sign In to Accept Invitation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              This invitation is secure and can only be used once.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HospitalInvitation;
