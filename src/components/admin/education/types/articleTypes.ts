
import { LucideIcon } from "lucide-react";

export type ArticleCategory = "fundamentals" | "clinical" | "advanced" | "specialized" | "guidelines" | "research" | "interactive" | "pharmacology" | "pediatrics" | "geriatrics" | "surgical" | "emergency" | "resistance" | "infection-control";

export interface CategoryOption {
  id: string;
  label: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: ArticleCategory;
  readTime: string;
  lastUpdated: string;
  author: string;
  authorCredentials: string;
  content: string;
}

// Export ArticleType as an alias to Article for backward compatibility
export type ArticleType = Article;
