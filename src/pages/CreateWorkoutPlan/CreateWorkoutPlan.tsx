import { useState } from "react";
import { AddExerciseToPlanForm } from "../../components/AddExerciseToPlanForm";
import { ExerciseTemplate, PlanWorkout } from "../../types/Workout";
import { WithId } from "../../types/General";
import { ConfigureExerciseToAddToPlanForm } from "../../components/ConfigureExerciseToAddToPlanForm";
import { ConfigureSetOfExerciseToAddToPlanForm } from "../../components/ConfigureSetOfExerciseToAddToPlanForm";
import { isNil } from "lodash";
import { CreatePlanForm } from "../../components/CreatePlanForm";
import { useCreateWorkoutPlan } from "../../hooks/mutations/useCreateWorkoutPlan";
import { v4 as uuidv4 } from "uuid";
import { useCreateWorkoutPlanForm } from "./useCreateWorkoutPlanForm";
import { useSetConfigForm } from "./useSetConfigForm";
import { CreateWorkoutPlanContainer } from "./CreateWorkoutPlan.styled";

export const CreateWorkoutPlan = () => {
  const [showPlanForm, setShowPlanForm] = useState(true);
  const [exerciseQueryText, setExerciseQueryText] = useState("");
  const [setConfigIndexToEdit, setSetConfigIndexToEdit] = useState<number>();
  const createWorkoutPlan = useCreateWorkoutPlan();

  const { setConfigForm, setConfigControl } = useSetConfigForm();

  const [showSelectExerciseForm, setShowSelectExerciseForm] = useState(false);
  const [exerciseToAdd, setExerciseToAdd] =
    useState<WithId<ExerciseTemplate> | null>(null);

  const [exerciseConfigToUpdate, setExerciseConfigToUpdate] = useState<{
    tempId: string | undefined;
    exercise: WithId<ExerciseTemplate> | null;
  }>();

  const { planForm, nameControl, planExercisesControl } =
    useCreateWorkoutPlanForm();

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
    <CreateWorkoutPlanContainer>
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
          />
        )}

      {!isNil(setConfigIndexToEdit) && (
        <ConfigureSetOfExerciseToAddToPlanForm
          setConfigControl={setConfigControl}
          setConfigIndexToEdit={setConfigIndexToEdit}
          setSetConfigIndexToEdit={setSetConfigIndexToEdit}
          setConfig={setConfigControl.field.value}
        />
      )}
    </CreateWorkoutPlanContainer>
  );
};
