export type Subject = 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'Computer Science' | 'English' | 'History' | 'Other';

export type Priority = 'Low' | 'Medium' | 'High';

export type DoubtStatus = 'Pending' | 'Answered' | 'Rejected';

export interface Doubt {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  priority: Priority;
  status: DoubtStatus;
  createdAt: string;
  imageUrl?: string;
  answer?: string;
  aiSuggestion?: string;
}

export interface UserStats {
  totalDoubts: number;
  solved: number;
  pending: number;
}
