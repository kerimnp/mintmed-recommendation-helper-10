
import { AntibioticDosing } from '../types';
import { tetracyclineDosing } from './tetracyclines';
import { penicillinDosing } from './penicillins';
import { cephalosporinDosing } from './cephalosporins';
import { fluoroquinoloneDosing } from './fluoroquinolones';
import { macrolideDosing } from './macrolides';
import { enhancedAntibiotics } from './enhancedAntibiotics';
import { aminoglycosideDosing } from './aminoglycosides';
import { carbapenemDosing } from './carbapenems';
import { glycopeptideDosing } from './glycopeptides';
import { lincosamideDosing } from './lincosamides';
import { oxazolidinoneDosing } from './oxazolidinones';
import { polypeptideDosing } from './polypeptides';
import { nitroimidazoleDosing } from './nitroimidazoles';
import { monobactamDosing } from './monobactams';
import { sulfonamideDosing } from './sulfonamides';

export const antibioticDatabase: AntibioticDosing[] = [
  ...tetracyclineDosing,
  ...penicillinDosing,
  ...cephalosporinDosing,
  ...fluoroquinoloneDosing,
  ...macrolideDosing,
  ...enhancedAntibiotics,
  ...aminoglycosideDosing,
  ...carbapenemDosing,
  ...glycopeptideDosing,
  ...lincosamideDosing,
  ...oxazolidinoneDosing,
  ...polypeptideDosing,
  ...nitroimidazoleDosing,
  ...monobactamDosing,
  ...sulfonamideDosing
];

export {
  tetracyclineDosing,
  penicillinDosing,
  cephalosporinDosing,
  fluoroquinoloneDosing,
  macrolideDosing,
  enhancedAntibiotics,
  aminoglycosideDosing,
  carbapenemDosing,
  glycopeptideDosing,
  lincosamideDosing,
  oxazolidinoneDosing,
  polypeptideDosing,
  nitroimidazoleDosing,
  monobactamDosing,
  sulfonamideDosing
};
