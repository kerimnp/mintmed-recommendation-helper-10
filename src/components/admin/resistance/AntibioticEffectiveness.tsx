
import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { antibioticEffectivenessData } from "./data";

export const AntibioticEffectiveness = () => {
  return (
    <div className="h-96">
      <ChartContainer config={{
        effectiveness: { theme: { light: '#0088FE', dark: '#60a5fa' } }
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={antibioticEffectivenessData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="antibiotic" />
            <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="mrsa" name="vs MRSA" fill="#FF8042" />
            <Bar dataKey="vre" name="vs VRE" fill="#FFBB28" />
            <Bar dataKey="esbl" name="vs ESBL" fill="#0088FE" />
            <Bar dataKey="cre" name="vs CRE" fill="#8884d8" />
            <Bar dataKey="pseudomonas" name="vs Pseudomonas" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
