
export interface PhysiologicalState {
  cardiovascular: {
    heartRate: number;
    systolicBP: number;
    diastolicBP: number;
    cardiacOutput: number;
    svr: number; // Systemic vascular resistance
  };
  respiratory: {
    respiratoryRate: number;
    oxygenSat: number;
    tidalVolume: number;
    peep: number;
  };
  metabolic: {
    temperature: number;
    lactate: number;
    ph: number;
    glucose: number;
  };
  neurological: {
    gcs: number;
    consciousness: 'alert' | 'confused' | 'lethargic' | 'unconscious';
    pupils: 'normal' | 'dilated' | 'pinpoint' | 'unequal';
  };
  renal: {
    creatinine: number;
    bun: number;
    urineOutput: number;
  };
  hematologic: {
    wbc: number;
    hemoglobin: number;
    platelets: number;
  };
}

export interface PhysiologicalTrend {
  parameter: keyof PhysiologicalState | string;
  direction: 'improving' | 'stable' | 'deteriorating';
  rate: number; // change per minute
  targetValue?: number;
}

export class PhysiologyEngine {
  private state: PhysiologicalState;
  private trends: PhysiologicalTrend[] = [];
  private baselineState: PhysiologicalState;
  private interventions: Map<string, number> = new Map();

  constructor(initialState: PhysiologicalState) {
    this.state = { ...initialState };
    this.baselineState = { ...initialState };
  }

  // Apply physiological changes over time
  updatePhysiology(deltaTimeSeconds: number): PhysiologicalState {
    // Apply ongoing trends
    this.trends.forEach(trend => {
      this.applyTrend(trend, deltaTimeSeconds);
    });

    // Apply intervention effects
    this.applyInterventionEffects();

    // Apply physiological coupling (how systems affect each other)
    this.applyPhysiologicalCoupling();

    // Ensure realistic bounds
    this.enforcePhysiologicalLimits();

    return { ...this.state };
  }

  private applyTrend(trend: PhysiologicalTrend, deltaTime: number) {
    const changeAmount = trend.rate * (deltaTime / 60); // convert to per-second rate
    
    // Handle nested parameter paths
    const pathParts = trend.parameter.split('.');
    if (pathParts.length === 2) {
      const [system, param] = pathParts;
      const currentValue = (this.state as any)[system][param];
      
      switch (trend.direction) {
        case 'improving':
          (this.state as any)[system][param] = Math.min(
            currentValue + changeAmount,
            trend.targetValue || this.baselineState[system as keyof PhysiologicalState][param as any]
          );
          break;
        case 'deteriorating':
          (this.state as any)[system][param] = currentValue - changeAmount;
          break;
      }
    }
  }

  private applyInterventionEffects() {
    // Oxygen therapy
    if (this.interventions.has('oxygen')) {
      const oxygenFlow = this.interventions.get('oxygen')!;
      this.state.respiratory.oxygenSat = Math.min(100, 
        this.state.respiratory.oxygenSat + (oxygenFlow * 0.1));
    }

    // Fluid resuscitation
    if (this.interventions.has('fluids')) {
      const fluidRate = this.interventions.get('fluids')!;
      this.state.cardiovascular.systolicBP += fluidRate * 0.05;
      this.state.cardiovascular.diastolicBP += fluidRate * 0.03;
      this.state.cardiovascular.heartRate = Math.max(60, 
        this.state.cardiovascular.heartRate - fluidRate * 0.02);
    }

    // Vasopressors
    if (this.interventions.has('vasopressors')) {
      const dose = this.interventions.get('vasopressors')!;
      this.state.cardiovascular.systolicBP += dose * 2;
      this.state.cardiovascular.diastolicBP += dose * 1.5;
      this.state.cardiovascular.svr += dose * 50;
    }

    // Antibiotics (affect infection markers over time)
    if (this.interventions.has('antibiotics')) {
      const timeOnAntibiotics = this.interventions.get('antibiotics')!;
      if (timeOnAntibiotics > 60) { // After 1 hour
        this.state.hematologic.wbc = Math.max(4000, 
          this.state.hematologic.wbc - (timeOnAntibiotics - 60) * 10);
        this.state.metabolic.lactate = Math.max(0.5, 
          this.state.metabolic.lactate - (timeOnAntibiotics - 60) * 0.01);
      }
    }
  }

  private applyPhysiologicalCoupling() {
    // Heart rate affects cardiac output
    this.state.cardiovascular.cardiacOutput = 
      (this.state.cardiovascular.heartRate * 70) / 1000; // Simplified stroke volume

    // Hypotension affects consciousness
    const meanBP = (this.state.cardiovascular.systolicBP + 2 * this.state.cardiovascular.diastolicBP) / 3;
    if (meanBP < 60) {
      this.state.neurological.gcs = Math.max(3, this.state.neurological.gcs - 1);
      if (this.state.neurological.gcs < 8) {
        this.state.neurological.consciousness = 'unconscious';
      } else if (this.state.neurological.gcs < 13) {
        this.state.neurological.consciousness = 'lethargic';
      }
    }

    // Hypoxemia affects heart rate and consciousness
    if (this.state.respiratory.oxygenSat < 90) {
      this.state.cardiovascular.heartRate += (90 - this.state.respiratory.oxygenSat) * 0.5;
      if (this.state.respiratory.oxygenSat < 80) {
        this.state.neurological.consciousness = 'confused';
      }
    }

    // Sepsis physiology
    if (this.state.hematologic.wbc > 15000 || this.state.metabolic.lactate > 2.5) {
      this.state.cardiovascular.heartRate += 5;
      this.state.metabolic.temperature += 0.1;
      this.state.cardiovascular.svr -= 20;
    }
  }

  private enforcePhysiologicalLimits() {
    // Cardiovascular limits
    this.state.cardiovascular.heartRate = Math.max(30, Math.min(220, this.state.cardiovascular.heartRate));
    this.state.cardiovascular.systolicBP = Math.max(40, Math.min(250, this.state.cardiovascular.systolicBP));
    this.state.cardiovascular.diastolicBP = Math.max(20, Math.min(180, this.state.cardiovascular.diastolicBP));

    // Respiratory limits
    this.state.respiratory.oxygenSat = Math.max(40, Math.min(100, this.state.respiratory.oxygenSat));
    this.state.respiratory.respiratoryRate = Math.max(6, Math.min(60, this.state.respiratory.respiratoryRate));

    // Temperature limits
    this.state.metabolic.temperature = Math.max(32, Math.min(45, this.state.metabolic.temperature));

    // Lab value limits
    this.state.metabolic.lactate = Math.max(0.3, Math.min(20, this.state.metabolic.lactate));
    this.state.hematologic.wbc = Math.max(1000, Math.min(50000, this.state.hematologic.wbc));
  }

  // Public methods for interventions
  addIntervention(type: string, value: number) {
    this.interventions.set(type, value);
  }

  removeIntervention(type: string) {
    this.interventions.delete(type);
  }

  addTrend(trend: PhysiologicalTrend) {
    // Remove existing trend for same parameter
    this.trends = this.trends.filter(t => t.parameter !== trend.parameter);
    this.trends.push(trend);
  }

  getState(): PhysiologicalState {
    return { ...this.state };
  }

  getHealthStatus(): 'stable' | 'declining' | 'critical' | 'improving' {
    const meanBP = (this.state.cardiovascular.systolicBP + 2 * this.state.cardiovascular.diastolicBP) / 3;
    
    if (meanBP < 50 || this.state.respiratory.oxygenSat < 70 || this.state.neurological.gcs < 8) {
      return 'critical';
    }
    
    if (meanBP < 65 || this.state.respiratory.oxygenSat < 88 || this.state.metabolic.lactate > 4) {
      return 'declining';
    }

    // Check for improvement trends
    const improvingTrends = this.trends.filter(t => t.direction === 'improving').length;
    const deterioratingTrends = this.trends.filter(t => t.direction === 'deteriorating').length;
    
    if (improvingTrends > deterioratingTrends) {
      return 'improving';
    }
    
    return 'stable';
  }
}
