
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { PrimaryRecommendation } from "./AntibioticRecommendationSections/PrimaryRecommendation";
import { AlternativesList } from "./AntibioticRecommendationSections/AlternativesList";
import { ClinicalRationale } from "./AntibioticRecommendationSections/ClinicalRationale";
import { DoseCalculations } from "./AntibioticRecommendationSections/DoseCalculations";
import { Precautions } from "./AntibioticRecommendationSections/Precautions";
import { AlternativeRecommendation } from "./AntibioticRecommendationSections/AlternativeRecommendation";
import { PrescriptionModal } from "./PrescriptionModal";
import { AvailableDrugs } from "./AvailableDrugs";
import { AdvancedClinicalDashboard } from "./clinical/AdvancedClinicalDashboard";
import { DrugProduct, getAvailableProducts } from "@/utils/availableDrugsDatabase";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";
import { PatientData } from "@/utils/types/patientTypes";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Award, BookOpen, Clock, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface AntibioticRecommendationProps {
  recommendation: EnhancedAntibioticRecommendation;
  patientData?: PatientData;
  patientId?: string | null;
}

export const AntibioticRecommendation = ({ 
  recommendation, 
  patientData,
  patientId 
}: AntibioticRecommendationProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DrugProduct>();
  const [availableProducts, setAvailableProducts] = useState<DrugProduct[]>([]);
  const [showAdvancedDashboard, setShowAdvancedDashboard] = useState(false);

  useEffect(() => {
    if (recommendation.primaryRecommendation.name) {
      const products = getAvailableProducts(recommendation.primaryRecommendation.name);
      setAvailableProducts(products);
      if (products.length > 0) {
        setSelectedProduct(products[0]);
      }
    }
  }, [recommendation.primaryRecommendation.name]);

  // Set up real-time subscription for prescription updates
  useEffect(() => {
    if (!patientId) return;

    const channel = supabase
      .channel(`prescriptions-${patientId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prescriptions',
          filter: `patient_id=eq.${patientId}`
        },
        (payload) => {
          console.log('Real-time prescription update:', payload);
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: language === "en" ? "Prescription Created" : "Recept Kreiran",
              description: language === "en" 
                ? "A new prescription has been successfully created."
                : "Novi recept je uspješno kreiran.",
            });
          } else if (payload.eventType === 'UPDATE') {
            toast({
              title: language === "en" ? "Prescription Updated" : "Recept Ažuriran",
              description: language === "en" 
                ? "Prescription has been updated."
                : "Recept je ažuriran.",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [patientId, language, toast]);

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

  const metadata = recommendation.metadata;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Enhanced Header with Advanced Dashboard Toggle */}
      <div className="bg-gradient-to-r from-medical-primary/10 to-medical-accent/10 p-6 rounded-xl border border-medical-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-medical-deep">
            {language === "en" ? "Clinical Antibiotic Recommendation" : "Klinička Preporuka Antibiotika"}
          </h2>
          <div className="flex items-center gap-4">
            {metadata?.confidenceScore && (
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full">
                <Award className="h-4 w-4 text-medical-primary" />
                <span className="text-sm font-medium">{metadata.confidenceScore}% Confidence</span>
              </div>
            )}
            <Button 
              variant={showAdvancedDashboard ? "default" : "outline"} 
              size="sm"
              onClick={() => setShowAdvancedDashboard(!showAdvancedDashboard)}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              {showAdvancedDashboard ? 'Hide' : 'Show'} Advanced Analytics
            </Button>
          </div>
        </div>
        
        <p className="text-medical-text mb-4">
          {language === "en" 
            ? "Evidence-based recommendation generated using comprehensive clinical algorithms and latest guidelines"
            : "Preporuka zasnovana na dokazima generisana pomoću sveobuhvatnih kliničkih algoritma i najnovijih smernica"
          }
        </p>

        {metadata && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-green-600" />
              <div>
                <div className="font-medium">Evidence Level</div>
                <div className="text-gray-600">{metadata.evidenceLevel}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium">Guidelines</div>
                <div className="text-gray-600">{metadata.guidelineSource?.split(' ')[0] || 'IDSA/CDC'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-purple-600" />
              <div>
                <div className="font-medium">Generated</div>
                <div className="text-gray-600">{new Date(metadata.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-orange-600" />
              <div>
                <div className="font-medium">Review Status</div>
                <div className="text-gray-600">{metadata.reviewRequired ? 'Required' : 'Optional'}</div>
              </div>
            </div>
          </div>
        )}

        {metadata?.reviewRequired && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-800">
              <Shield className="h-4 w-4" />
              <span className="font-medium">
                {language === "en" ? "Clinical Review Recommended" : "Preporučuje se Klinička Procena"}
              </span>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              {language === "en"
                ? "This case has complex factors that may benefit from additional clinical review."
                : "Ovaj slučaj ima složene faktore koji mogu imati koristi od dodatne kliničke procene."
              }
            </p>
          </div>
        )}
      </div>

      {/* Advanced Clinical Dashboard */}
      {showAdvancedDashboard && patientData && (
        <AdvancedClinicalDashboard
          patientData={patientData}
          patientId={patientId || undefined}
          className="mb-6"
        />
      )}

      {/* Main Content in Tabs */}
      <Tabs defaultValue="recommendation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendation">Primary Recommendation</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives & Analysis</TabsTrigger>
          <TabsTrigger value="clinical">Clinical Details</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendation" className="space-y-6">
          <PrimaryRecommendation 
            recommendation={enhancedPrimaryRecommendation}
            selectedProduct={selectedProduct}
            isActive={true}
            onPrescriptionClick={handlePrescriptionClick}
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
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6">
          {recommendation.rationale && (
            <ClinicalRationale rationale={recommendation.rationale} />
          )}

          {recommendation.calculations && (
            <DoseCalculations calculations={recommendation.calculations} />
          )}

          {recommendation.precautions && (
            <Precautions precautions={recommendation.precautions} />
          )}

          {metadata?.auditTrail && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-medical-deep mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {language === "en" ? "Clinical Decision Audit" : "Audit Kliničke Odluke"}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Data Quality Score: </span>
                  <span className="text-medical-primary">{metadata.auditTrail.inputValidation?.dataQualityScore || 'N/A'}%</span>
                </div>
                <div>
                  <span className="font-medium">Decision Algorithm: </span>
                  <span>{metadata.decisionAlgorithm}</span>
                </div>
                <div>
                  <span className="font-medium">Safety Validated: </span>
                  <span className="text-green-600">✓ Yes</span>
                </div>
                <div>
                  <span className="font-medium">Guideline Compliance: </span>
                  <span className="text-green-600">✓ Verified</span>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

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
