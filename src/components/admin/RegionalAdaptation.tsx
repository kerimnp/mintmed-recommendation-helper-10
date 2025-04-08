
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { globalResistanceData } from "@/utils/antibioticRecommendations/data/globalResistance";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface RegionSpecificData {
  regionalPrevalence: {
    respiratory: {
      streptococcusPneumoniae: number;
      haemophilusInfluenzae: number;
      moraxellaCatarrhalis: number;
    };
    urinary: {
      eColi: number;
      klebsiella: number;
      enterococcus: number;
    };
    skin: {
      staphAureus: number;
      streptococci: number;
      pseudomonas: number;
    };
  };
  resistancePatterns: {
    penicillinResistance: number;
    macrolideResistance: number;
    fluoroquinoloneResistance: number;
    esblPrevalence: number;
  };
  recommendedFirstLine: {
    communityPneumonia: string[];
    acuteOtitisMedia: string[];
    uncomplUti: string[];
    skinSoftTissue: string[];
  };
}

const regionSpecificGuidelines: Record<string, RegionSpecificData> = {
  "Balkan": {
    regionalPrevalence: {
      respiratory: {
        streptococcusPneumoniae: 55,
        haemophilusInfluenzae: 25,
        moraxellaCatarrhalis: 8
      },
      urinary: {
        eColi: 78,
        klebsiella: 12,
        enterococcus: 5
      },
      skin: {
        staphAureus: 62,
        streptococci: 28,
        pseudomonas: 6
      }
    },
    resistancePatterns: {
      penicillinResistance: 28,
      macrolideResistance: 32,
      fluoroquinoloneResistance: 15,
      esblPrevalence: 24
    },
    recommendedFirstLine: {
      communityPneumonia: [
        "Amoxicillin-clavulanate 875/125mg PO BID",
        "Ceftriaxone 1-2g IV daily + Azithromycin",
        "Respiratory fluoroquinolone for penicillin-allergic patients"
      ],
      acuteOtitisMedia: [
        "Amoxicillin 80-90mg/kg/day divided BID",
        "Amoxicillin-clavulanate for treatment failures",
        "Ceftriaxone for severe cases"
      ],
      uncomplUti: [
        "Fosfomycin 3g single dose",
        "Nitrofurantoin 100mg PO BID for 5 days",
        "TMP-SMX only if local resistance <20%"
      ],
      skinSoftTissue: [
        "Clindamycin 300-450mg PO TID",
        "TMP-SMX DS 1-2 tabs PO BID + Cephalexin",
        "Linezolid for confirmed MRSA"
      ]
    }
  },
  "Western Europe": {
    regionalPrevalence: {
      respiratory: {
        streptococcusPneumoniae: 52,
        haemophilusInfluenzae: 22,
        moraxellaCatarrhalis: 7
      },
      urinary: {
        eColi: 75,
        klebsiella: 10,
        enterococcus: 6
      },
      skin: {
        staphAureus: 58,
        streptococci: 32,
        pseudomonas: 5
      }
    },
    resistancePatterns: {
      penicillinResistance: 15,
      macrolideResistance: 18,
      fluoroquinoloneResistance: 12,
      esblPrevalence: 14
    },
    recommendedFirstLine: {
      communityPneumonia: [
        "Amoxicillin 1g PO TID",
        "Doxycycline 100mg PO BID",
        "Levofloxacin for penicillin-allergic patients"
      ],
      acuteOtitisMedia: [
        "Amoxicillin 50mg/kg/day divided BID",
        "Amoxicillin-clavulanate for treatment failures",
        "Watchful waiting for mild cases in children >2 years"
      ],
      uncomplUti: [
        "Nitrofurantoin 100mg PO BID for 5 days",
        "Pivmecillinam 400mg PO TID for 3 days",
        "Fosfomycin 3g single dose"
      ],
      skinSoftTissue: [
        "Flucloxacillin 500mg PO QID",
        "Clindamycin for penicillin allergic patients",
        "MRSA coverage only with risk factors"
      ]
    }
  },
  "Southern Europe": {
    regionalPrevalence: {
      respiratory: {
        streptococcusPneumoniae: 58,
        haemophilusInfluenzae: 20,
        moraxellaCatarrhalis: 10
      },
      urinary: {
        eColi: 72,
        klebsiella: 14,
        enterococcus: 8
      },
      skin: {
        staphAureus: 65,
        streptococci: 25,
        pseudomonas: 7
      }
    },
    resistancePatterns: {
      penicillinResistance: 35,
      macrolideResistance: 40,
      fluoroquinoloneResistance: 28,
      esblPrevalence: 32
    },
    recommendedFirstLine: {
      communityPneumonia: [
        "Levofloxacin 750mg PO daily",
        "Ceftriaxone 1-2g IV daily + Azithromycin",
        "Moxifloxacin 400mg PO/IV daily"
      ],
      acuteOtitisMedia: [
        "Amoxicillin-clavulanate 90mg/kg/day amoxicillin with 6.4mg/kg/day clavulanate",
        "Ceftriaxone for treatment failures",
        "Clindamycin + TMP-SMX for penicillin allergic patients"
      ],
      uncomplUti: [
        "Fosfomycin 3g single dose",
        "Nitrofurantoin 100mg PO QID for 5 days",
        "Fluoroquinolones only if no alternatives"
      ],
      skinSoftTissue: [
        "TMP-SMX DS 1-2 tabs PO BID",
        "Linezolid 600mg PO BID",
        "Doxycycline 100mg PO BID"
      ]
    }
  },
  "Northern Europe": {
    regionalPrevalence: {
      respiratory: {
        streptococcusPneumoniae: 50,
        haemophilusInfluenzae: 24,
        moraxellaCatarrhalis: 6
      },
      urinary: {
        eColi: 80,
        klebsiella: 9,
        enterococcus: 4
      },
      skin: {
        staphAureus: 55,
        streptococci: 35,
        pseudomonas: 3
      }
    },
    resistancePatterns: {
      penicillinResistance: 6,
      macrolideResistance: 10,
      fluoroquinoloneResistance: 8,
      esblPrevalence: 7
    },
    recommendedFirstLine: {
      communityPneumonia: [
        "Penicillin V 1g PO QID",
        "Amoxicillin 750mg-1g PO TID for severe cases",
        "Doxycycline for penicillin allergic patients"
      ],
      acuteOtitisMedia: [
        "Watchful waiting for 2-3 days in uncomplicated cases",
        "Penicillin V or Amoxicillin if antibiotics indicated",
        "Amoxicillin-clavulanate for treatment failures"
      ],
      uncomplUti: [
        "Nitrofurantoin 50mg PO QID for 3 days",
        "Pivmecillinam 400mg PO TID for 3 days",
        "TMP-SMX only if susceptibility confirmed"
      ],
      skinSoftTissue: [
        "Flucloxacillin/dicloxacillin 500mg PO QID",
        "Cephalexin for mild penicillin allergies",
        "Clindamycin for severe penicillin allergies"
      ]
    }
  },
  "Eastern Europe": {
    regionalPrevalence: {
      respiratory: {
        streptococcusPneumoniae: 54,
        haemophilusInfluenzae: 26,
        moraxellaCatarrhalis: 9
      },
      urinary: {
        eColi: 76,
        klebsiella: 15,
        enterococcus: 7
      },
      skin: {
        staphAureus: 64,
        streptococci: 24,
        pseudomonas: 8
      }
    },
    resistancePatterns: {
      penicillinResistance: 26,
      macrolideResistance: 35,
      fluoroquinoloneResistance: 22,
      esblPrevalence: 28
    },
    recommendedFirstLine: {
      communityPneumonia: [
        "Amoxicillin-clavulanate 875/125mg PO BID",
        "Ceftriaxone 1-2g IV daily + Clarithromycin",
        "Levofloxacin for penicillin-allergic patients"
      ],
      acuteOtitisMedia: [
        "Amoxicillin 80-90mg/kg/day divided BID",
        "Amoxicillin-clavulanate for treatment failures",
        "Ceftriaxone for severe cases"
      ],
      uncomplUti: [
        "Fosfomycin 3g single dose",
        "Nitrofurantoin 100mg PO BID for 7 days",
        "Fluoroquinolones only with confirmed susceptibility"
      ],
      skinSoftTissue: [
        "Amoxicillin-clavulanate 875/125mg PO BID",
        "TMP-SMX DS 1-2 tabs PO BID",
        "Linezolid for confirmed MRSA"
      ]
    }
  }
};

export const RegionalAdaptation = () => {
  const [selectedRegion, setSelectedRegion] = useState("Balkan");
  const regionData = regionSpecificGuidelines[selectedRegion];
  const availableRegions = Object.keys(regionSpecificGuidelines);
  
  // Function to calculate severity level for UI display
  const getSeverityLevel = (value: number, thresholds: [number, number, number]) => {
    if (value <= thresholds[0]) return "Low";
    if (value <= thresholds[1]) return "Moderate";
    return "High";
  };

  // Function to get appropriate color class based on severity
  const getSeverityColorClass = (severity: string) => {
    switch (severity) {
      case "Low": return "text-green-600 dark:text-green-400";
      case "Moderate": return "text-amber-600 dark:text-amber-400";
      case "High": return "text-red-600 dark:text-red-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="region-select">Select Region</Label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger id="region-select" className="w-full">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {availableRegions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Alert className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          Regional antibiotic recommendations are adjusted based on local resistance patterns 
          and pathogen prevalence. These guidelines should be used alongside clinical judgment.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="resistance">
        <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="resistance">Resistance Patterns</TabsTrigger>
          <TabsTrigger value="prevalence">Pathogen Prevalence</TabsTrigger>
          <TabsTrigger value="guidelines">Regional Guidelines</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resistance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedRegion} Resistance Patterns</CardTitle>
              <CardDescription>
                Regional antibiotic resistance data that influences treatment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resistance Type</TableHead>
                    <TableHead>Prevalence</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Clinical Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Penicillin Resistance</TableCell>
                    <TableCell>{regionData.resistancePatterns.penicillinResistance}%</TableCell>
                    <TableCell className={getSeverityColorClass(getSeverityLevel(regionData.resistancePatterns.penicillinResistance, [15, 25]))}>
                      {getSeverityLevel(regionData.resistancePatterns.penicillinResistance, [15, 25])}
                    </TableCell>
                    <TableCell>Affects empiric treatment of respiratory infections</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Macrolide Resistance</TableCell>
                    <TableCell>{regionData.resistancePatterns.macrolideResistance}%</TableCell>
                    <TableCell className={getSeverityColorClass(getSeverityLevel(regionData.resistancePatterns.macrolideResistance, [20, 30]))}>
                      {getSeverityLevel(regionData.resistancePatterns.macrolideResistance, [20, 30])}
                    </TableCell>
                    <TableCell>Limits use of azithromycin, clarithromycin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fluoroquinolone Resistance</TableCell>
                    <TableCell>{regionData.resistancePatterns.fluoroquinoloneResistance}%</TableCell>
                    <TableCell className={getSeverityColorClass(getSeverityLevel(regionData.resistancePatterns.fluoroquinoloneResistance, [10, 20]))}>
                      {getSeverityLevel(regionData.resistancePatterns.fluoroquinoloneResistance, [10, 20])}
                    </TableCell>
                    <TableCell>Impacts treatment of UTIs and respiratory infections</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ESBL Prevalence</TableCell>
                    <TableCell>{regionData.resistancePatterns.esblPrevalence}%</TableCell>
                    <TableCell className={getSeverityColorClass(getSeverityLevel(regionData.resistancePatterns.esblPrevalence, [15, 25]))}>
                      {getSeverityLevel(regionData.resistancePatterns.esblPrevalence, [15, 25])}
                    </TableCell>
                    <TableCell>Requires carbapenem therapy for serious infections</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>MRSA Prevalence by Country</CardTitle>
              <CardDescription>Methicillin-resistant Staphylococcus aureus rates in {selectedRegion}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>MRSA Rate</TableHead>
                    <TableHead>Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {globalResistanceData
                    .find(region => region.region === selectedRegion)?.countries
                    .map(country => (
                      <TableRow key={country.country}>
                        <TableCell>{country.country}</TableCell>
                        <TableCell>{country.mrsa.toFixed(1)}%</TableCell>
                        <TableCell className={getSeverityColorClass(getSeverityLevel(country.mrsa, [15, 25]))}>
                          {getSeverityLevel(country.mrsa, [15, 25])}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prevalence">
          <Card>
            <CardHeader>
              <CardTitle>Regional Pathogen Prevalence</CardTitle>
              <CardDescription>Common pathogens by infection site in {selectedRegion}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3">Respiratory Pathogens</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organism</TableHead>
                      <TableHead>Prevalence</TableHead>
                      <TableHead>Common Presentations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Streptococcus pneumoniae</TableCell>
                      <TableCell>{regionData.regionalPrevalence.respiratory.streptococcusPneumoniae}%</TableCell>
                      <TableCell>Community-acquired pneumonia, sinusitis</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Haemophilus influenzae</TableCell>
                      <TableCell>{regionData.regionalPrevalence.respiratory.haemophilusInfluenzae}%</TableCell>
                      <TableCell>COPD exacerbations, bronchitis</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Moraxella catarrhalis</TableCell>
                      <TableCell>{regionData.regionalPrevalence.respiratory.moraxellaCatarrhalis}%</TableCell>
                      <TableCell>Bronchitis, sinusitis</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Urinary Tract Pathogens</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organism</TableHead>
                      <TableHead>Prevalence</TableHead>
                      <TableHead>Common Presentations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Escherichia coli</TableCell>
                      <TableCell>{regionData.regionalPrevalence.urinary.eColi}%</TableCell>
                      <TableCell>Uncomplicated UTI, pyelonephritis</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Klebsiella species</TableCell>
                      <TableCell>{regionData.regionalPrevalence.urinary.klebsiella}%</TableCell>
                      <TableCell>Complicated UTI, catheter-associated infections</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Enterococcus species</TableCell>
                      <TableCell>{regionData.regionalPrevalence.urinary.enterococcus}%</TableCell>
                      <TableCell>Healthcare-associated UTI</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Skin & Soft Tissue Pathogens</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organism</TableHead>
                      <TableHead>Prevalence</TableHead>
                      <TableHead>Common Presentations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Staphylococcus aureus</TableCell>
                      <TableCell>{regionData.regionalPrevalence.skin.staphAureus}%</TableCell>
                      <TableCell>Cellulitis, abscess, impetigo</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Beta-hemolytic streptococci</TableCell>
                      <TableCell>{regionData.regionalPrevalence.skin.streptococci}%</TableCell>
                      <TableCell>Erysipelas, cellulitis</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pseudomonas aeruginosa</TableCell>
                      <TableCell>{regionData.regionalPrevalence.skin.pseudomonas}%</TableCell>
                      <TableCell>Diabetic foot infection, burn wounds</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guidelines">
          <Card>
            <CardHeader>
              <CardTitle>Regional Treatment Guidelines</CardTitle>
              <CardDescription>Evidence-based recommendations adapted for {selectedRegion}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3">Community-Acquired Pneumonia</h3>
                <ul className="list-disc list-inside space-y-2">
                  {regionData.recommendedFirstLine.communityPneumonia.map((rec, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">{rec}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Acute Otitis Media</h3>
                <ul className="list-disc list-inside space-y-2">
                  {regionData.recommendedFirstLine.acuteOtitisMedia.map((rec, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">{rec}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Uncomplicated Urinary Tract Infection</h3>
                <ul className="list-disc list-inside space-y-2">
                  {regionData.recommendedFirstLine.uncomplUti.map((rec, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">{rec}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Skin and Soft Tissue Infections</h3>
                <ul className="list-disc list-inside space-y-2">
                  {regionData.recommendedFirstLine.skinSoftTissue.map((rec, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">{rec}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
