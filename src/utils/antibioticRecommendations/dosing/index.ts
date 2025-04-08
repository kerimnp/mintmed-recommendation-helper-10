
import { AntibioticDosing } from '../types';
import { tetracyclineDosing } from './tetracyclines';
import { penicillinDosing } from './penicillins';
import { cephalosporinDosing } from './cephalosporins';
import { fluoroquinoloneDosing } from './fluoroquinolones';
import { macrolideDosing } from './macrolides';

export const antibioticDatabase: AntibioticDosing[] = [
  ...tetracyclineDosing,
  ...penicillinDosing,
  ...cephalosporinDosing,
  ...fluoroquinoloneDosing,
  ...macrolideDosing
];

export {
  tetracyclineDosing,
  penicillinDosing,
  cephalosporinDosing,
  fluoroquinoloneDosing,
  macrolideDosing
};
