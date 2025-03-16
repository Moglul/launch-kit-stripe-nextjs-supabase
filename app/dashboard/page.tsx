'use client';

import { useDashboard } from './hooks/useDashboard';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

const AUTH_TIMEOUT = 15000; // 15 seconds

export default function Dashboard() {
  const {
    user,
    isAuthLoading,
    isTrialLoading,
    hasCheckedSubscription,
    authTimeout,
    isInTrial,
    activeTab,
    setActiveTab,
    projects,
    employees,
    isEmployeeModalOpen,
    setIsEmployeeModalOpen,
    isProjectModalOpen,
    setIsProjectModalOpen,
    isEmployeeSubmitting,
    isSubmitting,
    newEmployee,
    setNewEmployee,
    newProject,
    setNewProject,
    handleAddProject,
    handleAddEmployee
  } = useDashboard();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  // Loading state
  if (!user && (isAuthLoading || isTrialLoading) && !hasCheckedSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mb-4 mx-auto"></div>
          <p className="text-foreground">
            {authTimeout ? 
              "Taking longer than usual? Try refreshing the page 😊." :
              "Verifying access..."}
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-neutral-dark border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {isInTrial ? 'Trial Period' : 'Premium Plan'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'projects'
                ? 'text-slate-900 dark:text-white border-b-2 border-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'employees'
                ? 'text-slate-900 dark:text-white border-b-2 border-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Employees
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'projects' ? (
          <>
            {/* Add Project Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsProjectModalOpen(true)}
                className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Add Project
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-neutral-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-[280px]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                        {project.name}
                      </h3>
                      <div className="h-[60px] overflow-hidden relative">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                          {project.description}
                        </p>
                        {project.description.length > 100 && (
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setIsDescriptionModalOpen(true);
                            }}
                            className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 absolute bottom-0 left-0"
                          >
                            View more
                          </button>
                        )}
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 flex-grow">
                    <div className="flex items-center text-sm">
                      <span className="text-slate-500 dark:text-slate-400 w-20">
                        Start Date:
                      </span>
                      <span className="text-slate-900 dark:text-white">
                        {new Date(project.start_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-slate-500 dark:text-slate-400 w-20">
                        End Date:
                      </span>
                      <span className="text-slate-900 dark:text-white">
                        {new Date(project.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors mt-auto">
                    View Report
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Employees
                </h3>
                <button
  onClick={() => setIsEmployeeModalOpen(true)}
  className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
>
  Add Employee
</button>
              </div>
            </div>
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {employee.first_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {employee.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {employee.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isEmployeeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Add New Employee</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={newEmployee.first_name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, first_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={newEmployee.last_name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, last_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email (optionnal)
                </label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role (optionnal)
                </label>
                <input
                  type="text"
                  value={newEmployee.role}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter role"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                disabled={isEmployeeSubmitting}
                className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                {isEmployeeSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Employee'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Enter project description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={newProject.start_date}
                  onChange={(e) =>
                    setNewProject({ ...newProject, start_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={newProject.end_date}
                  onChange={(e) =>
                    setNewProject({ ...newProject, end_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                disabled={isSubmitting}
                className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Project'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Description Modal */}
      {selectedProject && isDescriptionModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">{selectedProject.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {selectedProject.description}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDescriptionModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}