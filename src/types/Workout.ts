import { InputOption } from "./General";

export type CreateExerciseForm = {
  name: string;
  muscleGroups: InputOption[];
  unilateral: boolean;
  equipment: InputOption;
};

export type Exercise = {
  name: string;
  muscleGroups: string[];
  unilateral: boolean;
  equipment: string;
};

export type CreateWorkoutTemplateForm = {
  name: string;
  muscleGroups: InputOption[];
};
