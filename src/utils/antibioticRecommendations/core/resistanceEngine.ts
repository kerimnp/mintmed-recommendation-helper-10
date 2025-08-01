import { PatientData } from "../../types/patientTypes";
import { RegionalResistance, getResistanceThresholds } from "../../regionalResistance";

export interface ResistanceRecommendation {
  requiresBroadSpectrum: boolean;
  avoidDrugs: string[];
  preferredDrugs: string[];
  empiricCoverage: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export const analyzeResistancePatterns = (data: PatientData): ResistanceRecommendation => {
  const recommendation: ResistanceRecommendation = {
    requiresBroadSpectrum: false,
    avoidDrugs: [],
    preferredDrugs: [],
    empiricCoverage: [],
    riskLevel: 'low'
  };

  let riskScore = 0;
  
  // Regional resistance patterns
  const regionalData = getResistanceThresholds(data.region);
  
  // MRSA resistance
  if (data.resistances.mrsa || regionalData.MRSA_prevalence > 15) {
    riskScore += 3;
    recommendation.avoidDrugs.push(
      'Methicillin', 'Oxacillin', 'Nafcillin', 'Cephalexin', 'Cefazolin'
    );
    recommendation.preferredDrugs.push(
      'Vancomycin', 'Linezolid', 'Daptomycin', 'Ceftaroline', 'Tedizolid'
    );
    recommendation.empiricCoverage.push('Anti-MRSA therapy');
  }

  // ESBL resistance
  if (data.resistances.esbl || regionalData.ESBL_prevalence > 20) {
    riskScore += 4;
    recommendation.avoidDrugs.push(
      'Ampicillin', 'Amoxicillin-Clavulanate', 'Cephalexin', 'Ceftriaxone', 'Cefepime'
    );
    recommendation.preferredDrugs.push(
      'Meropenem', 'Imipenem', 'Ertapenem', 'Fosfomycin', 'Nitrofurantoin'
    );
    recommendation.empiricCoverage.push('Carbapenem therapy');
  }

  // CRE (Carbapenem-Resistant Enterobacteriaceae)
  if (data.resistances.cre) {
    riskScore += 5;
    recommendation.avoidDrugs.push(
      'Meropenem', 'Imipenem', 'Ertapenem', 'Most beta-lactams'
    );
    recommendation.preferredDrugs.push(
      'Colistin', 'Polymyxin B', 'Tigecycline', 'Ceftazidime-Avibactam'
    );
    recommendation.empiricCoverage.push('Last-resort antibiotics');
    recommendation.requiresBroadSpectrum = true;
  }

  // VRE (Vancomycin-Resistant Enterococcus)
  if (data.resistances.vre) {
    riskScore += 4;
    recommendation.avoidDrugs.push('Vancomycin', 'Teicoplanin');
    recommendation.preferredDrugs.push(
      'Linezolid', 'Daptomycin', 'Quinupristin-Dalfopristin'
    );
    recommendation.empiricCoverage.push('Anti-VRE therapy');
  }

  // Pseudomonas resistance
  if (data.resistances.pseudomonas || regionalData.Pseudomonas_prevalence > 10) {
    riskScore += 3;
    recommendation.avoidDrugs.push(
      'Ampicillin', 'Amoxicillin', 'Cephalexin', 'Ertapenem'
    );
    recommendation.preferredDrugs.push(
      'Piperacillin-Tazobactam', 'Cefepime', 'Meropenem', 'Ciprofloxacin', 'Tobramycin'
    );
    recommendation.empiricCoverage.push('Anti-pseudomonal coverage');
  }

  // Hospital-acquired infections increase resistance risk
  if (data.isHospitalAcquired) {
    riskScore += 2;
    recommendation.requiresBroadSpectrum = true;
    recommendation.empiricCoverage.push('Broad-spectrum hospital coverage');
  }

  // Recent antibiotic use increases resistance risk
  if (data.recentAntibiotics) {
    riskScore += 2;
    recommendation.empiricCoverage.push('Consider different antibiotic class');
  }

  // Duration affects resistance risk
  const duration = parseInt(data.duration) || 0;
  if (duration > 7) {
    riskScore += 1;
    recommendation.empiricCoverage.push('Consider resistance development');
  }

  // Immunosuppressed patients have higher resistance risk
  if (data.immunosuppressed) {
    riskScore += 2;
    recommendation.requiresBroadSpectrum = true;
  }

  // Determine risk level
  if (riskScore >= 10) {
    recommendation.riskLevel = 'critical';
    recommendation.requiresBroadSpectrum = true;
  } else if (riskScore >= 7) {
    recommendation.riskLevel = 'high';
    recommendation.requiresBroadSpectrum = true;
  } else if (riskScore >= 4) {
    recommendation.riskLevel = 'medium';
  } else {
    recommendation.riskLevel = 'low';
  }

  return recommendation;
};

export const getEmpiricalTherapyForResistance = (
  infectionSite: string,
  data: PatientData
): string[] => {
  const resistance = analyzeResistancePatterns(data);
  const therapyOptions: string[] = [];

  if (resistance.riskLevel === 'critical') {
    // Critical resistance - use last resort antibiotics
    therapyOptions.push('Colistin + Tigecycline');
    therapyOptions.push('Polymyxin B + Ceftazidime-Avibactam');
    therapyOptions.push('Meropenem-Vaborbactam');
  } else if (resistance.riskLevel === 'high') {
    // High resistance risk
    switch (infectionSite) {
      case 'respiratory':
        therapyOptions.push('Vancomycin + Piperacillin-Tazobactam');
        therapyOptions.push('Linezolid + Meropenem');
        break;
      case 'bloodstream':
        therapyOptions.push('Vancomycin + Meropenem');
        therapyOptions.push('Daptomycin + Cefepime');
        break;
      default:
        therapyOptions.push('Vancomycin + Cefepime');
        therapyOptions.push('Linezolid + Piperacillin-Tazobactam');
    }
  } else {
    // Standard empirical therapy
    switch (infectionSite) {
      case 'respiratory':
        therapyOptions.push('Amoxicillin-Clavulanate');
        therapyOptions.push('Azithromycin');
        break;
      case 'urinary':
        therapyOptions.push('Trimethoprim-Sulfamethoxazole');
        therapyOptions.push('Nitrofurantoin');
        break;
      case 'skin':
        therapyOptions.push('Cephalexin');
        therapyOptions.push('Clindamycin');
        break;
      default:
        therapyOptions.push('Amoxicillin');
        therapyOptions.push('Cephalexin');
    }
  }

  return therapyOptions;
};