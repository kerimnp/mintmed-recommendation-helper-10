import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useEducationSimple = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [learningPaths, setLearningPaths] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [simulations, setSimulations] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchEducationData();
    }
  }, [user]);

  const fetchEducationData = async () => {
    setLoading(true);
    try {
      const [pathsRes, assessmentsRes, simulationsRes] = await Promise.all([
        supabase.from('learning_paths').select('*').eq('is_active', true),
        supabase.from('assessments').select('*').eq('is_active', true),
        supabase.from('simulations').select('*').eq('is_active', true)
      ]);

      setLearningPaths(pathsRes.data || []);
      setAssessments(assessmentsRes.data || []);
      setSimulations(simulationsRes.data || []);
    } catch (error) {
      console.error('Error fetching education data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    learningPaths,
    assessments,
    simulations,
    refetch: fetchEducationData
  };
};