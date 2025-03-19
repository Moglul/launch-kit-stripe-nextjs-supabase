'use client';

import { Report } from '../types';

interface ReportEditProps {
  editedReport: Partial<Report>;
  isSaving: boolean;
  onSave: () => void;
  handleInputChange: (field: keyof Partial<Report>, value: any) => void;
  }

const ReportEdit: React.FC<ReportEditProps> = ({
  editedReport,
  isSaving,
  onSave,
  handleInputChange,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Edit Report</h2>

      <div className="space-y-6">
        {/* Report Title and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="report_title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Report Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="report_title"
              value={editedReport.report_title || ''}
              onChange={(e) => handleInputChange('report_title', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="report_date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Report Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="report_date"
              value={editedReport.report_date?.split('T')[0] || ''}
              onChange={(e) => handleInputChange('report_date', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
              required
            />
          </div>
        </div>
        
        {/* General Comments */}
        <div>
          <label htmlFor="comment_general" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            General Comments <span className="text-red-500">*</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">(Overview of today's activities)</span>
          </label>
          <textarea
            id="comment_general"
            value={editedReport.comment_general || ''}
            onChange={(e) => handleInputChange('comment_general', e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
            placeholder="Provide a general overview of today's work activities"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportEdit;