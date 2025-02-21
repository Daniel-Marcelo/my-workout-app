import { Divider } from "primereact/divider";
import React from "react";
import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import { FlexBox } from "../FlexBox";
import isNil from "lodash/isNil";
import { AddExerciseToCreateTemplateDropsetControl } from "../AddExerciseToCreateTemplateDropsetControl/AddExerciseToCreateTemplateDropsetControl";
import { InputNumber } from "primereact/inputnumber";
import { intensityOptions, speedOptions } from "../../const/workout";
import { FieldErrors } from "react-hook-form";
import { AddExerciseToWorkoutTemplateForm } from "../../types/Workout";
import { SetExerciseDetailsControlReturn } from "../../types/WorkoutTemplateForm";
import { Tag } from "primereact/tag";
import { SelectDialog } from "../SelectDialog";

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
  const [setToChangeSpeed, setSetToChangeSpeed] = React.useState<number | null>(
    null
  );
  const [setToChangeIntensity, setSetToChangeIntensity] = React.useState<
    number | null
  >(null);

  return (
    <React.Fragment>
      <Divider />
      <SelectDialog
        visible={setToChangeSpeed !== null}
        header="Select Speed"
        onHide={() => setSetToChangeSpeed(null)}
        options={speedOptions}
        onEditOption={(option) => {
          control.onChangeSpeedForSet(option, setToChangeSpeed!);
          setSetToChangeSpeed(null);
        }}
        infoMessage={
          <div>
            <div style={{ fontSize: ".75rem" }}>Use Notes to add detail.</div>
            <div style={{ fontSize: ".75rem" }}>
              Example: Set 1 slow, set 2 fast
            </div>
          </div>
        }
      />
      <SelectDialog
        visible={setToChangeIntensity !== null}
        header="Select Intensity"
        onHide={() => setSetToChangeIntensity(null)}
        options={intensityOptions}
        onEditOption={(option) => {
          control.onChangeIntensityForSet(option, setToChangeIntensity!);
          setSetToChangeIntensity(null);
        }}
        infoMessage={
          <div>
            <div style={{ fontSize: ".75rem" }}>Use Notes to add detail.</div>
            <div style={{ fontSize: ".75rem" }}>
              Example: Set 1 light, set 2 heavy
            </div>
          </div>
        }
      />
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

                <FlexBox direction="column" gap=".5rem" justify="center">
                  <label style={{ fontSize: ".75rem" }}>Speed</label>
                  <Tag
                    pt={{
                      root: {
                        style: {
                          padding: ".5rem",
                        },
                      },
                    }}
                    onClick={() => setSetToChangeSpeed(index)}
                  >
                    {control.getSpeed(index)?.name}
                  </Tag>
                </FlexBox>

                <FlexBox direction="column" gap=".5rem" justify="center">
                  <label style={{ fontSize: ".75rem" }}>Intensity</label>
                  <Tag
                    pt={{
                      root: {
                        style: {
                          padding: ".5rem",
                        },
                      },
                    }}
                    onClick={() => setSetToChangeIntensity(index)}
                  >
                    {control.getIntensity(index)?.name}
                  </Tag>
                </FlexBox>
              </FlexBox>
            </>
          )}
        </FlexBox>
      </SwipeableListItem>
    </React.Fragment>
  );
};
