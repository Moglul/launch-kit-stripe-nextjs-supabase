
import { supabase } from '@/integrations/supabase/client';
import { FolderType, Project } from './types';
import { toast } from '@/components/use-toast';

export const fetchUserProjects = async (userId: string): Promise<FolderType[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('created_by', userId);
      
    if (error) throw error;
    
    // If no user projects are found, fetch all projects for demo purposes
    if (data.length === 0) {
      const { data: allProjects, error: allProjectsError } = await supabase
        .from('projects')
        .select('*');
        
      if (allProjectsError) throw allProjectsError;
      
      if (allProjects.length === 0) {
        // If still no projects, show a message
        toast({
          title: "No projects found",
          description: "You don't have any projects yet. Create a new project to get started.",
        });
        return [
          { id: 'ongoing', name: 'Ongoing Projects', projects: [] },
          { id: 'completed', name: 'Completed Projects', projects: [] },
        ];
      }
      
      return sortProjectsIntoFolders(allProjects);
    }
    
    return sortProjectsIntoFolders(data);
  } catch (error: any) {
    console.error('Error loading projects:', error);
    toast({
      title: "Error loading projects",
      description: error.message,
      variant: "destructive",
    });
    return [
      { id: 'ongoing', name: 'Ongoing Projects', projects: [] },
      { id: 'completed', name: 'Completed Projects', projects: [] },
    ];
  }
};

const VALID_STATUSES = ['In Progress', 'Completed', 'On Hold'] as const;

export const createProject = async (
  projectName: string, 
  clientName: string, 
  userId: string,
  status: typeof VALID_STATUSES[number] = 'In Progress'
): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([
        { 
          project_name: projectName,
          client_name: clientName,
          status,
          created_by: userId,
        }
      ])
      .select();
    
    if (error) throw error;
    
    toast({
      title: "Project created",
      description: `${projectName} has been created successfully.`,
    });
    
    return data?.[0] || null;
  } catch (error: any) {
    console.error('Error creating project:', error);
    toast({
      title: "Error creating project",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const deleteProject = async (projectId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('project_id', projectId);
      
    if (error) throw error;
    
    toast({
      title: "Project deleted",
      description: "The project has been deleted successfully.",
    });
    
    return true;
  } catch (error: any) {
    console.error('Error deleting project:', error);
    toast({
      title: "Error deleting project",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

// Helper function to sort projects into folders
const sortProjectsIntoFolders = (projects: Project[]): FolderType[] => {
  const ongoingProjects = projects.filter(project => 
    project.status === 'In Progress' || project.status === 'On Hold'
  );
  const completedProjects = projects.filter(project => 
    project.status === 'Completed'
  );
  
  return [
    { id: 'ongoing', name: 'Ongoing Projects', projects: ongoingProjects },
    { id: 'completed', name: 'Completed Projects', projects: completedProjects },
  ];
};
