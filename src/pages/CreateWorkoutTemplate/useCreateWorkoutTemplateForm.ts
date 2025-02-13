import { useController, useForm, UseFormReturn } from "react-hook-form";
import {
  CreateWorkoutTemplateForm,
  ExerciseTemplate,
} from "../../types/Workout";
import { muscleGroupOptions } from "../../const/workout";
import { useState } from "react";
import { useGetExercises } from "../../hooks/queries/useGetExercises";
import { WithId } from "../../types/General";

const useMuscleGroupsControl = (
  form: UseFormReturn<CreateWorkoutTemplateForm>
) => {
  const muscleGroupsControl = useController({
    control: form.control,
    name: "muscleGroups",
    rules: {
      required: true,
    },
  });

  const [filteredMuscleGroups, setFilteredMuscleGroups] =
    useState(muscleGroupOptions);

  const search = (text: string) => {
    let filteredMuscleGroups;

    if (!text.trim().length) {
      filteredMuscleGroups = [...muscleGroupOptions];
    } else {
      filteredMuscleGroups = muscleGroupOptions.filter((muscle) => {
        return muscle.code.toLowerCase().startsWith(text.toLowerCase());
      });
    }

    setFilteredMuscleGroups(filteredMuscleGroups);
  };

  return {
    ...muscleGroupsControl,
    filteredMuscleGroups,
    search,
  };
};

const useExercisesControl = (
  form: UseFormReturn<CreateWorkoutTemplateForm>
) => {
  const getExercises = useGetExercises();
  const exercises = getExercises.data ?? [];

  const exercisesControl = useController({
    control: form.control,
    name: "exercises",
    rules: {
      required: true,
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
      muscleGroups: [],
      exercises: [],
    },
  });

  const nameControl = useController({
    control: form.control,
    name: "name",
    rules: {
      required: true,
    },
  });

  const muscleGroupsControl = useMuscleGroupsControl(form);
  const exercisesControl = useExercisesControl(form);

  const formErrors = form.formState.errors;

  return {
    form,
    formErrors,
    nameControl,
    muscleGroupsControl,
    exercisesControl,
  };
};
