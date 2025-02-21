import { RadioButton } from "primereact/radiobutton";
import { BinaryOptions } from "../../const/general";
import isNil from "lodash/isNil";
import { FieldErrors } from "react-hook-form";
import {
  AddExerciseToWorkoutTemplateForm,
  SetTemplate,
} from "../../types/Workout";

type AddExerciseToCreateTemplateDropsetControlProps = {
  value: SetTemplate[];
  onChangeIsDropset: (isDropSet: "no" | "yes", setNumber: number) => void;
  getIsDropset: (setNumber: number) => "no" | "yes" | null;
  setIndex: number;
  formErrors: FieldErrors<AddExerciseToWorkoutTemplateForm>;
};
export const AddExerciseToCreateTemplateDropsetControl = ({
  onChangeIsDropset,
  getIsDropset,
  setIndex,
  value,
  formErrors,
}: AddExerciseToCreateTemplateDropsetControlProps) => {
  return (
    <>
      <label>Dropset?</label>
      {BinaryOptions.map((option) => (
        <div
          key={`${option.code}-${setIndex}`}
          onChange={() => onChangeIsDropset(option.code, setIndex)}
        >
          <RadioButton
            inputId={`dropset-${setIndex}-${option.code}`}
            name={`dropset-${setIndex}-${option.code}`}
            value={option.code}
            checked={getIsDropset(setIndex) === option.code}
            invalid={
              !formErrors.sets ? false : isNil(value[setIndex]?.isDropset)
            }
          />
          <label
            style={{
              marginLeft: ".5rem",
              cursor: "pointer",
            }}
            htmlFor={`dropset-${setIndex}-${option.code}`}
          >
            {option.name}
          </label>
        </div>
      ))}
    </>
  );
};
