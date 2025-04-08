
import React from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Treatment Effectiveness Analysis</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue="respiratory">
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
          
          <Select defaultValue="all">
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
      
      <Card>
        <CardHeader>
          <CardTitle>Effectiveness Trends Over Time</CardTitle>
          <CardDescription>
            Tracking effectiveness rates of major antibiotics over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer config={{
            amoxicillin: { theme: { light: '#0088FE', dark: '#60a5fa' } },
            azithromycin: { theme: { light: '#00C49F', dark: '#34d399' } },
            ceftriaxone: { theme: { light: '#FFBB28', dark: '#fbbf24' } },
            ciprofloxacin: { theme: { light: '#FF8042', dark: '#f97316' } }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={effectivenessOverTime}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
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
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Antibiotic Comparison</CardTitle>
            <CardDescription>
              Direct comparison of effectiveness rates between antibiotics
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{
              effectiveness: { theme: { light: '#0088FE', dark: '#60a5fa' } }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={antibioticComparison}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="effectiveness" name="Effectiveness" fill="#0088FE" />
                  <Bar dataKey="resistanceRate" name="Resistance Rate" fill="#FF8042" />
                  <Bar dataKey="sideEffectRate" name="Side Effect Rate" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison Analysis</CardTitle>
            <CardDescription>
              Multi-dimensional comparison of key antibiotics
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <Tabs defaultValue="radar">
              <TabsList className="mb-4">
                <TabsTrigger value="radar">Radar Analysis</TabsTrigger>
                <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              </TabsList>
              <TabsContent value="radar">
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
              <TabsContent value="outcomes">
                <ChartContainer config={{
                  outcomes: { theme: { light: '#0088FE', dark: '#60a5fa' } }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={treatmentOutcomes}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
