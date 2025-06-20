
import { AntibioticDosing } from '../types';
import { tetracyclineDosing } from './tetracyclines';
import { penicillinDosing } from './penicillins';
import { cephalosporinDosing } from './cephalosporins';
import { fluoroquinoloneDosing } from './fluoroquinolones';
import { macrolideDosing } from './macrolides';
import { enhancedAntibiotics } from './enhancedAntibiotics';

export const antibioticDatabase: AntibioticDosing[] = [
  ...tetracyclineDosing,
  ...penicillinDosing,
  ...cephalosporinDosing,
  ...fluoroquinoloneDosing,
  ...macrolideDosing,
  ...enhancedAntibiotics
];

export {
  tetracyclineDosing,
  penicillinDosing,
  cephalosporinDosing,
  fluoroquinoloneDosing,
  macrolideDosing,
  enhancedAntibiotics
};
