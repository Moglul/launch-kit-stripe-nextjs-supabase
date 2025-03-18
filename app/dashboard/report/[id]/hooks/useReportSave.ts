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
      const { error } = await supabase
        .from('reports')
        .update({
          report_title: editedReport.report_title,
          report_date: editedReport.report_date,
          comment_general: editedReport.comment_general,
          challengesEncountered: editedReport.challengesEncountered,
          safetyIncidents: editedReport.safetyIncidents,
          weather_conditions: editedReport.weather_conditions,
          materials_used: editedReport.materials_used,
          workforce: editedReport.workforce,
          equipment: editedReport.equipment,
          attachments: editedReport.attachments,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

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