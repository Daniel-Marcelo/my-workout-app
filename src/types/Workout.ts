import { InputOption } from "./General";

export type CreateExerciseForm = {
  name: string;
  muscleGroups: InputOption[];
  unilateral: boolean;
  equipment: InputOption;
};

export type ExerciseTemplate = {
  name: string;
  muscleGroups: string[];
  unilateral: boolean;
  equipment: string;
};

export type CreateWorkoutTemplateForm = {
  name: string;
  muscleGroups: InputOption[];
  exercises: ({ tempId: string } & AddExerciseToWorkoutTemplateForm)[];
};

export type SetTemplate = {
  setNumber: number;
  reps: number;
  intensity: Intensity;
  speed: Speed;
};

export type AddExerciseToWorkoutTemplateForm = {
  name: string;
  equipment: string;
  muscleGroups: string[];
  numberOfSets: number;
  superset: boolean;
  notes: string;
  sets: SetTemplate[];
};

export type Speed = "slow" | "medium" | "fast" | "view-notes";
export type Intensity = "light" | "moderate" | "heavy" | "view-notes";
