import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar, BarChart2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample data for treatment effectiveness over time
const effectivenessOverTime = [
  { month: 'Jan', amoxicillin: 78, azithromycin: 65, ceftriaxone: 83, ciprofloxacin: 72 },
  { month: 'Feb', amoxicillin: 75, azithromycin: 67, ceftriaxone: 84, ciprofloxacin: 74 },
  { month: 'Mar', amoxicillin: 72, azithromycin: 70, ceftriaxone: 82, ciprofloxacin: 75 },
  { month: 'Apr', amoxicillin: 69, azithromycin: 68, ceftriaxone: 80, ciprofloxacin: 76 },
  { month: 'May', amoxicillin: 67, azithromycin: 65, ceftriaxone: 79, ciprofloxacin: 74 },
  { month: 'Jun', amoxicillin: 65, azithromycin: 62, ceftriaxone: 78, ciprofloxacin: 72 },
];

// Sample data for antibiotic comparison
const antibioticComparison = [
  { 
    name: "Amoxicillin", 
    effectiveness: 65, 
    resistanceRate: 25, 
    sideEffectRate: 12, 
    costPerUnit: 5,
    treatmentDuration: 7
  },
  { 
    name: "Azithromycin", 
    effectiveness: 72, 
    resistanceRate: 18, 
    sideEffectRate: 8, 
    costPerUnit: 15,
    treatmentDuration: 5
  },
  { 
    name: "Ceftriaxone", 
    effectiveness: 88, 
    resistanceRate: 12, 
    sideEffectRate: 15, 
    costPerUnit: 45,
    treatmentDuration: 10
  },
  { 
    name: "Ciprofloxacin", 
    effectiveness: 75, 
    resistanceRate: 22, 
    sideEffectRate: 18, 
    costPerUnit: 12,
    treatmentDuration: 7
  },
  { 
    name: "Vancomycin", 
    effectiveness: 92, 
    resistanceRate: 8, 
    sideEffectRate: 25, 
    costPerUnit: 120,
    treatmentDuration: 14
  },
];

// Sample data for treatment outcomes
const treatmentOutcomes = [
  { name: "Complete Resolution", value: 65 },
  { name: "Partial Improvement", value: 20 },
  { name: "No Change", value: 10 },
  { name: "Worsening", value: 5 },
];

// Sample data for radar chart comparison
const radarData = [
  { subject: 'Effectiveness', A: 65, B: 72, C: 88, fullMark: 100 },
  { subject: 'Side Effects (Lower is Better)', A: 88, B: 92, C: 85, fullMark: 100 },
  { subject: 'Cost-Effectiveness', A: 90, B: 75, C: 60, fullMark: 100 },
  { subject: 'Resistance Risk (Lower is Better)', A: 75, B: 82, C: 88, fullMark: 100 },
  { subject: 'Ease of Administration', A: 95, B: 85, C: 65, fullMark: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const TreatmentEffectiveness = () => {
  const [infectionType, setInfectionType] = useState("respiratory");
  const [timePeriod, setTimePeriod] = useState("all");
  
  const handleExportData = () => {
    alert("Data exported successfully");
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-medium text-medical-primary">Effectiveness Analysis</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue={infectionType} onValueChange={setInfectionType}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Select Infection Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="respiratory">Respiratory</SelectItem>
              <SelectItem value="urinary">Urinary</SelectItem>
              <SelectItem value="skin">Skin</SelectItem>
              <SelectItem value="abdominal">Abdominal</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="2y">Last 2 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Trends Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="font-medium">Effectiveness Trends Over Time</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tracking effectiveness rates of major antibiotics
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> 
            <span>{timePeriod === "all" ? "All Time" : `Last ${timePeriod}`}</span>
          </Badge>
        </div>
        <div className="h-80">
          <ChartContainer config={{
            amoxicillin: { theme: { light: '#0088FE', dark: '#60a5fa' } },
            azithromycin: { theme: { light: '#00C49F', dark: '#34d399' } },
            ceftriaxone: { theme: { light: '#FFBB28', dark: '#fbbf24' } },
            ciprofloxacin: { theme: { light: '#FF8042', dark: '#f97316' } }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={effectivenessOverTime}
                margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amoxicillin" stroke="#0088FE" activeDot={{ r: 8 }} name="Amoxicillin" />
                <Line type="monotone" dataKey="azithromycin" stroke="#00C49F" name="Azithromycin" />
                <Line type="monotone" dataKey="ceftriaxone" stroke="#FFBB28" name="Ceftriaxone" />
                <Line type="monotone" dataKey="ciprofloxacin" stroke="#FF8042" name="Ciprofloxacin" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
      
      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Antibiotic Comparison */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
          <div className="mb-4">
            <h4 className="font-medium flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-medical-primary" />
              Antibiotic Comparison
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Direct comparison of effectiveness rates
            </p>
          </div>
          <div className="h-80">
            <ChartContainer config={{
              effectiveness: { theme: { light: '#0088FE', dark: '#60a5fa' } },
              resistanceRate: { theme: { light: '#FF8042', dark: '#f97316' } },
              sideEffectRate: { theme: { light: '#FFBB28', dark: '#fbbf24' } }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={antibioticComparison}
                  margin={{ top: 5, right: 30, left: 5, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                  <XAxis dataKey="name" angle={-20} textAnchor="end" height={60} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-gray-800 border p-3 rounded shadow-md">
                            <p className="font-medium">{payload[0]?.payload.name}</p>
                            <div className="text-sm mt-1">
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {entry.name}: {entry.value}%
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="effectiveness" name="Effectiveness" fill="#0088FE" />
                  <Bar dataKey="resistanceRate" name="Resistance Rate" fill="#FF8042" />
                  <Bar dataKey="sideEffectRate" name="Side Effect Rate" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
        
        {/* Detailed Comparison */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
          <div className="mb-4">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-medical-primary" />
              Detailed Comparison
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Multi-dimensional analysis
            </p>
          </div>
          <Tabs defaultValue="radar" className="h-80">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="radar" className="flex-1">Radar Analysis</TabsTrigger>
              <TabsTrigger value="outcomes" className="flex-1">Outcomes</TabsTrigger>
            </TabsList>
            <TabsContent value="radar" className="h-[calc(100%-44px)]">
              <ChartContainer config={{
                amoxicillin: { theme: { light: '#0088FE', dark: '#60a5fa' } },
                azithromycin: { theme: { light: '#00C49F', dark: '#34d399' } },
                ceftriaxone: { theme: { light: '#FFBB28', dark: '#fbbf24' } }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Amoxicillin" dataKey="A" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
                    <Radar name="Azithromycin" dataKey="B" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
                    <Radar name="Ceftriaxone" dataKey="C" stroke="#FFBB28" fill="#FFBB28" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="outcomes" className="h-[calc(100%-44px)]">
              <ChartContainer config={{
                outcome: { theme: { light: '#8884d8', dark: '#a78bfa' } }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={treatmentOutcomes}
                    margin={{ top: 20, right: 30, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Percentage of Cases" fill="#8884d8">
                      {treatmentOutcomes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Legend/Guide */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(COLORS).map(([key, color]) => (
          <div 
            key={key}
            className="flex items-center justify-center p-3 rounded-lg font-medium text-sm shadow-sm"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            {key.toUpperCase()}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="flex items-center gap-2" onClick={handleExportData}>
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>
    </div>
  );
};
