import { useController, useForm, UseFormReturn } from "react-hook-form";
import { InputOption, WithId } from "../../types/General";
import {
  AddExerciseToWorkoutTemplateForm,
  ExerciseTemplate,
  Intensity,
  SetTemplate,
  Speed,
} from "../../types/Workout";
import { useEffect } from "react";
import { intensityOptions, speedOptions } from "../../const/workout";
import { isNil } from "lodash";

const useSetDetailsControl = (
  form: UseFormReturn<AddExerciseToWorkoutTemplateForm>
) => {
  const setsDetailControl = useController({
    name: "sets",
    control: form.control,
    rules: {
      onChange: (e) => console.log(e),
      validate: (sets) => {
        return sets.every((set) => {
          if (!isNil(set.isDropset)) return true;
          return false;
        });
      },
    },
  });

  const onChangeRepsForSet = (repCount: number, setNumber: number) => {
    const currentSetDetail = setsDetailControl.field.value;
    const updatedSetDetail = [...currentSetDetail].map((set, index) =>
      index === setNumber ? { ...set, reps: repCount } : set
    );
    setsDetailControl.field.onChange(updatedSetDetail);
  };

  const onChangeSpeedForSet = (
    speed: InputOption<string, Speed>,
    setNumber: number
  ) => {
    const currentSetDetail = setsDetailControl.field.value;
    const updatedSetDetail = [...currentSetDetail].map((set, index) =>
      index === setNumber ? { ...set, speed: speed.code } : set
    );
    setsDetailControl.field.onChange(updatedSetDetail);
  };

  const getSpeed = (setNumber: number) => {
    const code = setsDetailControl.field.value[setNumber].speed;
    return speedOptions.find((option) => option.code === code);
  };

  const onChangeIntensityForSet = (
    intensity: InputOption<string, Intensity>,
    setNumber: number
  ) => {
    const currentSets = setsDetailControl.field.value;
    const updatedSets = [...currentSets].map((set, index) =>
      index === setNumber ? { ...set, intensity: intensity.code } : set
    );
    setsDetailControl.field.onChange(updatedSets);
  };

  const getIntensity = (setNumber: number) => {
    const code = setsDetailControl.field.value[setNumber].intensity;
    return intensityOptions.find((option) => option.code === code);
  };

  const onChangeIsDropset = (isDropSet: "no" | "yes", setNumber: number) => {
    const currentSetsDetail = setsDetailControl.field.value;
    const updatedSetsDetail = [...currentSetsDetail].map((set, index) =>
      index === setNumber ? { ...set, isDropset: isDropSet === "yes" } : set
    );
    setsDetailControl.field.onChange(updatedSetsDetail);
  };

  const getIsDropset = (setNumber: number) => {
    const isDropset = setsDetailControl.field.value[setNumber].isDropset;
    if (isNil(isDropset)) return null;
    return isDropset ? "yes" : "no";
  };
  return {
    ...setsDetailControl,
    onChangeRepsForSet,
    getSpeed,
    onChangeIntensityForSet,
    getIntensity,
    onChangeSpeedForSet,
    onChangeIsDropset,
    getIsDropset,
  };
};

const getDefaultSetTemplate = (setNumber = 1): SetTemplate => ({
  setNumber,
  reps: 10,
  intensity: "moderate",
  speed: "medium",
  isDropset: null,
});

export const useAddExerciseToCreateWorkoutTemplateForm = (
  exercise: WithId<ExerciseTemplate>
) => {
  const form = useForm<AddExerciseToWorkoutTemplateForm>({
    defaultValues: {
      name: "",
      muscleGroups: [],
      equipment: "",
      numberOfSets: 3,
      notes: "",
      superset: false,
      sets: [
        getDefaultSetTemplate(),
        getDefaultSetTemplate(2),
        getDefaultSetTemplate(3),
      ],
    },
  });

  const numberOfSetsControl = useController({
    name: "numberOfSets",
    control: form.control,
    rules: {
      required: true,
    },
  });

  const supersetControl = useController({
    name: "superset",
    control: form.control,
  });

  const notesControl = useController({
    name: "notes",
    control: form.control,
  });

  const setsDetailControl = useSetDetailsControl(form);
  useEffect(() => {
    form.setValue("name", exercise.name);
    form.setValue("muscleGroups", exercise.muscleGroups);
    form.setValue("equipment", exercise.equipment);
    form.setValue("numberOfSets", 3);
    form.setValue("superset", false);
    form.setValue("notes", "");
    form.setValue("sets", [
      getDefaultSetTemplate(),
      getDefaultSetTemplate(2),
      getDefaultSetTemplate(3),
    ]);
  }, [exercise, form]);

  const formErrors = form.formState.errors;

  return {
    form,
    notesControl,
    numberOfSetsControl,
    setsDetailControl,
    supersetControl,
    formErrors,
  };
};
