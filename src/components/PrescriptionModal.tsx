import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import jsPDF from "jspdf";

interface PrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  recommendationData: {
    primaryRecommendation: {
      name: string;
      dose: string;
      route: string;
      duration: string;
    };
  };
  selectedProduct?: {
    name: string;
    manufacturer: string;
    form: string;
  };
}

export const PrescriptionModal = ({ open, onClose, recommendationData, selectedProduct }: PrescriptionModalProps) => {
  const { toast } = useToast();
  const [patientName, setPatientName] = React.useState("");
  const [patientSurname, setPatientSurname] = React.useState("");
  const [doctorName, setDoctorName] = React.useState("");
  const [doctorSurname, setDoctorSurname] = React.useState("");

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
    
    // Add header
    doc.setFontSize(20);
    doc.text("Medical Prescription", 105, 20, { align: "center" });
    
    // Add patient information
    doc.setFontSize(12);
    doc.text("Patient Information:", 20, 40);
    doc.text(`Name: ${patientName} ${patientSurname}`, 20, 50);
    
    // Add medication details
    doc.text("Prescribed Medication:", 20, 70);
    doc.text(`Medication: ${recommendationData.primaryRecommendation.name}`, 20, 80);
    doc.text(`Dose: ${recommendationData.primaryRecommendation.dose}`, 20, 90);
    doc.text(`Route: ${recommendationData.primaryRecommendation.route}`, 20, 100);
    doc.text(`Duration: ${recommendationData.primaryRecommendation.duration}`, 20, 110);
    
    if (selectedProduct) {
      doc.text("Selected Product:", 20, 130);
      doc.text(`Name: ${selectedProduct.name}`, 20, 140);
      doc.text(`Manufacturer: ${selectedProduct.manufacturer}`, 20, 150);
      doc.text(`Form: ${selectedProduct.form}`, 20, 160);
    }
    
    // Add doctor's information and stamp area
    doc.text("Prescribed by:", 20, 200);
    doc.text(`Dr. ${doctorName} ${doctorSurname}`, 20, 210);
    doc.rect(20, 220, 50, 50); // Rectangle for stamp
    doc.text("(Stamp)", 35, 250);

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