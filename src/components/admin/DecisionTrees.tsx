
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, ChevronRight, Plus, Info, AlertTriangle, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Decision trees for different infection types
const decisionTrees = {
  respiratory: {
    title: "Respiratory Infection Algorithm",
    description: "Decision pathway for respiratory infections including pneumonia, acute bronchitis, and sinusitis",
    steps: [
      {
        id: "r1",
        question: "Is the patient being treated as outpatient or inpatient?",
        options: [
          {
            text: "Outpatient",
            next: "r2",
          },
          {
            text: "Inpatient",
            next: "r3",
          }
        ]
      },
      {
        id: "r2",
        question: "Does the patient have any risk factors for drug-resistant pathogens?",
        options: [
          {
            text: "No risk factors",
            next: "r4",
          },
          {
            text: "Has risk factors",
            info: "Recent antibiotic use, healthcare exposure, immunosuppression",
            next: "r5",
          }
        ]
      },
      {
        id: "r3",
        question: "Is the patient in the ICU?",
        options: [
          {
            text: "Yes (ICU patient)",
            next: "r6",
          },
          {
            text: "No (ward patient)",
            next: "r7",
          }
        ]
      },
      {
        id: "r4",
        question: "Does the patient have a penicillin allergy?",
        options: [
          {
            text: "No allergy",
            recommendation: {
              firstLine: "Amoxicillin 500mg PO TID for 5-7 days",
              alternatives: [
                "Doxycycline 100mg PO BID for 5-7 days",
                "Azithromycin 500mg PO day 1, then 250mg daily for 4 days"
              ],
              notes: "Consider local resistance patterns for macrolides before prescribing"
            }
          },
          {
            text: "Has penicillin allergy",
            recommendation: {
              firstLine: "Doxycycline 100mg PO BID for 5-7 days",
              alternatives: [
                "Levofloxacin 750mg PO daily for 5 days (if no contraindications)",
                "Azithromycin 500mg PO day 1, then 250mg daily for 4 days"
              ],
              notes: "Reserve respiratory fluoroquinolones for patients with multiple drug allergies or contraindications to other agents"
            }
          }
        ]
      },
      {
        id: "r5",
        question: "What is the most likely resistant pathogen?",
        options: [
          {
            text: "MRSA risk",
            recommendation: {
              firstLine: "Linezolid 600mg PO BID for 7-10 days",
              alternatives: [
                "Clindamycin 300-450mg PO QID for 7-10 days (if susceptible)",
                "Minocycline 100mg PO BID for 7-10 days"
              ],
              notes: "Consider ID consultation for patients with MRSA pneumonia"
            }
          },
          {
            text: "Pseudomonas risk",
            recommendation: {
              firstLine: "Levofloxacin 750mg PO daily for 7 days",
              alternatives: [
                "Ciprofloxacin 500-750mg PO BID for 7-10 days plus Clindamycin",
                "Consider hospitalization if moderate/severe"
              ],
              notes: "Obtain sputum cultures before initiating therapy when possible"
            }
          }
        ]
      },
      {
        id: "r6",
        question: "Does the patient have risk factors for multidrug-resistant organisms?",
        options: [
          {
            text: "Yes",
            recommendation: {
              firstLine: "Piperacillin-tazobactam 4.5g IV q6h + Vancomycin (dosed by PK) + Azithromycin 500mg IV daily",
              alternatives: [
                "Meropenem 1g IV q8h + Vancomycin + Azithromycin",
                "Cefepime 2g IV q8h + Vancomycin + Azithromycin"
              ],
              notes: "De-escalate based on culture results. Consider ID consultation."
            }
          },
          {
            text: "No",
            recommendation: {
              firstLine: "Ceftriaxone 2g IV daily + Azithromycin 500mg IV daily",
              alternatives: [
                "Levofloxacin 750mg IV daily",
                "Ampicillin-sulbactam 3g IV q6h + Azithromycin"
              ],
              notes: "Adjust therapy based on clinical response at 48-72 hours"
            }
          }
        ]
      },
      {
        id: "r7",
        question: "Does the patient have comorbidities or risk factors for specific pathogens?",
        options: [
          {
            text: "COPD/bronchiectasis",
            recommendation: {
              firstLine: "Ceftriaxone 1-2g IV daily + Azithromycin 500mg IV/PO daily",
              alternatives: [
                "Levofloxacin 750mg IV/PO daily",
                "Ampicillin-sulbactam 3g IV q6h"
              ],
              notes: "Consider Pseudomonas coverage if recent hospitalization or antibiotic exposure"
            }
          },
          {
            text: "Diabetes/renal failure",
            recommendation: {
              firstLine: "Ceftriaxone 1-2g IV daily + Azithromycin 500mg IV/PO daily",
              alternatives: [
                "Ertapenem 1g IV daily",
                "Moxifloxacin 400mg IV/PO daily"
              ],
              notes: "Adjust dosing for renal function. Monitor closely for AKI."
            }
          }
        ]
      }
    ]
  },
  urinary: {
    title: "Urinary Tract Infection Algorithm",
    description: "Decision pathway for UTI management including cystitis and pyelonephritis",
    steps: [
      {
        id: "u1",
        question: "Is this uncomplicated or complicated UTI?",
        options: [
          {
            text: "Uncomplicated",
            info: "Healthy non-pregnant women with no structural/functional abnormalities",
            next: "u2"
          },
          {
            text: "Complicated",
            info: "Males, pregnancy, catheter, anatomical abnormalities, immunocompromised, recent hospitalization",
            next: "u3"
          }
        ]
      },
      {
        id: "u2",
        question: "Does the patient have symptoms of pyelonephritis?",
        options: [
          {
            text: "No (cystitis only)",
            next: "u4"
          },
          {
            text: "Yes (pyelonephritis)",
            info: "Fever, flank pain, costovertebral angle tenderness",
            next: "u5"
          }
        ]
      },
      {
        id: "u3",
        question: "Is the patient severely ill or septic?",
        options: [
          {
            text: "Yes (severely ill)",
            recommendation: {
              firstLine: "Piperacillin-tazobactam 4.5g IV q6h or Meropenem 1g IV q8h",
              alternatives: [
                "Cefepime 2g IV q8h",
                "Imipenem-cilastatin 500mg IV q6h"
              ],
              notes: "Obtain blood and urine cultures before starting antibiotics. Consider ID consultation."
            }
          },
          {
            text: "No",
            next: "u6"
          }
        ]
      },
      {
        id: "u4",
        question: "Does the patient have risk factors for resistant organisms?",
        options: [
          {
            text: "No risk factors",
            recommendation: {
              firstLine: "Nitrofurantoin 100mg PO BID for 5 days",
              alternatives: [
                "Trimethoprim-sulfamethoxazole DS 1 tab PO BID for 3 days (if local resistance <20%)",
                "Fosfomycin 3g PO single dose"
              ],
              notes: "Avoid fluoroquinolones as first-line therapy for uncomplicated cystitis"
            }
          },
          {
            text: "Has risk factors",
            info: "Recent antibiotics, healthcare exposure, recurrent UTIs",
            recommendation: {
              firstLine: "Nitrofurantoin 100mg PO BID for 7 days (if eGFR >30)",
              alternatives: [
                "Fosfomycin 3g PO q48h for 3 doses",
                "Amoxicillin-clavulanate 875/125mg PO BID for 7 days"
              ],
              notes: "Consider obtaining urine culture before starting antibiotics"
            }
          }
        ]
      },
      {
        id: "u5",
        question: "Is the patient able to tolerate oral medication?",
        options: [
          {
            text: "Yes (outpatient therapy)",
            recommendation: {
              firstLine: "Ciprofloxacin 500mg PO BID for 7 days",
              alternatives: [
                "Trimethoprim-sulfamethoxazole DS 1 tab PO BID for 10-14 days (if susceptible)",
                "Levofloxacin 750mg PO daily for 5-7 days"
              ],
              notes: "Obtain urine culture before starting antibiotics. Consider 24-48hr follow-up to confirm clinical improvement."
            }
          },
          {
            text: "No (requires IV therapy)",
            recommendation: {
              firstLine: "Ceftriaxone 1-2g IV daily",
              alternatives: [
                "Levofloxacin 750mg IV daily",
                "Gentamicin 5mg/kg IV daily (with monitoring)"
              ],
              notes: "Transition to oral therapy when clinically improved and tolerating oral intake"
            }
          }
        ]
      },
      {
        id: "u6",
        question: "Does the patient have a urinary catheter?",
        options: [
          {
            text: "Yes (catheter-associated)",
            recommendation: {
              firstLine: "Ceftriaxone 1g IV daily or Ciprofloxacin 500mg PO/IV BID",
              alternatives: [
                "Levofloxacin 750mg IV/PO daily",
                "Trimethoprim-sulfamethoxazole DS 1 tab PO BID (if susceptible)"
              ],
              notes: "Remove or change catheter if possible before starting antibiotics. Treat for 7 days if prompt resolution of symptoms, 10-14 days otherwise."
            }
          },
          {
            text: "No",
            recommendation: {
              firstLine: "Ciprofloxacin 500mg PO BID for 7-10 days",
              alternatives: [
                "Trimethoprim-sulfamethoxazole DS 1 tab PO BID for 7-10 days",
                "Amoxicillin-clavulanate 875/125mg PO BID for 7-10 days"
              ],
              notes: "Tailor therapy based on culture results. Longer duration (10-14 days) for males and those with delayed response."
            }
          }
        ]
      }
    ]
  },
  skin: {
    title: "Skin & Soft Tissue Infection Algorithm",
    description: "Decision pathway for cellulitis, abscess, and other skin infections",
    steps: [
      {
        id: "s1",
        question: "Is there a purulent collection (abscess)?",
        options: [
          {
            text: "Yes (abscess present)",
            next: "s2"
          },
          {
            text: "No (cellulitis/erysipelas)",
            next: "s3"
          }
        ]
      },
      {
        id: "s2",
        question: "Is incision and drainage possible?",
        options: [
          {
            text: "Yes",
            next: "s4"
          },
          {
            text: "No",
            recommendation: {
              firstLine: "Trimethoprim-sulfamethoxazole DS 1-2 tabs PO BID for 7-10 days",
              alternatives: [
                "Doxycycline 100mg PO BID for 7-10 days",
                "Clindamycin 300-450mg PO QID for 7-10 days"
              ],
              notes: "Cover for MRSA empirically. Consider ID consultation for complex or multiloculated abscesses."
            }
          }
        ]
      },
      {
        id: "s3",
        question: "Are there risk factors for MRSA?",
        options: [
          {
            text: "No MRSA risk factors",
            next: "s5"
          },
          {
            text: "Yes (MRSA risk present)",
            info: "Prior MRSA infection, recent hospitalization, hemodialysis, injection drug use",
            next: "s6"
          }
        ]
      },
      {
        id: "s4",
        question: "After I&D, are there systemic symptoms or surrounding cellulitis?",
        options: [
          {
            text: "No systemic symptoms",
            recommendation: {
              firstLine: "I&D alone may be sufficient for simple abscesses <2cm",
              alternatives: [
                "Consider Trimethoprim-sulfamethoxazole DS 1-2 tabs PO BID for 5-7 days if area of high MRSA prevalence"
              ],
              notes: "Send purulent material for culture. Follow-up in 48-72 hours to confirm improvement."
            }
          },
          {
            text: "Yes (systemic symptoms)",
            recommendation: {
              firstLine: "Trimethoprim-sulfamethoxazole DS 1-2 tabs PO BID for 7-10 days after I&D",
              alternatives: [
                "Doxycycline 100mg PO BID for 7-10 days",
                "Linezolid 600mg PO BID for 7-10 days (for severe cases)"
              ],
              notes: "Consider hospitalization if fever >38.5°C, tachycardia, or comorbidities"
            }
          }
        ]
      },
      {
        id: "s5",
        question: "Is the infection mild, moderate, or severe?",
        options: [
          {
            text: "Mild",
            recommendation: {
              firstLine: "Cephalexin 500mg PO QID for 5-7 days",
              alternatives: [
                "Dicloxacillin 500mg PO QID for 5-7 days",
                "Clindamycin 300-450mg PO QID for 5-7 days (if penicillin allergic)"
              ],
              notes: "Target streptococci and methicillin-sensitive S. aureus (MSSA)"
            }
          },
          {
            text: "Moderate to severe",
            recommendation: {
              firstLine: "Ceftriaxone 1-2g IV daily",
              alternatives: [
                "Ampicillin-sulbactam 3g IV q6h",
                "Clindamycin 600-900mg IV q8h (if penicillin allergic)"
              ],
              notes: "Consider adding vancomycin if MRSA coverage needed or Piperacillin-tazobactam if Pseudomonas suspected"
            }
          }
        ]
      },
      {
        id: "s6",
        question: "Is the patient able to take oral medication?",
        options: [
          {
            text: "Yes (oral therapy)",
            recommendation: {
              firstLine: "Trimethoprim-sulfamethoxazole DS 1-2 tabs PO BID plus Cephalexin 500mg PO QID for 7-10 days",
              alternatives: [
                "Doxycycline 100mg PO BID plus Cephalexin for 7-10 days",
                "Linezolid 600mg PO BID for 7-10 days (covers both MRSA and streptococci)"
              ],
              notes: "Coverage for both MRSA and streptococci is necessary for cellulitis"
            }
          },
          {
            text: "No (IV therapy required)",
            recommendation: {
              firstLine: "Vancomycin IV (dosed by weight) plus Ceftriaxone 1-2g IV daily",
              alternatives: [
                "Linezolid 600mg IV q12h",
                "Daptomycin 4-6mg/kg IV daily plus Ceftriaxone"
              ],
              notes: "Consider ID consultation for severe infections, immunocompromised patients, or poor response to initial therapy"
            }
          }
        ]
      }
    ]
  }
};

// Decision Tree Viewer Component
const TreeViewer = ({ tree, activeStepId, setActiveStepId }) => {
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);

  const findStep = (stepId: string) => {
    return tree.steps.find(step => step.id === stepId);
  };

  const handleExpandStep = (stepId: string) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId) 
        : [...prev, stepId]
    );
  };

  const renderRecommendation = (rec: any) => {
    if (!rec) return null;
    return (
      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 mt-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
          <Check className="h-4 w-4 mr-2" />
          Recommendation
        </h4>
        <div className="mt-2 space-y-3">
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-200">First-line therapy:</p>
            <p className="text-sm text-blue-600 dark:text-blue-300 ml-4">{rec.firstLine}</p>
          </div>
          
          {rec.alternatives && rec.alternatives.length > 0 && (
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-200">Alternatives:</p>
              <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-300 ml-4 space-y-1">
                {rec.alternatives.map((alt: string, i: number) => (
                  <li key={i}>{alt}</li>
                ))}
              </ul>
            </div>
          )}
          
          {rec.notes && (
            <div className="flex items-start mt-2">
              <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
              <p className="text-xs text-blue-500 dark:text-blue-400">{rec.notes}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStep = (stepId: string, depth = 0) => {
    const step = findStep(stepId);
    if (!step) return null;

    const isExpanded = expandedSteps.includes(stepId);
    const isActive = activeStepId === stepId;

    return (
      <div className={`ml-${depth > 0 ? (depth * 4).toString() : "0"} ${depth > 0 ? "border-l border-gray-200 dark:border-gray-700 pl-4" : ""}`}>
        <div 
          className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
            isActive 
              ? "bg-primary text-primary-foreground" 
              : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
          onClick={() => setActiveStepId(stepId)}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{step.question}</h4>
            {step.options.some(opt => opt.next) && (
              <button 
                className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExpandStep(stepId);
                }}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
        
        {isExpanded && (
          <div className="mb-4 space-y-2">
            {step.options.map((option, index) => (
              <div key={index} className="ml-4">
                <div className="flex items-center mb-1">
                  <ArrowRight className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">{option.text}</span>
                  {option.info && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {option.info}
                    </Badge>
                  )}
                </div>
                {option.next && renderStep(option.next, depth + 1)}
                {option.recommendation && renderRecommendation(option.recommendation)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{tree.title}</h3>
          <p className="text-sm text-muted-foreground">{tree.description}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // Expand or collapse all steps
            if (expandedSteps.length === tree.steps.length) {
              setExpandedSteps([]);
            } else {
              setExpandedSteps(tree.steps.map(step => step.id));
            }
          }}
        >
          {expandedSteps.length === tree.steps.length ? "Collapse All" : "Expand All"}
        </Button>
      </div>
      
      <div className="space-y-2">
        {tree.steps.length > 0 && renderStep(tree.steps[0].id)}
      </div>
    </div>
  );
};

export const DecisionTrees = () => {
  const [activeTree, setActiveTree] = useState<keyof typeof decisionTrees>("respiratory");
  const [activeStepId, setActiveStepId] = useState(
    decisionTrees[activeTree as keyof typeof decisionTrees].steps[0]?.id || ""
  );
  
  const handleTreeChange = (treeKey: string) => {
    setActiveTree(treeKey as keyof typeof decisionTrees);
    const firstStepId = decisionTrees[treeKey as keyof typeof decisionTrees].steps[0]?.id || "";
    setActiveStepId(firstStepId);
  };
  
  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/30">
        <Info className="h-4 w-4 mr-2" />
        <AlertDescription>
          These decision trees guide antibiotic selection based on evidence-based recommendations. Always consider local resistance patterns and patient-specific factors.
        </AlertDescription>
      </Alert>
      
      <Tabs value={activeTree} onValueChange={handleTreeChange}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="respiratory">Respiratory</TabsTrigger>
          <TabsTrigger value="urinary">Urinary Tract</TabsTrigger>
          <TabsTrigger value="skin">Skin & Soft Tissue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="respiratory">
          <TreeViewer 
            tree={decisionTrees.respiratory} 
            activeStepId={activeStepId} 
            setActiveStepId={setActiveStepId} 
          />
        </TabsContent>
        
        <TabsContent value="urinary">
          <TreeViewer 
            tree={decisionTrees.urinary} 
            activeStepId={activeStepId} 
            setActiveStepId={setActiveStepId} 
          />
        </TabsContent>
        
        <TabsContent value="skin">
          <TreeViewer 
            tree={decisionTrees.skin} 
            activeStepId={activeStepId} 
            setActiveStepId={setActiveStepId} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
