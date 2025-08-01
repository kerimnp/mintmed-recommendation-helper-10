import { PatientData } from "../../types/patientTypes";

export interface AllergyAlternatives {
  contraindicated: string[];
  alternatives: string[];
  crossReactivity: string[];
  safeDrugs: string[];
}

export const getAllergyMatrix = (data: PatientData): Record<string, AllergyAlternatives> => {
  const matrix: Record<string, AllergyAlternatives> = {};

  // Penicillin allergy matrix
  if (data.allergies.penicillin) {
    matrix.penicillin = {
      contraindicated: [
        'Amoxicillin', 'Ampicillin', 'Penicillin G', 'Penicillin V',
        'Piperacillin', 'Piperacillin-Tazobactam', 'Ticarcillin', 
        'Oxacillin', 'Nafcillin', 'Methicillin'
      ],
      crossReactivity: [
        'Cephalexin', 'Cefazolin', 'Ceftriaxone', 'Cefepime',
        'Cephalosporins (first generation)', 'Carbapenems (low risk)'
      ],
      alternatives: [
        'Azithromycin', 'Clarithromycin', 'Doxycycline', 'Tetracycline',
        'Ciprofloxacin', 'Levofloxacin', 'Clindamycin', 'Vancomycin'
      ],
      safeDrugs: [
        'Aztreonam', 'Metronidazole', 'Trimethoprim-Sulfamethoxazole',
        'Linezolid', 'Quinolones', 'Macrolides'
      ]
    };
  }

  // Cephalosporin allergy matrix
  if (data.allergies.cephalosporin) {
    matrix.cephalosporin = {
      contraindicated: [
        'Cephalexin', 'Cefazolin', 'Ceftriaxone', 'Cefepime',
        'Cefuroxime', 'Ceftaroline', 'Cefpodoxime', 'Cefdinir'
      ],
      crossReactivity: data.allergies.penicillin ? ['All beta-lactams'] : ['Penicillins (variable)'],
      alternatives: [
        'Azithromycin', 'Ciprofloxacin', 'Doxycycline', 'Clindamycin',
        'Vancomycin', 'Linezolid'
      ],
      safeDrugs: [
        'Aztreonam', 'Quinolones', 'Macrolides', 'Tetracyclines',
        'Aminoglycosides', 'Glycopeptides'
      ]
    };
  }

  // Sulfa allergy matrix
  if (data.allergies.sulfa) {
    matrix.sulfa = {
      contraindicated: [
        'Trimethoprim-Sulfamethoxazole', 'Sulfadiazine', 'Sulfisoxazole'
      ],
      crossReactivity: [
        'Furosemide', 'Hydrochlorothiazide', 'Celecoxib'
      ],
      alternatives: [
        'Amoxicillin', 'Ciprofloxacin', 'Doxycycline', 'Azithromycin',
        'Clindamycin', 'Nitrofurantoin'
      ],
      safeDrugs: [
        'Beta-lactams', 'Quinolones', 'Macrolides', 'Tetracyclines',
        'Clindamycin', 'Metronidazole'
      ]
    };
  }

  // Macrolide allergy matrix
  if (data.allergies.macrolide) {
    matrix.macrolide = {
      contraindicated: [
        'Azithromycin', 'Clarithromycin', 'Erythromycin', 'Fidaxomicin'
      ],
      crossReactivity: [
        'All macrolides', 'Lincomycin derivatives (clindamycin - caution)'
      ],
      alternatives: [
        'Amoxicillin', 'Doxycycline', 'Ciprofloxacin', 'Cephalexin',
        'Trimethoprim-Sulfamethoxazole'
      ],
      safeDrugs: [
        'Beta-lactams', 'Tetracyclines', 'Quinolones', 'Sulfonamides',
        'Metronidazole'
      ]
    };
  }

  // Fluoroquinolone allergy matrix
  if (data.allergies.fluoroquinolone) {
    matrix.fluoroquinolone = {
      contraindicated: [
        'Ciprofloxacin', 'Levofloxacin', 'Moxifloxacin', 'Ofloxacin',
        'Norfloxacin', 'Gemifloxacin'
      ],
      crossReactivity: [
        'All fluoroquinolones'
      ],
      alternatives: [
        'Amoxicillin', 'Azithromycin', 'Doxycycline', 'Trimethoprim-Sulfamethoxazole',
        'Cephalexin', 'Clindamycin'
      ],
      safeDrugs: [
        'Beta-lactams', 'Macrolides', 'Tetracyclines', 'Sulfonamides',
        'Aminoglycosides', 'Glycopeptides'
      ]
    };
  }

  return matrix;
};

export const findSafeAlternatives = (
  drugName: string, 
  data: PatientData
): string[] => {
  const allergyMatrix = getAllergyMatrix(data);
  const safeAlternatives: string[] = [];

  // Collect all safe drugs from all applicable allergy matrices
  Object.values(allergyMatrix).forEach(matrix => {
    if (!matrix.contraindicated.includes(drugName)) {
      safeAlternatives.push(...matrix.safeDrugs);
    }
  });

  // Remove duplicates and filter out contraindicated drugs
  const uniqueAlternatives = [...new Set(safeAlternatives)];
  
  // Final safety check - ensure no contraindicated drugs
  return uniqueAlternatives.filter(drug => {
    return !Object.values(allergyMatrix).some(matrix => 
      matrix.contraindicated.includes(drug)
    );
  });
};

export const hasAllergyCrossReactivity = (
  drug1: string, 
  drug2: string, 
  data: PatientData
): boolean => {
  const allergyMatrix = getAllergyMatrix(data);
  
  return Object.values(allergyMatrix).some(matrix => {
    return (matrix.contraindicated.includes(drug1) && matrix.crossReactivity.includes(drug2)) ||
           (matrix.contraindicated.includes(drug2) && matrix.crossReactivity.includes(drug1));
  });
};