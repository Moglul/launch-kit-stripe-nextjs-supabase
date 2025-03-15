
import React from 'react';
import { File, MoreVertical, Edit, Trash } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Project } from './types';

type ProjectItemProps = {
  project: Project;
  isSelected: boolean;
  onProjectClick: (project: Project) => void;
  onProjectAction: (action: string, projectId: string) => void;
};

const ProjectItem: React.FC<ProjectItemProps> = ({ 
  project, 
  isSelected, 
  onProjectClick, 
  onProjectAction 
}) => {
  return (
    <div 
      className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between group 
        ${isSelected ? 'bg-primary/10 text-primary font-medium' : 'text-construction-700 hover:bg-construction-100/50'}`}
      onClick={() => onProjectClick(project)}
    >
      <div className="flex items-center">
        <File className="h-4 w-4 mr-2" />
        <span className="truncate">{project.project_name}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <MoreVertical className="h-4 w-4 text-construction-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onProjectAction('Move', project.project_id);
            }}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Move</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onProjectAction('Delete', project.project_id);
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
  );
};

export default ProjectItem;
