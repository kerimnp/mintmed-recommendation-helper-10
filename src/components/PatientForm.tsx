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
import { FreeCreditsDisplay } from "./FreeCreditsDisplay";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";
import { FormHeader } from "./PatientFormSections/FormHeader";
import { FormActions } from "./FormActions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Progress } from "./ui/progress";

interface SectionHeaderProps {
  number: number;
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, subtitle }) => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-medical-primary to-medical-accent text-white font-bold text-sm shadow-md flex-shrink-0 mt-1">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export const PatientForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading: profileLoading, decrementCredits } = useUserProfile();
  const [recommendation, setRecommendation] = useState<EnhancedAntibioticRecommendation | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPatientId, setCreatedPatientId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
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

  const calculateProgress = () => {
    let completedFields = 0;
    let totalRequiredFields = 2; // infection sites and severity are required
    
    // Check required fields
    if (formData.infectionSites.length > 0) completedFields++;
    if (formData.severity) completedFields++;
    
    // Count optional fields that are filled
    let optionalCompleted = 0;
    let totalOptionalFields = 8;
    
    if (formData.age) optionalCompleted++;
    if (formData.gender) optionalCompleted++;
    if (formData.weight) optionalCompleted++;
    if (formData.symptoms) optionalCompleted++;
    if (formData.creatinine) optionalCompleted++;
    if (Object.values(formData.allergies).some(Boolean)) optionalCompleted++;
    if (formData.kidneyDisease || formData.liverDisease || formData.diabetes || formData.immunosuppressed) optionalCompleted++;
    if (formData.labResults) optionalCompleted++;
    
    return Math.round(((completedFields / totalRequiredFields) * 60) + ((optionalCompleted / totalOptionalFields) * 40));
  };

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

  const ensureUserProfile = async () => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      // Check if profile exists
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error checking user profile:', profileError);
        throw new Error('Failed to verify user profile');
      }

      if (!existingProfile) {
        // Create profile if it doesn't exist
        console.log('Creating missing user profile...');
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            email: user.email,
            first_name: user.user_metadata?.first_name || 'Unknown',
            last_name: user.user_metadata?.last_name || 'User',
            role: 'doctor',
            free_credits_left: 5
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating user profile:', insertError);
          throw new Error('Failed to create user profile');
        }

        console.log('User profile created successfully:', newProfile);
        return newProfile;
      }

      return existingProfile;
    } catch (error) {
      console.error('Error in ensureUserProfile:', error);
      throw error;
    }
  };

  const createPatientRecord = async () => {
    if (!user) {
      throw new Error('User must be authenticated to create patient records');
    }

    // Ensure user profile exists first
    await ensureUserProfile();

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
      source: 'system_generated', // Changed from 'rule-based' to match database enum
      notes: 'System-generated recommendation using comprehensive clinical algorithms'
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

    // Check if user has credits remaining
    if (!profile || profile.free_credits_left <= 0) {
      toast({
        title: language === "en" ? "No Credits Remaining" : "Nema Preostalih Kredita",
        description: language === "en"
          ? "You've used all your free credits. Contact support to continue using the service."
          : "Iskoristili ste sve besplatne kredite. Kontaktirajte podršku za nastavak korištenja usluge.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Create patient record first
      console.log('Creating patient record...');
      const patient = await createPatientRecord();
      console.log('Patient created successfully:', patient);
      setCreatedPatientId(patient.id);

      // Generate comprehensive rule-based recommendation - ensure proper typing
      const patientDataForRecommendation = {
        ...formData,
        region: formData.region || "default",
        // Ensure gender is properly typed
        gender: (formData.gender || "male") as "male" | "female",
        severity: (formData.severity || "mild") as "mild" | "moderate" | "severe"
      };
      
      console.log('Generating recommendation...');
      const recommendation = generateAdvancedRecommendation(patientDataForRecommendation);
      setRecommendation(recommendation);

      // Save recommendation record
      console.log('Saving recommendation record...');
      await saveRecommendationRecord(patient.id, recommendation);

      // Decrement credits after successful recommendation
      const creditDecremented = await decrementCredits();
      if (!creditDecremented) {
        console.warn('Failed to decrement credits, but recommendation was generated');
      }
      
      toast({
        title: language === "en" ? "Success" : "Uspjeh",
        description: language === "en"
          ? `Patient created and clinical recommendation generated successfully. ${profile.free_credits_left - 1} credits remaining.`
          : `Pacijent kreiran i klinička preporuka uspješno generisana. ${profile.free_credits_left - 1} kredita preostalo.`,
      });
    } catch (error: any) {
      console.error('Error in form submission:', error);
      
      // Provide more specific error messages
      let errorMessage = error.message;
      if (error.message.includes('foreign key constraint')) {
        errorMessage = language === "en"
          ? "There was an issue with user authentication. Please try refreshing the page and logging in again."
          : "Došlo je do problema s autentifikacijom korisnika. Molimo osvježite stranicu i ponovno se prijavite.";
      }
      
      toast({
        title: language === "en" ? "Error" : "Greška",
        description: errorMessage || (language === "en"
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

  const progress = calculateProgress();
  const hasCredits = profile && profile.free_credits_left > 0;

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {language === "en" ? "Loading..." : "Učitavanje..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      <FormHeader errors={errors} showErrors={showErrors} />
      
      {/* Credits Display */}
      {profile && (
        <FreeCreditsDisplay creditsLeft={profile.free_credits_left} />
      )}
      
      {/* Sticky Progress Bar */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 py-3">
        <Card className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {language === "en" ? "Form Completion" : "Završenost Forme"}
            </h3>
            <span className="text-sm font-bold text-medical-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {language === "en" 
              ? "Complete required fields (infection details) to generate recommendations" 
              : "Kompletujte obavezna polja (detalji infekcije) za generisanje preporuka"}
          </p>
        </Card>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/3 via-transparent to-medical-accent/3"></div>
          <div className="relative p-6 sm:p-8 space-y-8">
            
            <div ref={sectionRefs.demographics}>
              <SectionHeader 
                number={1} 
                title={t.title} 
                subtitle={language === "en" 
                  ? "Basic patient information for dosing calculations and safety checks"
                  : "Osnovne informacije o pacijentu za kalkulacije doziranja i sigurnosne provjere"
                } 
              />
              <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200/50 dark:border-gray-600/50">
                <PatientDemographicsSection 
                  formData={formData} 
                  onInputChange={handleInputChange}
                  errors={showErrors ? errors : {}}
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200/50 dark:border-gray-600/50 pt-6">
              <SectionHeader 
                number={2} 
                title={t.allergies.title} 
                subtitle={language === "en"
                  ? "Critical for safe antibiotic selection and preventing adverse reactions"
                  : "Kritično za siguran izbor antibiotika i sprečavanje neželjenih reakcija"
                } 
              />
              <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200/50 dark:border-gray-600/50">
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
            
            <div className="border-t border-gray-200/50 dark:border-gray-600/50 pt-6">
              <SectionHeader 
                number={3} 
                title={t.renalFunction.title} 
                subtitle={language === "en"
                  ? "Kidney function assessment for proper dosing adjustments"
                  : "Procjena funkcije bubrega za pravilna prilagođavanja doziranja"
                } 
              />
              <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200/50 dark:border-gray-600/50">
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
            
            <div className="border-t border-gray-200/50 dark:border-gray-600/50 pt-6">
              <SectionHeader 
                number={4} 
                title={t.comorbidities.title} 
                subtitle={language === "en"
                  ? "Medical conditions affecting antibiotic choice and monitoring"
                  : "Medicinska stanja koja utječu na izbor antibiotika i praćenje"
                } 
              />
              <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200/50 dark:border-gray-600/50">
                <ComorbiditySection 
                  formData={formData} 
                  onInputChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200/50 dark:border-gray-600/50 pt-6" ref={sectionRefs.infection}>
              <SectionHeader 
                number={5} 
                title={t.infectionDetails.title} 
                subtitle={language === "en"
                  ? "Essential information for selecting appropriate empirical therapy"
                  : "Osnovne informacije za izbor odgovarajuće empirijske terapije"
                } 
              />
              <div className="bg-red-50/80 dark:bg-red-900/20 rounded-xl p-5 border border-red-200/50 dark:border-red-700/50">
                <InfectionDetailsSection 
                  formData={formData} 
                  onInputChange={handleInputChange}
                  errors={showErrors ? errors : {}}
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200/50 dark:border-gray-600/50 pt-6">
              <SectionHeader 
                number={6}
                title={language === "en" ? "Laboratory Results" : "Laboratorijski Rezultati"}
                subtitle={language === "en" 
                  ? "Laboratory data for targeted therapy decisions" 
                  : "Laboratorijski podaci za odluke o ciljanoj terapiji"
                }
              />
              <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200/50 dark:border-gray-600/50">
                <LabResultsSection 
                  onLabResultsChange={handleLabResultsChange}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-medical-primary/8 via-medical-accent/4 to-purple-500/8 p-6 rounded-2xl border border-medical-primary/20 backdrop-blur-sm">
              <div className="text-center mb-5">
                <h3 className="text-lg font-bold text-medical-deep dark:text-white mb-2">
                  {language === "en" ? "Clinical Decision Support" : "Klinička Podrška za Odlučivanje"}
                </h3>
                <p className="text-sm text-medical-text dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  {language === "en"
                    ? "Evidence-based algorithms following IDSA, CDC, and WHO guidelines for comprehensive recommendations."
                    : "Algoritmi zasnovani na dokazima koji prate IDSA, CDC i WHO smernice za sveobuhvatne preporuke."
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-green-200/50">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium">{language === "en" ? "Evidence-based" : "Zasnovano na dokazima"}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-blue-200/50">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-medium">{language === "en" ? "Safety checks" : "Sigurnosne provjere"}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-purple-200/50">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs font-medium">{language === "en" ? "Resistance data" : "Podaci o rezistenciji"}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-orange-200/50">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs font-medium">{language === "en" ? "Dose optimization" : "Optimizacija doze"}</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <FormActions 
                isSubmitting={isSubmitting} 
                disabled={!hasCredits}
              />
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
