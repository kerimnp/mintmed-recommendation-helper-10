
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { PrimaryRecommendation } from "./AntibioticRecommendationSections/PrimaryRecommendation";
import { AlternativesList } from "./AntibioticRecommendationSections/AlternativesList";
import { ClinicalRationale } from "./AntibioticRecommendationSections/ClinicalRationale";
import { DoseCalculations } from "./AntibioticRecommendationSections/DoseCalculations";
import { Precautions } from "./AntibioticRecommendationSections/Precautions";
import { AlternativeRecommendation } from "./AntibioticRecommendationSections/AlternativeRecommendation";
import { DrugSelectionModal } from "./DrugSelectionModal";
import { PrescriptionModal } from "./PrescriptionModal";
import { AvailableDrugs } from "./AvailableDrugs";
import { DrugProduct, getAvailableProducts } from "@/utils/availableDrugsDatabase";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

interface AntibioticRecommendationProps {
  recommendation: EnhancedAntibioticRecommendation;
  patientId?: string | null;
}

export const AntibioticRecommendation = ({ recommendation, patientId }: AntibioticRecommendationProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DrugProduct>();
  const [availableProducts, setAvailableProducts] = useState<DrugProduct[]>([]);

  useEffect(() => {
    if (recommendation.primaryRecommendation.name) {
      const products = getAvailableProducts(recommendation.primaryRecommendation.name);
      setAvailableProducts(products);
      if (products.length > 0) {
        setSelectedProduct(products[0]);
      }
    }
  }, [recommendation.primaryRecommendation.name]);

  const handlePrescriptionClick = () => {
    setIsPrescriptionModalOpen(true);
  };

  const handleProductSelect = (product: DrugProduct) => {
    setSelectedProduct(product);
  };

  // Add reason to alternatives if missing and ensure all required properties are present
  const enhancedAlternatives = recommendation.alternatives?.map(alt => ({
    ...alt,
    reason: alt.reason || "Alternative treatment option"
  })) || [];

  // Create enhanced primary recommendation with reason
  const enhancedPrimaryRecommendation = {
    ...recommendation.primaryRecommendation,
    frequency: recommendation.primaryRecommendation.frequency || "As directed",
    reason: recommendation.reasoning || "Primary treatment recommendation based on patient profile"
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-medical-primary/10 to-medical-accent/10 p-6 rounded-xl border border-medical-primary/20">
        <h2 className="text-3xl font-bold text-medical-deep mb-2">
          {language === "en" ? "Antibiotic Recommendation" : "Preporuka Antibiotika"}
        </h2>
        <p className="text-medical-text">
          {language === "en" 
            ? "Based on the patient data provided, here are the recommended treatment options:"
            : "Na osnovu pruženih podataka o pacijentu, evo preporučenih opcija lečenja:"
          }
        </p>
      </div>

      <PrimaryRecommendation 
        recommendation={enhancedPrimaryRecommendation}
        selectedProduct={selectedProduct}
        isActive={true}
      />

      {availableProducts.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-medical-deep mb-4">
            {language === "en" ? "Available Products" : "Dostupni Proizvodi"}
          </h3>
          <AvailableDrugs 
            drugName={recommendation.primaryRecommendation.name}
            products={availableProducts}
            selectedProduct={selectedProduct}
            onProductSelect={handleProductSelect}
          />
        </Card>
      )}

      {enhancedAlternatives && enhancedAlternatives.length > 0 && (
        <AlternativesList 
          alternatives={enhancedAlternatives} 
          onSelectAlternative={() => {}} 
        />
      )}

      {enhancedAlternatives && enhancedAlternatives.map((alt, index) => (
        <AlternativeRecommendation 
          key={index} 
          recommendation={alt} 
          index={index}
          isActive={false}
        />
      ))}

      {recommendation.rationale && (
        <ClinicalRationale rationale={recommendation.rationale} />
      )}

      {recommendation.calculations && (
        <DoseCalculations calculations={recommendation.calculations} />
      )}

      {recommendation.precautions && (
        <Precautions precautions={recommendation.precautions} />
      )}

      <PrescriptionModal
        open={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        recommendationData={recommendation}
        selectedProduct={selectedProduct}
        patientId={patientId}
      />
    </div>
  );
};
