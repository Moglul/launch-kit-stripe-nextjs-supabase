'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import DashboardTopBar from '../../components/DashboardTopBar';
import ReportCreateModal from '@/components/ReportCreateModal';

interface Report {
  id: string;
  project_id: string;
  report_title: string;
  report_date: string;
  comment_general: string;
  challengesEncountered: string;
  safetyIncidents: string;
  equipment: {
    name: string;
    quantityUsed: string;
    quantityRemaining: string;
    remarks: string;
  }[];
  workforce: {
    totalPresent: string;
    hoursWorked: string;
    absentees: string;
  };
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [project, setProject] = useState<{ name: string; description: string } | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjectAndReports = async () => {
      try {
        // Fetch project details
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('name, description')
          .eq('id', id)
          .single();

        if (projectError) throw projectError;
        setProject(projectData);

        // Fetch reports for this project
        const { data: reportsData, error: reportsError } = await supabase
          .from('reports')
          .select('*')
          .eq('project_id', id)
          .order('created_at', { ascending: false });

        if (reportsError) throw reportsError;
        setReports(reportsData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load project data');
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectAndReports();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-bold text-red-500 mb-2">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Project Not Found</h1>
        <p className="text-gray-600">The requested project could not be found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <DashboardTopBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{project.name}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{project.description}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Reports</h2>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                New Report
              </button>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="p-6 text-center text-slate-500 dark:text-slate-400">
              No reports available for this project yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {reports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-medium text-slate-900 dark:text-white">
                          {report.report_title || 'Untitled Report'}
                        </h3>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(report.report_date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {report.comment_general || 'No overview available'}
                      </p>
                    </div>
                    <a
                      href={`/dashboard/report/${report.id}`}
                      className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors ml-4"
                    >
                      View Report
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Report Creation Modal */}
      {isReportModalOpen && (
        <ReportCreateModal 
          isOpen={isReportModalOpen} 
          onClose={() => setIsReportModalOpen(false)} 
          projectId={id as string} 
        />
      )}
    </div>
  );
}