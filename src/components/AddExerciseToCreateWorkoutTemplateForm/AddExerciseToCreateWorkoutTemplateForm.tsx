import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { FlexBox } from "../FlexBox";
import { InputText } from "primereact/inputtext";
import range from "lodash/range";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { intensityOptions, speedOptions } from "../../const/workout";
import { useAddExerciseToCreateWorkoutTemplateForm } from "./useAddExerciseToCreateWorkoutTemplateForm";
import { WithId } from "../../types/General";
import {
  AddExerciseToWorkoutTemplateForm,
  ExerciseTemplate,
} from "../../types/Workout";
import { Button } from "primereact/button";
import { isNil } from "lodash";
import {
  SwipeableList,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import "./index.css";
import { Dialog } from "primereact/dialog";
import { AddExerciseToCreateTemplateDropsetControl } from "../AddExerciseToCreateTemplateDropsetControl/AddExerciseToCreateTemplateDropsetControl";

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
            (setIndex) => (
              <React.Fragment>
                <Divider />
                <SwipeableListItem
                  threshold={0.25}
                  swipeLeft={{
                    content: (
                      <FlexBox
                        align="center"
                        className="delete-set-workout-template-container"
                      >
                        <div>Delete Set</div>
                      </FlexBox>
                    ),
                    action: () => setSetIndexToDelete(setIndex),
                  }}
                  onSwipeProgress={(progress) =>
                    console.info(`Swipe progress: ${progress}%`)
                  }
                >
                  <FlexBox key={setIndex} direction="column">
                    <div style={{ marginBottom: ".5rem" }}>
                      {setsDetailControl.getIsDropset(setIndex) === "yes"
                        ? "Dropset "
                        : "Set "}
                      {setIndex + 1}
                    </div>

                    <AddExerciseToCreateTemplateDropsetControl
                      setIndex={setIndex}
                      formErrors={formErrors}
                      getIsDropset={setsDetailControl.getIsDropset}
                      onChangeIsDropset={setsDetailControl.onChangeIsDropset}
                      value={setsDetailControl.control.field.value}
                    />
                    {!isNil(setsDetailControl.getIsDropset(setIndex)) && (
                      <>
                        {/* <FlexBox
                  gap="1rem"
                  align="center"
                  style={{ marginBottom: "1rem", marginTop: "1rem" }}
                >
                  <label htmlFor="superset">Superset?</label>
                  <Checkbox
                    name="superset"
                    checked={supersetControl.field.value}
                    value={supersetControl.field.value}
                    onChange={supersetControl.field.onChange}
                  />
                </FlexBox> */}

                        <FlexBox gap="1rem" style={{ marginTop: "1rem" }}>
                          <FlexBox direction="column" gap=".5rem">
                            <label
                              htmlFor={`reps-${setIndex}`}
                              style={{ fontSize: ".75rem" }}
                            >
                              Reps
                            </label>
                            <InputNumber
                              size={1}
                              inputId={`reps-${setIndex}`}
                              value={
                                setsDetailControl.control.field.value[setIndex]
                                  .reps
                              }
                              onChange={(e) =>
                                e.value &&
                                setsDetailControl.onChangeRepsForSet(
                                  e.value,
                                  setIndex
                                )
                              }
                              buttonLayout="horizontal"
                              step={1}
                              maxFractionDigits={0}
                              max={10}
                              min={1}
                              style={{
                                height: "38px",
                              }}
                            />
                          </FlexBox>

                          <FlexBox direction="column" gap=".5rem">
                            <label
                              htmlFor={`speed-${setIndex}`}
                              style={{ fontSize: ".75rem" }}
                            >
                              Speed
                            </label>
                            <Dropdown
                              className="p-inputtext-sm"
                              inputId={`speed-${setIndex}`}
                              optionLabel="name"
                              value={setsDetailControl.getSpeed(setIndex)}
                              onChange={(e) =>
                                e.value &&
                                setsDetailControl.onChangeSpeedForSet(
                                  e.value,
                                  setIndex
                                )
                              }
                              options={speedOptions}
                            />
                          </FlexBox>

                          <FlexBox direction="column" gap=".5rem">
                            <label
                              htmlFor={`intensity-${setIndex}`}
                              style={{ fontSize: ".75rem" }}
                            >
                              Intensity
                            </label>
                            <Dropdown
                              className="p-inputtext-sm"
                              inputId={`intensity-${setIndex}`}
                              optionLabel="name"
                              value={setsDetailControl.getIntensity(setIndex)}
                              onChange={(e) =>
                                e.value &&
                                setsDetailControl.onChangeIntensityForSet(
                                  e.value,
                                  setIndex
                                )
                              }
                              options={intensityOptions}
                            />
                          </FlexBox>
                        </FlexBox>
                      </>
                    )}
                  </FlexBox>
                </SwipeableListItem>
              </React.Fragment>
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
