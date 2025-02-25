
import { DrugDatabase } from './types';
import { tetracyclines } from './tetracyclines';
import { penicillins } from './penicillins';

export * from './types';

export const availableDrugs: DrugDatabase = {
  ...tetracyclines,
  ...penicillins
};
