
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PatientForm } from "@/components/PatientForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Shield, Zap, Award, Coins } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProfileDropdown } from "@/components/admin/dashboard/layout/ProfileDropdown";
import { PatientData } from "@/utils/types/patientTypes";
import { AntibioticRecommendation } from "@/components/AntibioticRecommendation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const AntibioticAdvisor = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, decrementCredits } = useUserProfile();
  const { toast } = useToast();

  // Initialize patient form state
  const [patientData, setPatientData] = useState<PatientData>({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    region: "",
    nationality: "",
    infectionSites: [],
    symptoms: "",
    duration: "",
    severity: "mild",
    isHospitalAcquired: false,
    allergies: {
      penicillin: false,
      cephalosporin: false,
      sulfa: false,
      macrolide: false,
      fluoroquinolone: false,
    },
    resistances: {
      mrsa: false,
      vre: false,
      esbl: false,
      cre: false,
      pseudomonas: false,
    },
    kidneyDisease: false,
    liverDisease: false,
    diabetes: false,
    immunosuppressed: false,
    recentAntibiotics: false,
    otherAllergies: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string | null>(null);

  const createPatientRecord = async (data: PatientData): Promise<string> => {
    try {
      // Calculate date of birth from age
      const age = parseInt(data.age);
      const dateOfBirth = new Date();
      dateOfBirth.setFullYear(dateOfBirth.getFullYear() - age);
      
      const patientRecord = {
        first_name: data.firstName || 'Patient',
        last_name: data.lastName || 'Unknown',
        date_of_birth: dateOfBirth.toISOString().split('T')[0],
        gender: data.gender,
        contact_phone: data.contactPhone || null,
        contact_email: data.contactEmail || null,
        address: data.address || null,
        allergies: data.allergies as any, // Convert to JSON for database
        known_conditions: {
          kidneyDisease: data.kidneyDisease,
          liverDisease: data.liverDisease,
          diabetes: data.diabetes,
          immunosuppressed: data.immunosuppressed,
          infectionSites: data.infectionSites,
          symptoms: data.symptoms,
          duration: data.duration,
          severity: data.severity,
          isHospitalAcquired: data.isHospitalAcquired,
          resistances: data.resistances
        } as any, // Convert to JSON for database
        attending_physician_id: user?.id || null,
        notes: `Weight: ${data.weight}kg, Height: ${data.height}cm, Region: ${data.region}${data.creatinine ? `, Creatinine: ${data.creatinine}` : ''}`
      };

      const { data: createdPatient, error } = await supabase
        .from('patients')
        .insert([patientRecord])
        .select()
        .single();

      if (error) {
        console.error('Error creating patient record:', error);
        throw error;
      }

      console.log('✅ Patient record created:', createdPatient.id);
      return createdPatient.id;
    } catch (error) {
      console.error('Failed to create patient record:', error);
      throw error;
    }
  };

  const handlePatientFormSubmit = async (data: PatientData) => {
    console.log('=== RECOMMENDATION GENERATION START ===');
    console.log('Received patient data for recommendation:', data);
    
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      // Check if user is authenticated
      if (!user) {
        throw new Error('You must be logged in to use this feature. Please log in and try again.');
      }

      // Check if user has sufficient credits
      if (!profile) {
        throw new Error('User profile not loaded. Please wait and try again.');
      }

      if (profile.free_credits_left <= 0) {
        throw new Error('Insufficient credits. You have used all your free credits. Please contact support or upgrade your plan.');
      }

      // Validate critical data before processing
      if (!data.infectionSites || data.infectionSites.length === 0) {
        throw new Error('At least one infection site must be selected');
      }
      
      if (!data.severity) {
        throw new Error('Infection severity must be specified');
      }

      console.log('✅ Credit check passed. User has', profile.free_credits_left, 'credits remaining');
      console.log('✅ Critical validation passed, decrementing credits...');

      // Decrement credits before generating recommendation
      const creditSuccess = await decrementCredits();
      if (!creditSuccess) {
        throw new Error('Failed to process credit usage. Please try again.');
      }

      console.log('✅ Credits decremented successfully, creating patient record...');

      // Create patient record first
      let createdPatientId: string | null = null;
      try {
        createdPatientId = await createPatientRecord(data);
        setPatientId(createdPatientId);
        console.log('✅ Patient record created with ID:', createdPatientId);
      } catch (error) {
        console.warn('⚠️ Failed to create patient record, proceeding without database storage:', error);
        // Continue with recommendation generation even if patient creation fails
      }

      toast({
        title: "Credit Used",
        description: `1 credit used. ${(profile.free_credits_left - 1)} credits remaining.`,
      });

      // Import the comprehensive clinical rules engine for hardcoded recommendations
      const { findBestClinicalScenario } = await import("@/utils/antibioticRecommendations/comprehensiveRulesEngine");
      
      console.log('✅ Rules engine imported, generating recommendation...');

      // Generate comprehensive hardcoded recommendation covering all scenarios
      const clinicalRecommendation = findBestClinicalScenario(data);

      console.log('✅ Clinical recommendation generated:', clinicalRecommendation);

      if (!clinicalRecommendation) {
        throw new Error('Failed to generate recommendation - no matching clinical scenario found');
      }

      // Add patient ID to recommendation for prescription tracking
      const enhancedRecommendation = {
        ...clinicalRecommendation,
        patientId: createdPatientId,
        patientData: data
      };

      setRecommendation(enhancedRecommendation);
      
      // Scroll to recommendation section
      setTimeout(() => {
        const recommendationElement = document.getElementById('recommendation-section');
        if (recommendationElement) {
          recommendationElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (error) {
      console.error('❌ Recommendation generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while generating recommendations';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      console.log('=== RECOMMENDATION GENERATION END ===');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      <Helmet>
        <title>Horalix - Antibiotic Recommendation System</title>
        <meta name="description" content="Evidence-based antibiotic recommendations tailored to patient needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src={theme === 'dark' ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png" : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"} 
                  alt="Horalix Logo" 
                  className="h-8 w-auto cursor-pointer" 
                />
              </Link>
              <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === "en" ? "Antibiotic Advisor" : "Savjetnik za Antibiotike"}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "en" ? "Evidence-based recommendations" : "Preporuke temeljene na dokazima"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Credits Display */}
              {profile && !profileLoading && (
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border ${
                  profile.free_credits_left <= 2 
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' 
                    : profile.free_credits_left === 0
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}>
                  <Coins className={`h-4 w-4 ${
                    profile.free_credits_left <= 2 
                      ? 'text-yellow-600 dark:text-yellow-400' 
                      : profile.free_credits_left === 0
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    profile.free_credits_left <= 2 
                      ? 'text-yellow-900 dark:text-yellow-100' 
                      : profile.free_credits_left === 0
                      ? 'text-red-900 dark:text-red-100'
                      : 'text-blue-900 dark:text-blue-100'
                  }`}>
                    {profile.free_credits_left} {language === "en" ? "credits" : "kredita"}
                  </span>
                </div>
              )}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Low Credits Warning */}
      {profile && !profileLoading && profile.free_credits_left <= 2 && profile.free_credits_left > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">
                {language === "en" 
                  ? `Low credits warning: You have ${profile.free_credits_left} credits remaining.`
                  : `Upozorenje: Imate samo ${profile.free_credits_left} kredita preostalo.`
                }
              </span>
            </div>
          </div>
        </div>
      )}

      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 leading-tight">
                {language === "en" ? "Clinical Decision Support" : "Klinička Podrška za Odlučivanje"}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light">
                {language === "en" 
                  ? "Evidence-based antibiotic recommendations powered by clinical guidelines"
                  : "Preporuke za antibiotike zasnovane na dokazima uz kliničke smernice"}
              </p>
              
              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="group p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    {language === "en" ? "Safety First" : "Sigurnost na Prvom Mjestu"}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Comprehensive allergy and interaction checks" : "Sveobuhvatne provjere alergija i interakcija"}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    {language === "en" ? "Instant Results" : "Trenutni Rezultati"}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Real-time analysis with detailed rationale" : "Analiza u realnom vremenu s detaljnim objašnjenjem"}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="group p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    {language === "en" ? "Evidence-Based" : "Zasnovano na Dokazima"}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === "en" ? "Following IDSA, CDC, and WHO guidelines" : "Prati IDSA, CDC i WHO smernice"}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Patient Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <PatientForm 
              patientData={patientData}
              setPatientData={setPatientData}
              onSubmit={handlePatientFormSubmit}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center py-12"
            >
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {language === "en" ? "Analyzing Patient Data" : "Analiziranje Podataka o Pacijentu"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === "en" 
                      ? "Our AI is generating evidence-based antibiotic recommendations..."
                      : "Naša AI generiše preporuke za antibiotike zasnovane na dokazima..."
                    }
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-6"
            >
              <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                      {language === "en" ? "Recommendation Error" : "Greška u Preporuci"}
                    </h3>
                  </div>
                  <p className="text-red-800 dark:text-red-200 mb-4">
                    {error}
                  </p>
                  <Button 
                    onClick={() => {
                      setError(null);
                      handlePatientFormSubmit(patientData);
                    }}
                    variant="outline"
                    className="border-red-300 hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-900/20"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {language === "en" ? "Try Again" : "Pokušajte Ponovo"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* AI Recommendation Results */}
          {recommendation && !isLoading && (
            <motion.div 
              id="recommendation-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="py-6"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === "en" ? "AI-Powered Recommendation Ready" : "AI Preporuka Spremna"}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === "en" 
                    ? "Based on comprehensive analysis of patient data, clinical guidelines, and resistance patterns."
                    : "Zasnovano na sveobuhvatnoj analizi podataka o pacijentu, kliničkim smernicama i obrascima rezistentnosti."
                  }
                </p>
              </div>
              
              <AntibioticRecommendation 
                recommendation={recommendation}
                patientData={patientData}
                patientId={patientId}
              />
              
              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setRecommendation(null);
                    setPatientData({
                      age: "",
                      gender: "male",
                      weight: "",
                      height: "",
                      region: "",
                      nationality: "",
                      infectionSites: [],
                      symptoms: "",
                      duration: "",
                      severity: "mild",
                      isHospitalAcquired: false,
                      allergies: {
                        penicillin: false,
                        cephalosporin: false,
                        sulfa: false,
                        macrolide: false,
                        fluoroquinolone: false,
                      },
                      resistances: {
                        mrsa: false,
                        vre: false,
                        esbl: false,
                        cre: false,
                        pseudomonas: false,
                      },
                      kidneyDisease: false,
                      liverDisease: false,
                      diabetes: false,
                      immunosuppressed: false,
                      recentAntibiotics: false,
                      otherAllergies: "",
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  {language === "en" ? "New Patient" : "Novi Pacijent"}
                </Button>
                
                <Button 
                  onClick={() => handlePatientFormSubmit(patientData)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  {language === "en" ? "Generate New Recommendation" : "Generiši Novu Preporuku"}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AntibioticAdvisor;
