
export interface DrugFormulation {
  id: string;
  generic_name: string;
  brand_name: string;
  manufacturer: string;
  strength: string;
  dosage_form: string;
  route: string;
  package_size?: string;
  ndc_number?: string;
  availability_status: string;
  cost_per_unit?: number;
  insurance_tier: number;
  created_at: string;
  updated_at: string;
}

export interface AntibioticStatistics {
  id: string;
  antibiotic_name: string;
  generic_name: string;
  total_prescriptions: number;
  month_year: string;
  department_id?: string;
  indication?: string;
  average_duration_days?: number;
  success_rate?: number;
  adverse_events_count: number;
  resistance_reports: number;
  cost_total?: number;
  created_at: string;
}

export interface ClinicalOutcome {
  id: string;
  prescription_id?: string;
  patient_id?: string;
  assessment_date: string;
  clinical_response: 'complete' | 'partial' | 'no_response' | 'worsened';
  symptom_resolution?: Record<string, any>;
  laboratory_improvements?: Record<string, any>;
  culture_clearance?: boolean;
  length_of_stay?: number;
  readmission_30_days: boolean;
  adverse_drug_reactions?: Record<string, any>;
  drug_level_monitoring?: Record<string, any>;
  cost_effectiveness_score?: number;
  physician_satisfaction_score?: number;
  patient_satisfaction_score?: number;
  notes?: string;
  recorded_by?: string;
  created_at: string;
  updated_at: string;
}

export interface DrugInteractionAlert {
  id: string;
  prescription_id?: string;
  interacting_drug: string;
  interaction_severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  interaction_mechanism?: string;
  clinical_significance?: string;
  management_recommendation?: string;
  override_reason?: string;
  override_by?: string;
  alert_acknowledged: boolean;
  acknowledged_by?: string;
  acknowledged_at?: string;
  created_at: string;
}

export interface TherapeuticDrugMonitoring {
  id: string;
  prescription_id?: string;
  patient_id?: string;
  drug_name: string;
  target_level_min?: number;
  target_level_max?: number;
  measured_level?: number;
  measurement_date: string;
  sample_type?: 'peak' | 'trough' | 'random';
  dosage_adjustment_needed: boolean;
  new_dosage_recommendation?: string;
  clinical_interpretation?: string;
  ordered_by?: string;
  reviewed_by?: string;
  created_at: string;
}

export interface IVtoPOConversion {
  id: string;
  prescription_id?: string;
  current_iv_drug: string;
  current_iv_dose: string;
  recommended_po_drug: string;
  recommended_po_dose: string;
  conversion_criteria_met?: Record<string, any>;
  clinical_stability_score?: number;
  oral_intake_adequate?: boolean;
  infection_severity?: string;
  bioavailability_factor?: number;
  cost_savings_estimated?: number;
  recommendation_date?: string;
  approved_by?: string;
  implemented_date?: string;
  outcome_notes?: string;
  created_at: string;
}
