
import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { resistanceTrendData } from "./data";

export const ResistanceTrends = () => {
  return (
    <div className="h-96">
      <ChartContainer config={{
        mrsa: { theme: { light: '#FF8042', dark: '#f97316' } },
        vre: { theme: { light: '#FFBB28', dark: '#fbbf24' } },
        esbl: { theme: { light: '#0088FE', dark: '#60a5fa' } },
        cre: { theme: { light: '#8884d8', dark: '#a78bfa' } },
        pseudomonas: { theme: { light: '#00C49F', dark: '#34d399' } }
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={resistanceTrendData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis label={{ value: 'Resistance (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="mrsa" name="MRSA" fill="#FF8042" />
            <Bar dataKey="vre" name="VRE" fill="#FFBB28" />
            <Bar dataKey="esbl" name="ESBL" fill="#0088FE" />
            <Bar dataKey="cre" name="CRE" fill="#8884d8" />
            <Bar dataKey="pseudomonas" name="Pseudomonas" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
