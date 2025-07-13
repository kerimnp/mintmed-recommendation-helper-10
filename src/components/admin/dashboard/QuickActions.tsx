
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  Stethoscope, 
  Users, 
  AlertTriangle, 
  FileText, 
  Activity,
  Plus,
  Search,
  History
} from "lucide-react";

interface QuickActionsProps {
  onActionClick?: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (action: string, route?: string) => {
    if (onActionClick) {
      onActionClick(action);
    }
    
    if (route) {
      navigate(route);
    }
    
    toast({
      title: "Action Initiated",
      description: `${action} has been started.`,
    });
  };

  const quickActions = [
    {
      title: "New Consultation",
      description: "Start antibiotic recommendation",
      icon: Stethoscope,
      action: "new_consultation",
      route: "/advisor"
    },
    {
      title: "Patient Management", 
      description: "View and manage patients",
      icon: Users,
      action: "patient_management",
      route: "/admin?tab=history"
    },
    {
      title: "Review Alerts",
      description: "Check critical notifications",
      icon: AlertTriangle,
      action: "review_alerts",
      route: "/admin?tab=resistance"
    },
    {
      title: "Generate Report",
      description: "Create clinical reports",
      icon: FileText,
      action: "generate_report",
      route: "/admin?tab=effectiveness"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => (
          <Button
            key={action.action}
            onClick={() => handleAction(action.title, action.route)}
            className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            variant="default"
          >
            <action.icon className="h-4 w-4 mr-2" />
            <div className="flex flex-col items-start">
              <span className="font-medium">{action.title}</span>
              <span className="text-xs opacity-90">{action.description}</span>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
