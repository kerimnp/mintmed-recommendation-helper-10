import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { expandedArticles } from '@/components/admin/education/data/expandedArticles';

import { assessmentsData } from '@/components/admin/education/data/assessmentsData';

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
  const [staticArticles] = useState<Article[]>(expandedArticles);
  
  // Database data
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserEducationPreferences | null>(null);
  const [analytics, setAnalytics] = useState<EducationAnalytics | null>(null);

  useEffect(() => {
    if (user) {
      fetchEducationData();
    }
  }, [user]);

  const calculateLearningStreak = (progress: any[]): number => {
    if (progress.length === 0) return 0;

    // Get unique days with completed activities, sorted by date
    const completedProgress = progress.filter(p => p.status === 'completed' && p.completed_at);
    
    const activityDates = [...new Set(
      completedProgress.map(p => {
        const date = new Date(p.completed_at);
        // Reset time to start of day for accurate date comparison
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      })
    )].sort((a, b) => b - a); // Sort descending (most recent first)

    if (activityDates.length === 0) return 0;

    // Check consecutive days starting from today or yesterday
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

    let streak = 0;
    let currentCheckDate = todayStart;

    // If there's activity today, start streak
    if (activityDates.includes(todayStart)) {
      streak = 1;
      currentCheckDate = yesterdayStart;
    } 
    // If there's activity yesterday but not today, start from yesterday
    else if (activityDates.includes(yesterdayStart)) {
      streak = 1;
      currentCheckDate = yesterdayStart - 24 * 60 * 60 * 1000;
    } 
    // No recent activity
    else {
      return 0;
    }

    // Count consecutive days backwards
    while (activityDates.includes(currentCheckDate)) {
      streak++;
      currentCheckDate -= 24 * 60 * 60 * 1000;
    }

    return streak;
  };

  const fetchEducationData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch education data in parallel
      const [
        assessmentsRes,
        progressRes,
        preferencesRes
      ] = await Promise.all([
        supabase.from('assessments').select('*').eq('is_active', true),
        supabase.from('user_learning_progress').select('*').eq('user_id', user.id),
        supabase.from('user_education_preferences').select('*').eq('user_id', user.id).maybeSingle()
      ]);

      // Handle errors
      if (assessmentsRes.error) throw assessmentsRes.error;
      if (progressRes.error) throw progressRes.error;
      if (preferencesRes.error) throw preferencesRes.error;

      // Merge database data with static data for comprehensive coverage
      const dbAssessments = (assessmentsRes.data || []) as any;
      
      // Use static data as fallback for demonstration and testing
      // In production, this would be database-driven
      setAssessments(dbAssessments.length > 0 ? dbAssessments : assessmentsData as any);
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

    // Calculate streak - consecutive days with learning activity
    const streakDays = calculateLearningStreak(progress);

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
        title: getItemTitle(p, staticArticles, assessments),
        timestamp: p.last_accessed,
        score: p.score,
        status: p.status
      }));

    return {
      totalTime: totalTimeMinutes,
      completedItems,
      averageScore,
      streakDays: streakDays,
      categoryProgress,
      recentActivity
    };
  };

  const getItemTitle = (
    progress: any, 
    articles: Article[], 
    assessments: any[]
  ): string => {
    if (progress.article_id) {
      return articles.find(a => a.id === progress.article_id)?.title || 'Unknown Article';
    }
    if (progress.assessment_id) {
      return assessments.find(a => a.id === progress.assessment_id)?.title || 'Unknown Assessment';
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


  return {
    // Loading states
    loading,
    error,
    
    // Static data
    articles: staticArticles,
    
    // Database data
    assessments,
    userProgress,
    userPreferences,
    analytics,
    
    // Actions
    updateProgress,
    updatePreferences,
    refetch: fetchEducationData,
    
    // Helpers
    getArticleProgress
  };
};