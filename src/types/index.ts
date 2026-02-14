
// types/index.ts

export interface Subject {
  id: string;
  name: string;
  difficulty: number; // 1-5
  examDate: string; // ISO string
  minDailyHours: number;
}

export interface ScheduleItem {
  subjectId: string;
  allocatedHours: number;
  priorityScore: number;
}

export interface StudyPlan {
  id: string;
  createdAt: string;
  totalDailyHours: number;
  subjects: Subject[];
  schedule: ScheduleItem[];
}
