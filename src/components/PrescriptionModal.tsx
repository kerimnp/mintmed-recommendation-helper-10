import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import jsPDF from "jspdf";
import { DrugProduct } from "@/utils/availableDrugsDatabase";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";

interface PrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  recommendationData: EnhancedAntibioticRecommendation;
  selectedProduct?: DrugProduct;
}

export const PrescriptionModal = ({ open, onClose, recommendationData, selectedProduct }: PrescriptionModalProps) => {
  const { toast } = useToast();
  const [patientName, setPatientName] = useState("");
  const [patientSurname, setPatientSurname] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorSurname, setDoctorSurname] = useState("");

  const generatePrescription = () => {
    if (!patientName || !patientSurname || !doctorName || !doctorSurname) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

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
    doc.text(`Dose: ${recommendationData.primaryRecommendation.dose}`, 25, 150);
    doc.text(`Route: ${recommendationData.primaryRecommendation.route}`, 25, 160);
    doc.text(`Duration: ${recommendationData.primaryRecommendation.duration}`, 25, 170);
    
    // Add rationale information if available
    if (recommendationData.rationale) {
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
      description: "The prescription has been generated successfully",
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Prescription</DialogTitle>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={generatePrescription}>Generate PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
