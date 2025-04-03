export type Category = 'Work' | 'Personal' | 'Urgent';
export type ViewMode = 'list' | 'calendar';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  completed: boolean;
  created_at: string;
  due_date?: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
}

export interface DayTask {
  date: Date;
  tasks: Task[];
}