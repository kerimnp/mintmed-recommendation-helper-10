
import React, { useState, useRef } from "react";
import { Card } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { generateAdvancedRecommendation } from "@/utils/antibioticRecommendations/index";
import { AntibioticRecommendation } from "./AntibioticRecommendation";
import { AllergySection } from "./AllergySection";
import { RenalFunctionSection } from "./RenalFunctionSection";
import { PatientDemographicsSection } from "./PatientDemographicsSection";
import { ComorbiditySection } from "./ComorbiditySection";
import { InfectionDetailsSection } from "./InfectionDetailsSection";
import { LabResultsSection } from "./LabResultsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";
import { FormHeader } from "./PatientFormSections/FormHeader";
import { FormActions } from "./PatientFormSections/FormActions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SectionHeaderProps {
  number: number;
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-medical-primary to-medical-accent text-white font-bold text-lg shadow-lg">
          {number}
        </div>
        <div className="h-px bg-gradient-to-r from-medical-primary/20 via-medical-primary/40 to-medical-primary/20 flex-1 max-w-20"></div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  );
};

export const PatientForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const { user } = useAuth();
  const [recommendation, setRecommendation] = useState<EnhancedAntibioticRecommendation | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPatientId, setCreatedPatientId] = useState<string | null>(null);
  
  const sectionRefs = {
    demographics: useRef<HTMLDivElement>(null),
    infection: useRef<HTMLDivElement>(null),
  };
  
  const [formData, setFormData] = useState({
    age: "",
    gender: "" as "" | "male" | "female",
    weight: "",
    height: "",
    region: "",
    pregnancy: "",
    infectionSites: [] as string[],
    symptoms: "",
    duration: "",
    severity: "" as "" | "mild" | "moderate" | "severe",
    creatinine: "",
    recentAntibiotics: false,
    isHospitalAcquired: false,
    allergies: {
      penicillin: false,
      cephalosporin: false,
      sulfa: false,
      macrolide: false,
      fluoroquinolone: false
    },
    kidneyDisease: false,
    liverDisease: false,
    diabetes: false,
    immunosuppressed: false,
    resistances: {
      mrsa: false,
      vre: false,
      esbl: false,
      cre: false,
      pseudomonas: false
    },
    labResults: null,
    // Additional patient fields for database storage
    firstName: "",
    lastName: "",
    contactPhone: "",
    contactEmail: "",
    address: "",
    nationality: ""
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Required fields validation
    if (!formData.infectionSites || formData.infectionSites.length === 0) {
      newErrors.infectionSites = t.errors?.requiredField || "Infection site is required";
    }
    
    if (!formData.severity) {
      newErrors.severity = t.errors?.requiredField || "Severity is required";
    }

    // Validate optional fields if provided
    if (formData.age && (Number(formData.age) < 0 || Number(formData.age) > 120)) {
      newErrors.age = t.errors?.invalidAge || "Please enter a valid age";
    }

    if (formData.weight && (Number(formData.weight) <= 0 || Number(formData.weight) > 500)) {
      newErrors.weight = t.errors?.invalidWeight || "Please enter a valid weight";
    }

    if (formData.height && (Number(formData.height) <= 0 || Number(formData.height) > 300)) {
      newErrors.height = t.errors?.invalidHeight || "Please enter a valid height";
    }

    setErrors(newErrors);
    setShowErrors(true);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      let sectionToScroll: keyof typeof sectionRefs;

      if (['age', 'gender', 'weight', 'height'].includes(firstErrorField)) {
        sectionToScroll = 'demographics';
      } else {
        sectionToScroll = 'infection';
      }

      sectionRefs[sectionToScroll]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const createPatientRecord = async () => {
    if (!user) {
      throw new Error('User must be authenticated to create patient records');
    }

    // Calculate DOB from age if provided
    let dateOfBirth = new Date();
    if (formData.age) {
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - parseInt(formData.age);
      dateOfBirth = new Date(birthYear, 0, 1);
    }

    // Prepare allergies array
    const allergiesArray = Object.entries(formData.allergies)
      .filter(([_, isAllergic]) => isAllergic)
      .map(([allergen, _]) => allergen);

    // Prepare known conditions array
    const conditionsArray = [];
    if (formData.kidneyDisease) conditionsArray.push('Kidney Disease');
    if (formData.liverDisease) conditionsArray.push('Liver Disease');
    if (formData.diabetes) conditionsArray.push('Diabetes');
    if (formData.immunosuppressed) conditionsArray.push('Immunosuppressed');

    const patientData = {
      first_name: formData.firstName || `Patient-${Date.now()}`,
      last_name: formData.lastName || 'Unknown',
      date_of_birth: dateOfBirth.toISOString().split('T')[0],
      gender: formData.gender || null,
      contact_phone: formData.contactPhone || null,
      contact_email: formData.contactEmail || null,
      address: formData.address || null,
      allergies: allergiesArray,
      known_conditions: conditionsArray,
      attending_physician_id: user.id,
      notes: `Created from recommendation form. Infection sites: ${formData.infectionSites.join(', ')}. Symptoms: ${formData.symptoms || 'Not specified'}.`
    };

    const { data, error } = await supabase
      .from('patients')
      .insert([patientData])
      .select()
      .single();

    if (error) {
      console.error('Error creating patient:', error);
      throw error;
    }

    return data;
  };

  const saveRecommendationRecord = async (patientId: string, recommendationData: EnhancedAntibioticRecommendation) => {
    if (!user) {
      throw new Error('User must be authenticated to save recommendations');
    }

    const recommendationRecord = {
      patient_id: patientId,
      doctor_id: user.id,
      input_data: formData as any,
      recommendation_details: recommendationData as any,
      source: 'rule-based',
      notes: 'Rule-based recommendation generated from comprehensive clinical algorithms'
    };

    const { data, error } = await supabase
      .from('antibiotic_recommendations')
      .insert([recommendationRecord])
      .select()
      .single();

    if (error) {
      console.error('Error saving recommendation:', error);
      throw error;
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: language === "en" ? "Validation Error" : "Greška Validacije",
        description: language === "en" 
          ? "Please fill in all required fields (Infection Details)"
          : "Molimo popunite sva obavezna polja (Detalji infekcije)",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: language === "en" ? "Authentication Required" : "Potrebna Autentifikacija",
        description: language === "en"
          ? "Please sign in to generate recommendations"
          : "Molimo prijavite se da biste generisali preporuke",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Create patient record first
      const patient = await createPatientRecord();
      setCreatedPatientId(patient.id);

      // Generate comprehensive rule-based recommendation - ensure proper typing
      const patientDataForRecommendation = {
        ...formData,
        region: formData.region || "default",
        // Ensure gender is properly typed
        gender: (formData.gender || "male") as "male" | "female",
        severity: (formData.severity || "mild") as "mild" | "moderate" | "severe"
      };
      
      const recommendation = generateAdvancedRecommendation(patientDataForRecommendation);
      setRecommendation(recommendation);

      // Save recommendation record
      await saveRecommendationRecord(patient.id, recommendation);
      
      toast({
        title: language === "en" ? "Success" : "Uspjeh",
        description: language === "en"
          ? "Patient created and clinical recommendation generated successfully"
          : "Pacijent kreiran i klinička preporuka uspješno generisana",
      });
    } catch (error: any) {
      console.error('Error in form submission:', error);
      toast({
        title: language === "en" ? "Error" : "Greška",
        description: error.message || (language === "en"
          ? "An error occurred while processing your request. Please try again."
          : "Došlo je do greške prilikom obrade zahtjeva. Molimo pokušajte ponovo."),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLabResultsChange = (results: any) => {
    handleInputChange("labResults", results);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      <FormHeader errors={errors} showErrors={showErrors} />
      
      <form onSubmit={handleSubmit} className="space-y-10">
        <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl border-0 shadow-2xl shadow-gray-900/5 dark:shadow-black/20">
          <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-transparent to-medical-accent/5"></div>
          <div className="relative p-8 sm:p-12 space-y-16">
            
            <div ref={sectionRefs.demographics}>
              <SectionHeader 
                number={1} 
                title={t.title} 
                subtitle={language === "en" 
                  ? "Patient demographics help determine appropriate dosing and safety considerations"
                  : "Demografski podaci pacijenta pomažu u određivanju odgovarajućeg doziranja i sigurnosnih razmatranja"
                } 
              />
              <div className="bg-white/60 dark:bg-gray-700/30 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                <PatientDemographicsSection 
                  formData={formData} 
                  onInputChange={handleInputChange}
                  errors={showErrors ? errors : {}}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent w-full max-w-md"></div>
            </div>
            
            <div>
              <SectionHeader 
                number={2} 
                title={t.allergies.title} 
                subtitle={language === "en"
                  ? "Drug allergies are critical for safe antibiotic selection and preventing adverse reactions"
                  : "Alergije na lijekove su kritične za siguran izbor antibiotika i sprečavanje štetnih reakcija"
                } 
              />
              <div className="bg-white/60 dark:bg-gray-700/30 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                <AllergySection 
                  allergies={formData.allergies} 
                  onAllergyChange={(allergy, checked) => {
                    handleInputChange("allergies", {
                      ...formData.allergies,
                      [allergy]: checked
                    });
                  }}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent w-full max-w-md"></div>
            </div>
            
            <div>
              <SectionHeader 
                number={3} 
                title={t.renalFunction.title} 
                subtitle={language === "en"
                  ? "Kidney function determines antibiotic dosing adjustments and safety considerations"
                  : "Funkcija bubrega određuje prilagođavanja doziranja antibiotika i sigurnosna razmatranja"
                } 
              />
              <div className="bg-white/60 dark:bg-gray-700/30 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                <RenalFunctionSection 
                  creatinine={formData.creatinine} 
                  onCreatinineChange={(value) => handleInputChange("creatinine", value)}
                  age={formData.age}
                  weight={formData.weight}
                  gender={formData.gender}
                  height={formData.height}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent w-full max-w-md"></div>
            </div>
            
            <div>
              <SectionHeader 
                number={4} 
                title={t.comorbidities.title} 
                subtitle={language === "en"
                  ? "Medical conditions affect antibiotic choice, dosing, and monitoring requirements"
                  : "Medicinska stanja utječu na izbor antibiotika, doziranje i zahtjeve za praćenje"
                } 
              />
              <div className="bg-white/60 dark:bg-gray-700/30 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                <ComorbiditySection 
                  formData={formData} 
                  onInputChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent w-full max-w-md"></div>
            </div>
            
            <div ref={sectionRefs.infection}>
              <SectionHeader 
                number={5} 
                title={t.infectionDetails.title} 
                subtitle={language === "en"
                  ? "Infection characteristics determine the most appropriate empirical therapy"
                  : "Karakteristike infekcije određuju najodgovarajuću empirijsku terapiju"
                } 
              />
              <div className="bg-white/60 dark:bg-gray-700/30 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                <InfectionDetailsSection 
                  formData={formData} 
                  onInputChange={handleInputChange}
                  errors={showErrors ? errors : {}}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent w-full max-w-md"></div>
            </div>
            
            <div>
              <SectionHeader 
                number={6}
                title={language === "en" ? "Laboratory Results" : "Laboratorijski Rezultati"}
                subtitle={language === "en" 
                  ? "Laboratory data guides targeted therapy and monitoring decisions" 
                  : "Laboratorijski podaci usmjeravaju ciljanu terapiju i odluke o praćenju"
                }
              />
              <div className="bg-white/60 dark:bg-gray-700/30 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                <LabResultsSection 
                  onLabResultsChange={handleLabResultsChange}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-medical-primary/10 via-medical-accent/5 to-purple-500/10 p-8 rounded-3xl border border-medical-primary/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-3 w-3 bg-medical-primary rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-medical-deep dark:text-white">
                    {language === "en" ? "Clinical Decision Support" : "Klinička Podrška za Odlučivanje"}
                  </h3>
                  <div className="h-3 w-3 bg-medical-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <p className="text-medical-text dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {language === "en"
                    ? "This system uses evidence-based algorithms incorporating the latest clinical guidelines (IDSA, CDC, WHO) to provide comprehensive antibiotic recommendations based on patient-specific factors."
                    : "Ovaj sistem koristi algoritme zasnovane na dokazima koji uključuju najnovije kliničke smernice (IDSA, CDC, WHO) za pružanje sveobuhvatnih preporuka antibiotika na osnovu faktora specifičnih za pacijenta."
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-green-200/50 dark:border-green-500/30">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">{language === "en" ? "Evidence-based protocols" : "Protokoli zasnovani na dokazima"}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-purple-200/50 dark:border-purple-500/30">
                    <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium">{language === "en" ? "Resistance patterns" : "Obrasci rezistencije"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-blue-200/50 dark:border-blue-500/30">
                    <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">{language === "en" ? "Safety validations" : "Sigurnosne validacije"}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-orange-200/50 dark:border-orange-500/30">
                    <div className="h-3 w-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium">{language === "en" ? "Dosing calculations" : "Kalkulacije doziranja"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <FormActions isSubmitting={isSubmitting} />
            </div>
          </div>
        </Card>
      </form>

      {recommendation && (
        <AntibioticRecommendation 
          recommendation={recommendation} 
          patientId={createdPatientId}
        />
      )}
    </div>
  );
};
