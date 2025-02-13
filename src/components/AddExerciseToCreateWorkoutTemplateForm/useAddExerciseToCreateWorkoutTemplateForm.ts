import { useController, useForm, UseFormReturn } from "react-hook-form";
import { InputOption, WithId } from "../../types/General";
import {
  AddExerciseToWorkoutTemplateForm,
  Exercise,
  Intensity,
  Speed,
} from "../../types/Workout";
import { useEffect } from "react";
import { intensityOptions, speedOptions } from "../../const/workout";

const useSetDetailsControl = (
  form: UseFormReturn<AddExerciseToWorkoutTemplateForm>
) => {
  const setsDetailControl = useController({
    name: "sets",
    control: form.control,
    rules: {
      onChange: (e) => console.log(e),
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
    const currentSetDetail = setsDetailControl.field.value;
    const updatedSetDetail = [...currentSetDetail].map((set, index) =>
      index === setNumber ? { ...set, intensity: intensity.code } : set
    );
    setsDetailControl.field.onChange(updatedSetDetail);
  };

  const getIntensity = (setNumber: number) => {
    const code = setsDetailControl.field.value[setNumber].intensity;
    return intensityOptions.find((option) => option.code === code);
  };

  return {
    ...setsDetailControl,
    onChangeRepsForSet,
    getSpeed,
    onChangeIntensityForSet,
    getIntensity,
    onChangeSpeedForSet,
  };
};
export const useAddExerciseToCreateWorkoutTemplateForm = (
  exercise: WithId<Exercise>
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
        {
          reps: 10,
          intensity: "moderate",
          speed: "medium",
        },
        {
          reps: 10,
          intensity: "moderate",
          speed: "medium",
        },
        {
          reps: 10,
          intensity: "moderate",
          speed: "medium",
        },
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
    // console.log("exercise", exercise);
    form.setValue("name", exercise.name);
    form.setValue("muscleGroups", exercise.muscleGroups);
    form.setValue("equipment", exercise.equipment);
    form.setValue("numberOfSets", 3);
    form.setValue("superset", false);
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
