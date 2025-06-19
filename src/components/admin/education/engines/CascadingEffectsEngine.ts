
import { PhysiologicalState } from './PhysiologyEngine';

export interface CascadingRule {
  id: string;
  trigger: {
    parameter: string;
    condition: 'greater' | 'less' | 'equal';
    value: number;
    duration?: number; // How long condition must persist
  };
  effects: CascadingEffect[];
  delay: number; // Delay before effects kick in
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
}

export interface CascadingEffect {
  target: string;
  change: number;
  rate: number; // Change per second
  maxChange?: number;
  description: string;
}

export class CascadingEffectsEngine {
  private activeRules: Map<string, { startTime: number; effectsApplied: boolean }> = new Map();
  private cascadingRules: CascadingRule[] = [];

  constructor() {
    this.initializeCascadingRules();
  }

  private initializeCascadingRules() {
    this.cascadingRules = [
      {
        id: 'hypotension-cascade',
        trigger: {
          parameter: 'cardiovascular.systolicBP',
          condition: 'less',
          value: 70,
          duration: 30 // Must persist for 30 seconds
        },
        effects: [
          {
            target: 'neurological.gcs',
            change: -2,
            rate: 0.1,
            maxChange: -5,
            description: 'Decreased cerebral perfusion affecting consciousness'
          },
          {
            target: 'renal.urineOutput',
            change: -15,
            rate: 1,
            maxChange: -40,
            description: 'Reduced renal perfusion'
          },
          {
            target: 'metabolic.lactate',
            change: 1.5,
            rate: 0.05,
            maxChange: 6,
            description: 'Tissue hypoperfusion leading to anaerobic metabolism'
          }
        ],
        delay: 60, // Effects start after 60 seconds
        severity: 'severe'
      },
      {
        id: 'hypoxia-cascade',
        trigger: {
          parameter: 'respiratory.oxygenSat',
          condition: 'less',
          value: 85,
          duration: 45
        },
        effects: [
          {
            target: 'cardiovascular.heartRate',
            change: 25,
            rate: 0.5,
            maxChange: 50,
            description: 'Compensatory tachycardia due to hypoxemia'
          },
          {
            target: 'neurological.consciousness',
            change: -1,
            rate: 0.02,
            description: 'Hypoxic encephalopathy'
          },
          {
            target: 'cardiovascular.cardiacOutput',
            change: -1,
            rate: 0.1,
            maxChange: -3,
            description: 'Myocardial hypoxia reducing cardiac function'
          }
        ],
        delay: 120,
        severity: 'critical'
      },
      {
        id: 'septic-shock-cascade',
        trigger: {
          parameter: 'metabolic.lactate',
          condition: 'greater',
          value: 4,
          duration: 60
        },
        effects: [
          {
            target: 'cardiovascular.svr',
            change: -200,
            rate: 5,
            maxChange: -800,
            description: 'Vasodilation due to septic shock'
          },
          {
            target: 'hematologic.platelets',
            change: -50000,
            rate: 1000,
            maxChange: -200000,
            description: 'Consumption coagulopathy'
          },
          {
            target: 'renal.creatinine',
            change: 1.5,
            rate: 0.02,
            maxChange: 4,
            description: 'Acute kidney injury'
          }
        ],
        delay: 180,
        severity: 'critical'
      }
    ];
  }

  updateCascades(currentState: PhysiologicalState, simulationTime: number): CascadingEffect[] {
    const activeEffects: CascadingEffect[] = [];

    this.cascadingRules.forEach(rule => {
      const paramPath = rule.trigger.parameter.split('.');
      const currentValue = paramPath.reduce((obj: any, key) => obj[key], currentState);
      
      const conditionMet = this.evaluateCondition(currentValue, rule.trigger);
      
      if (conditionMet) {
        if (!this.activeRules.has(rule.id)) {
          // Start tracking this rule
          this.activeRules.set(rule.id, {
            startTime: simulationTime,
            effectsApplied: false
          });
        }

        const ruleData = this.activeRules.get(rule.id)!;
        const timeActive = simulationTime - ruleData.startTime;

        // Check if trigger duration has been met and delay has passed
        if (timeActive >= (rule.trigger.duration || 0) + rule.delay && !ruleData.effectsApplied) {
          // Apply cascading effects
          activeEffects.push(...rule.effects);
          ruleData.effectsApplied = true;
        }
      } else {
        // Condition no longer met, reset
        this.activeRules.delete(rule.id);
      }
    });

    return activeEffects;
  }

  private evaluateCondition(value: number, trigger: CascadingRule['trigger']): boolean {
    switch (trigger.condition) {
      case 'greater':
        return value > trigger.value;
      case 'less':
        return value < trigger.value;
      case 'equal':
        return Math.abs(value - trigger.value) < 0.1;
      default:
        return false;
    }
  }

  getActiveCascades(): string[] {
    return Array.from(this.activeRules.keys());
  }

  reset() {
    this.activeRules.clear();
  }
}
