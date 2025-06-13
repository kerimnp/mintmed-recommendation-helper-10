
import React, { useState } from "react";
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

interface PrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  recommendationData: EnhancedAntibioticRecommendation;
  selectedProduct?: DrugProduct;
  patientId?: string | null;
}

export const PrescriptionModal = ({ open, onClose, recommendationData, selectedProduct, patientId }: PrescriptionModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [patientName, setPatientName] = useState("");
  const [patientSurname, setPatientSurname] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorSurname, setDoctorSurname] = useState("");
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const savePrescriptionToDatabase = async () => {
    if (!user || !patientId) {
      console.warn('Cannot save prescription: missing user or patient ID');
      return null;
    }

    try {
      const prescriptionData = {
        patient_id: patientId,
        doctor_id: user.id,
        antibiotic_name: recommendationData.primaryRecommendation.name,
        dosage: recommendationData.primaryRecommendation.dosage,
        route: recommendationData.primaryRecommendation.route,
        frequency: recommendationData.primaryRecommendation.frequency || 'As directed',
        duration: recommendationData.primaryRecommendation.duration,
        reason_for_prescription: typeof recommendationData.rationale === 'object' && recommendationData.rationale?.infectionType 
          ? recommendationData.rationale.infectionType 
          : 'Antibiotic treatment',
        status: 'active',
        notes: selectedProduct ? `Product: ${selectedProduct.name} (${selectedProduct.manufacturer})` : undefined,
        start_date: new Date().toISOString().split('T')[0], // Today's date
        end_date: null // Will be calculated based on duration if needed
      };

      const { data, error } = await supabase
        .from('prescriptions')
        .insert([prescriptionData])
        .select()
        .single();

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
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Save prescription to database first
      let savedPrescription = null;
      if (user && patientId) {
        try {
          savedPrescription = await savePrescriptionToDatabase();
          toast({
            title: "Prescription Saved",
            description: "Prescription has been saved to the patient's medical record",
          });
        } catch (error) {
          console.error('Failed to save prescription:', error);
          toast({
            title: "Warning",
            description: "Prescription PDF will be generated, but failed to save to medical record",
            variant: "destructive",
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
      doc.text("Medical Prescription", 100, 25, { align: "center" });
      
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
        description: "The prescription has been generated and saved successfully",
      });
      
      onClose();
    } catch (error) {
      console.error('Error generating prescription:', error);
      toast({
        title: "Error",
        description: "Failed to generate prescription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenReferral = () => {
    setIsReferralModalOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
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
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="patientSurname">Patient Surname</Label>
                <Input
                  id="patientSurname"
                  value={patientSurname}
                  onChange={(e) => setPatientSurname(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input
                  id="doctorName"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="doctorSurname">Doctor Surname</Label>
                <Input
                  id="doctorSurname"
                  value={doctorSurname}
                  onChange={(e) => setDoctorSurname(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>
            {patientId && (
              <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                <p>✓ This prescription will be linked to the patient's medical record</p>
              </div>
            )}
          </div>
          <DialogFooter className="flex-col space-y-2">
            <div className="flex w-full justify-end space-x-2">
              <Button variant="outline" onClick={onClose} disabled={isSaving}>Cancel</Button>
              <Button onClick={generatePrescription} disabled={isSaving}>
                {isSaving ? "Saving..." : "Generate Prescription"}
              </Button>
            </div>
            <div className="flex w-full justify-center pt-4 border-t">
              <Button 
                variant="secondary" 
                className="flex items-center gap-2"
                onClick={handleOpenReferral}
                disabled={isSaving}
              >
                <FileText className="h-4 w-4" />
                Create Referral Letter
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isReferralModalOpen && (
        <ReferralModal
          open={isReferralModalOpen}
          onClose={() => setIsReferralModalOpen(false)}
          recommendationData={recommendationData}
          patientData={{
            name: patientName,
            surname: patientSurname,
            gender: "",
            age: ""
          }}
        />
      )}
    </>
  );
};
