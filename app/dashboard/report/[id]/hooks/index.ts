'use client';

import { useState } from 'react';
import { useReportData } from './useReportData';
import { useReportForm } from './useReportForm';
import { useReportSave } from './useReportSave';
import { Employee } from '../types';

export const useReport = () => {
  const {
    report,
    setReport,
    project,
    employees,
    setEmployees,
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
    handleInputChange,
    handleMaterialChange,
    addMaterialRow,
    handleEquipmentChange,
    addEquipmentRow,
    handleWorkforceChange
  } = useReportForm(report);

  const {
    isSaving,
    handleSaveReport: saveReport
  } = useReportSave(setReport, setActiveTab, setIsEditing);

  // Handle employee presence changes
  const handleEmployeePresenceChange = (employeeId: string, isPresent: boolean) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId ? { ...emp, is_present: isPresent } : emp
    );
    setEmployees(updatedEmployees);
  };

  // Wrapper for handleSaveReport to pass the current editedReport
  const handleSaveReport = () => {
    if (!editedReport) return;
    saveReport(editedReport);
  };

  return {
    report,
    project,
    employees,
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
    handleMaterialChange,
    addMaterialRow,
    handleEquipmentChange,
    addEquipmentRow,
    handleEmployeePresenceChange,
    handleWorkforceChange,
    handleSaveReport
  };
};

// Re-export the individual hooks for direct use if needed
export { useReportData } from './useReportData';
export { useReportForm } from './useReportForm';
export { useReportSave } from './useReportSave';