'use client';

import DashboardTopBar from '../../components/DashboardTopBar'
import { useAuth } from '@/contexts/AuthContext';
import { useReport } from './hooks';
import ReportHeader from './components/ReportHeader';
import TabNavigation from './components/TabNavigation';
import ReportView from './components/ReportView';
import ReportEdit from './components/ReportEdit';
import ReportGenerate from './components/ReportGenerate';

export default function ReportPage() {
  const { user } = useAuth();
  const {
    report,
    project,
    employees,
    loading,
    error,
    activeTab,
    setActiveTab,
    editedReport,
    isSaving,
    handleInputChange,
    handleMaterialChange,
    addMaterialRow,
    handleEquipmentChange,
    addEquipmentRow,
    handleSaveReport
  } = useReport();

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
        {/* Report Header with Breadcrumb */}
        <ReportHeader
          report={report}
          project={project}
          userEmail={user?.email}
          activeTab={activeTab}
        />

        {/* Tabs */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Content */}
        <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          {activeTab === 'report' ? (
            <ReportView report={report} employees={employees} />
          ) : activeTab === 'edit' ? (
            <ReportEdit
              editedReport={editedReport}
              isSaving={isSaving}
              onSave={handleSaveReport}
              handleInputChange={handleInputChange}
              handleMaterialChange={handleMaterialChange}
              addMaterialRow={addMaterialRow}
              handleEquipmentChange={handleEquipmentChange}
              addEquipmentRow={addEquipmentRow}
            />
          ) : activeTab === 'generate' ? (
            <ReportGenerate />
          ) : null}
        </div>
      </div>
    </div>
  );
}