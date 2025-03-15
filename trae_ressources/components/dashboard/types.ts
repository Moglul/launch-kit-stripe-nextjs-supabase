
export type Project = {
  project_id: string;
  project_name: string;
  client_name: string;
  status: string;
};

export type FolderType = {
  id: string;
  name: string;
  projects: Project[];
};
