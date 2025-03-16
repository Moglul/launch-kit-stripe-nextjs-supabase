'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { supabase } from '@/utils/supabase';

const AUTH_TIMEOUT = 5000;

interface Employee {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface Project {
  id?: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

export function useDashboard() {
  const { user, isSubscriber, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { subscription, isLoading: isSubLoading, fetchSubscription } = useSubscription();
  const [hasCheckedSubscription, setHasCheckedSubscription] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const { isInTrial, isLoading: isTrialLoading } = useTrialStatus();
  const [authTimeout, setAuthTimeout] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'employees'>('projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  // Modal states
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEmployeeSubmitting, setIsEmployeeSubmitting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    first_name: '',
    last_name: '',
    email: '',
    role: ''
  });
  const [newProject, setNewProject] = useState<Project>({
    name: '',
    description: '',
    start_date: '',
    end_date: ''
  });
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        if (activeTab === 'projects') {
          const { data: projectsData, error: projectsError } = await supabase
            .from('projects')
            .select('*, project_users!inner(*)')
            .eq('project_users.user_id', user.id)
            .order('created_at', { ascending: false });

          if (projectsError) throw projectsError;
          setProjects(projectsData || []);
        } else {
          const { data: employeesData, error: employeesError } = await supabase
            .from('employees')
            .select('*')
            .eq('company_id', user.company_id)
            .order('created_at', { ascending: false });

          if (employeesError) throw employeesError;
          setEmployees(employeesData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id, activeTab]);

  // Subscription and trial check
  useEffect(() => {
    if (isSubLoading || isTrialLoading) return;
    
    const hasValidSubscription = ['active', 'trialing'].includes(subscription?.status || '');
    
    if (!hasValidSubscription && !isInTrial) {
      router.replace('/profile');
    }
  }, [subscription, isSubLoading, isTrialLoading, router, isInTrial]);

  // Auth check
  useEffect(() => {
    if (isAuthLoading || isTrialLoading) return;

    if (!hasCheckedSubscription) {
      setHasCheckedSubscription(true);
      
      if (!user || (!isSubscriber && !isInTrial && !isAuthLoading)) {
        router.replace('/profile');
      }
    }
  }, [isSubscriber, isAuthLoading, hasCheckedSubscription, router, user, subscription, isTrialLoading, isInTrial]);

  // Refresh subscription
  useEffect(() => {
    const refreshSubscription = async () => {
      await fetchSubscription();
      setHasCheckedSubscription(true);
    };
    
    if (user?.id) {
      refreshSubscription();
    }
  }, [user?.id, fetchSubscription]);

  // Check onboarding status
  useEffect(() => {
    if (user?.id) {
      const checkOnboarding = async () => {
        const { data } = await supabase
          .from('user_preferences')
          .select('has_completed_onboarding')
          .eq('user_id', user.id)
          .single();
        
        setHasCompletedOnboarding(!!data?.has_completed_onboarding);
      };
      
      checkOnboarding();
    }
  }, [user?.id]);

  // Auth timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && (isAuthLoading || isTrialLoading)) {
        setAuthTimeout(true);
      }
    }, AUTH_TIMEOUT);
    
    return () => clearTimeout(timer);
  }, [user, isAuthLoading, isTrialLoading]);

  const handleProjectAdded = (project: any) => {
    setProjects([project, ...projects]);
  };

  const handleEmployeeAdded = (employee: any) => {
    setEmployees([employee, ...employees]);
  };

  const handleAddProject = async () => {
    setIsSubmitting(true);
    try {
      if (!newProject.name || !newProject.description || !newProject.start_date || !newProject.end_date) {
        throw new Error('All fields are required');
      }
  
      // Start a Supabase transaction
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
        // Handle specific project creation errors
        const errorMessage = projectError.message || 'Failed to create project';
        throw new Error(`Project creation failed: ${errorMessage}`);
      }
  
      // Create the project_user association
      const { error: projectUserError } = await supabase
        .from('project_users')
        .insert([
          {
            project_id: projectData.id,
            user_id: user?.id,
            role: 'owner'
          }
        ]);
  
      if (projectUserError) {
        // Handle specific project-user association errors
        const errorMessage = projectUserError.message || 'Failed to associate project with user';
        throw new Error(`Project-user association failed: ${errorMessage}`);
      }
  
      // Update the projects state with the new project
      setProjects([projectData, ...projects]);
      setIsProjectModalOpen(false);
      setNewProject({ name: '', description: '', start_date: '', end_date: '' });
    } catch (error) {
      // Log the full error object for debugging
      console.error('Error adding project:', error);
      
      // Display a user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleAddEmployee = async () => {
    if (!user?.company_id) return;
    setIsEmployeeSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([{
          ...newEmployee,
          company_id: user.company_id
        }])
        .select()
        .single();

      if (error) throw error;
      handleEmployeeAdded(data);
      setIsEmployeeModalOpen(false);
      setNewEmployee({
        first_name: '',
        last_name: '',
        email: '',
        role: ''
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    } finally {
      setIsEmployeeSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      // First, delete all project_users associations
      const { error: projectUserError } = await supabase
        .from('project_users')
        .delete()
        .eq('project_id', projectId);

      if (projectUserError) {
        console.error('Error deleting project users:', projectUserError);
        throw projectUserError;
      }

      // Then delete the project itself
      const { error: projectError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .single();

      if (projectError) {
        console.error('Error deleting project:', projectError);
        throw projectError;
      }

      // Update local state only if both operations succeeded
      setProjects(projects.filter(p => p.id !== projectId));
      setIsProjectMenuOpen(false);
    } catch (error) {
      console.error('Error in delete operation:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEditProject = async () => {
    if (!editingProject) return;
    setIsSubmitting(true);
    try {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .update({
          name: editingProject.name,
          description: editingProject.description,
          start_date: editingProject.start_date,
          end_date: editingProject.end_date
        })
        .eq('id', editingProject.id)
        .select()
        .single();

      if (projectError) {
        throw new Error(`Project update failed: ${projectError.message}`);
      }

      // Update the projects state
      setProjects(projects.map(p => p.id === projectData.id ? projectData : p));
      setIsProjectEditModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error updating project:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    handleProjectAdded,
    handleEmployeeAdded,
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
    handleAddEmployee,
    isProjectMenuOpen,
    setIsProjectMenuOpen,
    handleDeleteProject,
    isProjectEditModalOpen,
    setIsProjectEditModalOpen,
    editingProject,
    setEditingProject,
    handleEditProject,
  };
}