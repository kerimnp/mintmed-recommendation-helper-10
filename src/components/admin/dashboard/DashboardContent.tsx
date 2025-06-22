
import React from "react";
import { ResistanceTab } from "./ResistanceTab";
import { AntibioticsTab } from "./AntibioticsTab";
import { RegionalTab } from "./RegionalTab";
import { EffectivenessTab } from "./EffectivenessTab";
import { GuidelinesTab } from "./GuidelinesTab";
import { PremiumEducationTab } from "./education/PremiumEducationTab";
import { PricingTab } from "./PricingTab";
import { ClinicalGuidelines } from "../ClinicalGuidelines";
import { MainDashboardTab } from "./MainDashboardTab";
import { PatientHistoryTab } from "./PatientHistoryTab";
import { UserManagementTab } from "./UserManagementTab";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Subscription from "@/pages/Subscription";

interface DashboardContentProps {
  activeTab: string;
  searchTerm?: string;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ 
  activeTab,
  searchTerm = "" 
}) => {
  const { user } = useAuth();
  const isUserManagementAuthorized = user?.email === 'kerim@horalix.com';
  const isHospitalAdmin = user?.user_metadata?.account_type === 'hospital_admin';

  const renderUserManagementTab = () => {
    if (isUserManagementAuthorized) {
      return <UserManagementTab searchTerm={searchTerm} />;
    }
    return (
      <Card className="mt-4 border-destructive bg-destructive/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle size={24} /> Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>You do not have permission to access the User Management section.</p>
        </CardContent>
      </Card>
    );
  };

  const renderSubscriptionTab = () => {
    if (isHospitalAdmin) {
      return <Subscription />;
    }
    return (
      <Card className="mt-4 border-destructive bg-destructive/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle size={24} /> Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Subscription management is only available for hospital administrators.</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full">
      {activeTab === "dashboard" && <MainDashboardTab searchTerm={searchTerm} />}
      {activeTab === "resistance" && <ResistanceTab searchTerm={searchTerm} />}
      {activeTab === "antibiotics" && <AntibioticsTab searchTerm={searchTerm} />}
      {activeTab === "regional" && <RegionalTab searchTerm={searchTerm} />}
      {activeTab === "effectiveness" && <EffectivenessTab searchTerm={searchTerm} />}
      {activeTab === "guidelines" && <GuidelinesTab searchTerm={searchTerm} />}
      {activeTab === "education" && <PremiumEducationTab searchTerm={searchTerm} />}
      {activeTab === "clinical-guidelines" && <ClinicalGuidelines searchTerm={searchTerm} />}
      {activeTab === "history" && <PatientHistoryTab searchTerm={searchTerm} />}
      {activeTab === "user-management" && renderUserManagementTab()}
      {activeTab === "pricing" && <PricingTab />}
      {activeTab === "subscription" && renderSubscriptionTab()}
    </div>
  );
};
