
export interface ScoringMetrics {
  clinicalAccuracy: number;
  timeEfficiency: number;
  patientSafety: number;
  communication: number;
  adaptability: number;
  overallScore: number;
}

export interface ScoringEvent {
  timestamp: number;
  action: string;
  category: 'diagnosis' | 'treatment' | 'monitoring' | 'communication' | 'emergency';
  points: number;
  rationale: string;
  isOptimal: boolean;
  timePenalty?: number;
}

export class ScoringEngine {
  private events: ScoringEvent[] = [];
  private startTime: number;
  private totalPossiblePoints: number = 1000;
  private baseScore: number = 100;
  private weights = {
    clinicalAccuracy: 0.35,
    timeEfficiency: 0.25,
    patientSafety: 0.25,
    communication: 0.10,
    adaptability: 0.05
  };

  constructor() {
    this.startTime = Date.now();
  }

  recordAction(action: string, category: ScoringEvent['category'], impact: 'positive' | 'negative' | 'neutral', magnitude: number = 1) {
    const timestamp = Date.now() - this.startTime;
    const isOptimal = this.isOptimalAction(action, category, timestamp);
    const basePoints = this.calculateBasePoints(category, impact, magnitude);
    const timePenalty = this.calculateTimePenalty(category, timestamp);
    
    const event: ScoringEvent = {
      timestamp,
      action,
      category,
      points: Math.max(0, basePoints - timePenalty),
      rationale: this.generateRationale(action, category, isOptimal, timePenalty),
      isOptimal,
      timePenalty
    };

    this.events.push(event);
  }

  private isOptimalAction(action: string, category: ScoringEvent['category'], timestamp: number): boolean {
    // Define optimal action timing and sequences
    const optimalActions = {
      'start-antibiotics': { category: 'treatment', maxTime: 3600000 }, // 1 hour
      'obtain-cultures': { category: 'diagnosis', maxTime: 1800000 }, // 30 minutes
      'fluid-resuscitation': { category: 'treatment', maxTime: 900000 }, // 15 minutes
      'oxygen-therapy': { category: 'treatment', maxTime: 300000 }, // 5 minutes
      'vital-monitoring': { category: 'monitoring', maxTime: 600000 } // 10 minutes
    };

    const optimal = optimalActions[action as keyof typeof optimalActions];
    if (optimal && optimal.category === category) {
      return timestamp <= optimal.maxTime;
    }

    return true; // Default to optimal if not specifically defined
  }

  private calculateBasePoints(category: ScoringEvent['category'], impact: 'positive' | 'negative' | 'neutral', magnitude: number): number {
    const categoryPoints = {
      diagnosis: 25,
      treatment: 30,
      monitoring: 15,
      communication: 10,
      emergency: 40
    };

    const impactMultiplier = {
      positive: 1,
      neutral: 0.5,
      negative: -1
    };

    return categoryPoints[category] * impactMultiplier[impact] * magnitude;
  }

  private calculateTimePenalty(category: ScoringEvent['category'], timestamp: number): number {
    const criticalTimeWindows = {
      treatment: 900000, // 15 minutes for critical treatments
      emergency: 300000, // 5 minutes for emergency actions
      diagnosis: 1800000, // 30 minutes for diagnosis
      monitoring: 600000, // 10 minutes for monitoring
      communication: 300000 // 5 minutes for critical communication
    };

    const window = criticalTimeWindows[category];
    if (timestamp > window) {
      const overtimeMinutes = (timestamp - window) / 60000;
      return Math.min(20, overtimeMinutes * 2); // Max 20 point penalty
    }

    return 0;
  }

  private generateRationale(action: string, category: ScoringEvent['category'], isOptimal: boolean, timePenalty: number): string {
    const base = isOptimal ? 'Excellent clinical decision' : 'Suboptimal timing or approach';
    const timing = timePenalty > 0 ? ` - ${timePenalty.toFixed(1)} point time penalty applied` : '';
    const categoryContext = this.getCategoryContext(category);
    
    return `${base}. ${categoryContext}${timing}`;
  }

  private getCategoryContext(category: ScoringEvent['category']): string {
    switch (category) {
      case 'diagnosis': return 'Accurate diagnosis is critical for appropriate treatment selection.';
      case 'treatment': return 'Timely treatment intervention directly impacts patient outcomes.';
      case 'monitoring': return 'Continuous monitoring ensures early detection of changes.';
      case 'communication': return 'Clear communication prevents errors and ensures coordinated care.';
      case 'emergency': return 'Emergency interventions require immediate and precise action.';
      default: return 'Clinical decision impacts overall patient care quality.';
    }
  }

  calculateMetrics(): ScoringMetrics {
    const totalPoints = this.events.reduce((sum, event) => sum + event.points, 0);
    const totalTime = Date.now() - this.startTime;

    // Clinical Accuracy Score
    const clinicalActions = this.events.filter(e => ['diagnosis', 'treatment'].includes(e.category));
    const optimalActions = clinicalActions.filter(e => e.isOptimal).length;
    const clinicalAccuracy = clinicalActions.length > 0 ? (optimalActions / clinicalActions.length) * 100 : 100;

    // Time Efficiency Score
    const avgTimePenalty = this.events.reduce((sum, e) => sum + (e.timePenalty || 0), 0) / Math.max(1, this.events.length);
    const timeEfficiency = Math.max(0, 100 - avgTimePenalty * 5);

    // Patient Safety Score
    const safetyEvents = this.events.filter(e => e.category === 'emergency' || e.points < 0);
    const safetyScore = Math.max(0, 100 - safetyEvents.length * 15);

    // Communication Score
    const commEvents = this.events.filter(e => e.category === 'communication');
    const communication = commEvents.length > 0 ? 
      (commEvents.reduce((sum, e) => sum + e.points, 0) / commEvents.length) * 5 : 75;

    // Adaptability Score (based on response to dynamic events)
    const adaptabilityScore = this.calculateAdaptabilityScore();

    // Overall weighted score
    const overallScore = 
      clinicalAccuracy * this.weights.clinicalAccuracy +
      timeEfficiency * this.weights.timeEfficiency +
      safetyScore * this.weights.patientSafety +
      Math.max(0, Math.min(100, communication)) * this.weights.communication +
      adaptabilityScore * this.weights.adaptability;

    return {
      clinicalAccuracy: Math.round(clinicalAccuracy),
      timeEfficiency: Math.round(timeEfficiency),
      patientSafety: Math.round(safetyScore),
      communication: Math.round(Math.max(0, Math.min(100, communication))),
      adaptability: Math.round(adaptabilityScore),
      overallScore: Math.round(overallScore)
    };
  }

  private calculateAdaptabilityScore(): number {
    // Score based on how quickly user responds to changing conditions
    const responseEvents = this.events.filter(e => e.timestamp > 300000); // After 5 minutes
    if (responseEvents.length === 0) return 50;

    const avgResponseQuality = responseEvents.reduce((sum, e) => sum + (e.isOptimal ? 100 : 25), 0) / responseEvents.length;
    return Math.min(100, avgResponseQuality);
  }

  getDetailedReport(): string {
    const metrics = this.calculateMetrics();
    const totalTime = Math.round((Date.now() - this.startTime) / 1000);
    
    return `
Clinical Performance Report:
- Overall Score: ${metrics.overallScore}/100
- Clinical Accuracy: ${metrics.clinicalAccuracy}% (${this.events.filter(e => e.isOptimal).length}/${this.events.length} optimal decisions)
- Time Efficiency: ${metrics.timeEfficiency}% (completed in ${totalTime}s)
- Patient Safety: ${metrics.patientSafety}% (${this.events.filter(e => e.points < 0).length} safety concerns)
- Communication: ${metrics.communication}%
- Adaptability: ${metrics.adaptability}%

Key Actions:
${this.events.slice(-5).map(e => `- ${e.action}: ${e.points} points (${e.rationale})`).join('\n')}
    `;
  }

  reset() {
    this.events = [];
    this.startTime = Date.now();
  }
}
