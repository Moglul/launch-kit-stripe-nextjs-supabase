'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import DashboardTopBar from '../../components/DashboardTopBar';
import Link from 'next/link';

interface Report {
  id: string;
  project_id: string;
  report_title: string;
  report_date: string;
  comment_general?: string;
  challengesEncountered?: string;
  safetyIncidents?: string;
  equipment?: {
    name: string;
    quantityUsed: string;
    quantityRemaining: string;
    remarks: string;
  }[];
  workforce?: {
    totalPresent: string;
    hoursWorked: string;
    absentees: string;
  };
}

interface Project {
  id: string;
  name: string;
  description: string;
}

export default function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'report' | 'generate'>('report');

  useEffect(() => {
    const fetchReportAndProject = async () => {
      try {
        // Fetch report details
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .single();

        if (reportError) throw reportError;
        setReport(reportData);

        // Fetch project details
        if (reportData?.project_id) {
          const { data: projectData, error: projectError } = await supabase
            .from('projects')
            .select('id, name, description')
            .eq('id', reportData.project_id)
            .single();

          if (projectError) throw projectError;
          setProject(projectData);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load report data');
        setLoading(false);
      }
    };

    if (id) {
      fetchReportAndProject();
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

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Report Not Found</h1>
        <p className="text-gray-600">The requested report could not be found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <DashboardTopBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
          <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{report.report_title}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Date: {new Date(report.report_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-2 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'report'
                ? 'text-slate-900 dark:text-white border-b-2 border-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            report
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'generate'
                ? 'text-slate-900 dark:text-white border-b-2 border-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            generate
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          {activeTab === 'report' ? (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Report Details</h2>
              
              {report.comment_general ? (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">General Comments</h3>
                  <p className="text-slate-600 dark:text-slate-400">{report.comment_general}</p>
                </div>
              ) : (
                <div className="mb-6 text-slate-500 dark:text-slate-400">
                  No general comments available for this report.
                </div>
              )}

              {report.challengesEncountered && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Challenges Encountered</h3>
                  <p className="text-slate-600 dark:text-slate-400">{report.challengesEncountered}</p>
                </div>
              )}

              {report.safetyIncidents && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Safety Incidents</h3>
                  <p className="text-slate-600 dark:text-slate-400">{report.safetyIncidents}</p>
                </div>
              )}

              {report.equipment && report.equipment.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Equipment</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quantity Used</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quantity Remaining</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {report.equipment.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{item.name}</td>
                            <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{item.quantityUsed}</td>
                            <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{item.quantityRemaining}</td>
                            <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{item.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {report.workforce && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">Workforce</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Total Present</p>
                      <p className="text-lg font-medium text-slate-900 dark:text-white">{report.workforce.totalPresent}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Hours Worked</p>
                      <p className="text-lg font-medium text-slate-900 dark:text-white">{report.workforce.hoursWorked}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Absentees</p>
                      <p className="text-lg font-medium text-slate-900 dark:text-white">{report.workforce.absentees}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Generate Report</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Generate a formatted report based on the data collected.
              </p>
              <div className="flex space-x-4">
                <button className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  Generate PDF
                </button>
                <button className="bg-transparent border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm transition-colors">
                  Export as CSV
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}