import { InputOption, WithId } from "./General";

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
  exercises: ({ tempId: string } & AddExerciseToWorkoutTemplateForm)[];
};

export type SetTemplate = {
  setNumber: number;
  isDropset: boolean | null;
  reps: number;
  restSeconds: number;
  intensity: Intensity;
  speed: Speed;
};

export type SetRounds = { rounds: SetTemplate[] };

export type AddExerciseToWorkoutTemplateForm = {
  name: string;
  equipment: string;
  muscleGroups: string[];
  superset: boolean;
  notes: string;
  sets: SetRounds[];
};

export type Speed = "slow" | "medium" | "fast" | "view-notes";
export type Intensity = "light" | "moderate" | "heavy" | "view-notes";

export type SetConfig = {
  dropset: boolean;
  reps: number;
  restSeconds: number;
};

export type PlanWorkout = {
  exercise: WithId<ExerciseTemplate>;
  setConfig: SetConfig[];
};

export type WorkoutPlanForm = {
  name: string;
  planExercises: PlanWorkout[];
};

export type PlanExerciseSetConfigForm = { setConfig: SetConfig[] };
