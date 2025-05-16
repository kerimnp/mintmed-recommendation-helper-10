import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast"; // Corrected path
import { Printer, FileText } from "lucide-react";
import jsPDF from "jspdf";
import { DrugProduct } from "@/utils/availableDrugsDatabase";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";
import { ReferralModal } from "./ReferralModal";
import { usePrescriptions, Prescription } from "@/contexts/PrescriptionContext"; // Import context

interface PrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  recommendationData: EnhancedAntibioticRecommendation;
  selectedProduct?: DrugProduct;
}

export const PrescriptionModal = ({ open, onClose, recommendationData, selectedProduct }: PrescriptionModalProps) => {
  const { toast } = useToast();
  const { addPrescription } = usePrescriptions(); // Use context
  const [patientName, setPatientName] = useState("");
  const [patientSurname, setPatientSurname] = useState("");
  const [doctorName, setDoctorName] = useState("Dr. Sabic"); // Defaulting for convenience
  const [doctorSurname, setDoctorSurname] = useState(""); 
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  const generatePrescription = async () => {
    if (!patientName || !patientSurname || !doctorName) { // Doctor surname can be optional or part of Dr. Name
      toast({
        title: "Missing Information",
        description: "Please fill in patient name, surname, and doctor's name.",
        variant: "destructive",
      });
      return;
    }

    const prescriptionPayload: Omit<Prescription, 'id' | 'created_at' | 'user_id'> = {
      patient_name: patientName,
      patient_surname: patientSurname,
      doctor_name: doctorName,
      doctor_surname: doctorSurname, // Include if you have a separate field for it
      medication_name: recommendationData.primaryRecommendation.name,
      medication_product_name: selectedProduct?.name,
      medication_manufacturer: selectedProduct?.manufacturer,
      dose: recommendationData.primaryRecommendation.dose,
      route: recommendationData.primaryRecommendation.route,
      duration: recommendationData.primaryRecommendation.duration,
      status: 'Sent', // Or 'Pending', depending on workflow
    };

    try {
      await addPrescription(prescriptionPayload);
      // PDF generation logic
      const doc = new jsPDF();
      // ... keep existing code (jsPDF setup: logo, header, title)
      doc.addImage("/lovable-uploads/c6384933-7f76-44d0-b4ab-45145d7d7c61.png", "PNG", 10, 10, 60, 30);
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, 210, 40, "F");
      doc.setFillColor(241, 245, 249);
      doc.rect(0, 35, 210, 5, "F");
      doc.setFontSize(24);
      doc.setTextColor(30, 41, 59);
      doc.text("Medical Prescription", 100, 25, { align: "center" });
      
      doc.setFillColor(249, 250, 251);
      doc.rect(20, 50, 170, 40, "F");
      doc.setFontSize(12);
      doc.setTextColor(71, 85, 105);
      doc.text("Patient Information", 25, 60);
      doc.setTextColor(51, 65, 85);
      doc.text(`Name: ${patientName} ${patientSurname}`, 25, 70);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 25, 80);
      
      doc.setFillColor(249, 250, 251);
      doc.rect(20, 100, 170, 70, "F"); // Increased height for more details
      doc.setTextColor(71, 85, 105);
      doc.text("Prescribed Medication", 25, 110);
      doc.setTextColor(51, 65, 85);
      doc.text(`Medication: ${prescriptionPayload.medication_name}`, 25, 120);
      if (prescriptionPayload.medication_product_name) {
        doc.text(`Product: ${prescriptionPayload.medication_product_name} (by ${prescriptionPayload.medication_manufacturer || 'N/A'})`, 25, 130);
      }
      doc.text(`Dose: ${prescriptionPayload.dose}`, 25, 140);
      doc.text(`Route: ${prescriptionPayload.route}`, 25, 150);
      doc.text(`Duration: ${prescriptionPayload.duration}`, 25, 160);
      
      // ... keep existing code (jsPDF rationale and doctor signature)
      if (recommendationData.rationale) {
        doc.setFillColor(249, 250, 251);
        doc.rect(20, 180, 170, 30, "F"); // Adjusted y-position based on medication details section
        doc.setTextColor(71, 85, 105);
        doc.text("Clinical Rationale", 25, 190);
        doc.setTextColor(51, 65, 85);
        doc.text(`Infection Type: ${recommendationData.rationale.infectionType}`, 25, 200);
        doc.text(`Severity: ${recommendationData.rationale.severity}`, 25, 210);
      }
      
      doc.setFillColor(249, 250, 251);
      doc.rect(20, 220, 170, 50, "F"); // Adjusted y-position
      doc.setTextColor(71, 85, 105);
      doc.text("Prescribed by:", 25, 230);
      doc.setTextColor(51, 65, 85);
      doc.text(`Dr. ${doctorName} ${doctorSurname || ''}`, 25, 240);
      
      doc.setDrawColor(203, 213, 225);
      doc.line(25, 255, 95, 255);
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text("(Signature)", 50, 265);

      doc.save(`prescription_${patientSurname}_${patientName}.pdf`);
      
      toast({
        title: "Prescription Generated & Saved",
        description: "The prescription PDF has been generated and data saved.",
      });
      onClose();

    } catch (error) {
      // Error toast is handled by addPrescription in context
      console.error("Failed to process prescription:", error);
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
            {/* ... keep existing code (Input fields for patient and doctor names) ... */}
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
                  placeholder="First name (e.g. Sabic)"
                />
              </div>
              <div>
                <Label htmlFor="doctorSurname">Doctor Surname (Optional)</Label>
                <Input
                  id="doctorSurname"
                  value={doctorSurname}
                  onChange={(e) => setDoctorSurname(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col space-y-2">
            {/* ... keep existing code (Footer buttons) ... */}
            <div className="flex w-full justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={generatePrescription}>Generate Prescription</Button>
            </div>
            <div className="flex w-full justify-center pt-4 border-t">
              <Button 
                variant="secondary" 
                className="flex items-center gap-2"
                onClick={handleOpenReferral}
              >
                <FileText className="h-4 w-4" />
                Create Referral Letter
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isReferralModalOpen && (
        // ... keep existing code (ReferralModal rendering) ...
        <ReferralModal
          open={isReferralModalOpen}
          onClose={() => setIsReferralModalOpen(false)}
          recommendationData={recommendationData}
          patientData={{
            name: patientName,
            surname: patientSurname,
            gender: "", // These might need to be sourced from patient form
            age: ""     // These might need to be sourced from patient form
          }}
        />
      )}
    </>
  );
};
