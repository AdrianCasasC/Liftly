import { Exercise } from './exercise.interface';

export interface TemplateExercise {
  id?: number;
  templateId?: number;
  exerciseId: number;
  exercise?: Exercise; // Optional expanded relation
  sets: number;
  reps: number;
  restTime: number; // in seconds
}

export interface TrainingTemplate {
  id: number;
  userId: number;
  name: string;
  description: string;
  exercises?: TemplateExercise[];
}
