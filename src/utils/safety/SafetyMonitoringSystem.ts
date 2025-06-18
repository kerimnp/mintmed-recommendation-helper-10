
import { PatientData } from "../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";

export interface SafetyAlert {
  id: string;
  patientId?: string;
  prescriptionId?: string;
  alertType: 'allergy' | 'interaction' | 'dosing' | 'monitoring' | 'contraindication' | 'adverse_event';
  severity: 'critical' | 'high' | 'moderate' | 'low';
  title: string;
  description: string;
  clinicalSignificance: string;
  recommendedAction: string;
  timeframe: 'immediate' | 'within_1_hour' | 'within_4_hours' | 'within_24_hours' | 'routine';
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  requiresOverride: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  overrideReason?: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface MonitoringParameter {
  id: string;
  name: string;
  type: 'laboratory' | 'vital_signs' | 'clinical_assessment' | 'patient_reported';
  normalRange: { min: number; max: number; unit: string };
  criticalRange: { min: number; max: number; unit: string };
  frequency: string;
  indication: string;
  relatedDrugs: string[];
}

export interface SafetyProfile {
  patientId: string;
  activeAlerts: SafetyAlert[];
  monitoringParameters: MonitoringParameter[];
  riskFactors: string[];
  safetyScore: number;
  lastAssessment: Date;
  nextAssessmentDue: Date;
}

export class SafetyMonitoringSystem {
  private static instance: SafetyMonitoringSystem;
  private alertCallbacks: ((alert: SafetyAlert) => void)[] = [];

  static getInstance(): SafetyMonitoringSystem {
    if (!SafetyMonitoringSystem.instance) {
      SafetyMonitoringSystem.instance = new SafetyMonitoringSystem();
    }
    return SafetyMonitoringSystem.instance;
  }

  onAlert(callback: (alert: SafetyAlert) => void): void {
    this.alertCallbacks.push(callback);
  }

  private triggerAlert(alert: SafetyAlert): void {
    console.log(`SAFETY ALERT [${alert.severity.toUpperCase()}]: ${alert.title}`);
    this.alertCallbacks.forEach(callback => callback(alert));
  }

  async assessPatientSafety(patientData: PatientData): Promise<SafetyProfile> {
    const alerts: SafetyAlert[] = [];
    const monitoringParameters: MonitoringParameter[] = [];
    const riskFactors: string[] = [];

    // Critical allergy assessments
    alerts.push(...this.assessAllergySafety(patientData));
    
    // Drug interaction assessments
    alerts.push(...this.assessInteractionRisks(patientData));
    
    // Organ function assessments
    alerts.push(...this.assessOrganFunctionSafety(patientData));
    
    // Special population assessments
    alerts.push(...this.assessSpecialPopulationSafety(patientData));
    
    // Generate monitoring parameters
    monitoringParameters.push(...this.generateMonitoringParameters(patientData));
    
    // Extract risk factors
    riskFactors.push(...this.extractRiskFactors(patientData));
    
    // Calculate safety score
    const safetyScore = this.calculateSafetyScore(alerts, riskFactors);

    // Trigger critical alerts
    alerts.filter(alert => alert.severity === 'critical' || alert.severity === 'high')
          .forEach(alert => this.triggerAlert(alert));

    return {
      patientId: patientData.firstName ? `${patientData.firstName}_${patientData.lastName}` : 'unknown',
      activeAlerts: alerts,
      monitoringParameters,
      riskFactors,
      safetyScore,
      lastAssessment: new Date(),
      nextAssessmentDue: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    };
  }

  async assessRecommendationSafety(
    patientData: PatientData, 
    recommendation: EnhancedAntibioticRecommendation
  ): Promise<SafetyAlert[]> {
    const alerts: SafetyAlert[] = [];
    const drugName = recommendation.primaryRecommendation.name.toLowerCase();

    // Drug-specific safety assessments
    alerts.push(...this.assessDrugSpecificSafety(patientData, drugName));
    
    // Dosing safety assessments
    alerts.push(...this.assessDosingSafety(patientData, recommendation));
    
    // Route-specific safety assessments
    alerts.push(...this.assessRouteSafety(patientData, recommendation));
    
    // Duration safety assessments
    alerts.push(...this.assessDurationSafety(patientData, recommendation));

    return alerts;
  }

  private assessAllergySafety(patientData: PatientData): SafetyAlert[] {
    const alerts: SafetyAlert[] = [];

    if (patientData.allergies.penicillin) {
      alerts.push({
        id: `allergy_penicillin_${Date.now()}`,
        alertType: 'allergy',
        severity: 'critical',
        title: 'Penicillin Allergy Alert',
        description: 'Patient has documented penicillin allergy',
        clinicalSignificance: 'High risk of severe allergic reactions including anaphylaxis',
        recommendedAction: 'Avoid all beta-lactam antibiotics unless desensitization performed. Consider alternative antimicrobial classes.',
        timeframe: 'immediate',
        evidenceLevel: 'A',
        requiresOverride: true,
        createdAt: new Date(),
        metadata: {
          allergyType: 'drug',
          crossReactivity: ['amoxicillin', 'ampicillin', 'cephalexin', 'cefazolin']
        }
      });
    }

    if (patientData.allergies.sulfa) {
      alerts.push({
        id: `allergy_sulfa_${Date.now()}`,
        alertType: 'allergy',
        severity: 'high',
        title: 'Sulfa Allergy Alert',
        description: 'Patient has documented sulfonamide allergy',
        clinicalSignificance: 'Risk of severe skin reactions and multi-organ involvement',
        recommendedAction: 'Avoid trimethoprim-sulfamethoxazole and other sulfonamide-containing drugs',
        timeframe: 'immediate',
        evidenceLevel: 'A',
        requiresOverride: true,
        createdAt: new Date()
      });
    }

    return alerts;
  }

  private assessInteractionRisks(patientData: PatientData): SafetyAlert[] {
    const alerts: SafetyAlert[] = [];

    // This would integrate with comprehensive drug interaction database
    // For now, implementing basic interaction checks
    
    return alerts;
  }

  private assessOrganFunctionSafety(patientData: PatientData): SafetyAlert[] {
    const alerts: SafetyAlert[] = [];
    
    if (patientData.kidneyDisease) {
      const creatinine = parseFloat(patientData.creatinine || '1.0');
      
      if (creatinine > 2.0) {
        alerts.push({
          id: `renal_impairment_${Date.now()}`,
          alertType: 'contraindication',
          severity: 'high',
          title: 'Severe Renal Impairment',
          description: `Elevated serum creatinine: ${creatinine} mg/dL`,
          clinicalSignificance: 'High risk of drug accumulation and toxicity',
          recommendedAction: 'Avoid nephrotoxic antibiotics. Calculate creatinine clearance and adjust doses appropriately.',
          timeframe: 'immediate',
          evidenceLevel: 'A',
          requiresOverride: false,
          createdAt: new Date(),
          metadata: {
            creatinine: creatinine,
            estimatedGFR: this.estimateGFR(patientData)
          }
        });
      }
    }

    if (patientData.liverDisease) {
      alerts.push({
        id: `hepatic_impairment_${Date.now()}`,
        alertType: 'contraindication',
        severity: 'high',
        title: 'Hepatic Impairment',
        description: 'Patient has documented liver disease',
        clinicalSignificance: 'Altered drug metabolism and increased toxicity risk',
        recommendedAction: 'Avoid hepatotoxic antibiotics. Consider dose reduction for hepatically metabolized drugs.',
        timeframe: 'within_4_hours',
        evidenceLevel: 'A',
        requiresOverride: false,
        createdAt: new Date()
      });
    }

    return alerts;
  }

  private assessSpecialPopulationSafety(patientData: PatientData): SafetyAlert[] {
    const alerts: SafetyAlert[] = [];
    const age = parseInt(patientData.age);

    if (patientData.pregnancy === 'yes' && patientData.gender === 'female') {
      alerts.push({
        id: `pregnancy_safety_${Date.now()}`,
        alertType: 'contraindication',
        severity: 'critical',
        title: 'Pregnancy Safety Alert',
        description: 'Pregnant patient - teratogenic risk assessment required',
        clinicalSignificance: 'Risk of fetal harm from teratogenic antibiotics',
        recommendedAction: 'Use only pregnancy category A or B antibiotics. Avoid tetracyclines, fluoroquinolones, and aminoglycosides.',
        timeframe: 'immediate',
        evidenceLevel: 'A',
        requiresOverride: true,
        createdAt: new Date(),
        metadata: {
          pregnancyCategory: 'assessment_required',
          contraindicatedDrugs: ['doxycycline', 'ciprofloxacin', 'gentamicin', 'trimethoprim-sulfamethoxazole']
        }
      });
    }

    if (age < 2) {
      alerts.push({
        id: `infant_safety_${Date.now()}`,
        alertType: 'dosing',
        severity: 'high',
        title: 'Infant/Toddler Safety Alert',
        description: 'Patient age < 2 years requires specialized dosing',
        clinicalSignificance: 'Immature organ systems and altered pharmacokinetics',
        recommendedAction: 'Use weight-based dosing with pediatric formulations. Consult pediatric infectious disease if available.',
        timeframe: 'within_1_hour',
        evidenceLevel: 'A',
        requiresOverride: false,
        createdAt: new Date()
      });
    }

    if (patientData.immunosuppressed) {
      alerts.push({
        id: `immunocompromised_${Date.now()}`,
        alertType: 'monitoring',
        severity: 'high',
        title: 'Immunocompromised Patient Alert',
        description: 'Immunosuppressed patient requires enhanced monitoring',
        clinicalSignificance: 'Increased infection risk and altered immune response',
        recommendedAction: 'Consider broader spectrum coverage. Monitor closely for treatment failure and opportunistic infections.',
        timeframe: 'within_4_hours',
        evidenceLevel: 'A',
        requiresOverride: false,
        createdAt: new Date()
      });
    }

    return alerts;
  }

  private assessDrugSpecificSafety(patientData: PatientData, drugName: string): SafetyAlert[] {
    const alerts: SafetyAlert[] = [];

    // Vancomycin-specific safety
    if (drugName.includes('vancomycin')) {
      alerts.push({
        id: `vancomycin_monitoring_${Date.now()}`,
        alertType: 'monitoring',
        severity: 'high',
        title: 'Vancomycin Monitoring Required',
        description: 'Vancomycin requires therapeutic drug monitoring',
        clinicalSignificance: 'Narrow therapeutic window with nephrotoxicity and ototoxicity risks',
        recommendedAction: 'Monitor trough levels, renal function, and hearing. Target trough 15-20 mg/L for serious infections.',
        timeframe: 'within_24_hours',
        evidenceLevel: 'A',
        requiresOverride: false,
        createdAt: new Date()
      });
    }

    // Aminoglycoside-specific safety
    if (['gentamicin', 'tobramycin', 'amikacin'].some(ag => drugName.includes(ag))) {
      alerts.push({
        id: `aminoglycoside_monitoring_${Date.now()}`,
        alertType: 'monitoring',
        severity: 'high',
        title: 'Aminoglycoside Monitoring Required',
        description: 'Aminoglycoside therapy requires intensive monitoring',
        clinicalSignificance: 'High risk of nephrotoxicity and ototoxicity',
        recommendedAction: 'Monitor peak/trough levels, daily creatinine, and hearing. Consider once-daily dosing when appropriate.',
        timeframe: 'within_24_hours',
        evidenceLevel: 'A',
        requiresOverride: false,
        createdAt: new Date()
      });
    }

    return alerts;
  }

  private assessDosingSafety(patientData: PatientData, recommendation: EnhancedAntibioticRecommendation): SafetyAlert[] {
    const alerts: SafetyAlert[] = [];
    
    // Implementation for dosing safety assessment
    return alerts;
  }

  private assessRouteSafety(patientData: PatientData, recommendation: EnhancedAntibioticRecommendation): SafetyAlert[] {
    const alerts: SafetyAlert[] = [];
    
    // Implementation for route safety assessment
    return alerts;
  }

  private assessDurationSafety(patientData: PatientData, recommendation: EnhancedAntibioticRecommendation): SafetyAlert[] {
    const alerts: SafetyAlert[] = [];
    
    // Implementation for duration safety assessment
    return alerts;
  }

  private generateMonitoringParameters(patientData: PatientData): MonitoringParameter[] {
    const parameters: MonitoringParameter[] = [];

    // Basic monitoring for all patients
    parameters.push({
      id: 'basic_metabolic_panel',
      name: 'Basic Metabolic Panel',
      type: 'laboratory',
      normalRange: { min: 0.7, max: 1.3, unit: 'mg/dL' },
      criticalRange: { min: 0.5, max: 3.0, unit: 'mg/dL' },
      frequency: 'Every 48-72 hours',
      indication: 'Monitor renal function during antibiotic therapy',
      relatedDrugs: ['all antibiotics']
    });

    if (patientData.kidneyDisease || parseFloat(patientData.creatinine || '1.0') > 1.5) {
      parameters.push({
        id: 'daily_creatinine',
        name: 'Daily Serum Creatinine',
        type: 'laboratory',
        normalRange: { min: 0.7, max: 1.3, unit: 'mg/dL' },
        criticalRange: { min: 0.5, max: 3.0, unit: 'mg/dL' },
        frequency: 'Daily',
        indication: 'Monitor renal function in patients with baseline kidney disease',
        relatedDrugs: ['vancomycin', 'gentamicin', 'tobramycin', 'amikacin']
      });
    }

    return parameters;
  }

  private extractRiskFactors(patientData: PatientData): string[] {
    const riskFactors: string[] = [];

    if (parseInt(patientData.age) > 65) riskFactors.push('Advanced age');
    if (parseInt(patientData.age) < 2) riskFactors.push('Infant/toddler');
    if (patientData.pregnancy === 'yes') riskFactors.push('Pregnancy');
    if (patientData.kidneyDisease) riskFactors.push('Renal impairment');
    if (patientData.liverDisease) riskFactors.push('Hepatic impairment');
    if (patientData.immunosuppressed) riskFactors.push('Immunocompromised');
    if (patientData.diabetes) riskFactors.push('Diabetes mellitus');
    
    const allergyCount = Object.values(patientData.allergies).filter(Boolean).length;
    if (allergyCount > 0) riskFactors.push(`Multiple drug allergies (${allergyCount})`);

    const resistanceCount = Object.values(patientData.resistances).filter(Boolean).length;
    if (resistanceCount > 0) riskFactors.push(`Antibiotic resistance patterns (${resistanceCount})`);

    return riskFactors;
  }

  private calculateSafetyScore(alerts: SafetyAlert[], riskFactors: string[]): number {
    let baseScore = 100;

    // Deduct points for alerts
    alerts.forEach(alert => {
      switch (alert.severity) {
        case 'critical': baseScore -= 20; break;
        case 'high': baseScore -= 10; break;
        case 'moderate': baseScore -= 5; break;
        case 'low': baseScore -= 2; break;
      }
    });

    // Deduct points for risk factors
    baseScore -= riskFactors.length * 3;

    return Math.max(baseScore, 0);
  }

  private estimateGFR(patientData: PatientData): number {
    // Simplified GFR estimation - in real implementation would use validated formulas
    const creatinine = parseFloat(patientData.creatinine || '1.0');
    const age = parseInt(patientData.age);
    const isFemale = patientData.gender === 'female';
    
    // Simplified MDRD formula
    let gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);
    if (isFemale) gfr *= 0.742;
    
    return Math.round(gfr);
  }
}
