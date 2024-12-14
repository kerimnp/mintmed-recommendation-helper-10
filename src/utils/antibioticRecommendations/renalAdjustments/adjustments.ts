import { RenalDoseAdjustment, RenalAdjustmentParams } from './types';

export const RENAL_DOSE_ADJUSTMENTS: RenalDoseAdjustment[] = [
  {
    drug: "levofloxacin",
    gfrThresholds: [
      { threshold: 50, adjustment: "500mg every 48h" },
      { threshold: 20, adjustment: "500mg every 72h" },
      { threshold: 10, adjustment: "250mg every 48h" }
    ]
  },
  {
    drug: "piperacillin-tazobactam",
    gfrThresholds: [
      { threshold: 40, adjustment: "3.375g every 6h" },
      { threshold: 20, adjustment: "2.25g every 6h" },
      { threshold: 10, adjustment: "2.25g every 8h" }
    ]
  },
  {
    drug: "vancomycin",
    gfrThresholds: [
      { threshold: 50, adjustment: "1g every 24h" },
      { threshold: 30, adjustment: "1g every 48h" },
      { threshold: 10, adjustment: "1g every 72h" }
    ]
  }
];

export const calculateRenalAdjustedDose = ({
  drug,
  baseDose,
  gfr,
  weight,
  age
}: RenalAdjustmentParams): string => {
  // Find drug-specific adjustments
  const drugAdjustment = RENAL_DOSE_ADJUSTMENTS.find(d => 
    drug.toLowerCase().includes(d.drug.toLowerCase())
  );

  if (!drugAdjustment) return baseDose;

  // Find appropriate threshold
  const adjustment = drugAdjustment.gfrThresholds
    .sort((a, b) => b.threshold - a.threshold)
    .find(t => gfr <= t.threshold);

  if (!adjustment) return baseDose;

  return adjustment.adjustment;
};

export const isContraindicatedInCKD = (drug: string, gfr: number): boolean => {
  if (gfr < 30) {
    const contraindicatedDrugs = [
      'nitrofurantoin',
      'metformin',
      'spironolactone'
    ];
    return contraindicatedDrugs.some(d => 
      drug.toLowerCase().includes(d.toLowerCase())
    );
  }
  return false;
};

export const requiresDoseAdjustmentInCKD = (drug: string): boolean => {
  const adjustableDrugs = [
    'levofloxacin',
    'piperacillin',
    'vancomycin',
    'gentamicin',
    'meropenem',
    'ertapenem'
  ];
  return adjustableDrugs.some(d => 
    drug.toLowerCase().includes(d.toLowerCase())
  );
};