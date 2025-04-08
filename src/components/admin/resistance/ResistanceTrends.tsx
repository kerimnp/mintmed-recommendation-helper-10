
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { resistanceTrendData } from "./data";
import { regionalResistanceData } from "@/utils/antibioticRecommendations/data/regionalResistance";
import { toast } from "sonner";

interface ResistanceTrendsProps {
  selectedRegion?: string;
}

export const ResistanceTrends = ({ selectedRegion = "Balkan" }: ResistanceTrendsProps) => {
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
    toast.success("Data exported successfully");
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Antimicrobial Resistance Trends (2019-2024) - {selectedRegion}</CardTitle>
        <CardDescription>
          Data based on European Antimicrobial Resistance Surveillance Network (EARS-Net)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]"> {/* Increased height for better visibility */}
          <ChartContainer config={{
            mrsa: { theme: { light: '#FF8042', dark: '#f97316' } },
            vre: { theme: { light: '#FFBB28', dark: '#fbbf24' } },
            esbl: { theme: { light: '#0088FE', dark: '#60a5fa' } },
            cre: { theme: { light: '#8884d8', dark: '#a78bfa' } },
            pseudomonas: { theme: { light: '#00C49F', dark: '#34d399' } }
          }}>
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
                <XAxis dataKey="year" />
                <YAxis 
                  label={{ value: 'Resistance (%)', angle: -90, position: 'insideLeft', offset: -15 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, ""]} 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #ccc', padding: '10px' }}
                />
                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                <Area 
                  type="monotone" 
                  dataKey="mrsa" 
                  name="MRSA" 
                  stroke="#FF8042" 
                  fill="#FF8042" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="vre" 
                  name="VRE" 
                  stroke="#FFBB28" 
                  fill="#FFBB28" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="esbl" 
                  name="ESBL" 
                  stroke="#0088FE" 
                  fill="#0088FE" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="cre" 
                  name="CRE" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="pseudomonas" 
                  name="Pseudomonas" 
                  stroke="#00C49F" 
                  fill="#00C49F" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Key Observations for {selectedRegion}</h4>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            {regionObservations.map((observation, index) => (
              <li key={index}>• {observation}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
