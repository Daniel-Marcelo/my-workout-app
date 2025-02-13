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
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { v4 as uuidv4 } from "uuid";
import { Button } from "primereact/button";
import { useCreateWorkoutTemplate } from "../../hooks/mutations/useCreateWorkoutTemplate";

export const CreateWorkoutTemplatePage = () => {
  const toast = useToast();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const createWorkoutTemplate = useCreateWorkoutTemplate();
  const {
    form,
    formErrors,
    nameControl,
    muscleGroupsControl,
    exercisesControl,
  } = useCreateWorkoutTemplateForm();

  const [selectedExercise, setSelectedExercise] =
    useState<WithId<ExerciseTemplate>>();

  const selectExercise = (event: FormEvent<WithId<ExerciseTemplate>[]>) => {
    const exercise = event.value?.pop();
    if (!exercise) return;
    setSelectedExercise(exercise);
  };

  const onSaveExercise = (exercise: AddExerciseToWorkoutTemplateForm) => {
    if (!selectedExercise) return;
    const currentExercises = exercisesControl.field.value;
    const newExercise = {
      tempId: uuidv4(),
      sourceExerciseId: selectedExercise.id,
      ...exercise,
    };
    const updatedExercises = [...currentExercises, newExercise];
    exercisesControl.field.onChange(updatedExercises);
    console.log("updatedExercises", updatedExercises);
    toast.showToast({
      severity: "success",
      summary: "Exercise added",
    });
    setExpanded((prev) => ({
      ...prev,
      [newExercise.tempId]: false,
    }));
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
            invalid={!!formErrors.muscleGroups?.message}
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
      {exercisesControl.field.value && (
        <FlexBox gap="1rem" direction="column">
          {exercisesControl.field.value.map((exercise) => (
            <Card
              style={{ cursor: "pointer" }}
              onClick={() =>
                setExpanded((prev) => ({
                  [exercise.tempId]: !prev[exercise.tempId],
                }))
              }
              pt={{
                title: {
                  style: { marginBottom: 0 },
                },
              }}
              subTitle={expanded[exercise.tempId] ? exercise.notes : ""}
              title={
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FlexBox gap="1rem">
                    <div>{exercise.name}</div>
                    {exercise.superset && (
                      <Tag severity="success">Superset</Tag>
                    )}
                  </FlexBox>
                  <i
                    className={`pi ${
                      expanded[exercise.tempId]
                        ? "pi-chevron-up"
                        : "pi-chevron-down"
                    }`}
                    style={{ fontSize: "1rem" }}
                  />
                </div>
              }
            >
              {expanded[exercise.tempId] && (
                <div>
                  <DataTable value={exercise.sets}>
                    <Column field="setNumber" header="Set"></Column>
                    <Column field="reps" header="Reps"></Column>
                    <Column field="speed" header="Speed"></Column>
                    <Column field="intensity" header="Intensity"></Column>
                  </DataTable>
                </div>
              )}
            </Card>
          ))}
        </FlexBox>
      )}

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
          invalid={!!formErrors.exercises?.message}
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
      <div style={{ textAlign: "center" }}>
        <Button
          type="submit"
          onClick={form.handleSubmit((workoutTemplate) => {
            createWorkoutTemplate.mutate({ workoutTemplate });
          })}
        >
          Save Workout Template
        </Button>
      </div>
    </div>
  );
};
