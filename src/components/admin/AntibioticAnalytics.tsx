
import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer } from "@/components/ui/chart";
import { Download, Filter, Search, ArrowDown, ArrowUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Sample data
const antibioticData = [
  { id: 1, name: "Amoxicillin", count: 124, patientType: "Adult", severity: "Mild", infection: "Respiratory" },
  { id: 2, name: "Azithromycin", count: 98, patientType: "Adult", severity: "Moderate", infection: "Respiratory" },
  { id: 3, name: "Ceftriaxone", count: 76, patientType: "Adult", severity: "Severe", infection: "Respiratory" },
  { id: 4, name: "Ciprofloxacin", count: 62, patientType: "Adult", severity: "Moderate", infection: "Urinary" },
  { id: 5, name: "Vancomycin", count: 43, patientType: "Adult", severity: "Severe", infection: "Skin" },
  { id: 6, name: "Doxycycline", count: 38, patientType: "Adult", severity: "Mild", infection: "Skin" },
  { id: 7, name: "Cephalexin", count: 57, patientType: "Adult", severity: "Mild", infection: "Skin" },
  { id: 8, name: "Nitrofurantoin", count: 49, patientType: "Adult", severity: "Mild", infection: "Urinary" },
  { id: 9, name: "Meropenem", count: 31, patientType: "Pediatric", severity: "Severe", infection: "Abdominal" },
  { id: 10, name: "Amoxicillin-Clavulanate", count: 87, patientType: "Pediatric", severity: "Moderate", infection: "Respiratory" },
];

const patientData = [
  { name: "Adult", value: 570 },
  { name: "Pediatric", value: 230 },
  { name: "Geriatric", value: 200 },
];

const infectionSiteData = [
  { name: "Respiratory", value: 320 },
  { name: "Urinary", value: 210 },
  { name: "Skin", value: 170 },
  { name: "Abdominal", value: 150 },
  { name: "Other", value: 150 },
];

// Sample patient prescription records
const prescriptionRecords = [
  { id: "PR-1001", patient: "John D., 45M", antibiotic: "Amoxicillin 500mg", date: "2025-04-05", infection: "Respiratory", severity: "Mild" },
  { id: "PR-1002", patient: "Sarah M., 32F", antibiotic: "Ciprofloxacin 250mg", date: "2025-04-06", infection: "Urinary", severity: "Moderate" },
  { id: "PR-1003", patient: "Michael R., 58M", antibiotic: "Vancomycin 1g", date: "2025-04-06", infection: "Skin", severity: "Severe" },
  { id: "PR-1004", patient: "Emily T., 8F", antibiotic: "Amoxicillin 250mg", date: "2025-04-07", infection: "Respiratory", severity: "Mild" },
  { id: "PR-1005", patient: "Robert L., 67M", antibiotic: "Azithromycin 500mg", date: "2025-04-07", infection: "Respiratory", severity: "Moderate" }
];

export const AntibioticAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("7");
  
  // Filter data based on search term and filter type
  const filteredData = antibioticData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || item.infection.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const renderSeverityBadge = (severity: string) => {
    const colorMap: Record<string, string> = {
      "Mild": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "Moderate": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      "Severe": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    };
    
    return (
      <span className={`inline-block px-2 py-1 rounded-full text-xs ${colorMap[severity]}`}>
        {severity}
      </span>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-medical-primary">Analytics Overview</span>
            <Badge variant="outline" className="ml-auto">Last {dateRange} Days</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search antibiotics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="respiratory">Respiratory</SelectItem>
                    <SelectItem value="urinary">Urinary</SelectItem>
                    <SelectItem value="skin">Skin</SelectItem>
                    <SelectItem value="abdominal">Abdominal</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 Days</SelectItem>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="90">Last 90 Days</SelectItem>
                    <SelectItem value="365">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Advanced Filters</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border border-slate-100 dark:border-slate-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Prescription Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={{
                    barColor: { theme: { light: '#0088FE', dark: '#60a5fa' } }
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredData} margin={{ top: 5, right: 20, left: 5, bottom: 35 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white dark:bg-gray-800 border rounded-md shadow-md p-3">
                                  <p className="font-medium">{payload[0].payload.name}</p>
                                  <p className="text-sm mt-1">Count: {payload[0].value}</p>
                                  <p className="text-sm">Type: {payload[0].payload.infection}</p>
                                  <p className="text-sm">Severity: {payload[0].payload.severity}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="count" fill="#0088FE" name="Prescription Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border border-slate-100 dark:border-slate-800 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Patient Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-56">
                    <ChartContainer config={{
                      pieColors: { theme: { light: '#8884d8', dark: '#a78bfa' } }
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={patientData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {patientData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-100 dark:border-slate-800 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Infection Sites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-56">
                    <ChartContainer config={{
                      pieColors: { theme: { light: '#8884d8', dark: '#a78bfa' } }
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={infectionSiteData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {infectionSiteData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="border border-slate-100 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Prescription Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Antibiotic</TableHead>
                      <TableHead>Infection Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescriptionRecords.map((record) => (
                      <TableRow key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.patient}</TableCell>
                        <TableCell>{record.antibiotic}</TableCell>
                        <TableCell>{record.infection}</TableCell>
                        <TableCell>{renderSeverityBadge(record.severity)}</TableCell>
                        <TableCell>{record.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 42 records
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ArrowUp className="h-4 w-4 mr-1" /> Newer
                  </Button>
                  <Button variant="outline" size="sm">
                    Older <ArrowDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
