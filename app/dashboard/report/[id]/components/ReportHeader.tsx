'use client';

import Link from 'next/link';
import { Report, Project } from '../types';

interface ReportHeaderProps {
  report: Report;
  project: Project | null;
  userEmail: string | undefined;
  activeTab: 'report' | 'edit' | 'generate';
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  report,
  project,
  userEmail
}) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
        <Link href="/dashboard" className="hover:text-slate-700 dark:hover:text-slate-300">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        {project && (
          <>
            <Link href={`/dashboard/project/${project.id}`} className="hover:text-slate-700 dark:hover:text-slate-300">
              {project.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-slate-700 dark:text-slate-300">{report.report_title}</span>
      </div>

      {/* Report Header */}
      <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{report.report_title}</h1>
            <div className="mt-2 space-y-1">
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-medium">Project:</span> {project?.name}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-medium">Date:</span> {new Date(report.report_date).toLocaleDateString()}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-medium">Author:</span> {userEmail}
              </p>
            </div>
          </div>
            <button
              className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              Generate PDF (soon)
            </button>
        </div>
      </div>
    </>
  );
};

export default ReportHeader;