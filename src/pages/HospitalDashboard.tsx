
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { HospitalOnboarding } from "@/components/hospital/HospitalOnboarding";
import { HospitalManagement } from "@/components/hospital/HospitalManagement";

const HospitalDashboard = () => {
  const { user, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true); // Mock state - will be from DB later

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !session) {
      navigate("/auth");
      return;
    }

    // Redirect non-hospital admins
    if (!authLoading && user && user.user_metadata?.account_type !== 'hospital_admin') {
      console.log("Non-hospital admin attempting to access hospital dashboard");
      navigate("/");
      return;
    }
  }, [authLoading, session, user, navigate]);

  if (!mounted || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session || user?.user_metadata?.account_type !== 'hospital_admin') {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {isFirstTime ? (
          <HospitalOnboarding 
            user={user} 
            onComplete={() => setIsFirstTime(false)} 
          />
        ) : (
          <HospitalManagement user={user} />
        )}
      </motion.div>
    </div>
  );
};

export default HospitalDashboard;
