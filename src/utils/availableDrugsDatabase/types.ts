
export interface DrugProduct {
  name: string;
  manufacturer: string;
  forms: Array<{
    type: string;
    strength: string;
    packaging: string;
  }>;
}

export type DrugCategory = Record<string, DrugProduct[]>;
export type DrugDatabase = Record<string, DrugProduct[]>;
