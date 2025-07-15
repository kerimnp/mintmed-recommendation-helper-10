import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { Printer, FileText } from "lucide-react";
import jsPDF from "jspdf";
import { DrugProduct } from "@/utils/availableDrugsDatabase";
import { EnhancedAntibioticRecommendation, AntibioticRationale } from "@/utils/types/recommendationTypes";
import { ReferralModal } from "./ReferralModal";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useDoctorProfile } from "@/hooks/useDoctorProfile";
import { PatientData } from "@/utils/types/patientTypes";

interface PrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  recommendationData: EnhancedAntibioticRecommendation;
  selectedProduct?: DrugProduct;
  patientId?: string | null;
  patientData?: PatientData;
}
export const PrescriptionModal = ({
  open,
  onClose,
  recommendationData,
  selectedProduct,
  patientId,
  patientData
}: PrescriptionModalProps) => {
  const {
    toast
  } = useToast();
  const {
    user
  } = useAuth();
  const {
    data: doctorProfile
  } = useDoctorProfile();
  const [patientName, setPatientName] = useState("");
  const [patientSurname, setPatientSurname] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorSurname, setDoctorSurname] = useState("");
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState<string | null>(patientId || null);

  // Auto-fill doctor information when component loads or profile changes
  useEffect(() => {
    if (doctorProfile) {
      setDoctorName(doctorProfile.first_name || "");
      setDoctorSurname(doctorProfile.last_name || "");
    }
  }, [doctorProfile]);

  // Fetch and prefill patient information if patientId is available
  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) return;
      try {
        const {
          data,
          error
        } = await supabase.from('patients').select('first_name, last_name').eq('id', patientId).single();
        if (error) {
          console.error('Error fetching patient data:', error);
          return;
        }
        if (data) {
          setPatientName(data.first_name || "");
          setPatientSurname(data.last_name || "");
        }
      } catch (error) {
        console.error('Failed to fetch patient data:', error);
      }
    };
    if (open && patientId) {
      fetchPatientData();
    } else if (open && patientData && patientData.firstName && patientData.lastName) {
      // Pre-fill from patient data if available
      setPatientName(patientData.firstName);
      setPatientSurname(patientData.lastName);
    }
  }, [open, patientId, patientData]);
  const createPatientFromForm = async (): Promise<string> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Calculate date of birth from age if patientData is available
    let dateOfBirth = '1980-01-01'; // Default fallback
    if (patientData && patientData.age) {
      const age = parseInt(patientData.age);
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - age);
      dateOfBirth = dob.toISOString().split('T')[0];
    }

    const patientRecord = {
      first_name: patientName || 'Patient',
      last_name: patientSurname || 'Unknown',
      date_of_birth: dateOfBirth,
      gender: patientData?.gender || 'male',
      contact_phone: patientData?.contactPhone || null,
      contact_email: patientData?.contactEmail || null,
      address: patientData?.address || null,
      allergies: patientData?.allergies ? patientData.allergies as any : null,
      known_conditions: patientData ? {
        kidneyDisease: patientData.kidneyDisease,
        liverDisease: patientData.liverDisease,
        diabetes: patientData.diabetes,
        immunosuppressed: patientData.immunosuppressed,
        infectionSites: patientData.infectionSites,
        symptoms: patientData.symptoms,
        duration: patientData.duration,
        severity: patientData.severity,
        isHospitalAcquired: patientData.isHospitalAcquired,
        resistances: patientData.resistances
      } as any : null,
      attending_physician_id: user.id,
      notes: patientData ? `Weight: ${patientData.weight}kg, Height: ${patientData.height}cm, Region: ${patientData.region}${patientData.creatinine ? `, Creatinine: ${patientData.creatinine}` : ''}` : null
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

    console.log('✅ Patient record created from prescription modal:', createdPatient.id);
    return createdPatient.id;
  };

  const savePrescriptionToDatabase = async (usePatientId: string) => {
    if (!user || !usePatientId) {
      console.warn('Cannot save prescription: missing user or patient ID');
      return null;
    }
    try {
      const prescriptionData = {
        patient_id: usePatientId,
        doctor_id: user.id,
        antibiotic_name: recommendationData.primaryRecommendation.name,
        dosage: recommendationData.primaryRecommendation.dosage,
        route: recommendationData.primaryRecommendation.route,
        frequency: recommendationData.primaryRecommendation.frequency || 'As directed',
        duration: recommendationData.primaryRecommendation.duration,
        reason_for_prescription: typeof recommendationData.rationale === 'object' && recommendationData.rationale?.infectionType ? recommendationData.rationale.infectionType : 'Antibiotic treatment',
        status: 'active',
        notes: selectedProduct ? `Product: ${selectedProduct.name} (${selectedProduct.manufacturer})` : undefined,
        start_date: new Date().toISOString().split('T')[0],
        // Today's date
        end_date: null // Will be calculated based on duration if needed
      };
      const {
        data,
        error
      } = await supabase.from('prescriptions').insert([prescriptionData]).select().single();
      if (error) {
        console.error('Error saving prescription:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Failed to save prescription to database:', error);
      throw error;
    }
  };
  const generatePrescription = async () => {
    if (!patientName || !patientSurname || !doctorName || !doctorSurname) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setIsSaving(true);
    try {
      // Ensure we have a patient ID - create patient if needed
      let activePatientId = currentPatientId;
      if (!activePatientId && user) {
        try {
          activePatientId = await createPatientFromForm();
          setCurrentPatientId(activePatientId);
          console.log('✅ Patient created for prescription:', activePatientId);
        } catch (error) {
          console.error('Failed to create patient:', error);
          toast({
            title: "Warning",
            description: "Failed to create patient record. PDF will be generated without database storage.",
            variant: "destructive"
          });
        }
      }

      // Save prescription to database
      let savedPrescription = null;
      if (user && activePatientId) {
        try {
          savedPrescription = await savePrescriptionToDatabase(activePatientId);
          toast({
            title: "Prescription Saved",
            description: "Prescription has been saved to the patient's medical record"
          });
        } catch (error) {
          console.error('Failed to save prescription:', error);
          toast({
            title: "Warning",
            description: "Prescription PDF will be generated, but failed to save to medical record",
            variant: "destructive"
          });
        }
      }

      // Generate PDF
      const doc = new jsPDF();

      // Add logo with larger dimensions and better positioning
      doc.addImage("/lovable-uploads/c6384933-7f76-44d0-b4ab-45145d7d7c61.png", "PNG", 10, 10, 60, 30);

      // Add modern header with gradient-like effect
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, 210, 40, "F");
      doc.setFillColor(241, 245, 249);
      doc.rect(0, 35, 210, 5, "F");

      // Add title with adjusted position to account for larger logo
      doc.setFontSize(24);
      doc.setTextColor(30, 41, 59);
      doc.text("Medical Prescription", 100, 25, {
        align: "center"
      });

      // Add patient information section
      doc.setFillColor(249, 250, 251);
      doc.rect(20, 50, 170, 40, "F");
      doc.setFontSize(12);
      doc.setTextColor(71, 85, 105);
      doc.text("Patient Information", 25, 60);
      doc.setTextColor(51, 65, 85);
      doc.text(`Name: ${patientName} ${patientSurname}`, 25, 70);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 25, 80);
      if (savedPrescription) {
        doc.text(`Prescription ID: ${savedPrescription.id.slice(0, 8)}`, 25, 90);
      }

      // Add medication details section
      doc.setFillColor(249, 250, 251);
      doc.rect(20, 100, 170, 60, "F");
      doc.setTextColor(71, 85, 105);
      doc.text("Prescribed Medication", 25, 110);
      doc.setTextColor(51, 65, 85);
      doc.text(`Medication: ${recommendationData.primaryRecommendation.name}`, 25, 120);
      if (selectedProduct) {
        doc.text(`Selected Product: ${selectedProduct.name}`, 25, 130);
        doc.text(`Manufacturer: ${selectedProduct.manufacturer}`, 25, 140);
      }
      doc.text(`Dose: ${recommendationData.primaryRecommendation.dosage}`, 25, 150);
      doc.text(`Route: ${recommendationData.primaryRecommendation.route}`, 25, 160);
      doc.text(`Duration: ${recommendationData.primaryRecommendation.duration}`, 25, 170);

      // Add rationale information if available
      if (recommendationData.rationale && typeof recommendationData.rationale === 'object') {
        doc.setFillColor(249, 250, 251);
        doc.rect(20, 180, 170, 30, "F");
        doc.setTextColor(71, 85, 105);
        doc.text("Clinical Rationale", 25, 190);
        doc.setTextColor(51, 65, 85);
        doc.text(`Infection Type: ${recommendationData.rationale.infectionType}`, 25, 200);
        doc.text(`Severity: ${recommendationData.rationale.severity}`, 25, 210);
      }

      // Add doctor's signature section
      doc.setFillColor(249, 250, 251);
      doc.rect(20, 220, 170, 50, "F");
      doc.setTextColor(71, 85, 105);
      doc.text("Prescribed by:", 25, 230);
      doc.setTextColor(51, 65, 85);
      doc.text(`Dr. ${doctorName} ${doctorSurname}`, 25, 240);

      // Add signature line
      doc.setDrawColor(203, 213, 225);
      doc.line(25, 255, 95, 255);
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text("(Signature)", 50, 265);

      // Save the PDF
      doc.save(`prescription_${patientSurname}_${patientName}.pdf`);
      toast({
        title: "Prescription Generated",
        description: "The prescription has been generated and saved successfully"
      });
      onClose();
    } catch (error) {
      console.error('Error generating prescription:', error);
      toast({
        title: "Error",
        description: "Failed to generate prescription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleOpenReferral = () => {
    setIsReferralModalOpen(true);
  };
  return <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Printer className="h-5 w-5" />
              Generate Prescription
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">Patient Name</Label>
                <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="First name" />
              </div>
              <div>
                <Label htmlFor="patientSurname">Patient Surname</Label>
                <Input id="patientSurname" value={patientSurname} onChange={e => setPatientSurname(e.target.value)} placeholder="Last name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input id="doctorName" value={doctorName} onChange={e => setDoctorName(e.target.value)} placeholder="First name" disabled className="bg-gray-100 dark:bg-gray-800" />
              </div>
              <div>
                <Label htmlFor="doctorSurname">Doctor Surname</Label>
                <Input id="doctorSurname" value={doctorSurname} onChange={e => setDoctorSurname(e.target.value)} placeholder="Last name" disabled className="bg-gray-100 dark:bg-gray-800" />
              </div>
            </div>
            {(currentPatientId || user) && <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                <p>✓ This prescription will be saved to the patient's medical record</p>
              </div>}
          </div>
          <DialogFooter className="flex-col space-y-4">
            <div className="flex w-full justify-start items-end ">
              <Button variant="secondary" className="flex items-center gap-2" onClick={handleOpenReferral} disabled={isSaving}>
                <FileText className="h-4 w-4" />
                Create Referral Letter
              </Button>
            </div>
            <div className="flex w-full justify-end space-x-2">
              <Button variant="outline" onClick={onClose} disabled={isSaving}>Cancel</Button>
              <Button onClick={generatePrescription} disabled={isSaving}>
                {isSaving ? "Saving..." : "Generate"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isReferralModalOpen && <ReferralModal open={isReferralModalOpen} onClose={() => setIsReferralModalOpen(false)} recommendationData={recommendationData} patientData={{
      name: patientName,
      surname: patientSurname,
      gender: "",
      age: ""
    }} />}
    </>;
};