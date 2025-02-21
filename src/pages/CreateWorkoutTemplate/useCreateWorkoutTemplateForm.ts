import { useController, useForm, UseFormReturn } from "react-hook-form";
import {
  CreateWorkoutTemplateForm,
  ExerciseTemplate,
} from "../../types/Workout";
import { useState } from "react";
import { useGetExercises } from "../../hooks/queries/useGetExercises";
import { WithId } from "../../types/General";

const useExercisesControl = (
  form: UseFormReturn<CreateWorkoutTemplateForm>
) => {
  const getExercises = useGetExercises();
  const exercises = getExercises.data ?? [];

  const exercisesControl = useController({
    control: form.control,
    name: "exercises",
    rules: {
      validate: (data) =>
        !data || data.length === 0
          ? "Please select at least one exercise"
          : true,
    },
  });

  const [filteredExercises, setFilteredExercises] = useState<
    WithId<ExerciseTemplate>[]
  >([]);

  const search = (text: string) => {
    let filteredExercises: WithId<ExerciseTemplate>[];

    if (!text.trim().length) {
      filteredExercises = [...exercises];
    } else {
      filteredExercises = exercises.filter((muscle) => {
        return muscle.name.toLowerCase().includes(text.toLowerCase());
      });
    }

    setFilteredExercises(filteredExercises);
  };

  return {
    ...exercisesControl,
    filteredExercises,
    search,
  };
};

export const useCreateWorkoutTemplateForm = () => {
  const form = useForm<CreateWorkoutTemplateForm>({
    defaultValues: {
      name: "",
      exercises: [],
    },
  });

  const nameControl = useController({
    control: form.control,
    name: "name",
    rules: {
      required: "Please enter a name",
    },
  });

  const exercisesControl = useExercisesControl(form);

  const formErrors = form.formState.errors;

  return {
    form,
    formErrors,
    nameControl,
    exercisesControl,
  };
};
