
import { DrugDatabase } from './types';
import { tetracyclines } from './tetracyclines';
import { penicillins } from './penicillins';
import { cephalosporins } from './cephalosporins';
import { macrolides } from './macrolides';
import { fluoroquinolones } from './fluoroquinolones';
import { aminoglycosides } from './aminoglycosides';
import { carbapenems } from './carbapenems';
import { glycopeptides } from './glycopeptides';
import { lincosamides } from './lincosamides';
import { oxazolidinones } from './oxazolidinones';
import { polypeptides } from './polypeptides';
import { nitroimidazoles } from './nitroimidazoles';
import { monobactams } from './monobactams';
import { sulfonamides } from './sulfonamides';

export * from './types';

export const availableDrugs: DrugDatabase = {
  ...tetracyclines,
  ...penicillins,
  ...cephalosporins,
  ...fluoroquinolones,
  ...macrolides,
  ...aminoglycosides,
  ...carbapenems,
  ...glycopeptides,
  ...lincosamides,
  ...oxazolidinones,
  ...polypeptides,
  ...nitroimidazoles,
  ...monobactams,
  ...sulfonamides
};
