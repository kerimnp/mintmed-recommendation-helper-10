
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle, Pill, Info, Stethoscope, FileText, ArrowRight } from "lucide-react";
import { AvailableDrugs } from "./AvailableDrugs";
import { DrugProduct } from "@/utils/availableDrugsDatabase";
import { availableDrugs } from "@/utils/availableDrugsDatabase";
import { PrescriptionModal } from "./PrescriptionModal";
import { EnhancedAntibioticRecommendation, DetailedRecommendation } from "@/utils/types/recommendationTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface RecommendationProps {
  recommendation: EnhancedAntibioticRecommendation;
}

export const AntibioticRecommendation: React.FC<RecommendationProps> = ({ recommendation }) => {
  const [selectedProduct, setSelectedProduct] = useState<DrugProduct>();
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [activeAntibioticIndex, setActiveAntibioticIndex] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState("primary");

  const handleProductSelect = (product: DrugProduct) => {
    setSelectedProduct(product);
  };

  const getAvailableDrugs = (antibioticName: string) => {
    return availableDrugs[antibioticName] || [];
  };

  const handleAlternativeSelect = (index: number) => {
    setActiveAntibioticIndex(index);
    setActiveTab("alternative");
  };

  // Determine which antibiotic data to show based on the active tab
  const currentAntibiotic = activeTab === "primary" 
    ? recommendation.primaryRecommendation
    : recommendation.alternatives[activeAntibioticIndex] || recommendation.primaryRecommendation;

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="primary" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="primary">Primary Recommendation</TabsTrigger>
          <TabsTrigger value="alternative" disabled={activeAntibioticIndex < 0}>
            Alternative Option {activeAntibioticIndex > -1 ? activeAntibioticIndex + 1 : ""}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="primary" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
              <div className="flex items-center gap-2 mb-4">
                <Pill className="h-6 w-6 text-mint-600" />
                <h3 className="text-2xl font-semibold text-gray-900">Primary Recommendation</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Antibiotic</p>
                    <p className="text-lg font-medium">{recommendation.primaryRecommendation.name}</p>
                    {selectedProduct && activeTab === "primary" && (
                      <p className="text-sm text-mint-600 mt-1">Selected: {selectedProduct.name}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dose</p>
                    <p className="text-lg font-medium">{recommendation.primaryRecommendation.dose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="text-lg font-medium">{recommendation.primaryRecommendation.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-lg font-medium">{recommendation.primaryRecommendation.duration}</p>
                  </div>
                </div>

                <div className="bg-mint-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-5 w-5 text-mint-600" />
                    <p className="text-sm font-medium text-mint-700">Clinical Reasoning</p>
                  </div>
                  <p className="text-gray-700">{recommendation.reasoning}</p>
                </div>
              </div>
            </Card>

            <AvailableDrugs 
              drugName={recommendation.primaryRecommendation.name}
              products={getAvailableDrugs(recommendation.primaryRecommendation.name)}
              onProductSelect={handleProductSelect}
              selectedProduct={activeTab === "primary" ? selectedProduct : undefined}
            />
          </div>
        </TabsContent>

        <TabsContent value="alternative" className="mt-0">
          {activeAntibioticIndex > -1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="h-6 w-6 text-mint-600" />
                  <h3 className="text-2xl font-semibold text-gray-900">Alternative Option {activeAntibioticIndex + 1}</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Antibiotic</p>
                      <p className="text-lg font-medium">{recommendation.alternatives[activeAntibioticIndex].name}</p>
                      {selectedProduct && activeTab === "alternative" && (
                        <p className="text-sm text-mint-600 mt-1">Selected: {selectedProduct.name}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dose</p>
                      <p className="text-lg font-medium">{recommendation.alternatives[activeAntibioticIndex].dose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="text-lg font-medium">{recommendation.alternatives[activeAntibioticIndex].route}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-lg font-medium">{recommendation.alternatives[activeAntibioticIndex].duration}</p>
                    </div>
                  </div>
                  
                  <div className="bg-mint-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-mint-600" />
                      <p className="text-sm font-medium text-mint-700">Clinical Reasoning</p>
                    </div>
                    <p className="text-gray-700">{recommendation.alternatives[activeAntibioticIndex].reason}</p>
                  </div>
                </div>
              </Card>

              <AvailableDrugs 
                drugName={recommendation.alternatives[activeAntibioticIndex].name}
                products={getAvailableDrugs(recommendation.alternatives[activeAntibioticIndex].name)}
                onProductSelect={handleProductSelect}
                selectedProduct={activeTab === "alternative" ? selectedProduct : undefined}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {recommendation.alternatives.length > 0 && activeTab === "primary" && (
        <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-6 w-6 text-mint-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Alternative Options</h3>
          </div>
          <div className="space-y-4">
            {recommendation.alternatives.map((alt, index) => (
              <div key={index} className="border-l-4 border-mint-300 pl-4 flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Antibiotic</p>
                    <p className="text-lg font-medium">{alt.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dose</p>
                    <p className="text-lg font-medium">{alt.dose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="text-lg font-medium">{alt.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-lg font-medium">{alt.duration}</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{alt.reason}</p>
                <Button 
                  variant="outline" 
                  className="self-end mt-2 flex items-center gap-2"
                  onClick={() => handleAlternativeSelect(index)}
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {recommendation.rationale && (
        <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-6 w-6 text-mint-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Clinical Rationale</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Infection Type</p>
                <p className="text-lg font-medium">{recommendation.rationale.infectionType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Severity</p>
                <p className="text-lg font-medium">{recommendation.rationale.severity}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-2">Reasons for Selection</p>
              <ul className="list-disc list-inside space-y-1">
                {recommendation.rationale.reasons.map((reason, index) => (
                  <li key={index} className="text-gray-700">{reason}</li>
                ))}
              </ul>
            </div>
            
            {recommendation.rationale.allergyConsiderations && recommendation.rationale.allergyConsiderations.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Allergy Considerations</p>
                <ul className="list-disc list-inside space-y-1">
                  {recommendation.rationale.allergyConsiderations.map((consideration, index) => (
                    <li key={index} className="text-gray-700">{consideration}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {recommendation.rationale.doseAdjustments && recommendation.rationale.doseAdjustments.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Dose Adjustments</p>
                <ul className="list-disc list-inside space-y-1">
                  {recommendation.rationale.doseAdjustments.map((adjustment, index) => (
                    <li key={index} className="text-gray-700">{adjustment}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}

      {recommendation.precautions.length > 0 && (
        <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            <h3 className="text-2xl font-semibold text-gray-900">Precautions</h3>
          </div>
          <div className="space-y-2">
            {recommendation.precautions.map((precaution, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-orange-50 text-orange-700 border-orange-200 block w-full text-left px-4 py-2"
              >
                {precaution}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {recommendation.calculations && (
        <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-blue-500" />
            <h3 className="text-2xl font-semibold text-gray-900">Dose Calculations</h3>
          </div>
          <div className="space-y-4">
            {recommendation.calculations.weightBased && (
              <div>
                <p className="text-sm text-gray-500">Weight-Based Calculation</p>
                <p className="text-gray-700">{recommendation.calculations.weightBased}</p>
              </div>
            )}
            {recommendation.calculations.renalAdjustment && (
              <div>
                <p className="text-sm text-gray-500">Renal Adjustment</p>
                <p className="text-gray-700">{recommendation.calculations.renalAdjustment}</p>
              </div>
            )}
            {recommendation.calculations.pediatricFactors && (
              <div>
                <p className="text-sm text-gray-500">Pediatric Factors</p>
                <p className="text-gray-700">{recommendation.calculations.pediatricFactors}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      <div className="flex justify-end mt-6">
        <Button 
          className="premium-button"
          onClick={() => setIsPrescriptionModalOpen(true)}
        >
          Print Prescription
        </Button>
      </div>

      <PrescriptionModal
        open={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        recommendationData={
          activeTab === "primary" 
            ? recommendation 
            : {
                ...recommendation,
                primaryRecommendation: recommendation.alternatives[activeAntibioticIndex]
              }
        }
        selectedProduct={selectedProduct}
      />
    </div>
  );
};
