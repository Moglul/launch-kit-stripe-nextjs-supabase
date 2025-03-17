'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface ReportCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export default function ReportCreateModal({ isOpen, onClose, projectId }: ReportCreateModalProps) {
  const [reportTitle, setReportTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!reportTitle.trim()) {
      setError('Report title is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a new report in the database
      const { data, error: createError } = await supabase
        .from('reports')
        .insert([
          {
            project_id: projectId,
            report_title: reportTitle,
            report_date: new Date().toISOString(),
            created_by: user?.id,
          }
        ])
        .select()
        .single();

      if (createError) throw createError;

      // Redirect to the new report page
      router.push(`/dashboard/report/${data.id}`);
    } catch (err) {
      console.error('Error creating report:', err);
      setError('Failed to create report. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-dark rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Create New Report</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reportTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Report Title
            </label>
            <input
              type="text"
              id="reportTitle"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-neutral-darker dark:text-white"
              placeholder="Enter report title"
              disabled={isSubmitting}
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}