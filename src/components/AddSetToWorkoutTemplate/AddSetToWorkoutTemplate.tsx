import { Divider } from "primereact/divider";
import React from "react";
import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import { FlexBox } from "../FlexBox";
import isNil from "lodash/isNil";
import { AddExerciseToCreateTemplateDropsetControl } from "../AddExerciseToCreateTemplateDropsetControl/AddExerciseToCreateTemplateDropsetControl";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { intensityOptions, speedOptions } from "../../const/workout";
import { FieldErrors } from "react-hook-form";
import { AddExerciseToWorkoutTemplateForm } from "../../types/Workout";
import { SetExerciseDetailsControlReturn } from "../../types/WorkoutTemplateForm";

type AddSetToWorkoutTemplateProps = {
  index: number;
  setSetIndexToDelete: (index: number) => void;
  formErrors: FieldErrors<AddExerciseToWorkoutTemplateForm>;
  control: SetExerciseDetailsControlReturn;
};

export const AddSetToWorkoutTemplate = ({
  control,
  formErrors,
  index,
  setSetIndexToDelete,
}: AddSetToWorkoutTemplateProps) => {
  return (
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
          action: () => setSetIndexToDelete(index),
        }}
        onSwipeProgress={(progress) =>
          console.info(`Swipe progress: ${progress}%`)
        }
      >
        <FlexBox key={index} direction="column">
          <div style={{ marginBottom: ".5rem" }}>
            {control.getIsDropset(index) === "yes" ? "Dropset " : "Set "}
            {index + 1}
          </div>

          <FlexBox gap="1rem" align="center" style={{ cursor: "pointer" }}>
            <AddExerciseToCreateTemplateDropsetControl
              setIndex={index}
              formErrors={formErrors}
              getIsDropset={control.getIsDropset}
              onChangeIsDropset={control.onChangeIsDropset}
              value={control.control.field.value}
            />
          </FlexBox>
          {!isNil(control.getIsDropset(index)) && (
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
                    htmlFor={`reps-${index}`}
                    style={{ fontSize: ".75rem" }}
                  >
                    Reps
                  </label>
                  <InputNumber
                    size={1}
                    inputId={`reps-${index}`}
                    value={control.control.field.value[index].reps}
                    onChange={(e) =>
                      e.value && control.onChangeRepsForSet(e.value, index)
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
                    htmlFor={`speed-${index}`}
                    style={{ fontSize: ".75rem" }}
                  >
                    Speed
                  </label>
                  <Dropdown
                    className="p-inputtext-sm"
                    inputId={`speed-${index}`}
                    optionLabel="name"
                    value={control.getSpeed(index)}
                    onChange={(e) =>
                      e.value && control.onChangeSpeedForSet(e.value, index)
                    }
                    options={speedOptions}
                  />
                </FlexBox>

                <FlexBox direction="column" gap=".5rem">
                  <label
                    htmlFor={`intensity-${index}`}
                    style={{ fontSize: ".75rem" }}
                  >
                    Intensity
                  </label>
                  <Dropdown
                    className="p-inputtext-sm"
                    inputId={`intensity-${index}`}
                    optionLabel="name"
                    value={control.getIntensity(index)}
                    onChange={(e) =>
                      e.value && control.onChangeIntensityForSet(e.value, index)
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
  );
};
