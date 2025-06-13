export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      antibiotic_recommendations: {
        Row: {
          created_at: string
          doctor_id: string
          id: string
          input_data: Json
          is_accepted: boolean | null
          notes: string | null
          patient_id: string | null
          prescription_id: string | null
          recommendation_details: Json
          source: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          id?: string
          input_data: Json
          is_accepted?: boolean | null
          notes?: string | null
          patient_id?: string | null
          prescription_id?: string | null
          recommendation_details: Json
          source: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          id?: string
          input_data?: Json
          is_accepted?: boolean | null
          notes?: string | null
          patient_id?: string | null
          prescription_id?: string | null
          recommendation_details?: Json
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "antibiotic_recommendations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "antibiotic_recommendations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "antibiotic_recommendations_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_recommendations_doctor"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_recommendations_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_recommendations_prescription"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      antibiotic_statistics: {
        Row: {
          adverse_events_count: number | null
          antibiotic_name: string
          average_duration_days: number | null
          cost_total: number | null
          created_at: string | null
          department_id: string | null
          generic_name: string
          id: string
          indication: string | null
          month_year: string
          resistance_reports: number | null
          success_rate: number | null
          total_prescriptions: number | null
        }
        Insert: {
          adverse_events_count?: number | null
          antibiotic_name: string
          average_duration_days?: number | null
          cost_total?: number | null
          created_at?: string | null
          department_id?: string | null
          generic_name: string
          id?: string
          indication?: string | null
          month_year: string
          resistance_reports?: number | null
          success_rate?: number | null
          total_prescriptions?: number | null
        }
        Update: {
          adverse_events_count?: number | null
          antibiotic_name?: string
          average_duration_days?: number | null
          cost_total?: number | null
          created_at?: string | null
          department_id?: string | null
          generic_name?: string
          id?: string
          indication?: string | null
          month_year?: string
          resistance_reports?: number | null
          success_rate?: number | null
          total_prescriptions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "antibiotic_statistics_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_guidelines: {
        Row: {
          approved_by: string | null
          category: string
          content: Json
          created_at: string
          created_by: string | null
          effective_date: string
          expiry_date: string | null
          id: string
          status: string | null
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          approved_by?: string | null
          category: string
          content: Json
          created_at?: string
          created_by?: string | null
          effective_date: string
          expiry_date?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string
          version: string
        }
        Update: {
          approved_by?: string | null
          category?: string
          content?: Json
          created_at?: string
          created_by?: string | null
          effective_date?: string
          expiry_date?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "clinical_guidelines_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_guidelines_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_outcomes: {
        Row: {
          adverse_drug_reactions: Json | null
          assessment_date: string
          clinical_response: string
          cost_effectiveness_score: number | null
          created_at: string | null
          culture_clearance: boolean | null
          drug_level_monitoring: Json | null
          id: string
          laboratory_improvements: Json | null
          length_of_stay: number | null
          notes: string | null
          patient_id: string | null
          patient_satisfaction_score: number | null
          physician_satisfaction_score: number | null
          prescription_id: string | null
          readmission_30_days: boolean | null
          recorded_by: string | null
          symptom_resolution: Json | null
          updated_at: string | null
        }
        Insert: {
          adverse_drug_reactions?: Json | null
          assessment_date: string
          clinical_response: string
          cost_effectiveness_score?: number | null
          created_at?: string | null
          culture_clearance?: boolean | null
          drug_level_monitoring?: Json | null
          id?: string
          laboratory_improvements?: Json | null
          length_of_stay?: number | null
          notes?: string | null
          patient_id?: string | null
          patient_satisfaction_score?: number | null
          physician_satisfaction_score?: number | null
          prescription_id?: string | null
          readmission_30_days?: boolean | null
          recorded_by?: string | null
          symptom_resolution?: Json | null
          updated_at?: string | null
        }
        Update: {
          adverse_drug_reactions?: Json | null
          assessment_date?: string
          clinical_response?: string
          cost_effectiveness_score?: number | null
          created_at?: string | null
          culture_clearance?: boolean | null
          drug_level_monitoring?: Json | null
          id?: string
          laboratory_improvements?: Json | null
          length_of_stay?: number | null
          notes?: string | null
          patient_id?: string | null
          patient_satisfaction_score?: number | null
          physician_satisfaction_score?: number | null
          prescription_id?: string | null
          readmission_30_days?: boolean | null
          recorded_by?: string | null
          symptom_resolution?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clinical_outcomes_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_outcomes_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_outcomes_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          contact_info: Json | null
          created_at: string
          head_doctor_id: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["department_type"]
          updated_at: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          head_doctor_id?: string | null
          id?: string
          name: string
          type: Database["public"]["Enums"]["department_type"]
          updated_at?: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          head_doctor_id?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["department_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_departments_head_doctor"
            columns: ["head_doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      drug_formulary: {
        Row: {
          availability_status: string | null
          category: string
          contraindications: string[] | null
          cost_tier: number | null
          created_at: string
          dosing_info: Json
          drug_name: string
          generic_name: string | null
          id: string
          indications: string[] | null
          mechanism_of_action: string | null
          restriction_level: string | null
          safety_profile: Json | null
          updated_at: string
        }
        Insert: {
          availability_status?: string | null
          category: string
          contraindications?: string[] | null
          cost_tier?: number | null
          created_at?: string
          dosing_info: Json
          drug_name: string
          generic_name?: string | null
          id?: string
          indications?: string[] | null
          mechanism_of_action?: string | null
          restriction_level?: string | null
          safety_profile?: Json | null
          updated_at?: string
        }
        Update: {
          availability_status?: string | null
          category?: string
          contraindications?: string[] | null
          cost_tier?: number | null
          created_at?: string
          dosing_info?: Json
          drug_name?: string
          generic_name?: string | null
          id?: string
          indications?: string[] | null
          mechanism_of_action?: string | null
          restriction_level?: string | null
          safety_profile?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      drug_formulations: {
        Row: {
          availability_status: string | null
          brand_name: string
          cost_per_unit: number | null
          created_at: string | null
          dosage_form: string
          generic_name: string
          id: string
          insurance_tier: number | null
          manufacturer: string
          ndc_number: string | null
          package_size: string | null
          route: string
          strength: string
          updated_at: string | null
        }
        Insert: {
          availability_status?: string | null
          brand_name: string
          cost_per_unit?: number | null
          created_at?: string | null
          dosage_form: string
          generic_name: string
          id?: string
          insurance_tier?: number | null
          manufacturer: string
          ndc_number?: string | null
          package_size?: string | null
          route: string
          strength: string
          updated_at?: string | null
        }
        Update: {
          availability_status?: string | null
          brand_name?: string
          cost_per_unit?: number | null
          created_at?: string | null
          dosage_form?: string
          generic_name?: string
          id?: string
          insurance_tier?: number | null
          manufacturer?: string
          ndc_number?: string | null
          package_size?: string | null
          route?: string
          strength?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      drug_interaction_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_acknowledged: boolean | null
          clinical_significance: string | null
          created_at: string | null
          id: string
          interacting_drug: string
          interaction_mechanism: string | null
          interaction_severity: string
          management_recommendation: string | null
          override_by: string | null
          override_reason: string | null
          prescription_id: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_acknowledged?: boolean | null
          clinical_significance?: string | null
          created_at?: string | null
          id?: string
          interacting_drug: string
          interaction_mechanism?: string | null
          interaction_severity: string
          management_recommendation?: string | null
          override_by?: string | null
          override_reason?: string | null
          prescription_id?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_acknowledged?: boolean | null
          clinical_significance?: string | null
          created_at?: string | null
          id?: string
          interacting_drug?: string
          interaction_mechanism?: string | null
          interaction_severity?: string
          management_recommendation?: string | null
          override_by?: string | null
          override_reason?: string | null
          prescription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drug_interaction_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_interaction_alerts_override_by_fkey"
            columns: ["override_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_interaction_alerts_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      drug_interactions: {
        Row: {
          created_at: string
          description: string | null
          drug_a: string
          drug_b: string
          id: string
          interaction_type: string
          management_strategy: string | null
          severity: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          drug_a: string
          drug_b: string
          id?: string
          interaction_type: string
          management_strategy?: string | null
          severity?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          drug_a?: string
          drug_b?: string
          id?: string
          interaction_type?: string
          management_strategy?: string | null
          severity?: string | null
        }
        Relationships: []
      }
      iv_po_conversions: {
        Row: {
          approved_by: string | null
          bioavailability_factor: number | null
          clinical_stability_score: number | null
          conversion_criteria_met: Json | null
          cost_savings_estimated: number | null
          created_at: string | null
          current_iv_dose: string
          current_iv_drug: string
          id: string
          implemented_date: string | null
          infection_severity: string | null
          oral_intake_adequate: boolean | null
          outcome_notes: string | null
          prescription_id: string | null
          recommendation_date: string | null
          recommended_po_dose: string
          recommended_po_drug: string
        }
        Insert: {
          approved_by?: string | null
          bioavailability_factor?: number | null
          clinical_stability_score?: number | null
          conversion_criteria_met?: Json | null
          cost_savings_estimated?: number | null
          created_at?: string | null
          current_iv_dose: string
          current_iv_drug: string
          id?: string
          implemented_date?: string | null
          infection_severity?: string | null
          oral_intake_adequate?: boolean | null
          outcome_notes?: string | null
          prescription_id?: string | null
          recommendation_date?: string | null
          recommended_po_dose: string
          recommended_po_drug: string
        }
        Update: {
          approved_by?: string | null
          bioavailability_factor?: number | null
          clinical_stability_score?: number | null
          conversion_criteria_met?: Json | null
          cost_savings_estimated?: number | null
          created_at?: string | null
          current_iv_dose?: string
          current_iv_drug?: string
          id?: string
          implemented_date?: string | null
          infection_severity?: string | null
          oral_intake_adequate?: boolean | null
          outcome_notes?: string | null
          prescription_id?: string | null
          recommendation_date?: string | null
          recommended_po_dose?: string
          recommended_po_drug?: string
        }
        Relationships: [
          {
            foreignKeyName: "iv_po_conversions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iv_po_conversions_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          admission_date: string | null
          allergies: Json | null
          attending_physician_id: string | null
          blood_type: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          date_of_birth: string
          department_id: string | null
          discharge_date: string | null
          first_name: string
          gender: string | null
          id: string
          isolation_status: string | null
          known_conditions: Json | null
          last_name: string
          medical_record_number: string | null
          notes: string | null
          severity_score: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          admission_date?: string | null
          allergies?: Json | null
          attending_physician_id?: string | null
          blood_type?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          date_of_birth: string
          department_id?: string | null
          discharge_date?: string | null
          first_name: string
          gender?: string | null
          id?: string
          isolation_status?: string | null
          known_conditions?: Json | null
          last_name: string
          medical_record_number?: string | null
          notes?: string | null
          severity_score?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          admission_date?: string | null
          allergies?: Json | null
          attending_physician_id?: string | null
          blood_type?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          date_of_birth?: string
          department_id?: string | null
          discharge_date?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          isolation_status?: string | null
          known_conditions?: Json | null
          last_name?: string
          medical_record_number?: string | null
          notes?: string | null
          severity_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_attending_physician_id_fkey"
            columns: ["attending_physician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmaceutical_reports: {
        Row: {
          adverse_events_summary: Json | null
          company_name: string | null
          comparative_effectiveness: Json | null
          cost_analysis: Json | null
          generated_at: string | null
          generated_by: string | null
          geographic_distribution: Json | null
          id: string
          market_share_percentage: number | null
          report_period_end: string
          report_period_start: string
          report_type: string
          resistance_trends: Json | null
          revenue_generated: number | null
          status: string | null
          top_indications: Json | null
          total_prescriptions: number | null
        }
        Insert: {
          adverse_events_summary?: Json | null
          company_name?: string | null
          comparative_effectiveness?: Json | null
          cost_analysis?: Json | null
          generated_at?: string | null
          generated_by?: string | null
          geographic_distribution?: Json | null
          id?: string
          market_share_percentage?: number | null
          report_period_end: string
          report_period_start: string
          report_type: string
          resistance_trends?: Json | null
          revenue_generated?: number | null
          status?: string | null
          top_indications?: Json | null
          total_prescriptions?: number | null
        }
        Update: {
          adverse_events_summary?: Json | null
          company_name?: string | null
          comparative_effectiveness?: Json | null
          cost_analysis?: Json | null
          generated_at?: string | null
          generated_by?: string | null
          geographic_distribution?: Json | null
          id?: string
          market_share_percentage?: number | null
          report_period_end?: string
          report_period_start?: string
          report_type?: string
          resistance_trends?: Json | null
          revenue_generated?: number | null
          status?: string | null
          top_indications?: Json | null
          total_prescriptions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pharmaceutical_reports_generated_by_fkey"
            columns: ["generated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_analytics: {
        Row: {
          adverse_events: Json | null
          anonymized_at: string | null
          antibiotic_class: string | null
          cost_analysis: Json | null
          created_at: string | null
          department_type: string | null
          diagnosis_code: string | null
          duration_actual: number | null
          duration_prescribed: number | null
          geographic_region: string | null
          hospital_type: string | null
          id: string
          indication: string | null
          outcome: string | null
          patient_age_group: string | null
          patient_gender: string | null
          prescriber_specialty: string | null
          prescription_id: string | null
          resistance_detected: boolean | null
        }
        Insert: {
          adverse_events?: Json | null
          anonymized_at?: string | null
          antibiotic_class?: string | null
          cost_analysis?: Json | null
          created_at?: string | null
          department_type?: string | null
          diagnosis_code?: string | null
          duration_actual?: number | null
          duration_prescribed?: number | null
          geographic_region?: string | null
          hospital_type?: string | null
          id?: string
          indication?: string | null
          outcome?: string | null
          patient_age_group?: string | null
          patient_gender?: string | null
          prescriber_specialty?: string | null
          prescription_id?: string | null
          resistance_detected?: boolean | null
        }
        Update: {
          adverse_events?: Json | null
          anonymized_at?: string | null
          antibiotic_class?: string | null
          cost_analysis?: Json | null
          created_at?: string | null
          department_type?: string | null
          diagnosis_code?: string | null
          duration_actual?: number | null
          duration_prescribed?: number | null
          geographic_region?: string | null
          hospital_type?: string | null
          id?: string
          indication?: string | null
          outcome?: string | null
          patient_age_group?: string | null
          patient_gender?: string | null
          prescriber_specialty?: string | null
          prescription_id?: string | null
          resistance_detected?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "prescription_analytics_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          antibiotic_name: string
          approval_date: string | null
          approval_required: boolean | null
          approved_by: string | null
          created_at: string
          doctor_id: string
          dosage: string
          duration: string
          end_date: string | null
          frequency: string
          id: string
          indication: string | null
          notes: string | null
          patient_id: string
          pharmacist_review: Json | null
          prescriber_notes: string | null
          reason_for_prescription: string | null
          route: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          antibiotic_name: string
          approval_date?: string | null
          approval_required?: boolean | null
          approved_by?: string | null
          created_at?: string
          doctor_id: string
          dosage: string
          duration: string
          end_date?: string | null
          frequency: string
          id?: string
          indication?: string | null
          notes?: string | null
          patient_id: string
          pharmacist_review?: Json | null
          prescriber_notes?: string | null
          reason_for_prescription?: string | null
          route: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Update: {
          antibiotic_name?: string
          approval_date?: string | null
          approval_required?: boolean | null
          approved_by?: string | null
          created_at?: string
          doctor_id?: string
          dosage?: string
          duration?: string
          end_date?: string | null
          frequency?: string
          id?: string
          indication?: string | null
          notes?: string | null
          patient_id?: string
          pharmacist_review?: Json | null
          prescriber_notes?: string | null
          reason_for_prescription?: string | null
          route?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_prescriptions_doctor"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_prescriptions_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          certification_expiry: string | null
          created_at: string
          department_id: string | null
          email: string | null
          first_name: string | null
          hospital_affiliation: string | null
          id: string
          is_active: boolean | null
          last_name: string | null
          license_number: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          specialization: string | null
          updated_at: string
        }
        Insert: {
          certification_expiry?: string | null
          created_at?: string
          department_id?: string | null
          email?: string | null
          first_name?: string | null
          hospital_affiliation?: string | null
          id: string
          is_active?: boolean | null
          last_name?: string | null
          license_number?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          specialization?: string | null
          updated_at?: string
        }
        Update: {
          certification_expiry?: string | null
          created_at?: string
          department_id?: string | null
          email?: string | null
          first_name?: string | null
          hospital_affiliation?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          license_number?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          specialization?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_metrics: {
        Row: {
          calculated_at: string
          department_id: string | null
          id: string
          measurement_period: string | null
          metric_name: string
          metric_value: number | null
        }
        Insert: {
          calculated_at?: string
          department_id?: string | null
          id?: string
          measurement_period?: string | null
          metric_name: string
          metric_value?: number | null
        }
        Update: {
          calculated_at?: string
          department_id?: string | null
          id?: string
          measurement_period?: string | null
          metric_name?: string
          metric_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quality_metrics_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      resistance_patterns: {
        Row: {
          antibiotic: string
          created_at: string
          data_source: string | null
          department_id: string | null
          id: string
          pathogen: string
          region: string | null
          reporting_period: string | null
          resistance_percentage: number | null
          sample_size: number | null
        }
        Insert: {
          antibiotic: string
          created_at?: string
          data_source?: string | null
          department_id?: string | null
          id?: string
          pathogen: string
          region?: string | null
          reporting_period?: string | null
          resistance_percentage?: number | null
          sample_size?: number | null
        }
        Update: {
          antibiotic?: string
          created_at?: string
          data_source?: string | null
          department_id?: string | null
          id?: string
          pathogen?: string
          region?: string | null
          reporting_period?: string | null
          resistance_percentage?: number | null
          sample_size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resistance_patterns_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      therapeutic_drug_monitoring: {
        Row: {
          clinical_interpretation: string | null
          created_at: string | null
          dosage_adjustment_needed: boolean | null
          drug_name: string
          id: string
          measured_level: number | null
          measurement_date: string
          new_dosage_recommendation: string | null
          ordered_by: string | null
          patient_id: string | null
          prescription_id: string | null
          reviewed_by: string | null
          sample_type: string | null
          target_level_max: number | null
          target_level_min: number | null
        }
        Insert: {
          clinical_interpretation?: string | null
          created_at?: string | null
          dosage_adjustment_needed?: boolean | null
          drug_name: string
          id?: string
          measured_level?: number | null
          measurement_date: string
          new_dosage_recommendation?: string | null
          ordered_by?: string | null
          patient_id?: string | null
          prescription_id?: string | null
          reviewed_by?: string | null
          sample_type?: string | null
          target_level_max?: number | null
          target_level_min?: number | null
        }
        Update: {
          clinical_interpretation?: string | null
          created_at?: string | null
          dosage_adjustment_needed?: boolean | null
          drug_name?: string
          id?: string
          measured_level?: number | null
          measurement_date?: string
          new_dosage_recommendation?: string | null
          ordered_by?: string | null
          patient_id?: string | null
          prescription_id?: string | null
          reviewed_by?: string | null
          sample_type?: string | null
          target_level_max?: number | null
          target_level_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "therapeutic_drug_monitoring_ordered_by_fkey"
            columns: ["ordered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapeutic_drug_monitoring_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapeutic_drug_monitoring_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapeutic_drug_monitoring_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      treatment_outcomes: {
        Row: {
          adverse_events: string[] | null
          clinical_response: string | null
          culture_results: Json | null
          duration_days: number | null
          id: string
          mortality_related: boolean | null
          patient_id: string | null
          prescription_id: string | null
          readmission_30_days: boolean | null
          recorded_at: string
          recorded_by: string | null
          resistance_developed: boolean | null
        }
        Insert: {
          adverse_events?: string[] | null
          clinical_response?: string | null
          culture_results?: Json | null
          duration_days?: number | null
          id?: string
          mortality_related?: boolean | null
          patient_id?: string | null
          prescription_id?: string | null
          readmission_30_days?: boolean | null
          recorded_at?: string
          recorded_by?: string | null
          resistance_developed?: boolean | null
        }
        Update: {
          adverse_events?: string[] | null
          clinical_response?: string | null
          culture_results?: Json | null
          duration_days?: number | null
          id?: string
          mortality_related?: boolean | null
          patient_id?: string | null
          prescription_id?: string | null
          readmission_30_days?: boolean | null
          recorded_at?: string
          recorded_by?: string | null
          resistance_developed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_outcomes_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatment_outcomes_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatment_outcomes_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "doctor" | "admin" | "pharmacist"
      audit_action:
        | "create"
        | "update"
        | "delete"
        | "view"
        | "approve"
        | "reject"
        | "override"
      department_type:
        | "emergency"
        | "icu"
        | "internal_medicine"
        | "surgery"
        | "pediatrics"
        | "oncology"
        | "infectious_disease"
        | "pharmacy"
        | "laboratory"
      user_role:
        | "admin"
        | "doctor"
        | "nurse"
        | "pharmacist"
        | "researcher"
        | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["doctor", "admin", "pharmacist"],
      audit_action: [
        "create",
        "update",
        "delete",
        "view",
        "approve",
        "reject",
        "override",
      ],
      department_type: [
        "emergency",
        "icu",
        "internal_medicine",
        "surgery",
        "pediatrics",
        "oncology",
        "infectious_disease",
        "pharmacy",
        "laboratory",
      ],
      user_role: [
        "admin",
        "doctor",
        "nurse",
        "pharmacist",
        "researcher",
        "viewer",
      ],
    },
  },
} as const
