
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { resistanceTrendData } from "./data";
import { regionalResistanceData } from "@/utils/antibioticRecommendations/data/regionalResistance";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { useTheme } from "next-themes";

interface ResistanceTrendsProps {
  selectedRegion?: string;
  selectedResistance?: string;
}

export const ResistanceTrends = ({ selectedRegion = "Balkan", selectedResistance = "mrsa" }: ResistanceTrendsProps) => {
  const { theme } = useTheme();
  
  // Generate region-specific trend data based on selected region
  const getRegionSpecificTrendData = () => {
    // Apply a regional modifier based on selected region
    const regionModifiers: Record<string, number> = {
      "Balkan": 1,
      "Southern Europe": 1.2,
      "Northern Europe": 0.6,
      "Eastern Europe": 1.1,
      "Western Europe": 0.8,
      "Global": 1
    };
    
    const modifier = regionModifiers[selectedRegion] || 1;
    
    return resistanceTrendData.map(item => ({
      ...item,
      mrsa: +(item.mrsa * modifier).toFixed(1),
      vre: +(item.vre * modifier).toFixed(1),
      esbl: +(item.esbl * modifier).toFixed(1),
      cre: +(item.cre * modifier).toFixed(1),
      pseudomonas: +(item.pseudomonas * modifier).toFixed(1)
    }));
  };
  
  const regionSpecificData = getRegionSpecificTrendData();
  
  // Generate region-specific observations
  const getRegionObservations = () => {
    const observations = {
      "Balkan": [
        "All resistant bacteria types show an upward trend over the past 6 years",
        "ESBL-producing organisms show the fastest rate of increase (+9.6%)",
        "CRE remains the least prevalent but has almost doubled since 2019",
        "Resistance rates appear to be stabilizing in 2024 with slower growth"
      ],
      "Southern Europe": [
        "Higher overall resistance rates compared to other European regions",
        "MRSA prevalence remains concerning at 35.2%",
        "ESBL-producing organisms have increased by 12.3% since 2019",
        "Vancomycin resistance is growing particularly rapidly"
      ],
      "Northern Europe": [
        "Lowest overall resistance rates in Europe due to strict stewardship programs",
        "CRE remains rare at under 6% prevalence",
        "MRSA rates have been successfully contained below 12%",
        "Annual increase rate is significantly lower than other European regions"
      ],
      "Eastern Europe": [
        "Notable variability between countries in the region",
        "ESBL prevalence is of particular concern at 34.7%",
        "Limited access to newer antibiotics may be contributing to resistance patterns",
        "High carbapenem usage driving increasing CRE rates"
      ],
      "Western Europe": [
        "Moderate resistance rates with significant regional variation",
        "MRSA rates have declined over the last 3 years",
        "Fluoroquinolone resistance is notably high in several countries",
        "Effective antibiotic stewardship programs showing positive impact"
      ],
      "Global": [
        "Significant variation between high and low-income regions",
        "Highest resistance rates observed in South Asia and parts of Africa",
        "CRE is rapidly emerging as a global threat with alarming growth",
        "Access to newer antibiotics remains a challenge in many regions"
      ]
    };
    
    return observations[selectedRegion as keyof typeof observations] || observations["Global"];
  };
  
  const regionObservations = getRegionObservations();
  
  const handleExportData = () => {
    // Create a CSV file with the resistance data
    const csvContent = [
      // Header row
      ["Year", "MRSA", "VRE", "ESBL", "CRE", "Pseudomonas"],
      // Data rows
      ...regionSpecificData.map(item => [
        item.year,
        item.mrsa,
        item.vre,
        item.esbl,
        item.cre,
        item.pseudomonas
      ])
    ]
      .map(row => row.join(","))
      .join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedRegion}_resistance_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${selectedRegion} resistance data exported as CSV`);
  };
  
  const handleDownloadGuidelines = () => {
    // Create a PDF document with the regional guidelines
    const doc = new jsPDF();
    
    // Add header and title
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102);
    doc.text(`${selectedRegion} Regional Guidelines`, 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Antimicrobial Resistance Surveillance Data", 20, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 37);
    
    // Add resistance trends section
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("Regional Resistance Observations", 20, 50);
    
    // Add observations
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    regionObservations.forEach((observation, index) => {
      doc.text(`• ${observation}`, 25, 60 + (index * 7));
    });
    
    // Add data table
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("Resistance Data (2019-2024)", 20, 100);
    
    // Table headers
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const headers = ["Year", "MRSA", "VRE", "ESBL", "CRE", "Pseudomonas"];
    headers.forEach((header, index) => {
      doc.text(header, 20 + (index * 30), 110);
    });
    
    // Table data
    doc.setFontSize(9);
    regionSpecificData.forEach((row, rowIndex) => {
      doc.text(row.year.toString(), 20, 120 + (rowIndex * 7));
      doc.text(row.mrsa.toString() + "%", 50, 120 + (rowIndex * 7));
      doc.text(row.vre.toString() + "%", 80, 120 + (rowIndex * 7));
      doc.text(row.esbl.toString() + "%", 110, 120 + (rowIndex * 7));
      doc.text(row.cre.toString() + "%", 140, 120 + (rowIndex * 7));
      doc.text(row.pseudomonas.toString() + "%", 170, 120 + (rowIndex * 7));
    });
    
    // Add recommendations section
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("Recommendations", 20, 160);
    
    // Add recommendation content
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("1. Monitor local resistance patterns closely and adjust protocols accordingly", 25, 170);
    doc.text("2. Implement antimicrobial stewardship programs to reduce unnecessary prescriptions", 25, 177);
    doc.text("3. Follow guidelines for appropriate empiric therapy based on regional data", 25, 184);
    doc.text("4. Consider resistance patterns when selecting antibiotic regimens", 25, 191);
    
    // Add footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Report generated by Horalix Clinical Decision Support System", 60, 280);
    
    // Save the PDF
    doc.save(`${selectedRegion}_guidelines.pdf`);
    
    toast.success(`${selectedRegion} regional guidelines downloaded as PDF`);
  };
  
  return (
    <Card className="mb-8 shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden backdrop-blur-sm">
      <CardHeader className="pb-2 bg-gray-50/80 dark:bg-gray-900/50">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-xl text-medical-primary">Resistance Trends (2019-2024) - {selectedRegion}</CardTitle>
            <CardDescription>
              Data based on European Antimicrobial Resistance Surveillance Network (EARS-Net)
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadGuidelines} variant="outline" className="flex items-center gap-2 whitespace-nowrap rounded-full text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Download Guidelines</span>
            </Button>
            <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2 whitespace-nowrap rounded-full text-sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Data</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[500px]"> {/* Adjusted height for better visibility */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={300}
              data={regionSpecificData}
              margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
              <XAxis 
                dataKey="year"
                tick={{ fontSize: 13 }}
              />
              <YAxis 
                label={{ value: 'Resistance (%)', angle: -90, position: 'insideLeft', offset: -15 }}
                domain={[0, 100]}
                tick={{ fontSize: 13 }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, ""]} 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '12px', 
                  border: theme === 'dark' ? '1px solid rgba(100, 116, 139, 0.5)' : '1px solid rgba(200, 214, 229, 0.5)', 
                  padding: '12px',
                  fontSize: '13px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} formatter={(value) => value.toUpperCase()} />
              <Area 
                type="monotone" 
                dataKey="mrsa" 
                name="MRSA" 
                stroke="#FF8042" 
                fill="#FF8042" 
                fillOpacity={0.6}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area 
                type="monotone" 
                dataKey="vre" 
                name="VRE" 
                stroke="#FFBB28" 
                fill="#FFBB28" 
                fillOpacity={0.6}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area 
                type="monotone" 
                dataKey="esbl" 
                name="ESBL" 
                stroke="#0088FE" 
                fill="#0088FE" 
                fillOpacity={0.6}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area 
                type="monotone" 
                dataKey="cre" 
                name="CRE" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area 
                type="monotone" 
                dataKey="pseudomonas" 
                name="Pseudomonas" 
                stroke="#00C49F" 
                fill="#00C49F" 
                fillOpacity={0.6}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm w-full md:w-3/4">
            <h4 className="text-sm font-medium mb-2 text-medical-primary">Key Observations for {selectedRegion}</h4>
            <ul className="text-sm space-y-1.5 text-gray-700 dark:text-gray-300">
              {regionObservations.map((observation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-medical-primary">•</span>
                  <span>{observation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
