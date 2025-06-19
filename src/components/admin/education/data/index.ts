
import { fundamentalsArticles } from './fundamentalsArticles';
import { guidelinesArticles } from './guidelinesArticles';
import { clinicalArticles } from './clinicalArticles';
import { clinicalCasesArticles } from './clinicalCasesArticles';
import { interactiveArticles } from './interactiveArticles';
import { antibioticMechanismsArticles } from './antibioticMechanismsArticles';
import { resistanceArticles } from './resistanceArticles';
import { infectionControlArticles } from './infectionControlArticles';
import { pharmacologyArticles } from './pharmacologyArticles';
import { pediatricArticles } from './pediatricArticles';
import { geriatricArticles } from './geriatricArticles';
import { surgicalArticles } from './surgicalArticles';
import { emergencyArticles } from './emergencyArticles';

// Combine all article collections
export const articles = [
  ...fundamentalsArticles,
  ...guidelinesArticles,
  ...clinicalArticles,
  ...clinicalCasesArticles,
  ...interactiveArticles,
  ...antibioticMechanismsArticles,
  ...resistanceArticles,
  ...infectionControlArticles,
  ...pharmacologyArticles,
  ...pediatricArticles,
  ...geriatricArticles,
  ...surgicalArticles,
  ...emergencyArticles
];

// Export individual collections for specific use cases
export {
  fundamentalsArticles,
  guidelinesArticles,
  clinicalArticles,
  clinicalCasesArticles,
  interactiveArticles,
  antibioticMechanismsArticles,
  resistanceArticles,
  infectionControlArticles,
  pharmacologyArticles,
  pediatricArticles,
  geriatricArticles,
  surgicalArticles,
  emergencyArticles
};
