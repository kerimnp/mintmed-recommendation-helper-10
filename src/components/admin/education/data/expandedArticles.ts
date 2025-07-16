import { hospitalGradeArticles } from './hospitalGradeArticles';
import { allArticles } from './allArticles';
import { enhancedArticles } from './enhancedArticles';

// Combine existing articles with new hospital-grade content and enhanced articles
export const expandedArticles = [
  ...enhancedArticles,
  ...hospitalGradeArticles,
  ...allArticles
];