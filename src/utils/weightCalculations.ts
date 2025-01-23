export const calculateIBW = (heightCm: number, gender: string): number => {
  const heightInches = heightCm / 2.54;
  const baseHeight = 60; // 5 feet in inches
  
  if (gender.toLowerCase() === "male") {
    return 50 + 2.3 * (heightInches - baseHeight);
  }
  return 45.5 + 2.3 * (heightInches - baseHeight);
};

export const calculateAdjustedWeight = (
  actualWeight: number,
  height: number,
  gender: string
): number => {
  const ibw = calculateIBW(height, gender);
  return ibw + 0.4 * (actualWeight - ibw);
};