
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface WizardStepData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  hasError?: boolean;
  isActive: boolean;
}

interface WizardStepsProps {
  steps: WizardStepData[];
  onStepClick: (stepId: string) => void;
}

export const WizardSteps: React.FC<WizardStepsProps> = ({ steps, onStepClick }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <Card 
          key={step.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            step.isActive 
              ? 'ring-2 ring-medical-primary shadow-lg bg-medical-primary/5' 
              : step.isCompleted 
                ? 'bg-green-50 border-green-200' 
                : step.hasError 
                  ? 'bg-red-50 border-red-200'
                  : 'hover:bg-gray-50'
          }`}
          onClick={() => onStepClick(step.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {step.isCompleted ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : step.hasError ? (
                  <AlertCircle className="h-6 w-6 text-red-600" />
                ) : step.isActive ? (
                  <div className="h-6 w-6 rounded-full bg-medical-primary flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{index + 1}</span>
                  </div>
                ) : (
                  <Circle className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${step.isActive ? 'text-medical-primary' : 'text-gray-900'}`}>
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 truncate">{step.subtitle}</p>
              </div>
              {step.isCompleted && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  {language === "en" ? "Complete" : "Završeno"}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
