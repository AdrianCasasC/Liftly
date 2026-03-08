import { TrainingTemplate } from './training-template.interface';

export interface CalendarWorkout {
  id: number;
  userId: number;
  templateId: number;
  template?: TrainingTemplate; // Optional expanded relation
  scheduledDate: string; // ISO date string e.g. 'yyyy-MM-dd'
  completed: boolean;
}
