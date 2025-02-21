import { UseControllerReturn } from "react-hook-form";
import { AddExerciseToWorkoutTemplateForm, Intensity, Speed } from "./Workout";
import { InputOption } from "./General";

export type SetExerciseDetailsControlReturn = {
  control: UseControllerReturn<AddExerciseToWorkoutTemplateForm, "sets">;
  onDeleteSet: (setNumber: number | null) => void;
  onAddSet: () => void;
  onChangeRepsForSet: (repCount: number, setNumber: number) => void;
  getSpeed: (setNumber: number) => InputOption<string, Speed> | undefined;
  onChangeIntensityForSet: (
    intensity: InputOption<string, Intensity>,
    setNumber: number
  ) => void;
  getIntensity: (
    setNumber: number
  ) => InputOption<string, Intensity> | undefined;
  onChangeSpeedForSet: (
    speed: InputOption<string, Speed>,
    setNumber: number
  ) => void;
  onChangeIsDropset: (isDropSet: "no" | "yes", setNumber: number) => void;
  getIsDropset: (setNumber: number) => "no" | "yes" | null;
  onChangeRestForSet: (restSec: number, setNumber: number) => void;
};
