interface RenalCalculationParams {
  age: number;
  weight: number;
  gender: string;
  creatinine: number;
}

export const calculateCrCl = (params: RenalCalculationParams): number => {
  const { age, weight, gender, creatinine } = params;
  const genderConstant = gender === "male" ? 1.23 : 1.04;
  
  return ((140 - age) * weight * genderConstant) / creatinine;
};

export const getRenalDoseAdjustment = (crCl: number, drug: string): string => {
  const adjustments = {
    "levofloxacin": [
      { crclMin: 50, doseRegimen: "500 mg IV/PO q24h" },
      { crclMin: 20, doseRegimen: "500 mg IV/PO q48h" },
      { crclMin: 0, doseRegimen: "250 mg IV/PO q48h" }
    ],
    "piperacillin-tazobactam": [
      { crclMin: 40, doseRegimen: "4.5 g IV q6h" },
      { crclMin: 20, doseRegimen: "3.375 g IV q6h" },
      { crclMin: 0, doseRegimen: "2.25 g IV q6h" }
    ]
  };

  const drugAdjustments = adjustments[drug as keyof typeof adjustments];
  if (!drugAdjustments) return "";

  const adjustment = drugAdjustments.find(adj => crCl >= adj.crclMin);
  return adjustment?.doseRegimen || "";
};