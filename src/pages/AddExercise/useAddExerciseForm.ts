import { useController, useForm } from "react-hook-form";
import { CreateExerciseForm } from "../../types/Workout";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { muscleGroupOptions } from "../../const/workout";
import { useState } from "react";

export const useAddExerciseForm = () => {
  const form = useForm<CreateExerciseForm>({
    defaultValues: {
      name: "",
      muscleGroups: [],
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

  const [filteredMuscleGroups, setFilteredMuscleGroups] =
    useState(muscleGroupOptions);

  const search = (event: AutoCompleteCompleteEvent) => {
    let filteredMuscleGroups;

    if (!event.query.trim().length) {
      filteredMuscleGroups = [...muscleGroupOptions];
    } else {
      filteredMuscleGroups = muscleGroupOptions.filter((muscle) => {
        return muscle.code.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredMuscleGroups(filteredMuscleGroups);
  };

  const formErrors = form.formState.errors;

  return {
    form,
    nameControl,
    formErrors,
    muscleGroupsControl: {
      ...muscleGroupsControl,
      filteredMuscleGroups,
      search,
    },
  };
};
