'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Report, Project } from '../types';

export const useReportData = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [report, setReport] = useState<Report | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReportAndProject = async () => {
      try {
        // Fetch report details
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .single();

        if (reportError) throw reportError;
        setReport(reportData);

        // Fetch project details
        if (reportData?.project_id) {
          const { data: projectData, error: projectError } = await supabase
            .from('projects')
            .select('id, name, description')
            .eq('id', reportData.project_id)
            .single();

          if (projectError) throw projectError;
          setProject(projectData);

          // Fetch employees assigned to this project
          const { data: employeesData, error: employeesError } = await supabase
            .from('employees')
            .select('*')
            .eq('company_id', user?.company_id);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load report data');
        setLoading(false);
      }
    };

    if (id && user) {
      fetchReportAndProject();
    }
  }, [id, user]);

  return {
    report,
    setReport,
    project,
    loading,
    error,
    setError
  };
};