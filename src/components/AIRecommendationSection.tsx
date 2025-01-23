import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Bot } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface AIRecommendationSectionProps {
  isLoading: boolean;
  recommendation: string | null;
  onGetRecommendation: () => void;
}

export const AIRecommendationSection: React.FC<AIRecommendationSectionProps> = ({
  isLoading,
  recommendation,
  onGetRecommendation
}) => {
  const { toast } = useToast();

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            AI Recommendation
          </h2>
        </div>
        <Button
          onClick={onGetRecommendation}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Recommendation...
            </>
          ) : (
            "Get AI Recommendation"
          )}
        </Button>
      </div>

      {recommendation && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300">
            {recommendation}
          </pre>
        </div>
      )}
    </Card>
  );
};