'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/utils/supabase';

interface Project {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

interface ProjectListProps {
  initialProjects: Project[];
  onProjectAdded: (project: Project) => void;
}

export function ProjectList({ initialProjects, onProjectAdded }: ProjectListProps) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleAddProject = async () => {
    setIsSubmitting(true);
    try {
      if (!newProject.name || !newProject.description || !newProject.start_date || !newProject.end_date) {
        throw new Error('All fields are required');
      }

      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            name: newProject.name,
            description: newProject.description,
            start_date: newProject.start_date,
            end_date: newProject.end_date
          }
        ])
        .select()
        .single();

      if (projectError) {
        throw new Error(`Project creation failed: ${projectError.message}`);
      }

      setProjects([projectData, ...projects]);
      onProjectAdded(projectData);
      setIsProjectModalOpen(false);
      setNewProject({ name: '', description: '', start_date: '', end_date: '' });
    } catch (error) {
      console.error('Error adding project:', error);
      alert(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsProjectModalOpen(true)}
          className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {project.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {project.description}
                </p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
            <div className="space-y-2 mb-4">
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
            <button className="w-full bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors">
              View Report
            </button>
          </motion.div>
        ))}
      </div>

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
                className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}