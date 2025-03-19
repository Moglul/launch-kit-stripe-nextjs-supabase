'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { Report } from '../types';

export const useReportSave = (setReport: (report: Report) => void, setActiveTab: (tab: 'report' | 'edit' | 'generate') => void, setIsEditing: (isEditing: boolean) => void) => {
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSaveReport = async (editedReport: Partial<Report>) => {
    setIsSaving(true);
    try {
      // Start a transaction by using multiple operations
      
      // 1. Update the main report record
      const { error: reportError } = await supabase
        .from('reports')
        .update({
          report_title: editedReport.report_title,
          report_date: editedReport.report_date,
          comment_general: editedReport.comment_general,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (reportError) throw reportError;
      

      // Update the report state with edited values
      setReport(editedReport as Report);
      setActiveTab('report');
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving report:', err);
      setError('Failed to save report changes');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    error,
    handleSaveReport
  };
};