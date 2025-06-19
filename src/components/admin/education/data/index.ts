
import { Article } from "../types/articleTypes";
import { categories } from "./categories";
import { fundamentalsArticles } from "./fundamentalsArticles";
import { advancedArticles } from "./advancedArticles";
import { specializedArticles } from "./specializedArticles";
import { clinicalArticles } from "./clinicalArticles";
import { guidelinesArticles } from "./guidelinesArticles";
import { researchArticles } from "./researchArticles";
import { interactiveArticles } from "./interactiveArticles";

// New expanded collections
import { antibioticMechanismsArticles } from "./antibioticMechanismsArticles";
import { clinicalCasesArticles } from "./clinicalCasesArticles";
import { resistanceArticles } from "./resistanceArticles";
import { practiceCasesArticles } from "./practiceCasesArticles";
import { pediatricArticles } from "./pediatricArticles";
import { pharmacologyArticles } from "./pharmacologyArticles";

// Combine all articles into one comprehensive array
export const articles: Article[] = [
  ...fundamentalsArticles,
  ...advancedArticles,
  ...specializedArticles,
  ...clinicalArticles,
  ...guidelinesArticles,
  ...researchArticles,
  ...interactiveArticles,
  // New expanded content
  ...antibioticMechanismsArticles,
  ...clinicalCasesArticles,
  ...resistanceArticles,
  ...practiceCasesArticles,
  ...pediatricArticles,
  ...pharmacologyArticles
];

export { categories };

// Re-export all article collections for direct access
export { fundamentalsArticles };
export { advancedArticles };
export { specializedArticles };
export { clinicalArticles };
export { guidelinesArticles };
export { researchArticles };
export { interactiveArticles };

// Export new collections
export { antibioticMechanismsArticles };
export { clinicalCasesArticles };
export { resistanceArticles };
export { practiceCasesArticles };
export { pediatricArticles };
export { pharmacologyArticles };
