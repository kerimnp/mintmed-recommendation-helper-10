
import { PatientData } from "../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";

export interface ValidationResult {
  isValid: boolean;
  severity: 'critical' | 'major' | 'minor' | 'info';
  category: 'safety' | 'efficacy' | 'dosing' | 'allergy' | 'interaction' | 'contraindication';
  message: string;
  recommendation: string;
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  requiresOverride: boolean;
  autoCorrection?: string;
}

export interface ClinicalValidationReport {
  patientId?: string;
  validationTimestamp: Date;
  overallRiskLevel: 'low' | 'moderate' | 'high' | 'critical';
  validationResults: ValidationResult[];
  dataQualityScore: number;
  clinicalComplexityScore: number;
  recommendationConfidence: number;
  requiredActions: string[];
  optionalConsiderations: string[];
}

export class ClinicalValidationEngine {
  private static instance: ClinicalValidationEngine;

  static getInstance(): ClinicalValidationEngine {
    if (!ClinicalValidationEngine.instance) {
      ClinicalValidationEngine.instance = new ClinicalValidationEngine();
    }
    return ClinicalValidationEngine.instance;
  }

  async validatePatientData(patientData: PatientData): Promise<ClinicalValidationReport> {
    const validationResults: ValidationResult[] = [];
    
    // Critical safety validations
    validationResults.push(...this.validateAllergies(patientData));
    validationResults.push(...this.validateContraindications(patientData));
    validationResults.push(...this.validateRenalDosing(patientData));
    validationResults.push(...this.validatePediatricFactors(patientData));
    validationResults.push(...this.validatePregnancy(patientData));
    
    // Clinical efficacy validations
    validationResults.push(...this.validateInfectionSiteAppropriate(patientData));
    validationResults.push(...this.validateSeverityAlignment(patientData));
    validationResults.push(...this.validateDurationAppropriate(patientData));
    
    // Data quality validations
    validationResults.push(...this.validateDataCompleteness(patientData));
    validationResults.push(...this.validateDataConsistency(patientData));

    const overallRiskLevel = this.calculateOverallRiskLevel(validationResults);
    const dataQualityScore = this.calculateDataQualityScore(patientData);
    const clinicalComplexityScore = this.calculateClinicalComplexityScore(patientData);
    const recommendationConfidence = this.calculateRecommendationConfidence(validationResults, dataQualityScore);

    return {
      validationTimestamp: new Date(),
      overallRiskLevel,
      validationResults,
      dataQualityScore,
      clinicalComplexityScore,
      recommendationConfidence,
      requiredActions: this.extractRequiredActions(validationResults),
      optionalConsiderations: this.extractOptionalConsiderations(validationResults)
    };
  }

  async validateRecommendation(
    patientData: PatientData, 
    recommendation: EnhancedAntibioticRecommendation
  ): Promise<ClinicalValidationReport> {
    const validationResults: ValidationResult[] = [];

    // Validate recommendation against patient profile
    validationResults.push(...this.validateRecommendationSafety(patientData, recommendation));
    validationResults.push(...this.validateDosing(patientData, recommendation));
    validationResults.push(...this.validateDrugInteractions(patientData, recommendation));
    validationResults.push(...this.validateMonitoringRequirements(patientData, recommendation));

    const overallRiskLevel = this.calculateOverallRiskLevel(validationResults);
    const dataQualityScore = this.calculateDataQualityScore(patientData);
    const clinicalComplexityScore = this.calculateClinicalComplexityScore(patientData);
    const recommendationConfidence = this.calculateRecommendationConfidence(validationResults, dataQualityScore);

    return {
      validationTimestamp: new Date(),
      overallRiskLevel,
      validationResults,
      dataQualityScore,
      clinicalComplexityScore,
      recommendationConfidence,
      requiredActions: this.extractRequiredActions(validationResults),
      optionalConsiderations: this.extractOptionalConsiderations(validationResults)
    };
  }

  private validateAllergies(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (patientData.allergies.penicillin) {
      results.push({
        isValid: false,
        severity: 'critical',
        category: 'allergy',
        message: 'Patient has documented penicillin allergy',
        recommendation: 'Avoid all beta-lactam antibiotics unless cross-reactivity risk is assessed',
        evidenceLevel: 'A',
        requiresOverride: true
      });
    }

    if (patientData.allergies.sulfa) {
      results.push({
        isValid: false,
        severity: 'major',
        category: 'allergy',
        message: 'Patient has documented sulfa allergy',
        recommendation: 'Avoid trimethoprim-sulfamethoxazole and sulfonamide-containing medications',
        evidenceLevel: 'A',
        requiresOverride: true
      });
    }

    return results;
  }

  private validateContraindications(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (patientData.pregnancy === 'yes' && patientData.gender === 'female') {
      results.push({
        isValid: false,
        severity: 'critical',
        category: 'contraindication',
        message: 'Pregnancy detected - teratogenic antibiotics contraindicated',
        recommendation: 'Use pregnancy-safe antibiotics (Category A/B). Avoid tetracyclines, fluoroquinolones, aminoglycosides',
        evidenceLevel: 'A',
        requiresOverride: true
      });
    }

    if (patientData.kidneyDisease) {
      const creatinine = parseFloat(patientData.creatinine || '1.0');
      if (creatinine > 2.0) {
        results.push({
          isValid: false,
          severity: 'major',
          category: 'contraindication',
          message: 'Severe renal impairment detected',
          recommendation: 'Avoid nephrotoxic antibiotics. Significant dose adjustments required for renally eliminated drugs',
          evidenceLevel: 'A',
          requiresOverride: false,
          autoCorrection: 'Adjust doses for creatinine clearance'
        });
      }
    }

    return results;
  }

  private validateRenalDosing(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    const creatinine = parseFloat(patientData.creatinine || '1.0');
    const age = parseInt(patientData.age);
    const weight = parseFloat(patientData.weight);

    if (creatinine > 1.5 || age > 65) {
      results.push({
        isValid: false,
        severity: 'major',
        category: 'dosing',
        message: 'Renal function assessment required for dosing',
        recommendation: 'Calculate creatinine clearance and adjust doses for renally eliminated antibiotics',
        evidenceLevel: 'A',
        requiresOverride: false,
        autoCorrection: 'Apply renal dose adjustment algorithms'
      });
    }

    return results;
  }

  private validatePediatricFactors(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    const age = parseInt(patientData.age);

    if (age < 18) {
      results.push({
        isValid: true,
        severity: 'info',
        category: 'dosing',
        message: 'Pediatric patient detected',
        recommendation: 'Use weight-based dosing. Verify pediatric safety profile of selected antibiotics',
        evidenceLevel: 'A',
        requiresOverride: false,
        autoCorrection: 'Apply pediatric dosing protocols'
      });
    }

    if (age < 2) {
      results.push({
        isValid: false,
        severity: 'major',
        category: 'safety',
        message: 'Infant/toddler patient requires specialized care',
        recommendation: 'Consult pediatric infectious disease specialist. Use only age-appropriate formulations',
        evidenceLevel: 'A',
        requiresOverride: true
      });
    }

    return results;
  }

  private validatePregnancy(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (patientData.gender === 'female' && parseInt(patientData.age) >= 12 && parseInt(patientData.age) <= 50) {
      if (!patientData.pregnancy || patientData.pregnancy === '') {
        results.push({
          isValid: false,
          severity: 'minor',
          category: 'safety',
          message: 'Pregnancy status not confirmed in woman of childbearing age',
          recommendation: 'Confirm pregnancy status before prescribing. Use pregnancy-safe options if uncertain',
          evidenceLevel: 'B',
          requiresOverride: false
        });
      }
    }

    return results;
  }

  private validateInfectionSiteAppropriate(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (!patientData.infectionSites || patientData.infectionSites.length === 0) {
      results.push({
        isValid: false,
        severity: 'critical',
        category: 'efficacy',
        message: 'No infection site specified',
        recommendation: 'Infection site must be identified for appropriate antibiotic selection',
        evidenceLevel: 'A',
        requiresOverride: true
      });
    }

    return results;
  }

  private validateSeverityAlignment(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (!patientData.severity) {
      results.push({
        isValid: false,
        severity: 'major',
        category: 'efficacy',
        message: 'Infection severity not specified',
        recommendation: 'Classify infection severity (mild/moderate/severe) for appropriate therapy selection',
        evidenceLevel: 'A',
        requiresOverride: false
      });
    }

    return results;
  }

  private validateDurationAppropriate(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (!patientData.duration || patientData.duration.trim() === '') {
      results.push({
        isValid: false,
        severity: 'minor',
        category: 'efficacy',
        message: 'Symptom duration not specified',
        recommendation: 'Duration of symptoms helps determine if empirical therapy is appropriate',
        evidenceLevel: 'B',
        requiresOverride: false
      });
    }

    return results;
  }

  private validateDataCompleteness(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    const requiredFields = ['age', 'weight', 'infectionSites', 'severity'];
    const missingFields = requiredFields.filter(field => !patientData[field as keyof PatientData]);

    if (missingFields.length > 0) {
      results.push({
        isValid: false,
        severity: 'major',
        category: 'safety',
        message: `Missing critical patient data: ${missingFields.join(', ')}`,
        recommendation: 'Complete patient assessment before generating recommendations',
        evidenceLevel: 'A',
        requiresOverride: false
      });
    }

    return results;
  }

  private validateDataConsistency(patientData: PatientData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    const age = parseInt(patientData.age);
    const weight = parseFloat(patientData.weight);
    
    if (age > 0 && weight > 0) {
      // Basic consistency checks
      if (age < 2 && weight > 15) {
        results.push({
          isValid: false,
          severity: 'minor',
          category: 'safety',
          message: 'Patient weight seems high for age - verify data accuracy',
          recommendation: 'Confirm patient weight and age are correct',
          evidenceLevel: 'C',
          requiresOverride: false
        });
      }
    }

    return results;
  }

  private validateRecommendationSafety(
    patientData: PatientData, 
    recommendation: EnhancedAntibioticRecommendation
  ): ValidationResult[] {
    // Implementation for validating recommendation safety
    return [];
  }

  private validateDosing(
    patientData: PatientData, 
    recommendation: EnhancedAntibioticRecommendation
  ): ValidationResult[] {
    // Implementation for validating dosing
    return [];
  }

  private validateDrugInteractions(
    patientData: PatientData, 
    recommendation: EnhancedAntibioticRecommendation
  ): ValidationResult[] {
    // Implementation for validating drug interactions
    return [];
  }

  private validateMonitoringRequirements(
    patientData: PatientData, 
    recommendation: EnhancedAntibioticRecommendation
  ): ValidationResult[] {
    // Implementation for validating monitoring requirements
    return [];
  }

  private calculateOverallRiskLevel(results: ValidationResult[]): 'low' | 'moderate' | 'high' | 'critical' {
    if (results.some(r => r.severity === 'critical')) return 'critical';
    if (results.some(r => r.severity === 'major')) return 'high';
    if (results.some(r => r.severity === 'minor')) return 'moderate';
    return 'low';
  }

  private calculateDataQualityScore(patientData: PatientData): number {
    const totalFields = 15; // Total assessable fields
    let completedFields = 0;

    if (patientData.age) completedFields++;
    if (patientData.weight) completedFields++;
    if (patientData.height) completedFields++;
    if (patientData.gender) completedFields++;
    if (patientData.infectionSites?.length > 0) completedFields++;
    if (patientData.severity) completedFields++;
    if (patientData.symptoms) completedFields++;
    if (patientData.duration) completedFields++;
    if (patientData.creatinine) completedFields++;
    if (patientData.pregnancy !== undefined) completedFields++;
    // Add more field checks as needed

    return Math.round((completedFields / totalFields) * 100);
  }

  private calculateClinicalComplexityScore(patientData: PatientData): number {
    let complexityPoints = 0;

    // Age-based complexity
    const age = parseInt(patientData.age);
    if (age < 2 || age > 80) complexityPoints += 2;
    else if (age < 18 || age > 65) complexityPoints += 1;

    // Comorbidity complexity
    if (patientData.kidneyDisease) complexityPoints += 2;
    if (patientData.liverDisease) complexityPoints += 2;
    if (patientData.diabetes) complexityPoints += 1;
    if (patientData.immunosuppressed) complexityPoints += 3;

    // Allergy complexity
    const allergyCount = Object.values(patientData.allergies).filter(Boolean).length;
    complexityPoints += allergyCount;

    // Resistance complexity
    const resistanceCount = Object.values(patientData.resistances).filter(Boolean).length;
    complexityPoints += resistanceCount * 2;

    // Severity complexity
    if (patientData.severity === 'severe') complexityPoints += 2;
    else if (patientData.severity === 'moderate') complexityPoints += 1;

    return Math.min(complexityPoints, 10); // Cap at 10
  }

  private calculateRecommendationConfidence(results: ValidationResult[], dataQualityScore: number): number {
    let baseConfidence = 85;
    
    // Reduce confidence for critical issues
    const criticalIssues = results.filter(r => r.severity === 'critical').length;
    const majorIssues = results.filter(r => r.severity === 'major').length;
    
    baseConfidence -= (criticalIssues * 20);
    baseConfidence -= (majorIssues * 10);
    
    // Adjust for data quality
    const dataQualityAdjustment = (dataQualityScore - 80) * 0.2; // -/+ 4 points max
    baseConfidence += dataQualityAdjustment;
    
    return Math.max(Math.min(baseConfidence, 98), 40); // Between 40-98%
  }

  private extractRequiredActions(results: ValidationResult[]): string[] {
    return results
      .filter(r => r.requiresOverride || r.severity === 'critical')
      .map(r => r.recommendation);
  }

  private extractOptionalConsiderations(results: ValidationResult[]): string[] {
    return results
      .filter(r => !r.requiresOverride && r.severity !== 'critical')
      .map(r => r.recommendation);
  }
}
