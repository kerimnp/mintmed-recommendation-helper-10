import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

export const PatientForm = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <Card className="glass-card p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Patient Demographics</h2>
          <p className="text-sm text-gray-500">Enter the patient's basic information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age" className="form-label">Age</Label>
            <Input id="age" type="number" placeholder="Enter age" className="input-field" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="form-label">Gender</Label>
            <Select>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="form-label">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="Enter weight" className="input-field" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height" className="form-label">Height (cm)</Label>
            <Input id="height" type="number" placeholder="Enter height" className="input-field" />
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full bg-mint-300 hover:bg-mint-400 text-gray-900 font-medium transition-all duration-200">
            Continue to Medical History
          </Button>
        </div>
      </Card>
    </div>
  );
};