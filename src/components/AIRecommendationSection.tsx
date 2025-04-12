
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Bot, AlertCircle } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { AntibioticRecommendation } from "./AntibioticRecommendation";
import { Alert, AlertDescription } from "./ui/alert";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";
import { motion } from "framer-motion";

interface AIRecommendationSectionProps {
  isLoading: boolean;
  recommendation: EnhancedAntibioticRecommendation | null;
  onGetRecommendation: () => void;
}

export const AIRecommendationSection: React.FC<AIRecommendationSectionProps> = ({
  isLoading,
  recommendation,
  onGetRecommendation
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg space-y-4 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-medical-primary" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              AI Recommendation
            </h2>
          </div>
          <Button
            onClick={onGetRecommendation}
            disabled={isLoading}
            className="w-full sm:w-auto bg-medical-primary hover:bg-medical-primary-hover text-white rounded-full h-11"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Patient Data...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Get AI Analysis
              </>
            )}
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-medical-primary" />
              <p className="text-sm text-gray-600">
                AI is analyzing patient data and generating personalized recommendations...
              </p>
            </div>
          </div>
        )}

        {!isLoading && !recommendation && (
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-600">
              Click the button above to get an AI-powered antibiotic recommendation based on your patient data.
            </p>
          </div>
        )}

        {!isLoading && recommendation && (
          <div className="mt-4">
            <AntibioticRecommendation recommendation={recommendation} />
          </div>
        )}
      </Card>
    </motion.div>
  );
};
