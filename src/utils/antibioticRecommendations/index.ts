
import { AntibioticDosing } from './types';
import { tetracyclineDosing } from './dosing/tetracyclines';
import { penicillinDosing } from './dosing/penicillins';

export * from './types';

export const antibioticDatabase: AntibioticDosing[] = [
  ...tetracyclineDosing,
  ...penicillinDosing
];
