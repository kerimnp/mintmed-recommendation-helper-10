
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDoctorProfile } from "@/hooks/useDoctorProfile";
import { 
  Activity,
  Users,
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  Shield,
  Zap,
  Heart,
  Brain,
  Target,
  Award,
  Clock,
  CheckCircle2
} from "lucide-react";
import {
  PremiumGlassCard,
  PremiumMetricCard,
  PremiumStatus,
  PremiumProgressRing,
  PremiumBadge
} from "./PremiumDesignSystem";

interface PremiumMainDashboardProps {
  searchTerm: string;
}

export const PremiumMainDashboard: React.FC<PremiumMainDashboardProps> = ({ searchTerm }) => {
  const { data: doctorProfile } = useDoctorProfile();
  
  const getWelcomeMessage = () => {
    if (doctorProfile?.last_name) {
      return `Welcome back Dr. ${doctorProfile.last_name}`;
    }
    return "Welcome back Doctor";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      {/* Premium Header Section */}
      <motion.div variants={itemVariants}>
        <PremiumGlassCard className="p-8 mb-8" gradient="medical">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <motion.h1 
                className="text-4xl font-bold bg-gradient-to-r from-medical-primary via-blue-600 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {getWelcomeMessage()}
              </motion.h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
                Advanced Clinical Intelligence Platform
              </p>
              <div className="flex items-center gap-2 mt-4">
                <PremiumBadge variant="premium">AI-Powered</PremiumBadge>
                <PremiumBadge variant="success">Hospital Grade</PremiumBadge>
                <PremiumBadge variant="info">Real-time</PremiumBadge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <PremiumProgressRing percentage={96} size="lg" color="#0066cc">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">96%</div>
                  <div className="text-xs text-slate-500">System Health</div>
                </div>
              </PremiumProgressRing>
            </div>
          </div>
        </PremiumGlassCard>
      </motion.div>

      {/* Premium Metrics Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PremiumMetricCard
          title="Active Prescriptions"
          value="2,847"
          change="+18.2% vs last month"
          changeType="positive"
          icon={<Stethoscope className="h-6 w-6" />}
          description="Real-time prescription monitoring with AI validation"
          trend={[45, 52, 48, 61, 67, 58, 74]}
        />
        
        <PremiumMetricCard
          title="Clinical Outcomes"
          value="97.8%"
          change="+2.4% improvement"
          changeType="positive"
          icon={<Target className="h-6 w-6" />}
          description="Evidence-based treatment success rate"
          trend={[89, 91, 93, 95, 96, 97, 98]}
        />
        
        <PremiumMetricCard
          title="Safety Score"
          value="9.6/10"
          change="Excellent rating"
          changeType="positive"
          icon={<Shield className="h-6 w-6" />}
          description="Comprehensive safety and compliance monitoring"
          trend={[9.2, 9.3, 9.4, 9.5, 9.6, 9.6, 9.6]}
        />
        
        <PremiumMetricCard
          title="Response Time"
          value="1.2s"
          change="-0.8s faster"
          changeType="positive"
          icon={<Zap className="h-6 w-6" />}
          description="AI-powered clinical decision support speed"
          trend={[2.1, 1.9, 1.7, 1.5, 1.3, 1.2, 1.2]}
        />
      </motion.div>

      {/* Advanced Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Clinical Intelligence Panel */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <PremiumGlassCard className="p-6" gradient="primary">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                  <Brain className="h-6 w-6 text-medical-primary" />
                  Clinical Intelligence Center
                </CardTitle>
                <PremiumBadge variant="info">Live</PremiumBadge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <PremiumStatus status="excellent" label="Antibiotic Stewardship" value="98.5%" />
                  <PremiumStatus status="good" label="Drug Interaction Alerts" value="Active" />
                  <PremiumStatus status="excellent" label="Resistance Monitoring" value="Real-time" />
                </div>
                <div className="space-y-3">
                  <PremiumStatus status="good" label="Clinical Guidelines" value="Updated" />
                  <PremiumStatus status="warning" label="Critical Alerts" value="3 pending" />
                  <PremiumStatus status="excellent" label="Compliance Rate" value="99.2%" />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Today's Achievements</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">47</div>
                    <div className="text-xs text-blue-600/70">Successful Treatments</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">0</div>
                    <div className="text-xs text-emerald-600/70">Safety Incidents</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-xs text-purple-600/70">Guidelines Applied</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </PremiumGlassCard>

          {/* Real-time Analytics */}
          <PremiumGlassCard className="p-6" gradient="accent">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-emerald-600" />
                Real-time Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <PremiumProgressRing percentage={87} color="#10b981">
                    <div className="text-center">
                      <div className="text-lg font-bold">87%</div>
                      <div className="text-xs text-slate-500">Efficiency</div>
                    </div>
                  </PremiumProgressRing>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Treatment Efficiency</p>
                </div>
                <div className="text-center">
                  <PremiumProgressRing percentage={94} color="#3b82f6">
                    <div className="text-center">
                      <div className="text-lg font-bold">94%</div>
                      <div className="text-xs text-slate-500">Accuracy</div>
                    </div>
                  </PremiumProgressRing>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Diagnostic Accuracy</p>
                </div>
                <div className="text-center">
                  <PremiumProgressRing percentage={99} color="#8b5cf6">
                    <div className="text-center">
                      <div className="text-lg font-bold">99%</div>
                      <div className="text-xs text-slate-500">Uptime</div>
                    </div>
                  </PremiumProgressRing>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">System Uptime</p>
                </div>
              </div>
            </CardContent>
          </PremiumGlassCard>
        </motion.div>

        {/* Quick Actions & System Status */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Premium Quick Actions */}
          <PremiumGlassCard className="p-6" gradient="secondary">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-medical-primary to-blue-600 hover:from-medical-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30">
                <FileText className="h-4 w-4 mr-2" />
                New Clinical Assessment
              </Button>
              <Button variant="outline" className="w-full border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20">
                <Users className="h-4 w-4 mr-2" />
                Patient Management
              </Button>
              <Button variant="outline" className="w-full border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-700 dark:hover:bg-emerald-900/20">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics Dashboard
              </Button>
              <Button variant="outline" className="w-full border-amber-200 hover:border-amber-300 hover:bg-amber-50 dark:border-amber-700 dark:hover:bg-amber-900/20">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </PremiumGlassCard>

          {/* System Health Monitor */}
          <PremiumGlassCard className="p-6" gradient="medical">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Database Performance</span>
                  <PremiumBadge variant="success">Optimal</PremiumBadge>
                </div>
                <Progress value={98} className="h-2 bg-slate-200 dark:bg-slate-700">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500" />
                </Progress>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">AI Processing</span>
                  <PremiumBadge variant="success">Active</PremiumBadge>
                </div>
                <Progress value={94} className="h-2 bg-slate-200 dark:bg-slate-700">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500" />
                </Progress>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Security Status</span>
                  <PremiumBadge variant="success">Secure</PremiumBadge>
                </div>
                <Progress value={100} className="h-2 bg-slate-200 dark:bg-slate-700">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" />
                </Progress>
              </div>
            </CardContent>
          </PremiumGlassCard>

          {/* Today's Schedule */}
          <PremiumGlassCard className="p-6" gradient="primary">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Completed Reviews</span>
                </div>
                <PremiumBadge variant="info">28</PremiumBadge>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Pending Actions</span>
                </div>
                <PremiumBadge variant="warning">5</PremiumBadge>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Critical Alerts</span>
                </div>
                <PremiumBadge variant="error">2</PremiumBadge>
              </div>
            </CardContent>
          </PremiumGlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};
