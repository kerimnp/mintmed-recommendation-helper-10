import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { allArticles } from '@/components/admin/education/data/allArticles';
import { learningPathsData } from '@/components/admin/education/data/learningPathsData';
import { assessmentsData } from '@/components/admin/education/data/assessmentsData';
import { simulationsData } from '@/components/admin/education/data/simulationsData';
import type { 
  LearningPath, 
  Assessment, 
  Simulation, 
  UserProgress,
  UserEducationPreferences,
  EducationAnalytics
} from '@/types/education';
import type { Article } from '@/components/admin/education/types/articleTypes';

export const useEducationData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Static data
  const [staticArticles] = useState<Article[]>(allArticles);
  
  // Database data
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserEducationPreferences | null>(null);
  const [analytics, setAnalytics] = useState<EducationAnalytics | null>(null);

  useEffect(() => {
    if (user) {
      fetchEducationData();
    }
  }, [user]);

  const fetchEducationData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all education data in parallel
      const [
        pathsRes,
        assessmentsRes,
        simulationsRes,
        progressRes,
        preferencesRes
      ] = await Promise.all([
        supabase.from('learning_paths').select('*').eq('is_active', true),
        supabase.from('assessments').select('*').eq('is_active', true),
        supabase.from('simulations').select('*').eq('is_active', true),
        supabase.from('user_learning_progress').select('*').eq('user_id', user.id),
        supabase.from('user_education_preferences').select('*').eq('user_id', user.id).maybeSingle()
      ]);

      // Handle errors
      if (pathsRes.error) throw pathsRes.error;
      if (assessmentsRes.error) throw assessmentsRes.error;
      if (simulationsRes.error) throw simulationsRes.error;
      if (progressRes.error) throw progressRes.error;
      if (preferencesRes.error) throw preferencesRes.error;

      // Set data with proper type casting
      setLearningPaths((pathsRes.data || []) as any);
      setAssessments((assessmentsRes.data || []) as any);
      setSimulations((simulationsRes.data || []) as any);
      setUserProgress((progressRes.data || []) as any);
      setUserPreferences((preferencesRes.data || null) as any);

      // Calculate analytics from actual data
      const calculatedAnalytics = calculateAnalytics((progressRes.data || []) as any, staticArticles);
      setAnalytics(calculatedAnalytics);
      
    } catch (err) {
      console.error('Error fetching education data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load education data');
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = (progress: any[], articles: Article[]): EducationAnalytics => {
    const totalTimeMinutes = progress.reduce((sum, p) => sum + p.time_spent_minutes, 0);
    const completedItems = progress.filter(p => p.status === 'completed').length;
    const averageScore = progress.length > 0 ? 
      progress.filter(p => p.score !== null).reduce((sum, p) => sum + (p.score || 0), 0) / 
      progress.filter(p => p.score !== null).length : 0;

    // Calculate streak (simplified - days with activity)
    const recentDays = progress.filter(p => {
      const daysDiff = Math.floor((Date.now() - new Date(p.last_accessed).getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= 7;
    }).length;

    // Category progress
    const categoryProgress: Record<string, number> = {};
    articles.forEach(article => {
      const articleProgress = progress.find(p => p.article_id === article.id);
      if (!categoryProgress[article.category]) {
        categoryProgress[article.category] = 0;
      }
      if (articleProgress?.status === 'completed') {
        categoryProgress[article.category]++;
      }
    });

    // Recent activity
    const recentActivity = progress
      .sort((a, b) => new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime())
      .slice(0, 10)
      .map(p => ({
        type: p.progress_type,
        title: getItemTitle(p, staticArticles, learningPaths, assessments, simulations),
        timestamp: p.last_accessed,
        score: p.score,
        status: p.status
      }));

    return {
      totalTime: totalTimeMinutes,
      completedItems,
      averageScore,
      streakDays: recentDays,
      categoryProgress,
      recentActivity
    };
  };

  const getItemTitle = (
    progress: any, 
    articles: Article[], 
    paths: any[], 
    assessments: any[], 
    simulations: any[]
  ): string => {
    if (progress.article_id) {
      return articles.find(a => a.id === progress.article_id)?.title || 'Unknown Article';
    }
    if (progress.learning_path_id) {
      return paths.find(p => p.id === progress.learning_path_id)?.title || 'Unknown Path';
    }
    if (progress.assessment_id) {
      return assessments.find(a => a.id === progress.assessment_id)?.title || 'Unknown Assessment';
    }
    if (progress.simulation_id) {
      return simulations.find(s => s.id === progress.simulation_id)?.title || 'Unknown Simulation';
    }
    return 'Unknown Item';
  };

  const updateProgress = async (progressData: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_learning_progress')
        .upsert({
          user_id: user.id,
          status: progressData.status || 'not_started',
          progress_type: progressData.progress_type,
          ...progressData
        });

      if (error) throw error;
      
      // Refresh data
      await fetchEducationData();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const updatePreferences = async (preferences: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_education_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      // Refresh data
      await fetchEducationData();
    } catch (err) {
      console.error('Error updating preferences:', err);
    }
  };

  const getArticleProgress = (articleId: string): any => {
    return userProgress.find(p => p.article_id === articleId);
  };

  const getPathProgress = (pathId: string): any => {
    return userProgress.find(p => p.learning_path_id === pathId);
  };

  return {
    // Loading states
    loading,
    error,
    
    // Static data
    articles: staticArticles,
    
    // Database data
    learningPaths,
    assessments,
    simulations,
    userProgress,
    userPreferences,
    analytics,
    
    // Actions
    updateProgress,
    updatePreferences,
    refetch: fetchEducationData,
    
    // Helpers
    getArticleProgress,
    getPathProgress
  };
};