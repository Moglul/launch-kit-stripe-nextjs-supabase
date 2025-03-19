'use client';

import { useState, useEffect } from 'react';
import { Report } from '../types';

export const useReportForm = (initialReport: Report | null) => {
  const [editedReport, setEditedReport] = useState<Partial<Report>>(initialReport || {});
  const [isEditing, setIsEditing] = useState(false);
  
  // Update editedReport when initialReport changes
  useEffect(() => {
    if (initialReport) {
      setEditedReport(initialReport);
    }
  }, [initialReport]);

  const handleInputChange = (field: keyof Partial<Report>, value: any) => {
    setEditedReport(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return {
    editedReport,
    setEditedReport,
    isEditing,
    setIsEditing,
    handleInputChange,
};
};