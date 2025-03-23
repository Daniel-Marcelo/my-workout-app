import { Dispatch, SetStateAction } from "react";
import { PageHeader } from "../PageHeader";
import { WithId } from "../../types/General";
import { ExerciseTemplate, SetConfig } from "../../types/Workout";
import { SecondaryText } from "../SecondaryText";
import { PrimaryText } from "../PrimaryText";
import { Button } from "primereact/button";
import { defaultSetConfig } from "../../const/workout";

type ConfigureExerciseToAddToPlanFormProps = {
  exerciseQueryText: string;
  setSetConfigIndexToEdit: Dispatch<SetStateAction<number | undefined>>;
  setConfig: SetConfig[];
  setSetConfig: Dispatch<SetStateAction<SetConfig[]>>;
  setExerciseToAdd: (exerciseToAdd: WithId<ExerciseTemplate> | null) => void;
  setExerciseQueryText: (exerciseQueryText: string) => void;
  setShowPlanForm: (showPlanForm: boolean) => void;
  setShowSelectExerciseForm: (showSelectExerciseForm: boolean) => void;
  onSaveExercise: () => void;
};

export const ConfigureExerciseToAddToPlanForm = ({
  onSaveExercise,
  setExerciseToAdd,
  setSetConfig,
  setConfig,
  setShowPlanForm,
  setShowSelectExerciseForm,
  setSetConfigIndexToEdit,
}: ConfigureExerciseToAddToPlanFormProps) => {
  const deleteSetConfig = (index: number) => {
    setSetConfig((prev) => prev.filter((_, i) => i !== index));
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
          title="Exercise Details"
          leftContent={
            <i
              className="pi pi-angle-left"
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                setShowPlanForm(true);
                setShowSelectExerciseForm(false);
                setExerciseToAdd(null);
              }}
            ></i>
          }
        />

        {setConfig.map((set, index) => (
          <div
            key={`ConfigureExerciseToAddToPlanFormProps-${index}`}
            onClick={() => {
              console.log("index", index);
              setSetConfigIndexToEdit(index);
            }}
            style={{
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PrimaryText>Set {index + 1}</PrimaryText>
              <SecondaryText>
                {set.reps} reps, {set.restSeconds} sec rest
              </SecondaryText>
            </div>
            <div>
              <i
                className="pi pi-trash"
                style={{ color: "red" }}
                onClick={(e) => {
                  deleteSetConfig(index);
                  e.preventDefault();
                  e.stopPropagation();
                }}
              ></i>
            </div>
          </div>
        ))}

        <div style={{ marginTop: "2rem", textAlign: "center", width: "100%" }}>
          <Button
            size="small"
            label="Add Set"
            severity="secondary"
            outlined
            onClick={() =>
              setSetConfig((prev) => [...prev, defaultSetConfig()])
            }
          />
        </div>
      </div>

      <Button label="Save Exercise" onClick={onSaveExercise} />
    </div>
  );
};
