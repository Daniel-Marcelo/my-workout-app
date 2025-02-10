import { useController, useForm } from "react-hook-form";
import { CreateExerciseForm } from "../../types/Workout";
import { muscleGroupOptions } from "../../const/workout";
import { useState } from "react";

export const useAddExerciseForm = () => {
  const form = useForm<CreateExerciseForm>({
    defaultValues: {
      name: "",
      muscleGroups: [],
      unilateral: false,
      equipment: { name: "Freeweight", code: "freeweight" },
    },
  });

  const nameControl = useController({
    control: form.control,
    name: "name",
    rules: {
      required: true,
    },
  });

  const muscleGroupsControl = useController({
    control: form.control,
    name: "muscleGroups",
    rules: {
      required: true,
    },
  });

  const unilateralControl = useController({
    control: form.control,
    name: "unilateral",
  });

  const equipmentControl = useController({
    control: form.control,
    name: "equipment",
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

  const formErrors = form.formState.errors;

  return {
    form,
    formErrors,
    nameControl,
    unilateralControl,
    equipmentControl,
    muscleGroupsControl: {
      ...muscleGroupsControl,
      filteredMuscleGroups,
      search,
    },
  };
};
