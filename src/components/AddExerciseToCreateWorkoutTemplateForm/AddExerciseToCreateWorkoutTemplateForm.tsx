import { InputNumber } from "primereact/inputnumber";
import { FlexBox } from "../FlexBox";
import { Checkbox } from "primereact/checkbox";
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
import { RadioButton } from "primereact/radiobutton";
import { BinaryOptions } from "../../const/general";
import { isNil } from "lodash";

export type AddExerciseToCreateWorkoutTemplateFormProps = {
  exercise: WithId<ExerciseTemplate>;
  onSaveExercise: (form: AddExerciseToWorkoutTemplateForm) => void;
};

export const AddExerciseToCreateWorkoutTemplateForm = ({
  exercise,
  onSaveExercise,
}: AddExerciseToCreateWorkoutTemplateFormProps) => {
  const {
    form,
    formErrors,
    numberOfSetsControl,
    supersetControl,
    notesControl,
    setsDetailControl,
  } = useAddExerciseToCreateWorkoutTemplateForm(exercise);

  const onSubmit = form.handleSubmit(
    (formData) => {
      onSaveExercise(formData);
    },
    (e) => {
      console.log("errors", e);
    }
  );

  console.log("sets", setsDetailControl.field.value);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <FlexBox
        gap="3rem"
        style={{ width: "100%", marginBottom: "1rem" }}
        align="center"
      >
        <FlexBox gap="1rem" align="center">
          <label htmlFor="sets">Sets</label>
          <InputNumber
            size={1}
            inputId="sets"
            value={numberOfSetsControl.field.value}
            onValueChange={(e) => numberOfSetsControl.field.onChange(e.value)}
            showButtons
            buttonLayout="horizontal"
            step={1}
            maxFractionDigits={0}
            max={10}
            min={1}
            style={{
              height: "38px",
            }}
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
        </FlexBox>
        {/* <FlexBox gap="1rem" align="center" style={{ marginBottom: "1rem" }}>
          <label htmlFor="superset">Superset?</label>
          <Checkbox
            name="superset"
            checked={supersetControl.field.value}
            value={supersetControl.field.value}
            onChange={supersetControl.field.onChange}
          />
        </FlexBox> */}
      </FlexBox>
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
      <FlexBox direction="column">
        {range(0, numberOfSetsControl.field.value).map((count) => (
          <FlexBox key={count} direction="column">
            <Divider />
            <div style={{ marginBottom: ".5rem" }}>
              {setsDetailControl.getIsDropset(count) === "yes"
                ? "Dropset "
                : "Set "}
              {count + 1}
            </div>

            <FlexBox gap="1rem" align="center" style={{ cursor: "pointer" }}>
              <label>Dropset?</label>
              {BinaryOptions.map((option) => (
                <div
                  key={`${option.code}-${count}`}
                  onChange={() =>
                    setsDetailControl.onChangeIsDropset(option.code, count)
                  }
                >
                  <RadioButton
                    inputId={`dropset-${count}-${option.code}`}
                    name={`dropset-${count}-${option.code}`}
                    value={option.code}
                    checked={
                      setsDetailControl.getIsDropset(count) === option.code
                    }
                    invalid={
                      !formErrors.sets
                        ? false
                        : isNil(setsDetailControl.field.value[count]?.isDropset)
                    }
                  />
                  <label
                    style={{
                      marginLeft: ".5rem",
                      cursor: "pointer",
                    }}
                    htmlFor={`dropset-${count}-${option.code}`}
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </FlexBox>
            {!isNil(setsDetailControl.getIsDropset(count)) && (
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
                      htmlFor={`reps-${count}`}
                      style={{ fontSize: ".75rem" }}
                    >
                      Reps
                    </label>
                    <InputNumber
                      size={1}
                      inputId={`reps-${count}`}
                      value={setsDetailControl.field.value[count].reps}
                      onChange={(e) =>
                        e.value &&
                        setsDetailControl.onChangeRepsForSet(e.value, count)
                      }
                      showButtons
                      buttonLayout="horizontal"
                      step={1}
                      maxFractionDigits={0}
                      max={10}
                      min={1}
                      style={{
                        height: "38px",
                      }}
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                    />
                  </FlexBox>

                  <FlexBox direction="column" gap=".5rem">
                    <label
                      htmlFor={`speed-${count}`}
                      style={{ fontSize: ".75rem" }}
                    >
                      Speed
                    </label>
                    <Dropdown
                      className="p-inputtext-sm"
                      inputId={`speed-${count}`}
                      optionLabel="name"
                      value={setsDetailControl.getSpeed(count)}
                      onChange={(e) =>
                        e.value &&
                        setsDetailControl.onChangeSpeedForSet(e.value, count)
                      }
                      options={speedOptions}
                    />
                  </FlexBox>

                  <FlexBox direction="column" gap=".5rem">
                    <label
                      htmlFor={`intensity-${count}`}
                      style={{ fontSize: ".75rem" }}
                    >
                      Intensity
                    </label>
                    <Dropdown
                      className="p-inputtext-sm"
                      inputId={`intensity-${count}`}
                      optionLabel="name"
                      value={setsDetailControl.getIntensity(count)}
                      onChange={(e) =>
                        e.value &&
                        setsDetailControl.onChangeIntensityForSet(
                          e.value,
                          count
                        )
                      }
                      options={intensityOptions}
                    />
                  </FlexBox>
                </FlexBox>
              </>
            )}
          </FlexBox>
        ))}
      </FlexBox>
      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
