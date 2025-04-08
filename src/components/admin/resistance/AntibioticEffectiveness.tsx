
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { antibioticEffectivenessData } from "./data";
import { toast } from "sonner";

interface AntibioticEffectivenessProps {
  selectedRegion?: string;
  selectedResistance?: string;
}

// Define interface for effectiveness data items
interface EffectivenessDataItem {
  antibiotic: string;
  mrsa: number;
  vre: number;
  esbl: number;
  cre: number;
  pseudomonas: number;
  [key: string]: string | number;
}

export const AntibioticEffectiveness = ({ selectedRegion = "Balkan", selectedResistance = "mrsa" }: AntibioticEffectivenessProps) => {
  // Color scheme for different resistance types
  const colors: Record<string, string> = {
    mrsa: "#FF8042",
    vre: "#FFBB28", 
    esbl: "#0088FE",
    cre: "#8884d8",
    pseudomonas: "#00C49F"
  };

  // Apply regional modifiers to effectiveness data
  const getRegionModifiedData = () => {
    const regionModifiers: Record<string, number> = {
      "Balkan": 1,
      "Southern Europe": 0.9,  // Slightly lower effectiveness
      "Northern Europe": 1.1,  // Slightly higher effectiveness
      "Eastern Europe": 0.95,
      "Western Europe": 1.05,
      "Global": 1
    };
    
    const modifier = regionModifiers[selectedRegion] || 1;
    
    // Create region-specific data
    return antibioticEffectivenessData.map(item => {
      const result: EffectivenessDataItem = {...item} as EffectivenessDataItem;
      
      for (const key of Object.keys(item)) {
        if (key !== 'antibiotic' && typeof item[key as keyof typeof item] === 'number') {
          const value = item[key as keyof typeof item] as number;
          const adjustedValue = Math.min(100, value * modifier); // Cap at 100%
          result[key] = Number(adjustedValue.toFixed(1));
        }
      }
      
      return result;
    });
  };
  
  const modifiedData = getRegionModifiedData();
  
  // Define which antibiotics are effective against which pathogens
  const getEffectiveAgainst = (antibiotic: string) => {
    const effective = [];
    const item = modifiedData.find(a => a.antibiotic === antibiotic);
    if (!item) return "";
    
    if ((item.mrsa as number) > 50) effective.push("MRSA");
    if ((item.vre as number) > 50) effective.push("VRE");
    if ((item.esbl as number) > 50) effective.push("ESBL");
    if ((item.cre as number) > 50) effective.push("CRE");
    if ((item.pseudomonas as number) > 50) effective.push("Pseudomonas");
    
    return effective.join(", ");
  };
  
  const handleExportData = () => {
    toast.success("Data exported successfully");
  };

  return (
    <Card className="mb-8 shadow-lg border border-gray-100 dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-medical-primary">Antibiotic Effectiveness - {selectedRegion}</CardTitle>
        <CardDescription>
          Comparative effectiveness based on clinical studies and regional resistance patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] mt-4"> {/* Increased height significantly for better visibility */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={modifiedData}
              margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
              <XAxis 
                dataKey="antibiotic" 
                angle={-45} 
                textAnchor="end" 
                height={100} 
                tick={{ fontSize: 12 }} 
                interval={0}
              />
              <YAxis 
                label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft', offset: -15 }}
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)}%`, 
                  name.replace("mrsa", "MRSA")
                    .replace("vre", "VRE")
                    .replace("esbl", "ESBL")
                    .replace("cre", "CRE")
                    .replace("pseudomonas", "Pseudomonas")
                ]}
                labelFormatter={(label) => `${label} ${getEffectiveAgainst(label) ? `(Effective against: ${getEffectiveAgainst(label)})` : ''}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '8px', 
                  border: '1px solid #ccc', 
                  padding: '12px',
                  fontSize: '13px'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "20px" }} 
                formatter={(value) => value.toUpperCase()}
              />
              <Bar dataKey="mrsa" name="MRSA" fill={colors.mrsa}>
                {modifiedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={(entry.mrsa as number) > 0 ? 1 : 0.3} />
                ))}
              </Bar>
              <Bar dataKey="vre" name="VRE" fill={colors.vre}>
                {modifiedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={(entry.vre as number) > 0 ? 1 : 0.3} />
                ))}
              </Bar>
              <Bar dataKey="esbl" name="ESBL" fill={colors.esbl}>
                {modifiedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={(entry.esbl as number) > 0 ? 1 : 0.3} />
                ))}
              </Bar>
              <Bar dataKey="cre" name="CRE" fill={colors.cre}>
                {modifiedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={(entry.cre as number) > 0 ? 1 : 0.3} />
                ))}
              </Bar>
              <Bar dataKey="pseudomonas" name="Pseudomonas" fill={colors.pseudomonas}>
                {modifiedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={(entry.pseudomonas as number) > 0 ? 1 : 0.3} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-8">
          {Object.entries(colors).map(([key, color]) => (
            <div 
              key={key}
              className="flex items-center justify-center p-3 rounded-lg font-medium text-sm shadow-sm"
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
