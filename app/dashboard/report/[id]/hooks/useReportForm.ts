'use client';

import { useState, useEffect } from 'react';
import { Report, Material, EquipmentItem } from '../types';

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

  const handleMaterialChange = (index: number, field: keyof Material, value: string) => {
    const updatedMaterials = [...(editedReport.materials_used || [])];
    if (!updatedMaterials[index]) {
      updatedMaterials[index] = { name: '', quantity: '', unit: '', remarks: '' };
    }
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value
    };

    setEditedReport(prev => ({
      ...prev,
      materials_used: updatedMaterials
    }));
  };

  const addMaterialRow = () => {
    setEditedReport(prev => ({
      ...prev,
      materials_used: [
        ...(prev.materials_used || []),
        { name: '', quantity: '', unit: '', remarks: '' }
      ]
    }));
  };

  const handleEquipmentChange = (index: number, field: keyof EquipmentItem, value: string) => {
    const updatedEquipment = [...(editedReport.equipment || [])];
    if (!updatedEquipment[index]) {
      updatedEquipment[index] = { name: '', quantityUsed: '', quantityRemaining: '', remarks: '' };
    }
    updatedEquipment[index] = {
      ...updatedEquipment[index],
      [field]: value
    };

    setEditedReport(prev => ({
      ...prev,
      equipment: updatedEquipment
    }));
  };

  const addEquipmentRow = () => {
    setEditedReport(prev => ({
      ...prev,
      equipment: [
        ...(prev.equipment || []),
        { name: '', quantityUsed: '', quantityRemaining: '', remarks: '' }
      ]
    }));
  };

  const handleWorkforceChange = (field: keyof NonNullable<Report['workforce']>, value: string) => {
    setEditedReport(prev => ({
      ...prev,
      workforce: {
        ...(prev.workforce || { totalPresent: '', hoursWorked: '', absentees: '' }),
        [field]: value
      }
    }));
  };

  return {
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
  };
};