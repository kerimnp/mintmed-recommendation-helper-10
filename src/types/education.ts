export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  readTime: number;
  difficulty: string;
  lastUpdated: string;
  tags: string[];
  relatedTopics: string[];
  quiz?: QuizQuestion[];
  author?: string;
  references?: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points?: number;
  category?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  estimated_duration_hours: number;
  prerequisites: string[];
  learning_objectives: string[];
  content_structure: ContentItem[];
  completion_criteria: CompletionCriteria;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  type: 'article' | 'assessment' | 'simulation';
  id: string;
  title?: string;
  order: number;
  estimated_minutes?: number;
}

export interface CompletionCriteria {
  minimum_score: number;
  required_completions: string[];
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  assessment_type: 'quiz' | 'case_study' | 'simulation' | 'practical';
  time_limit_minutes?: number;
  passing_score: number;
  questions: AssessmentQuestion[];
  adaptive_rules?: any;
  prerequisites: string[];
  learning_objectives: string[];
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'case_study' | 'open_ended' | 'complex_case';
  question: string;
  options?: string[];
  correct_answer?: number;
  explanation: string;
  points: number;
  category?: string;
  patient_data?: any;
  follow_up_questions?: AssessmentQuestion[];
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  simulation_type: 'clinical_case' | 'drug_interaction' | 'decision_tree' | 'virtual_patient';
  scenario_data: any;
  decision_points: DecisionPoint[];
  scoring_criteria: any;
  learning_objectives: string[];
  prerequisites: string[];
  estimated_duration_minutes: number;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DecisionPoint {
  id: string;
  time_point?: string;
  situation: string;
  question: string;
  options: DecisionOption[];
  optimal_choice?: string;
  explanation?: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  consequences?: {
    score: number;
    outcome: string;
  };
  score?: number;
}

export interface UserProgress {
  id: string;
  user_id: string;
  learning_path_id?: string;
  article_id?: string;
  assessment_id?: string;
  simulation_id?: string;
  progress_type: 'article' | 'assessment' | 'simulation' | 'path';
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  completion_percentage: number;
  time_spent_minutes: number;
  score?: number;
  attempts: number;
  last_accessed: string;
  completed_at?: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface UserEducationPreferences {
  id: string;
  user_id: string;
  learning_style?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  preferred_difficulty?: 'beginner' | 'intermediate' | 'advanced';
  interested_categories: string[];
  daily_learning_goal_minutes: number;
  notification_preferences: any;
  accessibility_settings: any;
  created_at: string;
  updated_at: string;
}

export interface EducationAnalytics {
  totalTime: number;
  completedItems: number;
  averageScore: number;
  streakDays: number;
  categoryProgress: Record<string, number>;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  type: string;
  title: string;
  timestamp: string;
  score?: number;
  status: string;
}