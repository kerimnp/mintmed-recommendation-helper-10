export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_activity_logs: {
        Row: {
          action_type: string
          admin_user_id: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          target_id: string | null
          target_type: string | null
          user_agent: string | null
        }
        Insert: {
          action_type: string
          admin_user_id: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          admin_user_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliations: {
        Row: {
          credits_allocated: number | null
          doctor_id: string | null
          id: number
          invited_by: string | null
          joined_at: string | null
          org_id: number | null
          status: Database["public"]["Enums"]["invitation_status"]
        }
        Insert: {
          credits_allocated?: number | null
          doctor_id?: string | null
          id?: number
          invited_by?: string | null
          joined_at?: string | null
          org_id?: number | null
          status?: Database["public"]["Enums"]["invitation_status"]
        }
        Update: {
          credits_allocated?: number | null
          doctor_id?: string | null
          id?: number
          invited_by?: string | null
          joined_at?: string | null
          org_id?: number | null
          status?: Database["public"]["Enums"]["invitation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "affiliations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
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
      clinical_audit_events: {
        Row: {
          action_performed: string
          after_data: Json | null
          before_data: Json | null
          compliance_flags: Json | null
          created_at: string
          event_type: string
          id: string
          ip_address: unknown | null
          location_info: Json | null
          metadata: Json | null
          patient_id: string | null
          resource_id: string | null
          resource_type: string
          risk_score: number | null
          session_id: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action_performed: string
          after_data?: Json | null
          before_data?: Json | null
          compliance_flags?: Json | null
          created_at?: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          location_info?: Json | null
          metadata?: Json | null
          patient_id?: string | null
          resource_id?: string | null
          resource_type: string
          risk_score?: number | null
          session_id?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action_performed?: string
          after_data?: Json | null
          before_data?: Json | null
          compliance_flags?: Json | null
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          location_info?: Json | null
          metadata?: Json | null
          patient_id?: string | null
          resource_id?: string | null
          resource_type?: string
          risk_score?: number | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
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
          {
            foreignKeyName: "fk_outcomes_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_outcomes_prescription"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_outcomes_recorded_by"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_usage_history: {
        Row: {
          created_at: string | null
          credits_used: number
          doctor_id: string
          id: string
          operation_details: Json | null
          operation_type: string
          subscription_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits_used: number
          doctor_id: string
          id?: string
          operation_details?: Json | null
          operation_type: string
          subscription_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits_used?: number
          doctor_id?: string
          id?: string
          operation_details?: Json | null
          operation_type?: string
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_usage_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_patient_access: {
        Row: {
          access_granted_by: string | null
          access_reason: string | null
          access_type: string
          created_at: string
          doctor_id: string
          expires_at: string | null
          granted_at: string
          id: string
          is_active: boolean
          patient_id: string
          revoke_reason: string | null
          revoked_at: string | null
          revoked_by: string | null
          updated_at: string
        }
        Insert: {
          access_granted_by?: string | null
          access_reason?: string | null
          access_type?: string
          created_at?: string
          doctor_id: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          is_active?: boolean
          patient_id: string
          revoke_reason?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          updated_at?: string
        }
        Update: {
          access_granted_by?: string | null
          access_reason?: string | null
          access_type?: string
          created_at?: string
          doctor_id?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          is_active?: boolean
          patient_id?: string
          revoke_reason?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_patient_access_access_granted_by_fkey"
            columns: ["access_granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_patient_access_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_patient_access_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_patient_access_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_seat_allocations: {
        Row: {
          allocated_at: string | null
          allocated_by: string | null
          allocated_credits: number | null
          created_at: string | null
          credits_used: number | null
          doctor_id: string
          id: string
          is_active: boolean | null
          subscription_id: string
          updated_at: string | null
        }
        Insert: {
          allocated_at?: string | null
          allocated_by?: string | null
          allocated_credits?: number | null
          created_at?: string | null
          credits_used?: number | null
          doctor_id: string
          id?: string
          is_active?: boolean | null
          subscription_id: string
          updated_at?: string | null
        }
        Update: {
          allocated_at?: string | null
          allocated_by?: string | null
          allocated_credits?: number | null
          created_at?: string | null
          credits_used?: number | null
          doctor_id?: string
          id?: string
          is_active?: boolean | null
          subscription_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctor_seat_allocations_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "fk_alerts_acknowledged_by"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_alerts_override_by"
            columns: ["override_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_alerts_prescription"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      ehr_audit_logs: {
        Row: {
          compliance_flags: Json | null
          created_at: string
          data_accessed: Json | null
          ehr_system_id: string | null
          error_details: string | null
          id: string
          ip_address: unknown | null
          operation_type: string
          patient_id: string | null
          resource_id: string | null
          resource_type: string
          risk_score: number | null
          session_id: string | null
          success: boolean
          user_agent: string | null
          user_id: string
        }
        Insert: {
          compliance_flags?: Json | null
          created_at?: string
          data_accessed?: Json | null
          ehr_system_id?: string | null
          error_details?: string | null
          id?: string
          ip_address?: unknown | null
          operation_type: string
          patient_id?: string | null
          resource_id?: string | null
          resource_type: string
          risk_score?: number | null
          session_id?: string | null
          success?: boolean
          user_agent?: string | null
          user_id: string
        }
        Update: {
          compliance_flags?: Json | null
          created_at?: string
          data_accessed?: Json | null
          ehr_system_id?: string | null
          error_details?: string | null
          id?: string
          ip_address?: unknown | null
          operation_type?: string
          patient_id?: string | null
          resource_id?: string | null
          resource_type?: string
          risk_score?: number | null
          session_id?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ehr_audit_logs_ehr_system_id_fkey"
            columns: ["ehr_system_id"]
            isOneToOne: false
            referencedRelation: "ehr_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ehr_audit_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      ehr_credentials: {
        Row: {
          created_at: string
          created_by: string | null
          credential_type: string
          ehr_system_id: string
          encrypted_credentials: string
          encryption_key_id: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          credential_type: string
          ehr_system_id: string
          encrypted_credentials: string
          encryption_key_id: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          credential_type?: string
          ehr_system_id?: string
          encrypted_credentials?: string
          encryption_key_id?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ehr_credentials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ehr_credentials_ehr_system_id_fkey"
            columns: ["ehr_system_id"]
            isOneToOne: false
            referencedRelation: "ehr_systems"
            referencedColumns: ["id"]
          },
        ]
      }
      ehr_integration_logs: {
        Row: {
          created_at: string
          duration_ms: number | null
          ehr_system_id: string | null
          error_message: string | null
          id: string
          metadata: Json | null
          operation_type: string
          resource_count: number | null
          resource_type: string | null
          status: string
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          ehr_system_id?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          operation_type: string
          resource_count?: number | null
          resource_type?: string | null
          status: string
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          ehr_system_id?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          operation_type?: string
          resource_count?: number | null
          resource_type?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ehr_integration_logs_ehr_system_id_fkey"
            columns: ["ehr_system_id"]
            isOneToOne: false
            referencedRelation: "ehr_systems"
            referencedColumns: ["id"]
          },
        ]
      }
      ehr_sync_jobs: {
        Row: {
          created_at: string
          created_by: string | null
          ehr_system_id: string
          end_time: string | null
          error_details: Json | null
          failed_records: number | null
          id: string
          job_type: string
          priority: number | null
          processed_records: number | null
          start_time: string | null
          status: string
          sync_filters: Json | null
          total_records: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          ehr_system_id: string
          end_time?: string | null
          error_details?: Json | null
          failed_records?: number | null
          id?: string
          job_type: string
          priority?: number | null
          processed_records?: number | null
          start_time?: string | null
          status?: string
          sync_filters?: Json | null
          total_records?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          ehr_system_id?: string
          end_time?: string | null
          error_details?: Json | null
          failed_records?: number | null
          id?: string
          job_type?: string
          priority?: number | null
          processed_records?: number | null
          start_time?: string | null
          status?: string
          sync_filters?: Json | null
          total_records?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ehr_sync_jobs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ehr_sync_jobs_ehr_system_id_fkey"
            columns: ["ehr_system_id"]
            isOneToOne: false
            referencedRelation: "ehr_systems"
            referencedColumns: ["id"]
          },
        ]
      }
      ehr_systems: {
        Row: {
          api_version: string | null
          authentication_type: string | null
          base_url: string | null
          certificate_expiry: string | null
          compliance_level: string | null
          configuration: Json | null
          connection_status: string | null
          created_at: string
          encryption_method: string | null
          id: string
          is_active: boolean | null
          last_security_audit: string | null
          last_sync: string | null
          name: string
          rate_limit_config: Json | null
          security_config: Json | null
          system_type: string
          updated_at: string
        }
        Insert: {
          api_version?: string | null
          authentication_type?: string | null
          base_url?: string | null
          certificate_expiry?: string | null
          compliance_level?: string | null
          configuration?: Json | null
          connection_status?: string | null
          created_at?: string
          encryption_method?: string | null
          id?: string
          is_active?: boolean | null
          last_security_audit?: string | null
          last_sync?: string | null
          name: string
          rate_limit_config?: Json | null
          security_config?: Json | null
          system_type: string
          updated_at?: string
        }
        Update: {
          api_version?: string | null
          authentication_type?: string | null
          base_url?: string | null
          certificate_expiry?: string | null
          compliance_level?: string | null
          configuration?: Json | null
          connection_status?: string | null
          created_at?: string
          encryption_method?: string | null
          id?: string
          is_active?: boolean | null
          last_security_audit?: string | null
          last_sync?: string | null
          name?: string
          rate_limit_config?: Json | null
          security_config?: Json | null
          system_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      encounters: {
        Row: {
          created_at: string
          doctor_id: string
          encounter_date: string
          findings: string
          id: string
          notes: string | null
          patient_id: string
          reason_for_visit: string
          recommendations: string | null
          specialty: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          encounter_date?: string
          findings: string
          id?: string
          notes?: string | null
          patient_id: string
          reason_for_visit: string
          recommendations?: string | null
          specialty: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          encounter_date?: string
          findings?: string
          id?: string
          notes?: string | null
          patient_id?: string
          reason_for_visit?: string
          recommendations?: string | null
          specialty?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "encounters_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_encounters_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      encryption_audit_logs: {
        Row: {
          compliance_level: string
          created_at: string
          data_type: string
          encryption_method: string
          encryption_status: string
          id: string
          key_rotation_date: string | null
          updated_at: string
        }
        Insert: {
          compliance_level?: string
          created_at?: string
          data_type: string
          encryption_method: string
          encryption_status?: string
          id?: string
          key_rotation_date?: string | null
          updated_at?: string
        }
        Update: {
          compliance_level?: string
          created_at?: string
          data_type?: string
          encryption_method?: string
          encryption_status?: string
          id?: string
          key_rotation_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      fhir_resources: {
        Row: {
          created_at: string
          data: Json
          id: string
          last_updated: string
          patient_id: string | null
          resource_id: string
          resource_type: string
          updated_at: string
          version_id: string | null
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          last_updated?: string
          patient_id?: string | null
          resource_id: string
          resource_type: string
          updated_at?: string
          version_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          last_updated?: string
          patient_id?: string | null
          resource_id?: string
          resource_type?: string
          updated_at?: string
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fhir_resources_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      fhir_templates: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          mapping_rules: Json | null
          resource_type: string
          template_name: string
          template_schema: Json
          updated_at: string
          validation_rules: Json | null
          version: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          mapping_rules?: Json | null
          resource_type: string
          template_name: string
          template_schema: Json
          updated_at?: string
          validation_rules?: Json | null
          version?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          mapping_rules?: Json | null
          resource_type?: string
          template_name?: string
          template_schema?: Json
          updated_at?: string
          validation_rules?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "fhir_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hipaa_compliance_checks: {
        Row: {
          check_name: string
          check_type: string
          compliance_score: number | null
          created_at: string
          details: Json | null
          id: string
          last_checked: string
          next_check_due: string | null
          remediation_required: boolean | null
          remediation_steps: Json | null
          responsible_party: string | null
          status: string
          updated_at: string
        }
        Insert: {
          check_name: string
          check_type: string
          compliance_score?: number | null
          created_at?: string
          details?: Json | null
          id?: string
          last_checked?: string
          next_check_due?: string | null
          remediation_required?: boolean | null
          remediation_steps?: Json | null
          responsible_party?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          check_name?: string
          check_type?: string
          compliance_score?: number | null
          created_at?: string
          details?: Json | null
          id?: string
          last_checked?: string
          next_check_due?: string | null
          remediation_required?: boolean | null
          remediation_steps?: Json | null
          responsible_party?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          billing_address: string | null
          created_by: string | null
          id: number
          name: string
        }
        Insert: {
          billing_address?: string | null
          created_by?: string | null
          id?: number
          name: string
        }
        Update: {
          billing_address?: string | null
          created_by?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_data_audit_logs: {
        Row: {
          access_method: string | null
          action_type: string
          created_at: string
          data_accessed: Json | null
          error_details: string | null
          id: string
          ip_address: unknown | null
          patient_id: string
          resource_id: string | null
          resource_type: string
          session_id: string | null
          success: boolean
          user_agent: string | null
          user_id: string
        }
        Insert: {
          access_method?: string | null
          action_type: string
          created_at?: string
          data_accessed?: Json | null
          error_details?: string | null
          id?: string
          ip_address?: unknown | null
          patient_id: string
          resource_id?: string | null
          resource_type: string
          session_id?: string | null
          success?: boolean
          user_agent?: string | null
          user_id: string
        }
        Update: {
          access_method?: string | null
          action_type?: string
          created_at?: string
          data_accessed?: Json | null
          error_details?: string | null
          id?: string
          ip_address?: unknown | null
          patient_id?: string
          resource_id?: string | null
          resource_type?: string
          session_id?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_data_audit_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_data_audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_ehr_mappings: {
        Row: {
          created_at: string
          data_quality_score: number | null
          ehr_system_id: string
          external_mrn: string | null
          external_patient_id: string
          id: string
          last_sync: string | null
          last_validation: string | null
          patient_id: string
          sync_status: string | null
          updated_at: string
          validation_errors: Json | null
          validation_status: string | null
        }
        Insert: {
          created_at?: string
          data_quality_score?: number | null
          ehr_system_id: string
          external_mrn?: string | null
          external_patient_id: string
          id?: string
          last_sync?: string | null
          last_validation?: string | null
          patient_id: string
          sync_status?: string | null
          updated_at?: string
          validation_errors?: Json | null
          validation_status?: string | null
        }
        Update: {
          created_at?: string
          data_quality_score?: number | null
          ehr_system_id?: string
          external_mrn?: string | null
          external_patient_id?: string
          id?: string
          last_sync?: string | null
          last_validation?: string | null
          patient_id?: string
          sync_status?: string | null
          updated_at?: string
          validation_errors?: Json | null
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_ehr_mappings_ehr_system_id_fkey"
            columns: ["ehr_system_id"]
            isOneToOne: false
            referencedRelation: "ehr_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_ehr_mappings_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_sharing_requests: {
        Row: {
          access_type: string
          created_at: string
          expires_at: string | null
          id: string
          patient_id: string
          request_reason: string
          requested_at: string
          requesting_doctor_id: string
          responded_at: string | null
          responded_by: string | null
          response_notes: string | null
          status: string
          target_doctor_id: string
          updated_at: string
        }
        Insert: {
          access_type?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          patient_id: string
          request_reason: string
          requested_at?: string
          requesting_doctor_id: string
          responded_at?: string | null
          responded_by?: string | null
          response_notes?: string | null
          status?: string
          target_doctor_id: string
          updated_at?: string
        }
        Update: {
          access_type?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          patient_id?: string
          request_reason?: string
          requested_at?: string
          requesting_doctor_id?: string
          responded_at?: string | null
          responded_by?: string | null
          response_notes?: string | null
          status?: string
          target_doctor_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_sharing_requests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_sharing_requests_requesting_doctor_id_fkey"
            columns: ["requesting_doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_sharing_requests_responded_by_fkey"
            columns: ["responded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_sharing_requests_target_doctor_id_fkey"
            columns: ["target_doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
            foreignKeyName: "fk_patients_attending_physician"
            columns: ["attending_physician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_attending_physician_id_fkey"
            columns: ["attending_physician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string | null
          credits_included: number | null
          description: string | null
          doctor_seats: number | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          plan_type: string
          price_monthly: number | null
          price_yearly: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credits_included?: number | null
          description?: string | null
          doctor_seats?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          plan_type: string
          price_monthly?: number | null
          price_yearly?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credits_included?: number | null
          description?: string | null
          doctor_seats?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          plan_type?: string
          price_monthly?: number | null
          price_yearly?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
            foreignKeyName: "fk_prescriptions_approved_by"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
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
          account_created_by: string
          account_type: Database["public"]["Enums"]["account_type"]
          created_at: string
          created_by_admin: string | null
          email: string | null
          first_name: string | null
          free_credits_left: number
          hospital_affiliation: string | null
          id: string
          is_active: boolean | null
          is_first_login: boolean
          last_name: string | null
          license_number: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          specialization: string | null
          temp_password: string | null
          updated_at: string
        }
        Insert: {
          account_created_by?: string
          account_type?: Database["public"]["Enums"]["account_type"]
          created_at?: string
          created_by_admin?: string | null
          email?: string | null
          first_name?: string | null
          free_credits_left?: number
          hospital_affiliation?: string | null
          id: string
          is_active?: boolean | null
          is_first_login?: boolean
          last_name?: string | null
          license_number?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          specialization?: string | null
          temp_password?: string | null
          updated_at?: string
        }
        Update: {
          account_created_by?: string
          account_type?: Database["public"]["Enums"]["account_type"]
          created_at?: string
          created_by_admin?: string | null
          email?: string | null
          first_name?: string | null
          free_credits_left?: number
          hospital_affiliation?: string | null
          id?: string
          is_active?: boolean | null
          is_first_login?: boolean
          last_name?: string | null
          license_number?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          specialization?: string | null
          temp_password?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      security_incidents: {
        Row: {
          affected_patients: Json | null
          affected_systems: Json | null
          assigned_to: string | null
          compliance_impact: Json | null
          created_at: string
          description: string
          detected_at: string
          id: string
          incident_type: string
          reported_by: string | null
          resolution_notes: string | null
          resolved_at: string | null
          severity_level: string
          status: string
          updated_at: string
        }
        Insert: {
          affected_patients?: Json | null
          affected_systems?: Json | null
          assigned_to?: string | null
          compliance_impact?: Json | null
          created_at?: string
          description: string
          detected_at?: string
          id?: string
          incident_type: string
          reported_by?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          severity_level: string
          status?: string
          updated_at?: string
        }
        Update: {
          affected_patients?: Json | null
          affected_systems?: Json | null
          assigned_to?: string | null
          compliance_impact?: Json | null
          created_at?: string
          description?: string
          detected_at?: string
          id?: string
          incident_type?: string
          reported_by?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          severity_level?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          billing_cycle: string
          cancelled_at: string | null
          created_at: string | null
          credits_remaining: number | null
          current_period_end: string
          current_period_start: string
          doctor_seats: number
          id: string
          metadata: Json | null
          org_id: number | null
          plan_id: string
          renewal_date: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          billing_cycle?: string
          cancelled_at?: string | null
          created_at?: string | null
          credits_remaining?: number | null
          current_period_end: string
          current_period_start?: string
          doctor_seats?: number
          id?: string
          metadata?: Json | null
          org_id?: number | null
          plan_id: string
          renewal_date?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          billing_cycle?: string
          cancelled_at?: string | null
          created_at?: string | null
          credits_remaining?: number | null
          current_period_end?: string
          current_period_start?: string
          doctor_seats?: number
          id?: string
          metadata?: Json | null
          org_id?: number | null
          plan_id?: string
          renewal_date?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      system_admin_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          description: string | null
          id: string
          metadata: Json | null
          payment_method: string | null
          processed_at: string | null
          status: string
          stripe_charge_id: string | null
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          transaction_type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          transaction_type?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          transaction_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_doctor_patient_access: {
        Args: { doctor_id_param: string; patient_id_param: string }
        Returns: boolean
      }
      create_admin_doctor_account: {
        Args: {
          p_email: string
          p_first_name: string
          p_last_name: string
          p_temp_password: string
          p_hospital_id: number
          p_created_by: string
        }
        Returns: string
      }
      current_user_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_hipaa_compliance_status: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      is_super_admin_authorized: {
        Args: { user_email: string }
        Returns: boolean
      }
      log_clinical_audit_event: {
        Args: {
          p_event_type: string
          p_user_id: string
          p_patient_id?: string
          p_resource_type?: string
          p_resource_id?: string
          p_action_performed?: string
          p_before_data?: Json
          p_after_data?: Json
          p_metadata?: Json
        }
        Returns: string
      }
      log_ehr_operation: {
        Args: {
          p_ehr_system_id: string
          p_user_id: string
          p_operation_type: string
          p_resource_type: string
          p_resource_id?: string
          p_patient_id?: string
          p_data_accessed?: Json
          p_success?: boolean
          p_error_details?: string
        }
        Returns: string
      }
      log_patient_data_access: {
        Args: {
          user_id_param: string
          patient_id_param: string
          action_type_param: string
          resource_type_param: string
          resource_id_param?: string
          data_accessed_param?: Json
          ip_address_param?: unknown
          user_agent_param?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      account_type:
        | "individual"
        | "hospital_admin"
        | "hospital_doctor"
        | "system_admin"
      app_role: "doctor" | "admin" | "pharmacist"
      audit_action:
        | "create"
        | "update"
        | "delete"
        | "view"
        | "approve"
        | "reject"
        | "override"
      currency: "BAM" | "EUR" | "USD"
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
      invitation_status: "pending" | "active" | "rejected"
      user_role:
        | "admin"
        | "doctor"
        | "nurse"
        | "pharmacist"
        | "researcher"
        | "viewer"
        | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: [
        "individual",
        "hospital_admin",
        "hospital_doctor",
        "system_admin",
      ],
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
      currency: ["BAM", "EUR", "USD"],
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
      invitation_status: ["pending", "active", "rejected"],
      user_role: [
        "admin",
        "doctor",
        "nurse",
        "pharmacist",
        "researcher",
        "viewer",
        "super_admin",
      ],
    },
  },
} as const
