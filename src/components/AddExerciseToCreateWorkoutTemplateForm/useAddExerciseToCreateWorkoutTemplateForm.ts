import { useController, useForm, UseFormReturn } from "react-hook-form";
import { InputOption, WithId } from "../../types/General";
import {
  AddExerciseToWorkoutTemplateForm,
  ExerciseTemplate,
  Intensity,
  SetRounds,
  Speed,
} from "../../types/Workout";
import { useEffect } from "react";
import { intensityOptions, speedOptions } from "../../const/workout";
import { isNil } from "lodash";
import { SetExerciseDetailsControlReturn } from "../../types/WorkoutTemplateForm";

const useSetDetailsControl = (
  form: UseFormReturn<AddExerciseToWorkoutTemplateForm>
): SetExerciseDetailsControlReturn => {
  const setsDetailControl = useController({
    name: "sets",
    control: form.control,
    rules: {
      onChange: (e) => console.log(e),
      validate: (sets) => {
        return sets.every((set) => {
          if (!isNil(set.rounds[0].isDropset)) return true;
          return "Please select if this is a dropset";
        });
      },
    },
  });

  const onChangeRepsForSet = (
    repCount: number,
    setIndex: number,
    roundInd = 0
  ) => {
    const currentSetDetail = setsDetailControl.field.value;
    const updatedSetDetail: SetRounds[] = [...currentSetDetail].map(
      (set, index) => {
        if (index === setIndex) {
          return {
            ...set,
            rounds: set.rounds.map((round, roundIndex) =>
              roundIndex === roundInd ? { ...round, reps: repCount } : round
            ),
          };
        }
        return set;
      }
    );
    setsDetailControl.field.onChange(updatedSetDetail);
  };

  const onChangeRestForSet = (
    restSec: number,
    setIndex: number,
    roundInd = 0
  ) => {
    const currentSetDetail = setsDetailControl.field.value;
    const updatedSetDetail: SetRounds[] = [...currentSetDetail].map(
      (set, index) => {
        if (index === setIndex) {
          return {
            ...set,
            rounds: set.rounds.map((round, roundIndex) =>
              roundIndex === roundInd
                ? { ...round, restSeconds: restSec }
                : round
            ),
          };
        }
        return set;
      }
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
    const code = setsDetailControl.field.value[setNumber].rounds[0].speed;
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
    const code = setsDetailControl.field.value[setNumber].rounds[0].intensity;
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
    const isDropset =
      setsDetailControl.field.value[setNumber]?.rounds[0].isDropset;
    if (isNil(isDropset)) return null;
    return isDropset ? "yes" : "no";
  };

  const onDeleteSet = (setNumber: number | null) => {
    if (setNumber === null) return;
    const currentSetsDetail = setsDetailControl.field.value;
    const updatedSetsDetail = currentSetsDetail.filter(
      (_, index) => index !== setNumber
    );
    setsDetailControl.field.onChange(updatedSetsDetail);
  };

  const onAddSet = () => {
    const currentSetsDetail = setsDetailControl.field.value;
    const updatedSetsDetail = [
      ...currentSetsDetail,
      getDefaultSetTemplate(currentSetsDetail.length + 1),
    ];
    setsDetailControl.field.onChange(updatedSetsDetail);
  };
  return {
    control: setsDetailControl,
    onDeleteSet,
    onAddSet,
    onChangeRepsForSet,
    getSpeed,
    onChangeIntensityForSet,
    getIntensity,
    onChangeSpeedForSet,
    onChangeIsDropset,
    getIsDropset,
    onChangeRestForSet,
  };
};

const getDefaultSetTemplate = (setNumber = 1): SetRounds => ({
  rounds: [
    {
      setNumber,
      reps: 10,
      intensity: "moderate",
      speed: "medium",
      isDropset: null,
      restSeconds: 60,
    },
  ],
});

export const useAddExerciseToCreateWorkoutTemplateForm = (
  exercise: WithId<ExerciseTemplate>
) => {
  const form = useForm<AddExerciseToWorkoutTemplateForm>({
    defaultValues: {
      name: "",
      muscleGroups: [],
      equipment: "",
      notes: "",
      superset: false,
      sets: [
        getDefaultSetTemplate(),
        getDefaultSetTemplate(2),
        getDefaultSetTemplate(3),
      ],
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
    setsDetailControl,
    supersetControl,
    formErrors,
  };
};
