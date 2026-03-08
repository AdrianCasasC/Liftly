import { Exercise } from './exercise.interface';

export interface TemplateExercise {
  id?: number;
  templateId?: number;
  exercise: Exercise;
  sets: number;
  reps: number;
  restTimeSeconds: number;
}

export interface TrainingTemplate {
  id: number;
  userId: number;
  name: string;
  description: string;
  exercises?: TemplateExercise[];
}
