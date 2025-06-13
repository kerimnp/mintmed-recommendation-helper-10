
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

interface PatientDemographicsSectionProps {
  formData: {
    age: string;
    gender: string;
    weight: string;
    height: string;
    nationality: string;
    pregnancy: string;
    firstName: string;
    lastName: string;
    contactPhone: string;
    contactEmail: string;
    address: string;
  };
  onInputChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
}

export const PatientDemographicsSection: React.FC<PatientDemographicsSectionProps> = ({
  formData,
  onInputChange,
  errors
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      {/* Basic Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-medical-deep font-medium">
            {language === "en" ? "First Name" : "Ime"}
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder={language === "en" ? "Enter first name" : "Unesite ime"}
            value={formData.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            className="border-medical-border focus:border-medical-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-medical-deep font-medium">
            {language === "en" ? "Last Name" : "Prezime"}
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder={language === "en" ? "Enter last name" : "Unesite prezime"}
            value={formData.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            className="border-medical-border focus:border-medical-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="text-medical-deep font-medium">
            {language === "en" ? "Age" : "Godine"} {language === "en" ? "(years)" : "(godine)"}
          </Label>
          <Input
            id="age"
            type="number"
            placeholder={language === "en" ? "Enter age" : "Unesite godine"}
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            className={`border-medical-border focus:border-medical-primary ${
              errors.age ? "border-red-500" : ""
            }`}
            min="0"
            max="120"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-medical-deep font-medium">
            {language === "en" ? "Gender" : "Pol"}
          </Label>
          <Select value={formData.gender} onValueChange={(value) => onInputChange("gender", value)}>
            <SelectTrigger className="border-medical-border focus:border-medical-primary">
              <SelectValue placeholder={language === "en" ? "Select gender" : "Odaberite pol"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">{language === "en" ? "Male" : "Muški"}</SelectItem>
              <SelectItem value="Female">{language === "en" ? "Female" : "Ženski"}</SelectItem>
              <SelectItem value="Other">{language === "en" ? "Other" : "Ostalo"}</SelectItem>
              <SelectItem value="Prefer not to say">{language === "en" ? "Prefer not to say" : "Ne želim reći"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="text-medical-deep font-medium">
            {language === "en" ? "Weight" : "Težina"} {language === "en" ? "(kg)" : "(kg)"}
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder={language === "en" ? "Enter weight" : "Unesite težinu"}
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
            className={`border-medical-border focus:border-medical-primary ${
              errors.weight ? "border-red-500" : ""
            }`}
            min="0"
            max="500"
            step="0.1"
          />
          {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="height" className="text-medical-deep font-medium">
            {language === "en" ? "Height" : "Visina"} {language === "en" ? "(cm)" : "(cm)"}
          </Label>
          <Input
            id="height"
            type="number"
            placeholder={language === "en" ? "Enter height" : "Unesite visinu"}
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
            className={`border-medical-border focus:border-medical-primary ${
              errors.height ? "border-red-500" : ""
            }`}
            min="0"
            max="300"
          />
          {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-medical-deep mb-4">
          {language === "en" ? "Contact Information (Optional)" : "Kontakt Informacije (Opcionalno)"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contactPhone" className="text-medical-deep font-medium">
              {language === "en" ? "Phone Number" : "Broj Telefona"}
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder={language === "en" ? "Enter phone number" : "Unesite broj telefona"}
              value={formData.contactPhone}
              onChange={(e) => onInputChange("contactPhone", e.target.value)}
              className="border-medical-border focus:border-medical-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-medical-deep font-medium">
              {language === "en" ? "Email Address" : "Email Adresa"}
            </Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder={language === "en" ? "Enter email address" : "Unesite email adresu"}
              value={formData.contactEmail}
              onChange={(e) => onInputChange("contactEmail", e.target.value)}
              className="border-medical-border focus:border-medical-primary"
            />
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <Label htmlFor="address" className="text-medical-deep font-medium">
            {language === "en" ? "Address" : "Adresa"}
          </Label>
          <Input
            id="address"
            type="text"
            placeholder={language === "en" ? "Enter address" : "Unesite adresu"}
            value={formData.address}
            onChange={(e) => onInputChange("address", e.target.value)}
            className="border-medical-border focus:border-medical-primary"
          />
        </div>
      </div>

      {/* Additional Demographics */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-medical-deep mb-4">
          {language === "en" ? "Additional Information (Optional)" : "Dodatne Informacije (Opcionalno)"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nationality" className="text-medical-deep font-medium">
              {language === "en" ? "Nationality" : "Nacionalnost"}
            </Label>
            <Input
              id="nationality"
              type="text"
              placeholder={language === "en" ? "Enter nationality" : "Unesite nacionalnost"}
              value={formData.nationality}
              onChange={(e) => onInputChange("nationality", e.target.value)}
              className="border-medical-border focus:border-medical-primary"
            />
          </div>

          {formData.gender === "Female" && (
            <div className="space-y-2">
              <Label htmlFor="pregnancy" className="text-medical-deep font-medium">
                {language === "en" ? "Pregnancy Status" : "Status Trudnoće"}
              </Label>
              <Select value={formData.pregnancy} onValueChange={(value) => onInputChange("pregnancy", value)}>
                <SelectTrigger className="border-medical-border focus:border-medical-primary">
                  <SelectValue placeholder={language === "en" ? "Select pregnancy status" : "Odaberite status trudnoće"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">{language === "en" ? "Not pregnant" : "Nije trudna"}</SelectItem>
                  <SelectItem value="Yes">{language === "en" ? "Pregnant" : "Trudna"}</SelectItem>
                  <SelectItem value="Unknown">{language === "en" ? "Unknown" : "Nepoznato"}</SelectItem>
                  <SelectItem value="Possibly">{language === "en" ? "Possibly pregnant" : "Možda trudna"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
