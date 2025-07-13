import { supabase } from "@/integrations/supabase/client";

export interface ClinicalAuditEvent {
  eventType: string;
  userId: string;
  patientId?: string;
  resourceType: string;
  resourceId?: string;
  actionPerformed: string;
  beforeData?: any;
  afterData?: any;
  metadata?: any;
}

export interface SecurityIncident {
  incidentType: string;
  severityLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedSystems?: string[];
  affectedPatients?: string[];
  reportedBy?: string;
}

export interface HIPAAComplianceCheck {
  checkType: string;
  checkName: string;
  status: 'compliant' | 'non_compliant' | 'pending' | 'review_required';
  complianceScore?: number;
  details?: any;
  nextCheckDue?: Date;
  responsibleParty?: string;
  remediationRequired?: boolean;
  remediationSteps?: string[];
}

export class AdvancedAuditLogger {
  
  /**
   * Log clinical audit events for hospital-grade compliance
   */
  static async logClinicalEvent(event: ClinicalAuditEvent): Promise<string | null> {
    try {
      const { data, error } = await supabase.rpc('log_clinical_audit_event', {
        p_event_type: event.eventType,
        p_user_id: event.userId,
        p_patient_id: event.patientId || null,
        p_resource_type: event.resourceType,
        p_resource_id: event.resourceId || null,
        p_action_performed: event.actionPerformed,
        p_before_data: event.beforeData || null,
        p_after_data: event.afterData || null,
        p_metadata: event.metadata || {}
      });

      if (error) {
        console.error('Failed to log clinical audit event:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in logClinicalEvent:', error);
      return null;
    }
  }

  /**
   * Report security incidents
   */
  static async reportSecurityIncident(incident: SecurityIncident): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('security_incidents')
        .insert({
          incident_type: incident.incidentType,
          severity_level: incident.severityLevel,
          description: incident.description,
          affected_systems: incident.affectedSystems || [],
          affected_patients: incident.affectedPatients || [],
          reported_by: incident.reportedBy || null,
          status: 'open',
          compliance_impact: {
            hipaa_impact: incident.severityLevel === 'critical' || incident.severityLevel === 'high',
            requires_breach_notification: incident.severityLevel === 'critical'
          }
        });

      if (error) {
        console.error('Failed to report security incident:', error);
        return false;
      }

      // Auto-escalate critical incidents
      if (incident.severityLevel === 'critical') {
        await this.escalateCriticalIncident(incident);
      }

      return true;
    } catch (error) {
      console.error('Error in reportSecurityIncident:', error);
      return false;
    }
  }

  /**
   * Log HIPAA compliance checks
   */
  static async logHIPAAComplianceCheck(check: HIPAAComplianceCheck): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('hipaa_compliance_checks')
        .insert({
          check_type: check.checkType,
          check_name: check.checkName,
          status: check.status,
          compliance_score: check.complianceScore || null,
          details: check.details || {},
          next_check_due: check.nextCheckDue?.toISOString() || null,
          responsible_party: check.responsibleParty || null,
          remediation_required: check.remediationRequired || false,
          remediation_steps: check.remediationSteps || []
        });

      if (error) {
        console.error('Failed to log HIPAA compliance check:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in logHIPAAComplianceCheck:', error);
      return false;
    }
  }

  /**
   * Get HIPAA compliance status
   */
  static async getHIPAAComplianceStatus(): Promise<any> {
    try {
      const { data, error } = await supabase.rpc('get_hipaa_compliance_status');
      
      if (error) {
        console.error('Failed to get HIPAA compliance status:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getHIPAAComplianceStatus:', error);
      return null;
    }
  }

  /**
   * Audit data encryption status
   */
  static async auditDataEncryption(dataType: string, encryptionMethod: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('encryption_audit_logs')
        .insert({
          data_type: dataType,
          encryption_method: encryptionMethod,
          encryption_status: 'encrypted',
          compliance_level: 'HIPAA'
        });

      if (error) {
        console.error('Failed to audit data encryption:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in auditDataEncryption:', error);
      return false;
    }
  }

  /**
   * Get security incidents by severity
   */
  static async getSecurityIncidents(severityLevel?: string): Promise<any[]> {
    try {
      let query = supabase
        .from('security_incidents')
        .select('*')
        .order('created_at', { ascending: false });

      if (severityLevel) {
        query = query.eq('severity_level', severityLevel);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Failed to get security incidents:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getSecurityIncidents:', error);
      return [];
    }
  }

  /**
   * Escalate critical security incidents
   */
  private static async escalateCriticalIncident(incident: SecurityIncident): Promise<void> {
    try {
      // Auto-assign to security team
      await supabase
        .from('security_incidents')
        .update({
          assigned_to: 'security-team@hospital.com', // This would be dynamic in real implementation
          compliance_impact: {
            ...incident,
            escalated: true,
            escalation_time: new Date().toISOString(),
            breach_notification_required: true
          }
        })
        .eq('incident_type', incident.incidentType);

      // Log the escalation as an audit event
      await this.logClinicalEvent({
        eventType: 'security_incident_escalation',
        userId: 'system',
        resourceType: 'security_incident',
        actionPerformed: 'auto_escalate_critical',
        metadata: {
          incident_type: incident.incidentType,
          severity: incident.severityLevel,
          escalation_reason: 'critical_severity_auto_escalation'
        }
      });

    } catch (error) {
      console.error('Failed to escalate critical incident:', error);
    }
  }

  /**
   * Get audit trail for a specific patient
   */
  static async getPatientAuditTrail(patientId: string, startDate?: Date, endDate?: Date): Promise<any[]> {
    try {
      let query = supabase
        .from('clinical_audit_events')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }

      if (endDate) {
        query = query.lte('created_at', endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Failed to get patient audit trail:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPatientAuditTrail:', error);
      return [];
    }
  }

  /**
   * Generate compliance report
   */
  static async generateComplianceReport(): Promise<any> {
    try {
      const [hipaaStatus, securityIncidents, encryptionAudits] = await Promise.all([
        this.getHIPAAComplianceStatus(),
        this.getSecurityIncidents(),
        supabase.from('encryption_audit_logs').select('*').order('created_at', { ascending: false }).limit(100)
      ]);

      return {
        report_generated: new Date().toISOString(),
        hipaa_compliance: hipaaStatus,
        security_overview: {
          total_incidents: securityIncidents.length,
          critical_incidents: securityIncidents.filter(i => i.severity_level === 'critical').length,
          open_incidents: securityIncidents.filter(i => i.status === 'open').length
        },
        encryption_status: {
          total_audits: encryptionAudits.data?.length || 0,
          encrypted_systems: encryptionAudits.data?.filter(e => e.encryption_status === 'encrypted').length || 0
        },
        recommendations: this.generateSecurityRecommendations(securityIncidents, hipaaStatus)
      };
    } catch (error) {
      console.error('Error generating compliance report:', error);
      return null;
    }
  }

  /**
   * Generate security recommendations based on current status
   */
  private static generateSecurityRecommendations(incidents: any[], hipaaStatus: any): string[] {
    const recommendations: string[] = [];

    if (incidents.some(i => i.severity_level === 'critical' && i.status === 'open')) {
      recommendations.push('Immediate attention required: Critical security incidents are open');
    }

    if (hipaaStatus?.compliance_percentage < 90) {
      recommendations.push('HIPAA compliance below 90% - immediate remediation required');
    }

    if (incidents.filter(i => i.status === 'open').length > 5) {
      recommendations.push('High number of open security incidents - consider increasing security team capacity');
    }

    recommendations.push('Regular security training for all staff members');
    recommendations.push('Quarterly penetration testing and vulnerability assessments');
    recommendations.push('Monthly backup and disaster recovery testing');

    return recommendations;
  }
}