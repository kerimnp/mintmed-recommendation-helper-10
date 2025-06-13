
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

export const getAvailableProducts = (drugName: string) => {
  // Normalize the drug name for searching
  const normalizedDrugName = drugName.toLowerCase().trim();
  
  // Search through all drug categories for matches
  for (const [categoryName, products] of Object.entries(availableDrugs)) {
    if (categoryName.toLowerCase().includes(normalizedDrugName) || 
        normalizedDrugName.includes(categoryName.toLowerCase())) {
      return products;
    }
    
    // Also search within product names
    const matchingProducts = products.filter(product => 
      product.name.toLowerCase().includes(normalizedDrugName) ||
      normalizedDrugName.includes(product.name.toLowerCase())
    );
    
    if (matchingProducts.length > 0) {
      return matchingProducts;
    }
  }
  
  // If no direct matches, return empty array
  return [];
};
