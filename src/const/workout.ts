import { InputOption } from "../types/General";
import { Intensity, SetConfig, Speed } from "../types/Workout";

export const muscleGroupOptions = [
  { name: "Chest", code: "chest" },
  { name: "Back", code: "back" },
  { name: "Legs", code: "legs" },
  { name: "Shoulders", code: "shoulders" },
  { name: "Core", code: "core" },
  { name: "Glutes", code: "glutes" },
  { name: "Hamstrings", code: "hamstrings" },
  { name: "Quadriceps", code: "quadriceps" },
  { name: "Calves", code: "calves" },
  { name: "Biceps", code: "biceps" },
  { name: "Triceps", code: "triceps" },
  { name: "Forearms", code: "forearms" },
  { name: "Obliques", code: "obliques" },
  { name: "Traps", code: "traps" },
  { name: "Lats", code: "lats" },
  { name: "Deltoids", code: "deltoids" },
].sort((a, b) => a.code.localeCompare(b.code));

export const exerciseTypes = [
  { name: "Cable", code: "cable" },
  { name: "Freeweight", code: "freeweight" },
  { name: "Machine", code: "machine" },
  { name: "Dumbbell", code: "dumbbell" },
  { name: "Barbell", code: "barbell" },
  { name: "Bodyweight", code: "bodyweight" },
  { name: "Kettlebell", code: "kettlebell" },
  { name: "Resistance Band", code: "resistance-band" },
].sort((a, b) => a.code.localeCompare(b.code));

export const speedOptions: InputOption<string, Speed>[] = [
  { name: "Slow", code: "slow" },
  { name: "Medium", code: "medium" },
  { name: "Fast", code: "fast" },
  { name: "View Notes", code: "view-notes" },
];

export const ViewNotesCode = "view-notes";

export const intensityOptions: InputOption<string, Intensity>[] = [
  { name: "Light", code: "light" },
  { name: "Moderate", code: "moderate" },
  { name: "Heavy", code: "heavy" },
  { name: "View Notes", code: "view-notes" },
];

export const dropsetOptions: InputOption<string, string>[] = [
  {
    name: "No",
    code: "no",
  },
  { name: "2 sets", code: "2" },
  { name: "3 sets", code: "3" },
  { name: "4 sets", code: "4" },
  { name: "5 sets", code: "5" },
  { name: "6 sets", code: "6" },
  { name: "7 sets", code: "7" },
  { name: "8 sets", code: "8" },
  { name: "9 sets", code: "9" },
  { name: "10 sets", code: "10" },
];

export const defaultSingleSetConfig = (): SetConfig => ({
  dropset: false,
  reps: 8,
  restSeconds: 60,
  dropsetDetails: [],
});

export const defaultDropsetConfig = (
  dropset: boolean
): { reps: number; restSeconds: number }[] | [] => {
  if (dropset) {
    return [
      { reps: 8, restSeconds: 60 },
      { reps: 8, restSeconds: 60 },
      { reps: 8, restSeconds: 60 },
    ];
  }
  return [];
};
