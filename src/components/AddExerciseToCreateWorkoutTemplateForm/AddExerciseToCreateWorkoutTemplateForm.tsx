import React from "react";
import { FlexBox } from "../FlexBox";
import { InputText } from "primereact/inputtext";
import range from "lodash/range";
import { useAddExerciseToCreateWorkoutTemplateForm } from "./useAddExerciseToCreateWorkoutTemplateForm";
import { WithId } from "../../types/General";
import {
  AddExerciseToWorkoutTemplateForm,
  ExerciseTemplate,
} from "../../types/Workout";
import { Button } from "primereact/button";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";
import { Dialog } from "primereact/dialog";
import { AddSetToWorkoutTemplate } from "../AddSetToWorkoutTemplate";
import "./index.css";

export type AddExerciseToCreateWorkoutTemplateFormProps = {
  exercise: WithId<ExerciseTemplate>;
  onSaveExercise: (form: AddExerciseToWorkoutTemplateForm) => void;
};

export const AddExerciseToCreateWorkoutTemplateForm = ({
  exercise,
  onSaveExercise,
}: AddExerciseToCreateWorkoutTemplateFormProps) => {
  const { form, formErrors, notesControl, setsDetailControl } =
    useAddExerciseToCreateWorkoutTemplateForm(exercise);
  const [setIndexToDelete, setSetIndexToDelete] = React.useState<number | null>(
    null
  );

  const onSubmit = form.handleSubmit(
    (formData) => {
      onSaveExercise(formData);
    },
    (e) => {
      console.log("errors", e);
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <FlexBox gap="1rem" align="center">
        <label htmlFor={`notes`}>Notes</label>
        <InputText
          id={`notes`}
          type="text"
          style={{ flex: 1 }}
          className="p-inputtext-sm"
          value={notesControl.field.value}
          onChange={notesControl.field.onChange}
        />
      </FlexBox>
      <FlexBox
        direction="column"
        className="workout-template-exercise-set-list"
      >
        <SwipeableList>
          <Dialog
            header={`Delete Set ${(setIndexToDelete ?? 0) + 1}`}
            visible={setIndexToDelete !== null}
            style={{ width: "75vw" }}
            onHide={() => setSetIndexToDelete(null)}
          >
            Confirm deletion of set
            <FlexBox
              gap="1rem"
              justify="flex-end"
              style={{ marginTop: "2rem" }}
            >
              <Button
                severity="secondary"
                onClick={() => setSetIndexToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setsDetailControl.onDeleteSet(setIndexToDelete);
                  setSetIndexToDelete(null);
                }}
              >
                Delete
              </Button>
            </FlexBox>
          </Dialog>
          {range(0, setsDetailControl.control.field.value.length).map(
            (index) => (
              <AddSetToWorkoutTemplate
                control={setsDetailControl}
                formErrors={formErrors}
                index={index}
                setSetIndexToDelete={setSetIndexToDelete}
              />
            )
          )}
        </SwipeableList>
      </FlexBox>

      <FlexBox
        gap="1rem"
        style={{ marginTop: "1rem" }}
        align="center"
        justify="center"
      >
        <Button
          type="button"
          icon="pi pi-plus"
          size="small"
          label="Add Set"
          outlined
          onClick={setsDetailControl.onAddSet}
        />
      </FlexBox>
      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
