
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
      route: "/advisor",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Patient Management", 
      description: "View and manage patients",
      icon: Users,
      action: "patient_management",
      route: "/admin?tab=history",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Review Alerts",
      description: "Check critical notifications",
      icon: AlertTriangle,
      action: "review_alerts",
      route: "/admin?tab=resistance",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Generate Report",
      description: "Create clinical reports",
      icon: FileText,
      action: "generate_report",
      route: "/admin?tab=effectiveness",
      color: "bg-purple-500 hover:bg-purple-600"
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
            className={`w-full justify-start text-white ${action.color}`}
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
