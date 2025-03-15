
import React from 'react';
import { 
  Folder, FolderOpen, ChevronRight, ChevronDown, 
  MoreVertical, Plus, Edit, Trash 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FolderType, Project } from './types';
import ProjectItem from './ProjectItem';

type ProjectFolderProps = {
  folder: FolderType;
  isExpanded: boolean;
  selectedProjectId: string | null;
  onToggleFolder: (folderId: string) => void;
  onProjectClick: (project: Project) => void;
  onFolderAction: (action: string, folderId: string) => void;
  onProjectAction: (action: string, projectId: string) => void;
};

const ProjectFolder: React.FC<ProjectFolderProps> = ({ 
  folder, 
  isExpanded, 
  selectedProjectId,
  onToggleFolder, 
  onProjectClick, 
  onFolderAction,
  onProjectAction
}) => {
  return (
    <div className="mb-1">
      {/* Folder Header */}
      <div 
        className="flex items-center justify-between px-3 py-2 hover:bg-construction-100/50 cursor-pointer group"
        onClick={() => onToggleFolder(folder.id)}
      >
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 mr-1 text-construction-500" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 text-construction-500" />
          )}
          {isExpanded ? (
            <FolderOpen className="h-4 w-4 mr-2 text-construction-600" />
          ) : (
            <Folder className="h-4 w-4 mr-2 text-construction-600" />
          )}
          <span className="text-sm font-medium text-construction-800">
            {folder.name} ({folder.projects.length})
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreVertical className="h-4 w-4 text-construction-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                onFolderAction('Create New', folder.id);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Folder</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                onFolderAction('Rename', folder.id);
              }}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  onFolderAction('Delete', folder.id);
                }}
                className="text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Projects in folder */}
      {isExpanded && (
        <div className="mt-1 ml-9 space-y-1">
          {folder.projects.length === 0 ? (
            <div className="px-3 py-2 text-sm text-construction-500 italic">
              No projects
            </div>
          ) : (
            folder.projects.map(project => (
              <ProjectItem
                key={project.project_id}
                project={project}
                isSelected={selectedProjectId === project.project_id}
                onProjectClick={onProjectClick}
                onProjectAction={onProjectAction}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectFolder;
