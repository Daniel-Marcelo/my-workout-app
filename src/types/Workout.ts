export type CreateExerciseForm = {
  name: string;
  muscleGroups: string[];
  unilateral: boolean;
  equipment: { name: string; code: string };
};
