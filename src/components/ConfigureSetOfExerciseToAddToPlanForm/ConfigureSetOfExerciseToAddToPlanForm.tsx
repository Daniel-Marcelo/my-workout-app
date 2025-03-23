import { Dispatch, SetStateAction, useState } from "react";
import { ExerciseTemplate, SetConfig } from "../../types/Workout";
import { WithId } from "../../types/General";
import { PageHeader } from "../PageHeader";
import { InputNumber } from "primereact/inputnumber";
import { pt } from "../../const/pt";
import { UseControllerReturn } from "react-hook-form";
import { SecondaryText } from "../SecondaryText";
import { Button } from "primereact/button";

type ConfigureSetOfExerciseToAddToPlanFormProps = {
  exerciseQueryText: string;
  setConfigIndexToEdit: number;
  setConfigControl: UseControllerReturn<
    {
      setConfig: SetConfig[];
    },
    "setConfig"
  >;
  setSetConfigIndexToEdit: Dispatch<SetStateAction<number | undefined>>;
  setConfig: SetConfig[];
  setSetConfig: Dispatch<SetStateAction<SetConfig[]>>;
  setExerciseToAdd: (exerciseToAdd: WithId<ExerciseTemplate> | null) => void;
  setExerciseQueryText: (exerciseQueryText: string) => void;
  setShowPlanForm: (showPlanForm: boolean) => void;
  setShowSelectExerciseForm: (showSelectExerciseForm: boolean) => void;
};

export const ConfigureSetOfExerciseToAddToPlanForm = ({
  setExerciseToAdd,
  setSetConfig,
  setConfig,
  setConfigControl,
  setShowPlanForm,
  setShowSelectExerciseForm,
  setSetConfigIndexToEdit,
  setConfigIndexToEdit,
}: ConfigureSetOfExerciseToAddToPlanFormProps) => {
  const [setConfigToEdit, setSetConfigToEdit] = useState(
    setConfig[setConfigIndexToEdit]
  );
  const getRepsForSet = (index: number) =>
    setConfigControl.field.value[index]?.reps;

  console.log("setConfigToEdit", setConfigToEdit);
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

    console.log("updatedSetsConfig", updatedSetsConfig);
    setConfigControl.field.onChange(updatedSetsConfig);
    setSetConfigIndexToEdit(undefined);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
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

        <SecondaryText bold style={{ marginBottom: ".5rem" }}>
          Reps
        </SecondaryText>
        <InputNumber
          size={3}
          pt={{
            root: {
              style: {
                height: "30px",
                width: "100%",
              },
            },
          }}
          inputId={`reps-${setConfigIndexToEdit}`}
          onFocus={(e) => e.target.select()}
          value={getRepsForSet(setConfigIndexToEdit)}
          onChange={(e) => e.value && onChangeRepsForSet(e.value)}
          buttonLayout="horizontal"
          step={1}
          maxFractionDigits={0}
          max={10}
          min={1}
          style={{
            height: "38px",
          }}
        />

        <SecondaryText
          bold
          style={{ marginBottom: ".5rem", marginTop: "1.5rem" }}
        >
          Rest (seconds)
        </SecondaryText>
        <InputNumber
          size={3}
          pt={{
            root: {
              style: {
                height: "30px",
                width: "100%",
              },
            },
          }}
          inputId={`reps-${setConfigIndexToEdit}`}
          onFocus={(e) => e.target.select()}
          value={getRestForSet(setConfigIndexToEdit)}
          onChange={(e) => e.value && onChangeRestForSet(e.value)}
          buttonLayout="horizontal"
          step={1}
          maxFractionDigits={0}
          max={1000}
          min={1}
          style={{
            height: "38px",
          }}
        />
      </div>

      <Button label="Save Set" onClick={onSaveSetConfig} />
    </div>
  );
};
