export interface RenalDoseAdjustment {
  drug: string;
  gfrThresholds: {
    threshold: number;
    adjustment: string;
  }[];
}

export interface RenalAdjustmentParams {
  drug: string;
  baseDose: string;
  gfr: number;
  weight: string;
  age: string;
}