
import { DrugDatabase } from './types';
import { tetracyclines } from './tetracyclines';
import { penicillins } from './penicillins';
import { cephalosporins } from './cephalosporins';
import { fluoroquinolones } from './fluoroquinolones';

export * from './types';

export const availableDrugs: DrugDatabase = {
  ...tetracyclines,
  ...penicillins,
  ...cephalosporins,
  ...fluoroquinolones
};
