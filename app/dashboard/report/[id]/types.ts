// Types for the Report feature

export interface Report {
  id: string;
  project_id: string;
  report_title: string;
  report_date: string;
  comment_general?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}
