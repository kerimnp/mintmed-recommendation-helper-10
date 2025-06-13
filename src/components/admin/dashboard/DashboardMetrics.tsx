
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Pill, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  description 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${getChangeColor()}`}>
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Active Prescriptions"
        value="1,234"
        change="+12% from last month"
        changeType="positive"
        icon={<Pill className="h-4 w-4 text-muted-foreground" />}
        description="Currently active antibiotic prescriptions"
      />
      
      <MetricCard
        title="Patient Outcomes"
        value="94.2%"
        change="+2.1% from last month"
        changeType="positive"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        description="Successful treatment completion rate"
      />
      
      <MetricCard
        title="Drug Interactions"
        value="23"
        change="-8% from last month"
        changeType="positive"
        icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
        description="Potential interactions flagged this month"
      />
      
      <MetricCard
        title="Compliance Rate"
        value="87.5%"
        change="+5.2% from last month"
        changeType="positive"
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        description="Guideline adherence rate"
      />
    </div>
  );
};
