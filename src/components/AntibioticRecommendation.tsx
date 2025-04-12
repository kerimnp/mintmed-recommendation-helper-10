
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DrugProduct } from "@/utils/availableDrugsDatabase";
import { availableDrugs } from "@/utils/availableDrugsDatabase";
import { PrescriptionModal } from "./PrescriptionModal";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AvailableDrugs } from "./AvailableDrugs";
import { PrimaryRecommendation } from "./AntibioticRecommendationSections/PrimaryRecommendation";
import { AlternativeRecommendation } from "./AntibioticRecommendationSections/AlternativeRecommendation";
import { AlternativesList } from "./AntibioticRecommendationSections/AlternativesList";
import { ClinicalRationale } from "./AntibioticRecommendationSections/ClinicalRationale";
import { Precautions } from "./AntibioticRecommendationSections/Precautions";
import { DoseCalculations } from "./AntibioticRecommendationSections/DoseCalculations";

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
    // Extract just the antibiotic name without any additions
    const simplifiedName = antibioticName
      .split('+')[0]  // Take only the first antibiotic if it's a combination
      .split(' ')[0]  // Take just the drug name without dose or other info
      .trim();
    
    return availableDrugs[simplifiedName] || [];
  };

  const handleAlternativeSelect = (index: number) => {
    setActiveAntibioticIndex(index);
    setActiveTab("alternative");
    // Reset selected product when switching antibiotics
    setSelectedProduct(undefined);
  };

  // Determine which antibiotic data to show based on the active tab
  const currentAntibiotic = activeTab === "primary" 
    ? recommendation.primaryRecommendation
    : recommendation.alternatives[activeAntibioticIndex] || recommendation.primaryRecommendation;

  // Extract just the main antibiotic name for product lookup
  const currentAntibioticName = currentAntibiotic.name?.split('+')[0]?.trim() || "";

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
            <PrimaryRecommendation 
              recommendation={recommendation.primaryRecommendation} 
              selectedProduct={activeTab === "primary" ? selectedProduct : undefined}
              isActive={activeTab === "primary"}
            />

            <AvailableDrugs 
              drugName={currentAntibioticName}
              products={getAvailableDrugs(currentAntibioticName)}
              onProductSelect={handleProductSelect}
              selectedProduct={activeTab === "primary" ? selectedProduct : undefined}
            />
          </div>
        </TabsContent>

        <TabsContent value="alternative" className="mt-0">
          {activeAntibioticIndex > -1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AlternativeRecommendation 
                recommendation={recommendation.alternatives[activeAntibioticIndex]} 
                selectedProduct={activeTab === "alternative" ? selectedProduct : undefined}
                index={activeAntibioticIndex}
                isActive={activeTab === "alternative"}
              />

              <AvailableDrugs 
                drugName={recommendation.alternatives[activeAntibioticIndex].name.split('+')[0].trim()}
                products={getAvailableDrugs(recommendation.alternatives[activeAntibioticIndex].name)}
                onProductSelect={handleProductSelect}
                selectedProduct={activeTab === "alternative" ? selectedProduct : undefined}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {recommendation.alternatives.length > 0 && activeTab === "primary" && (
        <AlternativesList 
          alternatives={recommendation.alternatives}
          onSelectAlternative={handleAlternativeSelect}
        />
      )}

      {recommendation.rationale && (
        <ClinicalRationale rationale={recommendation.rationale} />
      )}

      {recommendation.precautions.length > 0 && (
        <Precautions precautions={recommendation.precautions} />
      )}

      {recommendation.calculations && (
        <DoseCalculations calculations={recommendation.calculations} />
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
