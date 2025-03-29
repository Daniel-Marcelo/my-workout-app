import { useController, useForm } from "react-hook-form";
import { PlanWorkout, WorkoutPlanForm } from "../../types/Workout";

export const useCreateWorkoutPlanForm = () => {
  const planForm = useForm<WorkoutPlanForm>({
    defaultValues: { name: "", planExercises: [] as PlanWorkout[] },
  });
  const nameControl = useController({
    name: "name",
    control: planForm.control,
    rules: {
      required: true,
    },
  });

  const planExercisesControl = useController({
    name: "planExercises",
    control: planForm.control,
    rules: {
      required: true,
    },
  });

  return {
    planForm,
    nameControl,
    planExercisesControl,
  };
};
