import { Dispatch, SetStateAction, useState } from "react";
import {
  ExerciseTemplate,
  PlanExerciseSetConfigForm,
  SetConfig,
} from "../../types/Workout";
import { WithId } from "../../types/General";
import { PageHeader } from "../PageHeader";
import { InputNumber } from "primereact/inputnumber";
import { UseControllerReturn } from "react-hook-form";
import { SecondaryText } from "../SecondaryText";
import { Button } from "primereact/button";
import {
  ptConfigureSetOfExerciseToAddToPlanForm,
  styleConfigureSetOfExerciseToAddToPlanForm,
} from "./ConfigureSetOfExerciseToAddToPlanForm.styled";
import { InputSwitch } from "primereact/inputswitch";

type ConfigureSetOfExerciseToAddToPlanFormProps = {
  exerciseQueryText: string;
  setConfigIndexToEdit: number;
  setConfigControl: UseControllerReturn<PlanExerciseSetConfigForm, "setConfig">;
  setSetConfigIndexToEdit: Dispatch<SetStateAction<number | undefined>>;
  setConfig: SetConfig[];
  setSetConfig: Dispatch<SetStateAction<SetConfig[]>>;
  setExerciseToAdd: (exerciseToAdd: WithId<ExerciseTemplate> | null) => void;
  setExerciseQueryText: (exerciseQueryText: string) => void;
  setShowPlanForm: (showPlanForm: boolean) => void;
  setShowSelectExerciseForm: (showSelectExerciseForm: boolean) => void;
};

export const ConfigureSetOfExerciseToAddToPlanForm = ({
  setConfig,
  setConfigControl,
  setSetConfigIndexToEdit,
  setConfigIndexToEdit,
}: ConfigureSetOfExerciseToAddToPlanFormProps) => {
  const [setConfigToEdit, setSetConfigToEdit] = useState(
    setConfig[setConfigIndexToEdit]
  );
  const getRepsForSet = (index: number) =>
    setConfigControl.field.value[index]?.reps;

  const getDropsetForSet = () => {
    return setConfigToEdit?.dropset;
  };

  const onChangeDropsetForSet = (newDropset: boolean) => {
    console.log(newDropset, "newDropset");
    setSetConfigToEdit({
      ...setConfigToEdit,
      dropset: newDropset,
    });
  };

  const onChangeRepsForSet = (newReps: number) => {
    setSetConfigToEdit({
      ...setConfigToEdit,
      reps: newReps,
    });
  };

  const getRestForSet = (index: number) =>
    setConfigControl.field.value[index].restSeconds;

  const onChangeRestForSet = (newRest: number) => {
    setSetConfigToEdit({
      ...setConfigToEdit,
      restSeconds: newRest,
    });
  };

  const onSaveSetConfig = () => {
    const currentSetsConfig = setConfigControl.field.value;
    const updatedSetsConfig = [...currentSetsConfig].map((set, index) => {
      if (index === setConfigIndexToEdit) {
        return setConfigToEdit;
      }
      return set;
    });

    setConfigControl.field.onChange(updatedSetsConfig);
    setSetConfigIndexToEdit(undefined);
  };

  return (
    <div style={styleConfigureSetOfExerciseToAddToPlanForm.PageContainer}>
      <div>
        <PageHeader
          title={`Set ${setConfigIndexToEdit + 1}`}
          leftContent={
            <i
              className="pi pi-angle-left"
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                setSetConfigIndexToEdit(undefined);
              }}
            ></i>
          }
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "1rem",
            gap: "1rem",
          }}
        >
          <SecondaryText bold>Dropset?</SecondaryText>
          <InputSwitch
            checked={getDropsetForSet()}
            onChange={(e) => onChangeDropsetForSet(e.value)}
          />
        </div>

        <SecondaryText
          bold
          style={{ marginBottom: ".5rem", marginTop: "1.5rem" }}
        >
          Reps
        </SecondaryText>
        <InputNumber
          size={3}
          pt={ptConfigureSetOfExerciseToAddToPlanForm.InputNumber}
          inputId={`reps-${setConfigIndexToEdit}`}
          onFocus={(e) => e.target.select()}
          value={getRepsForSet(setConfigIndexToEdit)}
          onChange={(e) => e.value && onChangeRepsForSet(e.value)}
          buttonLayout="horizontal"
          step={1}
          maxFractionDigits={0}
          max={10}
          min={1}
          style={styleConfigureSetOfExerciseToAddToPlanForm.InputNumber}
        />

        <SecondaryText
          bold
          style={{ marginBottom: ".5rem", marginTop: "1.5rem" }}
        >
          Rest (seconds)
        </SecondaryText>
        <InputNumber
          size={3}
          pt={ptConfigureSetOfExerciseToAddToPlanForm.InputNumber}
          inputId={`reps-${setConfigIndexToEdit}`}
          onFocus={(e) => e.target.select()}
          value={getRestForSet(setConfigIndexToEdit)}
          onChange={(e) => e.value && onChangeRestForSet(e.value)}
          buttonLayout="horizontal"
          step={1}
          maxFractionDigits={0}
          max={1000}
          min={1}
          style={styleConfigureSetOfExerciseToAddToPlanForm.InputNumber}
        />
      </div>

      <Button label="Save Set" onClick={onSaveSetConfig} />
    </div>
  );
};
