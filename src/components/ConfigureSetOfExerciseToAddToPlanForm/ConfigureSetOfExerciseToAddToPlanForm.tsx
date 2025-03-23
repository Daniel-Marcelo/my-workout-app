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
import { PrimaryText } from "../PrimaryText";
import { defaultDropsetConfig } from "../../const/workout";

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

  const getDropsetForSet = () => setConfigToEdit?.dropset;

  const onChangeDropsetForSet = (newDropset: boolean) => {
    const newSetConfig: SetConfig = {
      ...setConfigToEdit,
      dropset: newDropset,
      reps: newDropset ? null : 8,
      dropsetDetails: defaultDropsetConfig(newDropset),
    };
    setSetConfigToEdit(newSetConfig);
  };

  const onChangeRepsForSet = (newReps: number) => {
    setSetConfigToEdit({
      ...setConfigToEdit,
      reps: newReps,
    });
  };

  const onChangeRepsForDropsetRound = (newReps: number, index: number) => {
    const newDropsetDetails = setConfigToEdit.dropsetDetails
      ? [...setConfigToEdit.dropsetDetails]
      : [];
    newDropsetDetails[index] = {
      ...newDropsetDetails[index],
      reps: newReps,
    };
    setSetConfigToEdit({
      ...setConfigToEdit,
      dropsetDetails: newDropsetDetails,
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
      return index === setConfigIndexToEdit ? setConfigToEdit : set;
    });

    setConfigControl.field.onChange(updatedSetsConfig);
    setSetConfigIndexToEdit(undefined);
  };

  const onClickDeleteDropsetRound = (index: number) => {
    const newDropsetDetails = setConfigToEdit.dropsetDetails
      ? [...setConfigToEdit.dropsetDetails]
      : [];
    newDropsetDetails.splice(index, 1);
    setSetConfigToEdit({
      ...setConfigToEdit,
      dropsetDetails: newDropsetDetails,
    });
  };

  const onAddDropsetRound = () => {
    const newDropsetDetails = setConfigToEdit.dropsetDetails
      ? [...setConfigToEdit.dropsetDetails]
      : [];
    newDropsetDetails.push({ reps: 8 });
    setSetConfigToEdit({
      ...setConfigToEdit,
      dropsetDetails: newDropsetDetails,
    });
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

        {!setConfigToEdit.dropset && (
          <>
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
          </>
        )}
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

        {setConfigToEdit.dropset &&
          setConfigToEdit.dropsetDetails?.map((dropsetConfig, index) => (
            <div style={{ marginTop: "2rem" }}>
              <PrimaryText>
                <span>Round {index + 1}</span>
                <span>
                  <i
                    className="pi pi-trash"
                    style={{
                      color: "red",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => onClickDeleteDropsetRound(index)}
                  ></i>
                </span>
              </PrimaryText>
              <div
                style={{
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  marginTop: "1rem",
                }}
              >
                <SecondaryText bold style={{ marginBottom: ".5rem" }}>
                  Reps
                </SecondaryText>
                <InputNumber
                  size={3}
                  pt={ptConfigureSetOfExerciseToAddToPlanForm.InputNumber}
                  inputId={`reps-${setConfigIndexToEdit}`}
                  onFocus={(e) => e.target.select()}
                  value={dropsetConfig.reps}
                  onChange={(e) =>
                    e.value && onChangeRepsForDropsetRound(e.value, index)
                  }
                  buttonLayout="horizontal"
                  step={1}
                  maxFractionDigits={0}
                  max={10}
                  min={1}
                  style={styleConfigureSetOfExerciseToAddToPlanForm.InputNumber}
                />
              </div>
            </div>
          ))}
        {setConfigToEdit.dropset && (
          <div
            style={{ marginTop: "2rem", textAlign: "center", width: "100%" }}
          >
            <Button
              size="small"
              label="Add Dropset Round"
              severity="secondary"
              outlined
              onClick={onAddDropsetRound}
            />
          </div>
        )}
      </div>

      <Button label="Save Set" onClick={onSaveSetConfig} />
    </div>
  );
};
