
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "./ui/use-toast";
import jsPDF from "jspdf";
import { FileText } from "lucide-react";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";

interface ReferralModalProps {
  open: boolean;
  onClose: () => void;
  recommendationData: EnhancedAntibioticRecommendation;
  patientData?: {
    name?: string;
    surname?: string;
    age?: string;
    gender?: string;
  };
}

export const ReferralModal = ({ open, onClose, recommendationData, patientData }: ReferralModalProps) => {
  const { toast } = useToast();
  const [patientName, setPatientName] = useState(patientData?.name || "");
  const [patientSurname, setPatientSurname] = useState(patientData?.surname || "");
  const [patientDOB, setPatientDOB] = useState("");
  const [patientGender, setPatientGender] = useState(patientData?.gender || "");
  const [patientMRN, setPatientMRN] = useState("");
  const [patientContact, setPatientContact] = useState("");
  
  const [doctorName, setDoctorName] = useState("");
  const [doctorSurname, setDoctorSurname] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");
  const [doctorClinic, setDoctorClinic] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  
  const [recipient, setRecipient] = useState("");
  const [department, setDepartment] = useState("");
  const [urgency, setUrgency] = useState("routine");
  
  const [reasonForReferral, setReasonForReferral] = useState("");
  const [presentIllness, setPresentIllness] = useState("");
  const [pastMedicalHistory, setPastMedicalHistory] = useState("");
  const [medications, setMedications] = useState(recommendationData?.primaryRecommendation?.name || "");
  const [allergies, setAllergies] = useState("");
  const [physicalExam, setPhysicalExam] = useState("");
  const [investigations, setInvestigations] = useState("");
  const [assessment, setAssessment] = useState(recommendationData?.rationale?.infectionType || "");
  const [specificQuestions, setSpecificQuestions] = useState("");
  const [plan, setPlan] = useState("");

  const generateReferral = () => {
    if (!patientName || !patientSurname || !doctorName || !doctorSurname || !reasonForReferral || !department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (marked with *)",
        variant: "destructive",
      });
      return;
    }

    const doc = new jsPDF();
    
    // Add logo and header
    doc.addImage("/lovable-uploads/c6384933-7f76-44d0-b4ab-45145d7d7c61.png", "PNG", 10, 10, 40, 20);
    
    // Header section
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, 210, 35, "F");
    doc.setFillColor(241, 245, 249);
    doc.rect(0, 35, 210, 5, "F");
    
    doc.setFontSize(24);
    doc.setTextColor(30, 41, 59);
    doc.text("Medical Referral", 130, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 130, 30);
    
    let yPos = 50;
    const lineHeight = 7;
    
    // Referring physician section
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175); // Blue color for section headers
    doc.text("Referring Physician:", 20, yPos);
    yPos += lineHeight;
    
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`Dr. ${doctorName} ${doctorSurname}${doctorSpecialty ? `, ${doctorSpecialty}` : ''}`, 20, yPos);
    yPos += lineHeight - 2;
    if (doctorClinic) {
      doc.text(doctorClinic, 20, yPos);
      yPos += lineHeight - 2;
    }
    if (doctorPhone) {
      doc.text(`Tel: ${doctorPhone}`, 20, yPos);
      yPos += lineHeight;
    }
    
    // Recipient section
    yPos += 5;
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175);
    doc.text("To:", 20, yPos);
    yPos += lineHeight;
    
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`${recipient ? `Dr. ${recipient}` : department}`, 20, yPos);
    yPos += lineHeight - 2;
    doc.text(department, 20, yPos);
    yPos += lineHeight + 5;
    
    // Patient details section
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(20, yPos - 5, 170, 30, 3, 3, "F");
    
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175);
    doc.text("Patient Information:", 25, yPos);
    yPos += lineHeight;
    
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`Name: ${patientName} ${patientSurname}`, 25, yPos);
    doc.text(`DOB: ${patientDOB || 'N/A'}`, 110, yPos);
    yPos += lineHeight - 2;
    doc.text(`Gender: ${patientGender || 'N/A'}`, 25, yPos);
    doc.text(`MRN: ${patientMRN || 'N/A'}`, 110, yPos);
    yPos += lineHeight - 2;
    if (patientContact) {
      doc.text(`Contact: ${patientContact}`, 25, yPos);
    }
    yPos += lineHeight + 10;
    
    // Urgency and referral reason
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175);
    doc.text("Reason for Referral:", 20, yPos);
    yPos += lineHeight;
    
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    const urgencyLabel = urgency === "urgent" ? "URGENT" : urgency === "asap" ? "ASAP" : "Routine";
    if (urgency === "urgent" || urgency === "asap") {
      doc.setTextColor(220, 38, 38); // Red for urgent/ASAP
    }
    doc.text(`Urgency: ${urgencyLabel}`, 20, yPos);
    doc.setTextColor(30, 41, 59);
    yPos += lineHeight;
    
    // Split text for reason for referral
    const reasonLines = doc.splitTextToSize(
      `I am referring ${patientName} ${patientSurname} for evaluation of ${reasonForReferral}`,
      160
    );
    doc.text(reasonLines, 20, yPos);
    yPos += reasonLines.length * (lineHeight - 2) + 5;
    
    // Present illness
    if (presentIllness) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("History of Present Illness:", 20, yPos);
      yPos += lineHeight;
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      const illnessLines = doc.splitTextToSize(presentIllness, 170);
      doc.text(illnessLines, 20, yPos);
      yPos += illnessLines.length * (lineHeight - 2) + 5;
    }
    
    // Past medical history
    if (pastMedicalHistory) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("Past Medical/Surgical History:", 20, yPos);
      yPos += lineHeight;
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      const historyLines = doc.splitTextToSize(pastMedicalHistory, 170);
      doc.text(historyLines, 20, yPos);
      yPos += historyLines.length * (lineHeight - 2) + 5;
    }
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Medications and allergies
    if (medications || allergies) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("Medications & Allergies:", 20, yPos);
      yPos += lineHeight;
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      if (medications) {
        const medLines = doc.splitTextToSize(`Medications: ${medications}`, 170);
        doc.text(medLines, 20, yPos);
        yPos += medLines.length * (lineHeight - 2) + 2;
      }
      if (allergies) {
        const allergyLines = doc.splitTextToSize(`Allergies: ${allergies}`, 170);
        doc.text(allergyLines, 20, yPos);
        yPos += allergyLines.length * (lineHeight - 2) + 5;
      } else {
        yPos += 5;
      }
    }
    
    // Physical examination
    if (physicalExam) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("Physical Examination:", 20, yPos);
      yPos += lineHeight;
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      const examLines = doc.splitTextToSize(physicalExam, 170);
      doc.text(examLines, 20, yPos);
      yPos += examLines.length * (lineHeight - 2) + 5;
    }
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Investigations
    if (investigations) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("Investigations & Results:", 20, yPos);
      yPos += lineHeight;
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      const investLines = doc.splitTextToSize(investigations, 170);
      doc.text(investLines, 20, yPos);
      yPos += investLines.length * (lineHeight - 2) + 5;
    }
    
    // Assessment
    if (assessment) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("Assessment & Differential Diagnosis:", 20, yPos);
      yPos += lineHeight;
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      const assessLines = doc.splitTextToSize(assessment, 170);
      doc.text(assessLines, 20, yPos);
      yPos += assessLines.length * (lineHeight - 2) + 5;
    }
    
    // Specific questions
    if (specificQuestions) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("Specific Questions / Referral Request:", 20, yPos);
      yPos += lineHeight;
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      const questionLines = doc.splitTextToSize(specificQuestions, 170);
      doc.text(questionLines, 20, yPos);
      yPos += questionLines.length * (lineHeight - 2) + 5;
    }
    
    // Plan
    if (plan) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("Plan & Next Steps:", 20, yPos);
      yPos += lineHeight;
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      const planLines = doc.splitTextToSize(plan, 170);
      doc.text(planLines, 20, yPos);
      yPos += planLines.length * (lineHeight - 2) + 10;
    }
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Closing and signature
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text("Thank you for your assessment. Please do not hesitate to contact me for any further information.", 20, yPos);
    yPos += lineHeight + 15;
    
    doc.text(`Dr. ${doctorName} ${doctorSurname}`, 20, yPos);
    yPos += lineHeight - 2;
    doc.setDrawColor(204, 204, 204);
    doc.line(20, yPos - 5, 80, yPos - 5);
    if (doctorSpecialty) {
      doc.text(doctorSpecialty, 20, yPos);
    }

    // Save the PDF
    doc.save(`referral_${patientSurname}_${patientName}.pdf`);
    
    toast({
      title: "Referral Generated",
      description: "The referral letter has been generated successfully",
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Medical Referral
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-3">Referring Physician</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="doctorName">First Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="doctorName"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <Label htmlFor="doctorSurname">Last Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="doctorSurname"
                    value={doctorSurname}
                    onChange={(e) => setDoctorSurname(e.target.value)}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label htmlFor="doctorSpecialty">Specialty</Label>
                  <Input
                    id="doctorSpecialty"
                    value={doctorSpecialty}
                    onChange={(e) => setDoctorSpecialty(e.target.value)}
                    placeholder="e.g., Family Medicine"
                  />
                </div>
                <div>
                  <Label htmlFor="doctorPhone">Phone</Label>
                  <Input
                    id="doctorPhone"
                    value={doctorPhone}
                    onChange={(e) => setDoctorPhone(e.target.value)}
                    placeholder="Contact number"
                  />
                </div>
              </div>
              <div className="mt-3">
                <Label htmlFor="doctorClinic">Clinic/Hospital</Label>
                <Input
                  id="doctorClinic"
                  value={doctorClinic}
                  onChange={(e) => setDoctorClinic(e.target.value)}
                  placeholder="Practice location"
                />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-md font-medium mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="patientName">First Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <Label htmlFor="patientSurname">Last Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="patientSurname"
                    value={patientSurname}
                    onChange={(e) => setPatientSurname(e.target.value)}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label htmlFor="patientDOB">Date of Birth</Label>
                  <Input
                    id="patientDOB"
                    type="date"
                    value={patientDOB}
                    onChange={(e) => setPatientDOB(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="patientGender">Gender</Label>
                  <Select value={patientGender} onValueChange={setPatientGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label htmlFor="patientMRN">Medical Record #</Label>
                  <Input
                    id="patientMRN"
                    value={patientMRN}
                    onChange={(e) => setPatientMRN(e.target.value)}
                    placeholder="MRN"
                  />
                </div>
                <div>
                  <Label htmlFor="patientContact">Contact</Label>
                  <Input
                    id="patientContact"
                    value={patientContact}
                    onChange={(e) => setPatientContact(e.target.value)}
                    placeholder="Phone or email"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-md font-medium mb-3">History & Examination</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="pastMedicalHistory">Past Medical/Surgical History</Label>
                  <Textarea
                    id="pastMedicalHistory"
                    value={pastMedicalHistory}
                    onChange={(e) => setPastMedicalHistory(e.target.value)}
                    placeholder="Major illnesses, surgeries, hospitalizations..."
                    className="h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="physicalExam">Physical Examination</Label>
                  <Textarea
                    id="physicalExam"
                    value={physicalExam}
                    onChange={(e) => setPhysicalExam(e.target.value)}
                    placeholder="Key vitals, system-specific findings..."
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-3">Referral Details</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                  <Input
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g., Cardiology, Neurology"
                  />
                </div>
                <div>
                  <Label htmlFor="recipient">Recipient Name (if known)</Label>
                  <Input
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Dr. Name"
                  />
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="asap">ASAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reasonForReferral">Reason for Referral <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="reasonForReferral"
                    value={reasonForReferral}
                    onChange={(e) => setReasonForReferral(e.target.value)}
                    placeholder="Chief complaint for evaluation"
                    className="h-20"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-md font-medium mb-3">Clinical Information</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="presentIllness">History of Present Illness</Label>
                  <Textarea
                    id="presentIllness"
                    value={presentIllness}
                    onChange={(e) => setPresentIllness(e.target.value)}
                    placeholder="Onset, duration, character, associated symptoms..."
                    className="h-20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      placeholder="Name, dose, frequency"
                      className="h-20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="Drug allergies, adverse reactions..."
                      className="h-20"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-md font-medium mb-3">Assessment & Plan</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="investigations">Investigations & Results</Label>
                  <Textarea
                    id="investigations"
                    value={investigations}
                    onChange={(e) => setInvestigations(e.target.value)}
                    placeholder="Lab data, imaging reports, ECG..."
                    className="h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="assessment">Assessment & Differential Diagnosis</Label>
                  <Textarea
                    id="assessment"
                    value={assessment}
                    onChange={(e) => setAssessment(e.target.value)}
                    placeholder="Working diagnosis, other possibilities..."
                    className="h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="specificQuestions">Specific Questions for Consultant</Label>
                  <Textarea
                    id="specificQuestions"
                    value={specificQuestions}
                    onChange={(e) => setSpecificQuestions(e.target.value)}
                    placeholder="What you wish the consultant to address..."
                    className="h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="plan">Plan & Next Steps</Label>
                  <Textarea
                    id="plan"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    placeholder="Interim management, instructions for patient..."
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between mt-6">
          <p className="text-sm text-muted-foreground mb-3 sm:mb-0">
            Fields marked with <span className="text-red-500">*</span> are required
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={generateReferral}>Generate PDF</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
