
import { PatientData } from "../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";

export interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  mechanism: string;
  clinicalSignificance: string;
  managementStrategy: string;
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  frequency: 'common' | 'uncommon' | 'rare';
  timeToOnset: 'immediate' | 'hours' | 'days' | 'weeks';
  reversibility: 'reversible' | 'irreversible' | 'unknown';
  references: string[];
}

export interface InteractionAssessment {
  patientId?: string;
  assessmentDate: Date;
  interactions: DrugInteraction[];
  riskScore: number;
  recommendedActions: string[];
  monitoringRequirements: string[];
  alternativeSuggestions: string[];
}

export class AdvancedDrugInteractionEngine {
  private static instance: AdvancedDrugInteractionEngine;
  private interactionDatabase: Map<string, DrugInteraction[]> = new Map();

  static getInstance(): AdvancedDrugInteractionEngine {
    if (!AdvancedDrugInteractionEngine.instance) {
      AdvancedDrugInteractionEngine.instance = new AdvancedDrugInteractionEngine();
    }
    return AdvancedDrugInteractionEngine.instance;
  }

  constructor() {
    this.initializeInteractionDatabase();
  }

  private initializeInteractionDatabase(): void {
    // Comprehensive drug interaction database
    const interactions: DrugInteraction[] = [
      {
        id: 'vancomycin_aminoglycoside',
        drug1: 'vancomycin',
        drug2: 'gentamicin',
        severity: 'major',
        mechanism: 'Additive nephrotoxicity and ototoxicity',
        clinicalSignificance: 'Increased risk of acute kidney injury and hearing loss',
        managementStrategy: 'Monitor renal function and hearing closely. Consider alternative if possible.',
        evidenceLevel: 'A',
        frequency: 'common',
        timeToOnset: 'days',
        reversibility: 'reversible',
        references: ['Clin Infect Dis 2011']
      },
      {
        id: 'warfarin_trimethoprim_sulfamethoxazole',
        drug1: 'warfarin',
        drug2: 'trimethoprim-sulfamethoxazole',
        severity: 'major',
        mechanism: 'CYP2C9 inhibition increases warfarin levels',
        clinicalSignificance: 'Significantly increased bleeding risk',
        managementStrategy: 'Monitor INR closely, reduce warfarin dose by 25-50%',
        evidenceLevel: 'A',
        frequency: 'common',
        timeToOnset: 'days',
        reversibility: 'reversible',
        references: ['Blood 2005']
      },
      {
        id: 'quinolone_theophylline',
        drug1: 'ciprofloxacin',
        drug2: 'theophylline',
        severity: 'major',
        mechanism: 'CYP1A2 inhibition increases theophylline levels',
        clinicalSignificance: 'Risk of theophylline toxicity with seizures and arrhythmias',
        managementStrategy: 'Monitor theophylline levels, reduce dose by 50%',
        evidenceLevel: 'A',
        frequency: 'common',
        timeToOnset: 'hours',
        reversibility: 'reversible',
        references: ['Chest 1999']
      },
      {
        id: 'macrolide_statins',
        drug1: 'clarithromycin',
        drug2: 'simvastatin',
        severity: 'contraindicated',
        mechanism: 'CYP3A4 inhibition dramatically increases statin levels',
        clinicalSignificance: 'High risk of rhabdomyolysis and acute kidney injury',
        managementStrategy: 'Contraindicated combination. Use alternative antibiotic or statin.',
        evidenceLevel: 'A',
        frequency: 'common',
        timeToOnset: 'days',
        reversibility: 'reversible',
        references: ['NEJM 2002']
      },
      {
        id: 'fluoroquinolone_antacids',
        drug1: 'levofloxacin',
        drug2: 'aluminum_hydroxide',
        severity: 'moderate',
        mechanism: 'Chelation reduces fluoroquinolone absorption',
        clinicalSignificance: 'Decreased antibiotic efficacy',
        managementStrategy: 'Separate administration by 2-4 hours',
        evidenceLevel: 'B',
        frequency: 'common',
        timeToOnset: 'immediate',
        reversibility: 'reversible',
        references: ['Antimicrob Agents Chemother 1993']
      }
    ];

    // Index interactions by drug names
    interactions.forEach(interaction => {
      const drug1Key = interaction.drug1.toLowerCase();
      const drug2Key = interaction.drug2.toLowerCase();
      
      if (!this.interactionDatabase.has(drug1Key)) {
        this.interactionDatabase.set(drug1Key, []);
      }
      if (!this.interactionDatabase.has(drug2Key)) {
        this.interactionDatabase.set(drug2Key, []);
      }
      
      this.interactionDatabase.get(drug1Key)!.push(interaction);
      if (drug1Key !== drug2Key) {
        this.interactionDatabase.get(drug2Key)!.push(interaction);
      }
    });
  }

  async assessDrugInteractions(
    patientData: PatientData,
    recommendation: EnhancedAntibioticRecommendation,
    currentMedications: string[] = []
  ): Promise<InteractionAssessment> {
    const allMedications = [
      recommendation.primaryRecommendation.name,
      ...currentMedications
    ].map(med => med.toLowerCase());

    const detectedInteractions: DrugInteraction[] = [];

    // Check for interactions between all medication pairs
    for (let i = 0; i < allMedications.length; i++) {
      for (let j = i + 1; j < allMedications.length; j++) {
        const interactions = this.findInteractionsBetweenDrugs(
          allMedications[i],
          allMedications[j]
        );
        detectedInteractions.push(...interactions);
      }
    }

    // Check for disease-specific interactions
    const diseaseInteractions = this.checkDiseaseSpecificInteractions(
      patientData,
      allMedications
    );
    detectedInteractions.push(...diseaseInteractions);

    // Calculate risk score
    const riskScore = this.calculateInteractionRiskScore(detectedInteractions);

    // Generate recommendations
    const recommendedActions = this.generateManagementRecommendations(detectedInteractions);
    const monitoringRequirements = this.generateMonitoringRequirements(detectedInteractions);
    const alternativeSuggestions = this.generateAlternativeSuggestions(
      detectedInteractions,
      recommendation
    );

    return {
      assessmentDate: new Date(),
      interactions: detectedInteractions,
      riskScore,
      recommendedActions,
      monitoringRequirements,
      alternativeSuggestions
    };
  }

  private findInteractionsBetweenDrugs(drug1: string, drug2: string): DrugInteraction[] {
    const interactions: DrugInteraction[] = [];
    
    // Check direct interactions
    const drug1Interactions = this.interactionDatabase.get(drug1) || [];
    
    drug1Interactions.forEach(interaction => {
      if (interaction.drug1.toLowerCase() === drug2 || 
          interaction.drug2.toLowerCase() === drug2) {
        interactions.push(interaction);
      }
    });

    // Check for class-based interactions
    const classInteractions = this.checkClassBasedInteractions(drug1, drug2);
    interactions.push(...classInteractions);

    return interactions;
  }

  private checkClassBasedInteractions(drug1: string, drug2: string): DrugInteraction[] {
    const interactions: DrugInteraction[] = [];
    
    // Beta-lactam + Beta-lactam antagonism
    if (this.isBetaLactam(drug1) && this.isBetaLactam(drug2)) {
      interactions.push({
        id: `beta_lactam_antagonism_${Date.now()}`,
        drug1,
        drug2,
        severity: 'moderate',
        mechanism: 'Potential bacteriostatic-bactericidal antagonism',
        clinicalSignificance: 'May reduce bactericidal activity',
        managementStrategy: 'Avoid combination therapy unless specifically indicated',
        evidenceLevel: 'B',
        frequency: 'uncommon',
        timeToOnset: 'immediate',
        reversibility: 'reversible',
        references: ['Antimicrob Agents Chemother 1978']
      });
    }

    return interactions;
  }

  private checkDiseaseSpecificInteractions(
    patientData: PatientData,
    medications: string[]
  ): DrugInteraction[] {
    const interactions: DrugInteraction[] = [];

    // Renal disease interactions
    if (patientData.kidneyDisease) {
      medications.forEach(med => {
        if (this.isNephrotoxic(med)) {
          interactions.push({
            id: `renal_disease_${med}_${Date.now()}`,
            drug1: med,
            drug2: 'renal_impairment',
            severity: 'major',
            mechanism: 'Nephrotoxic drug in patient with existing renal impairment',
            clinicalSignificance: 'Increased risk of further renal damage',
            managementStrategy: 'Consider alternative or dose reduction with frequent monitoring',
            evidenceLevel: 'A',
            frequency: 'common',
            timeToOnset: 'days',
            reversibility: 'reversible',
            references: ['Kidney Int 2010']
          });
        }
      });
    }

    return interactions;
  }

  private calculateInteractionRiskScore(interactions: DrugInteraction[]): number {
    let score = 0;
    
    interactions.forEach(interaction => {
      switch (interaction.severity) {
        case 'contraindicated': score += 100; break;
        case 'major': score += 75; break;
        case 'moderate': score += 50; break;
        case 'minor': score += 25; break;
      }
    });

    return Math.min(score, 100);
  }

  private generateManagementRecommendations(interactions: DrugInteraction[]): string[] {
    const recommendations = new Set<string>();
    
    interactions.forEach(interaction => {
      recommendations.add(interaction.managementStrategy);
      
      if (interaction.severity === 'contraindicated') {
        recommendations.add('URGENT: Consider immediate drug discontinuation or alternative therapy');
      }
    });

    return Array.from(recommendations);
  }

  private generateMonitoringRequirements(interactions: DrugInteraction[]): string[] {
    const requirements = new Set<string>();
    
    interactions.forEach(interaction => {
      if (interaction.mechanism.includes('nephrotoxic')) {
        requirements.add('Monitor serum creatinine and BUN daily');
      }
      if (interaction.mechanism.includes('hepatotoxic')) {
        requirements.add('Monitor liver function tests');
      }
      if (interaction.mechanism.includes('QT')) {
        requirements.add('Monitor ECG for QT prolongation');
      }
      if (interaction.mechanism.includes('bleeding')) {
        requirements.add('Monitor coagulation studies and signs of bleeding');
      }
    });

    return Array.from(requirements);
  }

  private generateAlternativeSuggestions(
    interactions: DrugInteraction[],
    recommendation: EnhancedAntibioticRecommendation
  ): string[] {
    const suggestions: string[] = [];
    
    const severeInteractions = interactions.filter(
      i => i.severity === 'contraindicated' || i.severity === 'major'
    );

    if (severeInteractions.length > 0) {
      suggestions.push('Consider alternative antibiotic from different class');
      suggestions.push('Evaluate alternative medications for concurrent conditions');
      suggestions.push('Consider sequential rather than concurrent therapy');
    }

    return suggestions;
  }

  private isBetaLactam(drug: string): boolean {
    const betaLactams = [
      'penicillin', 'amoxicillin', 'ampicillin', 'piperacillin',
      'cephalexin', 'cefazolin', 'ceftriaxone', 'cefepime',
      'meropenem', 'imipenem', 'ertapenem'
    ];
    
    return betaLactams.some(bl => drug.toLowerCase().includes(bl));
  }

  private isNephrotoxic(drug: string): boolean {
    const nephrotoxicDrugs = [
      'vancomycin', 'gentamicin', 'tobramycin', 'amikacin',
      'amphotericin', 'colistin', 'polymyxin'
    ];
    
    return nephrotoxicDrugs.some(nd => drug.toLowerCase().includes(nd));
  }
}
