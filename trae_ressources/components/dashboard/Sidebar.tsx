
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/use-toast';
import { FolderType, Project } from './types';
import ProjectFolder from './ProjectFolder';
import SearchBar from './SearchBar';
import { fetchUserProjects, createProject, deleteProject } from './ProjectApi';

type SidebarProps = {
  onProjectSelect: (projectId: string, projectName: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onProjectSelect }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [folders, setFolders] = useState<FolderType[]>([
    { id: 'ongoing', name: 'Ongoing Projects', projects: [] },
    { id: 'completed', name: 'Completed Projects', projects: [] },
  ]);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    ongoing: true,
    completed: false,
  });
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const folderData = await fetchUserProjects(user.id);
        setFolders(folderData);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, [user]);

  const handleToggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project.project_id);
    onProjectSelect(project.project_id, project.project_name);
  };

  const handleNewProject = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a new project.",
        variant: "destructive",
      });
      return;
    }
    
    // For demonstration, let's add a simple dialog
    const projectName = prompt("Enter project name:");
    const clientName = prompt("Enter client name:");
    const status = prompt("Enter project status (In Progress, Completed, or On Hold):") as 'In Progress' | 'Completed' | 'On Hold';
    
    if (!projectName || !clientName || !['In Progress', 'Completed', 'On Hold'].includes(status)) {
      toast({
        title: "Project creation canceled",
        description: "Project name, client name, and valid status are required.",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const newProject = await createProject(projectName, clientName, user.id, status);
      
      // Refresh the project list
      const updatedFolders = await fetchUserProjects(user.id);
      setFolders(updatedFolders);
      
      // Ensure the folder is expanded
      setExpandedFolders(prev => ({
        ...prev,
        ongoing: true
      }));
      
      // Auto-select the new project if it was created successfully
      if (newProject) {
        setSelectedProject(newProject.project_id);
        onProjectSelect(newProject.project_id, newProject.project_name);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFolderAction = (action: string, folderId: string) => {
    // For demonstration only
    toast({
      title: `${action} folder`,
      description: `This action (${action}) would be applied to folder ID: ${folderId}`,
    });
  };

  const handleProjectAction = async (action: string, projectId: string) => {
    if (action === 'Delete') {
      if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        return;
      }
      
      const success = await deleteProject(projectId);
      
      if (success) {
        // Remove project from state
        setFolders(prevFolders => {
          return prevFolders.map(folder => ({
            ...folder,
            projects: folder.projects.filter(project => project.project_id !== projectId)
          }));
        });
        
        // Clear selection if the deleted project was selected
        if (selectedProject === projectId) {
          setSelectedProject(null);
          // Notify parent that no project is selected
          onProjectSelect('', '');
        }
      }
    } else {
      // For other actions that aren't implemented yet
      toast({
        title: `${action} project`,
        description: `This action (${action}) would be applied to project ID: ${projectId}`,
      });
    }
  };

  // Filter projects based on search term
  const filteredFolders = folders.map(folder => ({
    ...folder,
    projects: folder.projects.filter(project => 
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="w-64 bg-white border-r border-zinc-200 flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-zinc-200">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <button
          onClick={handleNewProject}
          className="mt-3 w-full flex items-center justify-center space-x-2 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>
      
      {/* Folders and Projects */}
      <div className="flex-1 overflow-y-auto py-2">
        {loading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          filteredFolders.map(folder => (
            <ProjectFolder
              key={folder.id}
              folder={folder}
              isExpanded={expandedFolders[folder.id]}
              selectedProjectId={selectedProject}
              onToggleFolder={handleToggleFolder}
              onProjectClick={handleProjectClick}
              onFolderAction={handleFolderAction}
              onProjectAction={handleProjectAction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
