-- Education Infrastructure Tables

-- Learning paths table
CREATE TABLE public.learning_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration_hours INTEGER NOT NULL DEFAULT 0,
  prerequisites JSONB DEFAULT '[]'::jsonb,
  learning_objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  content_structure JSONB NOT NULL DEFAULT '[]'::jsonb,
  completion_criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User learning progress
CREATE TABLE public.user_learning_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  article_id TEXT,
  assessment_id UUID,
  simulation_id UUID,
  progress_type TEXT NOT NULL CHECK (progress_type IN ('article', 'assessment', 'simulation', 'path')),
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed', 'skipped')),
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  time_spent_minutes INTEGER DEFAULT 0,
  score NUMERIC(5,2),
  attempts INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, learning_path_id, article_id, assessment_id, simulation_id)
);

-- Enhanced assessments
CREATE TABLE public.assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('quiz', 'case_study', 'simulation', 'practical')),
  time_limit_minutes INTEGER,
  passing_score INTEGER DEFAULT 70,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  adaptive_rules JSONB DEFAULT '{}'::jsonb,
  prerequisites JSONB DEFAULT '[]'::jsonb,
  learning_objectives JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Assessment attempts
CREATE TABLE public.assessment_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  responses JSONB NOT NULL DEFAULT '[]'::jsonb,
  score NUMERIC(5,2),
  time_taken_minutes INTEGER,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  feedback JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Interactive simulations
CREATE TABLE public.simulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  simulation_type TEXT NOT NULL CHECK (simulation_type IN ('clinical_case', 'drug_interaction', 'decision_tree', 'virtual_patient')),
  scenario_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  decision_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  scoring_criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
  learning_objectives JSONB DEFAULT '[]'::jsonb,
  prerequisites JSONB DEFAULT '[]'::jsonb,
  estimated_duration_minutes INTEGER DEFAULT 30,
  tags JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Simulation attempts
CREATE TABLE public.simulation_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  simulation_id UUID NOT NULL REFERENCES public.simulations(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  decisions JSONB NOT NULL DEFAULT '[]'::jsonb,
  outcomes JSONB DEFAULT '{}'::jsonb,
  score NUMERIC(5,2),
  time_taken_minutes INTEGER,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  feedback JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User preferences and personalization
CREATE TABLE public.user_education_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  learning_style TEXT CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic', 'reading')),
  preferred_difficulty TEXT CHECK (preferred_difficulty IN ('beginner', 'intermediate', 'advanced')),
  interested_categories JSONB DEFAULT '[]'::jsonb,
  daily_learning_goal_minutes INTEGER DEFAULT 30,
  notification_preferences JSONB DEFAULT '{}'::jsonb,
  accessibility_settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_learning_paths_category ON public.learning_paths(category);
CREATE INDEX idx_learning_paths_difficulty ON public.learning_paths(difficulty_level);
CREATE INDEX idx_user_learning_progress_user_id ON public.user_learning_progress(user_id);
CREATE INDEX idx_user_learning_progress_type ON public.user_learning_progress(progress_type);
CREATE INDEX idx_assessments_category ON public.assessments(category);
CREATE INDEX idx_assessment_attempts_user_id ON public.assessment_attempts(user_id);
CREATE INDEX idx_simulations_category ON public.simulations(category);
CREATE INDEX idx_simulation_attempts_user_id ON public.simulation_attempts(user_id);

-- Enable RLS
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_education_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for learning_paths
CREATE POLICY "Anyone can view active learning paths" ON public.learning_paths
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage learning paths" ON public.learning_paths
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for user_learning_progress
CREATE POLICY "Users can view their own progress" ON public.user_learning_progress
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own progress" ON public.user_learning_progress
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can view all progress" ON public.user_learning_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for assessments
CREATE POLICY "Anyone can view active assessments" ON public.assessments
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage assessments" ON public.assessments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for assessment_attempts
CREATE POLICY "Users can view their own attempts" ON public.assessment_attempts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own attempts" ON public.assessment_attempts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own attempts" ON public.assessment_attempts
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for simulations
CREATE POLICY "Anyone can view active simulations" ON public.simulations
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage simulations" ON public.simulations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for simulation_attempts
CREATE POLICY "Users can view their own simulation attempts" ON public.simulation_attempts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own simulation attempts" ON public.simulation_attempts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own simulation attempts" ON public.simulation_attempts
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for user_education_preferences
CREATE POLICY "Users can manage their own preferences" ON public.user_education_preferences
  FOR ALL USING (user_id = auth.uid());

-- Add update trigger for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON public.learning_paths FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_learning_progress_updated_at BEFORE UPDATE ON public.user_learning_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON public.assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_simulations_updated_at BEFORE UPDATE ON public.simulations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_education_preferences_updated_at BEFORE UPDATE ON public.user_education_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();