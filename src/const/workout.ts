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
