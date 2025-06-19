import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewDashboard } from './OverviewDashboard';
import { PatientsDashboard } from './patient/PatientsDashboard';
import { ResistanceDashboard } from './resistance/ResistanceDashboard';
import { RegionalDashboard } from './regional/RegionalDashboard';
import { GuidelinesDashboard } from './guidelines/GuidelinesDashboard';
import { EducationDashboard } from './education/EducationDashboard';
import { AntibioticEffectiveness } from '../resistance/AntibioticEffectiveness';
import { UsersDashboard } from './users/UsersDashboard';
import { EnhancedAnalysisDashboard } from './enhanced/EnhancedAnalysisDashboard';
import { PricingDashboard } from './pricing/PricingDashboard';
import { FeedbackDashboard } from './feedback/FeedbackDashboard';
import { EHRIntegrationDashboard } from '../ehr/EHRIntegrationDashboard';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: any;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  currentUser 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-12">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="patients">Patients</TabsTrigger>
        <TabsTrigger value="resistance">Resistance</TabsTrigger>
        <TabsTrigger value="regional">Regional</TabsTrigger>
        <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="ehr">EHR</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <OverviewDashboard />
      </TabsContent>
      <TabsContent value="patients" className="space-y-4">
        <PatientsDashboard />
      </TabsContent>
      <TabsContent value="resistance" className="space-y-4">
        <ResistanceDashboard />
      </TabsContent>
      <TabsContent value="regional" className="space-y-4">
        <RegionalDashboard />
      </TabsContent>
      <TabsContent value="guidelines" className="space-y-4">
        <GuidelinesDashboard />
      </TabsContent>
      <TabsContent value="education" className="space-y-4">
        <EducationDashboard />
      </TabsContent>
      <TabsContent value="effectiveness" className="space-y-4">
        <AntibioticEffectiveness />
      </TabsContent>
      <TabsContent value="users" className="space-y-4">
        <UsersDashboard />
      </TabsContent>
      <TabsContent value="enhanced" className="space-y-4">
        <EnhancedAnalysisDashboard />
      </TabsContent>
      <TabsContent value="pricing" className="space-y-4">
        <PricingDashboard />
      </TabsContent>
       <TabsContent value="feedback" className="space-y-4">
        <FeedbackDashboard />
      </TabsContent>
      
      <TabsContent value="ehr" className="space-y-4">
        <EHRIntegrationDashboard />
      </TabsContent>
    </Tabs>
  );
};
