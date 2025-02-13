import { InputText } from "primereact/inputtext";
import { FlexBox } from "../../components/FlexBox";
import { AutoComplete } from "primereact/autocomplete";
import { useCreateWorkoutTemplateForm } from "./useCreateWorkoutTemplateForm";
import { Divider } from "primereact/divider";
import {
  AddExerciseToWorkoutTemplateForm,
  ExerciseTemplate,
} from "../../types/Workout";
import { WithId } from "../../types/General";
import { useState } from "react";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { exerciseTypes } from "../../const/workout";
import { AddExerciseToCreateWorkoutTemplateForm } from "../../components/AddExerciseToCreateWorkoutTemplateForm";
import { FormEvent } from "primereact/ts-helpers";
import { useToast } from "../../context/ToastContext";

export const CreateWorkoutTemplatePage = () => {
  const toast = useToast();
  const { formErrors, nameControl, muscleGroupsControl, exercisesControl } =
    useCreateWorkoutTemplateForm();

  const [selectedExercise, setSelectedExercise] =
    useState<WithId<ExerciseTemplate>>();

  const selectExercise = (event: FormEvent<WithId<ExerciseTemplate>[]>) => {
    const exercise = event.value?.pop();
    if (!exercise) return;
    setSelectedExercise(exercise);
  };

  const onSaveExercise = (exercise: AddExerciseToWorkoutTemplateForm) => {
    const currentExercises = exercisesControl.field.value;
    const updatedExercises = [...currentExercises, exercise];
    exercisesControl.field.onChange(updatedExercises);
    toast.showToast({
      severity: "success",
      summary: "Exercise added",
    });
    setSelectedExercise(undefined);
  };

  return (
    <div style={{ padding: "3rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Create Workout Template
      </h2>
      <form>
        <FlexBox
          direction="column"
          gap="1rem"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            type="text"
            value={nameControl.field.value}
            onChange={nameControl.field.onChange}
            invalid={!!formErrors.name?.message}
          />
        </FlexBox>

        <FlexBox
          direction="column"
          gap="1rem"
          style={{ width: "100%", marginBottom: "2rem" }}
        >
          <label htmlFor="name">Muscle Groups</label>
          <AutoComplete
            field="name"
            multiple
            value={muscleGroupsControl.field.value}
            suggestions={muscleGroupsControl.filteredMuscleGroups}
            completeMethod={(e) => muscleGroupsControl.search(e.query)}
            onChange={muscleGroupsControl.field.onChange}
            pt={{
              container: {
                style: {
                  width: "100%",
                },
              },
            }}
          />
        </FlexBox>
      </form>

      <Divider />

      <FlexBox
        direction="column"
        gap="1rem"
        style={{ width: "100%", marginBottom: "1rem", marginTop: "1rem" }}
      >
        <label htmlFor="name">Select Exercise</label>
        <AutoComplete
          field="name"
          multiple
          suggestions={exercisesControl.filteredExercises}
          completeMethod={(e) => exercisesControl.search(e.query)}
          onChange={(e) => selectExercise(e)}
          pt={{
            container: {
              style: {
                width: "100%",
              },
            },
          }}
        />
      </FlexBox>

      {selectedExercise && (
        <Card
          title={
            <FlexBox
              gap=".5rem"
              align="center"
              style={{ marginBottom: "1rem" }}
            >
              <div
                className="p-card-title"
                style={{ marginBottom: 0, marginRight: ".5rem" }}
              >
                {selectedExercise.name}
              </div>
              {selectedExercise.muscleGroups.map((muscleGroup) => (
                <Tag severity="info" key={muscleGroup} value={muscleGroup} />
              ))}
            </FlexBox>
          }
          subTitle={
            exerciseTypes.find(
              (exerciseType) => exerciseType.code === selectedExercise.equipment
            )?.name
          }
        >
          <AddExerciseToCreateWorkoutTemplateForm
            exercise={selectedExercise}
            onSaveExercise={onSaveExercise}
          />
        </Card>
      )}
    </div>
  );
};
