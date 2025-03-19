'use client';

import { useState } from 'react';
import { useReportData } from './useReportView';
import { useReportForm } from './useReportForm';
import { useReportSave } from './useReportSave';

export const useReport = () => {
  const {
    report,
    setReport,
    project,
    loading,
    error,
    setError
  } = useReportData();

  const [activeTab, setActiveTab] = useState<'report' | 'edit' | 'generate'>('report');

  const {
    editedReport,
    setEditedReport,
    isEditing,
    setIsEditing,
    handleInputChange
  } = useReportForm(report);

  const {
    isSaving,
    handleSaveReport: saveReport
  } = useReportSave(setReport, setActiveTab, setIsEditing);

  // Wrapper for handleSaveReport to pass the current editedReport
  const handleSaveReport = () => {
    if (!editedReport) return;
    saveReport(editedReport);
  };

  return {
    report,
    project,
    loading,
    error,
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    editedReport,
    setEditedReport,
    isSaving,
    handleInputChange,
    handleSaveReport
  };
};

// Re-export the individual hooks for direct use if needed
export { useReportData } from './useReportView';
export { useReportForm } from './useReportForm';
export { useReportSave } from './useReportSave';