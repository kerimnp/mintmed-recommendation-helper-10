export interface WeightCalculationParams {
  heightCm: number;
  actualWeight: number;
  gender: string;
}

export const calculateIBW = ({ heightCm, gender }: WeightCalculationParams): number => {
  const heightInches = heightCm / 2.54;
  const heightOver60Inches = heightInches - 60;
  
  if (gender === "male") {
    return 50 + (2.3 * heightOver60Inches);
  }
  return 45.5 + (2.3 * heightOver60Inches);
};

export const calculateAdjustedWeight = (params: WeightCalculationParams): number => {
  const ibw = calculateIBW(params);
  if (params.actualWeight <= ibw * 1.2) {
    return params.actualWeight;
  }
  return ibw + (0.4 * (params.actualWeight - ibw));
};