
import React, { useState, useEffect } from "react";
import { PatientDemographicsSection } from "./PatientDemographicsSection";
import { InfectionDetailsSection } from "./InfectionDetailsSection";
import { AllergySection } from "./AllergySection";
import { ComorbiditySection } from "./ComorbiditySection";
import { FormActions } from "./PatientFormSections/FormActions";
import { FormHeader } from "./PatientFormSections/FormHeader";
import { useFormValidation } from "./PatientFormSections/FormValidation";
import { RenalFunctionSection } from "./RenalFunctionSection";
import { MedicationHistorySection } from "./MedicationHistorySection";
import { LabResultsSection } from "./LabResultsSection";
import { PatientData } from "@/utils/types/patientTypes";

// Import the clinical integration component
import { ClinicalIntegration } from "./scanner/integration/ClinicalIntegration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scan, User, AlertTriangle } from "lucide-react";

interface PatientFormProps {
  patientData: PatientData;
  setPatientData: (data: PatientData) => void;
  onSubmit: (data: PatientData) => void;
  isLoading: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  patientData,
  setPatientData,
  onSubmit,
  isLoading
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrors, setShowErrors] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");
  const [scannerDataAvailable, setScannerDataAvailable] = useState(false);

  // Create section refs for validation
  const sectionRefs = {
    demographics: React.useRef<HTMLDivElement>(null),
    infection: React.useRef<HTMLDivElement>(null)
  };

  const { validateForm } = useFormValidation(patientData, setErrors, setShowErrors, sectionRefs);

  // Handle patient data from scanner integration
  const handlePatientDataFromScanner = (scannedData: any) => {
    console.log('Received patient data from scanner:', scannedData);
    
    // Merge scanned data with existing patient data
    const mergedData: PatientData = {
      ...patientData,
      // Demographics from scanner
      age: scannedData.age || patientData.age,
      gender: scannedData.gender || patientData.gender,
      region: scannedData.region || patientData.region,
      nationality: scannedData.nationality || patientData.nationality,
      
      // Contact information (stored but not used in recommendations)
      firstName: scannedData.firstName,
      lastName: scannedData.lastName,
      contactPhone: scannedData.contactPhone || '',
      contactEmail: scannedData.contactEmail || '',
      address: scannedData.address,
      
      // Keep existing clinical data (scanner doesn't provide this)
      infectionSites: patientData.infectionSites,
      symptoms: patientData.symptoms,
      duration: patientData.duration,
      severity: patientData.severity,
      isHospitalAcquired: patientData.isHospitalAcquired || false,
      allergies: patientData.allergies,
      resistances: patientData.resistances,
      kidneyDisease: patientData.kidneyDisease,  
      liverDisease: patientData.liverDisease,
      diabetes: patientData.diabetes,
      immunosuppressed: patientData.immunosuppressed,
      creatinine: patientData.creatinine,
      weight: patientData.weight,
      height: patientData.height
    };
    
    setPatientData(mergedData);
    setScannerDataAvailable(true);
    
    // Switch to manual tab to review/complete the form
    setActiveTab("manual");
  };

  const handleScannerError = (error: string) => {
    console.error('Scanner error:', error);
    setErrors(prev => ({ ...prev, scanner: error }));
    setShowErrors(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setErrors({});
      setShowErrors(false);
      onSubmit(patientData);
    }
  };

  const updateField = (field: keyof PatientData, value: any) => {
    setPatientData({ ...patientData, [field]: value });
    
    // Clear related errors when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    const updatedAllergies = {
      ...patientData.allergies,
      [allergy]: checked
    };
    updateField('allergies', updatedAllergies);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <FormHeader errors={errors} showErrors={showErrors} />
      
      {/* Enhanced Form with Scanner Integration */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="scanner" className="flex items-center gap-2">
                <Scan className="h-4 w-4" />
                Health Card Scanner
                {scannerDataAvailable && (
                  <Badge variant="secondary" className="ml-2">
                    Data Available
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Manual Entry
                {scannerDataAvailable && (
                  <Badge variant="outline" className="ml-2">
                    Review Required
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scanner" className="space-y-6">
              <ClinicalIntegration 
                onPatientDataExtracted={handlePatientDataFromScanner}
                onError={handleScannerError}
              />
            </TabsContent>

            <TabsContent value="manual" className="space-y-6">
              {scannerDataAvailable && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Scanner Data Integrated</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Patient demographics have been auto-populated from the health card scan. 
                    Please review all information and complete the clinical details below.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div ref={sectionRefs.demographics}>
                  <PatientDemographicsSection
                    formData={{
                      age: patientData.age?.toString() || "",
                      gender: patientData.gender || "",
                      weight: patientData.weight?.toString() || "",
                      height: patientData.height?.toString() || "",
                      nationality: patientData.nationality || patientData.region || "",
                      pregnancy: patientData.pregnancy || "",
                      firstName: patientData.firstName || "",
                      lastName: patientData.lastName || "",
                      contactPhone: patientData.contactPhone || "",
                      contactEmail: patientData.contactEmail || "",
                      address: patientData.address || ""
                    }}
                    onInputChange={(field, value) => {
                      // Handle nationality mapping to region for backwards compatibility
                      if (field === 'nationality') {
                        updateField('region', value);
                        updateField('nationality', value);
                      } else {
                        updateField(field as keyof PatientData, value);
                      }
                    }}
                    errors={errors}
                  />
                </div>

                <div ref={sectionRefs.infection}>
                  <InfectionDetailsSection
                    formData={{
                      infectionSites: patientData.infectionSites,
                      symptoms: patientData.symptoms,
                      duration: patientData.duration,
                      severity: patientData.severity,
                      isHospitalAcquired: patientData.isHospitalAcquired || false
                    }}
                    onInputChange={updateField}
                    errors={errors}
                  />
                </div>

                <AllergySection
                  allergies={patientData.allergies}
                  onAllergyChange={handleAllergyChange}
                />

                <ComorbiditySection
                  formData={patientData}
                  onInputChange={updateField}
                />

                <RenalFunctionSection
                  formData={{
                    creatinine: patientData.creatinine,
                    age: patientData.age,
                    gender: patientData.gender,
                    weight: patientData.weight
                  }}
                  onInputChange={updateField}
                  errors={errors}
                />

                <MedicationHistorySection
                  formData={{
                    recentAntibiotics: patientData.recentAntibiotics || false,
                    allergies: patientData.allergies,
                    otherAllergies: patientData.otherAllergies || ""
                  }}
                  onInputChange={updateField}
                />

                <LabResultsSection
                  formData={{
                    labResults: patientData.labResults
                  }}
                  onInputChange={updateField}
                />

                <FormActions
                  isSubmitting={isLoading}
                  disabled={Object.keys(errors).length > 0}
                />
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
