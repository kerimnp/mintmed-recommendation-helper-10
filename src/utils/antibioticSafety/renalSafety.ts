export interface RenalDoseAdjustment {
  drug: string;
  gfrThresholds: {
    threshold: number;
    adjustment: string;
  }[];
}

export const RENAL_DOSE_ADJUSTMENTS: RenalDoseAdjustment[] = [
  {
    drug: "levofloxacin",
    gfrThresholds: [
      { threshold: 50, adjustment: "500mg every 48h" },
      { threshold: 20, adjustment: "500mg every 72h" }
    ]
  },
  {
    drug: "piperacillin-tazobactam",
    gfrThresholds: [
      { threshold: 40, adjustment: "3.375g every 6h" },
      { threshold: 20, adjustment: "2.25g every 6h" }
    ]
  }
];

export const isContraindicatedInCKD = (drug: string, gfr: number): boolean => {
  const contraindicatedDrugs = ["nitrofurantoin", "tetracycline"];
  return gfr < 30 && contraindicatedDrugs.some(d => 
    drug.toLowerCase().includes(d.toLowerCase())
  );
};

export const getDoseAdjustment = (drug: string, gfr: number): string | null => {
  const drugAdjustment = RENAL_DOSE_ADJUSTMENTS.find(d => 
    drug.toLowerCase().includes(d.drug.toLowerCase())
  );

  if (!drugAdjustment) return null;

  const adjustment = drugAdjustment.gfrThresholds
    .sort((a, b) => b.threshold - a.threshold)
    .find(t => gfr <= t.threshold);

  return adjustment?.adjustment || null;
};