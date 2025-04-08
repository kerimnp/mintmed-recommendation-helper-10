
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoUrl } from "./data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { balkanDetailedData } from "./data";

interface ResistanceMapProps {
  selectedResistance: string;
  selectedRegion: string;
}

export const ResistanceMap = ({ selectedResistance, selectedRegion }: ResistanceMapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="space-y-6">
      <div className="h-[500px] relative">
        <ComposableMap data-tip="" projectionConfig={{ scale: 147 }}>
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  // This is a simplified example - in a real app, you would match countries to your resistance data
                  const regionName = geo.properties.name;
                  const intensity = Math.random(); // Mock data - would be real resistance rates
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(`${regionName}: ${(intensity * 100).toFixed(1)}% resistance`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: `rgba(255, 0, 0, ${intensity})`,
                          outline: "none"
                        },
                        hover: {
                          fill: `rgba(255, 0, 0, ${intensity + 0.2})`,
                          outline: "none"
                        },
                        pressed: {
                          fill: `rgba(255, 0, 0, ${intensity})`,
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {tooltipContent && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              padding: "10px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              borderRadius: "5px",
              pointerEvents: "none"
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">Regional Resistance Data for {selectedRegion}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>MRSA (%)</TableHead>
              <TableHead>VRE (%)</TableHead>
              <TableHead>ESBL (%)</TableHead>
              <TableHead>CRE (%)</TableHead>
              <TableHead>Pseudomonas (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balkanDetailedData.map((country) => (
              <TableRow key={country.country}>
                <TableCell className="font-medium">{country.country}</TableCell>
                <TableCell>{country.mrsa}%</TableCell>
                <TableCell>{country.vre}%</TableCell>
                <TableCell>{country.esbl}%</TableCell>
                <TableCell>{country.cre}%</TableCell>
                <TableCell>{country.pseudomonas}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
