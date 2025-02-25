
import { AntibioticDosing } from './types';
import { tetracyclineDosing } from './dosing/tetracyclines';
import { penicillinDosing } from './dosing/penicillins';
import { cephalosporinDosing } from './dosing/cephalosporins';
import { fluoroquinoloneDosing } from './dosing/fluoroquinolones';

export * from './types';

export const antibioticDatabase: AntibioticDosing[] = [
  ...tetracyclineDosing,
  ...penicillinDosing,
  ...cephalosporinDosing,
  ...fluoroquinoloneDosing
];
