import { hospitalGradeArticles } from './hospitalGradeArticles';
import { allArticles } from './allArticles';

// Combine existing articles with new hospital-grade content
export const expandedArticles = [
  ...hospitalGradeArticles,
  ...allArticles
];