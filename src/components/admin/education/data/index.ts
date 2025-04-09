
import { Article } from "../types/articleTypes";
import { categories } from "./categories";
import { fundamentalsArticles } from "./fundamentalsArticles";
import { advancedArticles } from "./advancedArticles";
import { specializedArticles } from "./specializedArticles";
import { clinicalArticles } from "./clinicalArticles";
import { guidelinesArticles } from "./guidelinesArticles";
import { researchArticles } from "./researchArticles";
import { interactiveArticles } from "./interactiveArticles";

// Combine all articles into one array
export const articles: Article[] = [
  ...fundamentalsArticles,
  ...advancedArticles,
  ...specializedArticles,
  ...clinicalArticles,
  ...guidelinesArticles,
  ...researchArticles,
  ...interactiveArticles
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
