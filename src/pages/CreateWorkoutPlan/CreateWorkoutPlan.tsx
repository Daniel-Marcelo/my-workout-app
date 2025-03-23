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
import { v4 as uuidv4 } from "uuid";

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

  const [exerciseConfigToUpdate, setExerciseConfigToUpdate] = useState<{
    tempId: string | undefined;
    exercise: WithId<ExerciseTemplate> | null;
  }>();

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
    if (exerciseConfigToUpdate) {
      const updatedPlanExercises = planExercisesControl.field.value.map(
        (planExercise) => {
          if (planExercise.tempId === exerciseConfigToUpdate.tempId) {
            return {
              exercise: exerciseConfigToUpdate.exercise,
              setConfig: setConfigControl.field.value,
              tempId: planExercise.tempId,
            };
          }
          return planExercise;
        }
      );
      planExercisesControl.field.onChange(updatedPlanExercises);
      setExerciseConfigToUpdate(undefined);
    } else if (exerciseToAdd) {
      planExercisesControl.field.onChange([
        ...(planExercisesControl.field.value ?? []),
        {
          exercise: exerciseToAdd,
          setConfig: setConfigControl.field.value,
          tempId: uuidv4(),
        },
      ]);
      setExerciseToAdd(null);
    }
    setShowPlanForm(true);
    setSetConfigIndexToEdit(undefined);
    setExerciseQueryText("");
    setConfigForm.reset();
  };

  const savePlan = planForm.handleSubmit(
    (data) => createWorkoutPlan.mutate({ workoutPlan: data }),
    (err) => console.log(err)
  );

  const onClickExercise = (planExerciseConfig: PlanWorkout) => {
    setConfigControl.field.onChange(planExerciseConfig.setConfig);
    setExerciseConfigToUpdate({
      tempId: planExerciseConfig.tempId,
      exercise: planExerciseConfig.exercise,
    });
    setShowPlanForm(false);
    setShowSelectExerciseForm(false);
  };

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
          onClickExercise={onClickExercise}
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

      {(exerciseToAdd || exerciseConfigToUpdate) &&
        isNil(setConfigIndexToEdit) && (
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
