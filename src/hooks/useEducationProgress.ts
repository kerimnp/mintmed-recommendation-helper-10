
import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '@/components/admin/education/data';

const STORAGE_KEY = 'education_progress';

const defaultProgress: UserProgress = {
  userId: 'current-user',
  completedArticles: [],
  completedSimulations: [],
  completedAssessments: [],
  completedLearningPaths: [],
  scores: {},
  timeSpent: {},
  lastActivity: new Date().toISOString(),
  streak: 0,
  totalScore: 0,
  certificationsEarned: []
};

export const useEducationProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedProgress = JSON.parse(stored);
        setProgress({ ...defaultProgress, ...parsedProgress });
      }
    } catch (error) {
      console.error('Failed to load education progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: UserProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to save education progress:', error);
    }
  }, []);

  // Update streak based on last activity
  const updateStreak = useCallback((newProgress: UserProgress) => {
    const today = new Date().toDateString();
    const lastActivity = new Date(newProgress.lastActivity).toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastActivity === today) {
      // Already updated today, no change
      return newProgress.streak;
    } else if (lastActivity === yesterdayStr) {
      // Continuing streak
      return newProgress.streak + 1;
    } else {
      // Streak broken, start new
      return 1;
    }
  }, []);

  const markArticleComplete = useCallback((articleId: string, timeSpent: number = 0) => {
    const newProgress = { ...progress };
    
    if (!newProgress.completedArticles.includes(articleId)) {
      newProgress.completedArticles.push(articleId);
      newProgress.totalScore += 50; // Points for completing article
    }
    
    newProgress.timeSpent[articleId] = (newProgress.timeSpent[articleId] || 0) + timeSpent;
    newProgress.lastActivity = new Date().toISOString();
    newProgress.streak = updateStreak(newProgress);
    
    saveProgress(newProgress);
  }, [progress, saveProgress, updateStreak]);

  const markSimulationComplete = useCallback((simulationId: string, score: number, timeSpent: number = 0) => {
    const newProgress = { ...progress };
    
    if (!newProgress.completedSimulations.includes(simulationId)) {
      newProgress.completedSimulations.push(simulationId);
    }
    
    newProgress.scores[simulationId] = Math.max(newProgress.scores[simulationId] || 0, score);
    newProgress.timeSpent[simulationId] = (newProgress.timeSpent[simulationId] || 0) + timeSpent;
    newProgress.totalScore += score;
    newProgress.lastActivity = new Date().toISOString();
    newProgress.streak = updateStreak(newProgress);
    
    saveProgress(newProgress);
  }, [progress, saveProgress, updateStreak]);

  const markAssessmentComplete = useCallback((assessmentId: string, score: number, passed: boolean, timeSpent: number = 0) => {
    const newProgress = { ...progress };
    
    if (!newProgress.completedAssessments.includes(assessmentId) && passed) {
      newProgress.completedAssessments.push(assessmentId);
    }
    
    newProgress.scores[assessmentId] = Math.max(newProgress.scores[assessmentId] || 0, score);
    newProgress.timeSpent[assessmentId] = (newProgress.timeSpent[assessmentId] || 0) + timeSpent;
    newProgress.totalScore += score;
    newProgress.lastActivity = new Date().toISOString();
    newProgress.streak = updateStreak(newProgress);
    
    // Check for certification
    if (passed && score >= 90) {
      const certificationId = `${assessmentId}_certification`;
      if (!newProgress.certificationsEarned.includes(certificationId)) {
        newProgress.certificationsEarned.push(certificationId);
        newProgress.totalScore += 100; // Bonus for certification
      }
    }
    
    saveProgress(newProgress);
  }, [progress, saveProgress, updateStreak]);

  const calculateLearningPathProgress = useCallback((pathId: string, modules: any[]) => {
    const completedModules = modules.filter(module => {
      switch (module.type) {
        case 'article':
          return progress.completedArticles.includes(module.contentId);
        case 'simulation':
          return progress.completedSimulations.includes(module.contentId);
        case 'assessment':
          return progress.completedAssessments.includes(module.contentId);
        default:
          return false;
      }
    });
    
    return {
      completed: completedModules.length,
      total: modules.length,
      percentage: Math.round((completedModules.length / modules.length) * 100)
    };
  }, [progress]);

  const getStats = useCallback(() => {
    return {
      articlesRead: progress.completedArticles.length,
      simulationsCompleted: progress.completedSimulations.length,
      assessmentsPassed: progress.completedAssessments.length,
      learningStreak: progress.streak,
      totalScore: progress.totalScore,
      certificationsEarned: progress.certificationsEarned.length
    };
  }, [progress]);

  return {
    progress,
    isLoading,
    markArticleComplete,
    markSimulationComplete,
    markAssessmentComplete,
    calculateLearningPathProgress,
    getStats,
    saveProgress
  };
};
