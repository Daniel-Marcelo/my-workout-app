import { useController, useForm } from "react-hook-form";
import { useState } from "react";
import { AddExerciseToPlanForm } from "../../components/AddExerciseToPlanForm";
import {
  ExerciseTemplate,
  PlanExerciseSetConfigForm,
  PlanWorkout,
  WorkoutPlanForm,
} from "../../types/Workout";
import { WithId } from "../../types/General";
import { ConfigureExerciseToAddToPlanForm } from "../../components/ConfigureExerciseToAddToPlanForm";
import { defaultSingleSetConfig } from "../../const/workout";
import { ConfigureSetOfExerciseToAddToPlanForm } from "../../components/ConfigureSetOfExerciseToAddToPlanForm";
import { isNil } from "lodash";
import { CreatePlanForm } from "../../components/CreatePlanForm";
import { useCreateWorkoutPlan } from "../../hooks/mutations/useCreateWorkoutPlan";

export const CreateWorkoutPlan = () => {
  const [showPlanForm, setShowPlanForm] = useState(true);
  const [exerciseQueryText, setExerciseQueryText] = useState("");
  const [setConfigIndexToEdit, setSetConfigIndexToEdit] = useState<number>();
  const createWorkoutPlan = useCreateWorkoutPlan();

  const setConfigForm = useForm<PlanExerciseSetConfigForm>({
    defaultValues: {
      setConfig: [
        defaultSingleSetConfig(),
        defaultSingleSetConfig(),
        defaultSingleSetConfig(),
      ],
    },
  });

  const setConfigControl = useController({
    name: "setConfig",
    control: setConfigForm.control,
  });

  const [showSelectExerciseForm, setShowSelectExerciseForm] = useState(false);
  const [exerciseToAdd, setExerciseToAdd] =
    useState<WithId<ExerciseTemplate> | null>(null);

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

  const onSaveExercise = () => {
    if (exerciseToAdd) {
      setShowPlanForm(true);
      planExercisesControl.field.onChange([
        ...(planExercisesControl.field.value ?? []),
        {
          exercise: exerciseToAdd,
          setConfig: setConfigControl.field.value,
        },
      ]);
      setExerciseToAdd(null);
      setSetConfigIndexToEdit(undefined);
      setExerciseQueryText("");
      setConfigForm.reset();
    }
  };

  const savePlan = planForm.handleSubmit(
    (data) => createWorkoutPlan.mutate({ workoutPlan: data }),
    (err) => console.log(err)
  );

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "1rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      {showPlanForm && (
        <CreatePlanForm
          planForm={planForm}
          savePlan={savePlan}
          nameControl={nameControl}
          setShowPlanForm={setShowPlanForm}
          setShowSelectExerciseForm={setShowSelectExerciseForm}
          planExercises={planExercisesControl.field.value}
        />
      )}
      {showSelectExerciseForm && (
        <AddExerciseToPlanForm
          setExerciseToAdd={setExerciseToAdd}
          setShowPlanForm={setShowPlanForm}
          setShowSelectExerciseForm={setShowSelectExerciseForm}
          exerciseQueryText={exerciseQueryText}
          setExerciseQueryText={setExerciseQueryText}
        />
      )}

      {exerciseToAdd && isNil(setConfigIndexToEdit) && (
        <ConfigureExerciseToAddToPlanForm
          onSaveExercise={onSaveExercise}
          setSetConfigIndexToEdit={setSetConfigIndexToEdit}
          setConfig={setConfigControl.field.value}
          setSetConfig={setConfigControl.field.onChange}
          setExerciseToAdd={setExerciseToAdd}
          setShowPlanForm={setShowPlanForm}
          setShowSelectExerciseForm={setShowSelectExerciseForm}
          exerciseQueryText={exerciseQueryText}
          setExerciseQueryText={setExerciseQueryText}
        />
      )}

      {!isNil(setConfigIndexToEdit) && (
        <ConfigureSetOfExerciseToAddToPlanForm
          setConfigControl={setConfigControl}
          setConfigIndexToEdit={setConfigIndexToEdit}
          setSetConfigIndexToEdit={setSetConfigIndexToEdit}
          setConfig={setConfigControl.field.value}
          setSetConfig={setConfigControl.field.onChange}
          setExerciseToAdd={setExerciseToAdd}
          setShowPlanForm={setShowPlanForm}
          setShowSelectExerciseForm={setShowSelectExerciseForm}
          exerciseQueryText={exerciseQueryText}
          setExerciseQueryText={setExerciseQueryText}
        />
      )}
    </div>
  );
};
