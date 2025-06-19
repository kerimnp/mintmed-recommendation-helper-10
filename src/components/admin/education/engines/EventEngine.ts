
export interface DynamicEvent {
  id: string;
  type: 'clinical' | 'environmental' | 'equipment' | 'medication' | 'lab-result';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  triggerConditions: EventTrigger[];
  effects: EventEffect[];
  timeWindow?: number; // seconds after trigger
  isRepeatable: boolean;
  probability: number; // 0-1
}

export interface EventTrigger {
  type: 'time' | 'vital-change' | 'intervention' | 'no-action' | 'vital-threshold';
  condition: any;
}

export interface EventEffect {
  type: 'vital-change' | 'trend-change' | 'equipment-failure' | 'new-symptom' | 'lab-change';
  target: string;
  value: number | string;
  duration?: number;
}

export class EventEngine {
  private events: DynamicEvent[] = [];
  private triggeredEvents: Set<string> = new Set();
  private simulationTime: number = 0;
  private lastActionTime: number = 0;
  private eventCallbacks: ((event: DynamicEvent) => void)[] = [];

  constructor() {
    this.initializeEvents();
  }

  private initializeEvents() {
    this.events = [
      {
        id: 'cardiac-arrest',
        type: 'clinical',
        title: 'Cardiac Arrest',
        description: 'Patient has gone into cardiac arrest - no pulse detected!',
        severity: 'critical',
        triggerConditions: [
          { type: 'vital-threshold', condition: { parameter: 'cardiovascular.systolicBP', operator: '<', value: 40 } }
        ],
        effects: [
          { type: 'vital-change', target: 'cardiovascular.heartRate', value: 0 },
          { type: 'vital-change', target: 'cardiovascular.systolicBP', value: 0 },
          { type: 'vital-change', target: 'respiratory.oxygenSat', value: 60 }
        ],
        isRepeatable: false,
        probability: 1.0
      },
      {
        id: 'equipment-failure-ventilator',
        type: 'equipment',
        title: 'Ventilator Malfunction',
        description: 'The mechanical ventilator has stopped working properly!',
        severity: 'high',
        triggerConditions: [
          { type: 'time', condition: { minTime: 300, maxTime: 900 } }
        ],
        effects: [
          { type: 'trend-change', target: 'respiratory.oxygenSat', value: -2, duration: 180 }
        ],
        isRepeatable: false,
        probability: 0.3
      },
      {
        id: 'septic-shock-progression',
        type: 'clinical',
        title: 'Septic Shock Progression',
        description: 'Patient showing signs of worsening septic shock',
        severity: 'high',
        triggerConditions: [
          { type: 'no-action', condition: { timeThreshold: 120 } },
          { type: 'vital-threshold', condition: { parameter: 'metabolic.lactate', operator: '>', value: 4 } }
        ],
        effects: [
          { type: 'trend-change', target: 'cardiovascular.systolicBP', value: -5, duration: 300 },
          { type: 'trend-change', target: 'cardiovascular.heartRate', value: 10, duration: 300 },
          { type: 'trend-change', target: 'metabolic.temperature', value: 1, duration: 300 }
        ],
        isRepeatable: true,
        probability: 0.8
      },
      {
        id: 'new-lab-results',
        type: 'lab-result',
        title: 'Critical Lab Results',
        description: 'New laboratory results show concerning values',
        severity: 'medium',
        triggerConditions: [
          { type: 'time', condition: { minTime: 180, maxTime: 240 } }
        ],
        effects: [
          { type: 'lab-change', target: 'cultures', value: 'MRSA isolated from blood cultures' }
        ],
        isRepeatable: false,
        probability: 0.7
      },
      {
        id: 'family-distraction',
        type: 'environmental',
        title: 'Family Emergency',
        description: 'Patient\'s family member collapses in the room, creating a distraction',
        severity: 'medium',
        triggerConditions: [
          { type: 'time', condition: { minTime: 400, maxTime: 600 } }
        ],
        effects: [],
        timeWindow: 60,
        isRepeatable: false,
        probability: 0.2
      },
      {
        id: 'medication-reaction',
        type: 'medication',
        title: 'Allergic Reaction',
        description: 'Patient developing signs of allergic reaction to medication',
        severity: 'high',
        triggerConditions: [
          { type: 'intervention', condition: { intervention: 'antibiotics', timeAfter: 300 } }
        ],
        effects: [
          { type: 'vital-change', target: 'cardiovascular.heartRate', value: 30 },
          { type: 'vital-change', target: 'cardiovascular.systolicBP', value: -20 },
          { type: 'new-symptom', target: 'rash', value: 'Generalized erythematous rash appearing' }
        ],
        isRepeatable: false,
        probability: 0.15
      }
    ];
  }

  updateEvents(simulationTime: number, physiologyState: any, interventions: Map<string, number>) {
    this.simulationTime = simulationTime;
    
    this.events.forEach(event => {
      if (this.shouldTriggerEvent(event, physiologyState, interventions)) {
        this.triggerEvent(event);
      }
    });
  }

  private shouldTriggerEvent(event: DynamicEvent, physiologyState: any, interventions: Map<string, number>): boolean {
    // Skip if already triggered and not repeatable
    if (this.triggeredEvents.has(event.id) && !event.isRepeatable) {
      return false;
    }

    // Check probability
    if (Math.random() > event.probability) {
      return false;
    }

    // Check all trigger conditions
    return event.triggerConditions.every(trigger => this.evaluateTrigger(trigger, physiologyState, interventions));
  }

  private evaluateTrigger(trigger: EventTrigger, physiologyState: any, interventions: Map<string, number>): boolean {
    switch (trigger.type) {
      case 'time':
        return this.simulationTime >= trigger.condition.minTime && 
               this.simulationTime <= (trigger.condition.maxTime || Infinity);
      
      case 'vital-threshold':
        const paramPath = trigger.condition.parameter.split('.');
        const currentValue = paramPath.reduce((obj, key) => obj[key], physiologyState);
        
        switch (trigger.condition.operator) {
          case '<': return currentValue < trigger.condition.value;
          case '>': return currentValue > trigger.condition.value;
          case '<=': return currentValue <= trigger.condition.value;
          case '>=': return currentValue >= trigger.condition.value;
          case '==': return currentValue === trigger.condition.value;
          default: return false;
        }
      
      case 'no-action':
        return (this.simulationTime - this.lastActionTime) > trigger.condition.timeThreshold;
      
      case 'intervention':
        return interventions.has(trigger.condition.intervention) &&
               interventions.get(trigger.condition.intervention)! >= trigger.condition.timeAfter;
      
      default:
        return false;
    }
  }

  private triggerEvent(event: DynamicEvent) {
    this.triggeredEvents.add(event.id);
    this.eventCallbacks.forEach(callback => callback(event));
  }

  onEvent(callback: (event: DynamicEvent) => void) {
    this.eventCallbacks.push(callback);
  }

  recordAction() {
    this.lastActionTime = this.simulationTime;
  }

  reset() {
    this.triggeredEvents.clear();
    this.simulationTime = 0;
    this.lastActionTime = 0;
  }
}
