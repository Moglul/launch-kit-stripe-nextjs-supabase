// Types for the Report feature

export interface Material {
  name: string;
  quantity: string;
  unit: string;
  remarks: string;
}

export interface EquipmentItem {
  name: string;
  quantityUsed: string;
  quantityRemaining: string;
  remarks: string;
}

export interface Report {
  id: string;
  project_id: string;
  report_title: string;
  report_date: string;
  comment_general?: string;
  challengesEncountered?: string;
  safetyIncidents?: string;
  weather_conditions?: string;
  materials_used?: Material[];
  equipment?: EquipmentItem[];
  workforce?: {
    totalPresent: string;
    hoursWorked: string;
    absentees: string;
  };
  attachments?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_present?: boolean;
}