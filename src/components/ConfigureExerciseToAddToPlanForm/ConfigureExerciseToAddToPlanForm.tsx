import { Dispatch, SetStateAction } from "react";
import { WithId } from "../../types/General";
import { ExerciseTemplate, SetConfig } from "../../types/Workout";
import { SecondaryText } from "../SecondaryText";
import { PrimaryText } from "../PrimaryText";
import { Button } from "primereact/button";
import { defaultSingleSetConfig } from "../../const/workout";
import { Tag } from "primereact/tag";
import { AppBar } from "../AppBar";

type ConfigureExerciseToAddToPlanFormProps = {
  setSetConfigIndexToEdit: Dispatch<SetStateAction<number | undefined>>;
  setConfig: SetConfig[];
  setSetConfig: Dispatch<SetStateAction<SetConfig[]>>;
  setExerciseToAdd: (exerciseToAdd: WithId<ExerciseTemplate> | null) => void;
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

  const getSetDetails = (set: SetConfig) => {
    if (set.dropset) {
      return `${set.dropsetDetails.length} rounds, ${set.restSeconds} sec rest`;
    }
    return `${set.reps} reps, ${set.restSeconds} sec rest`;
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
        <AppBar
          title="Exercise Details"
          leftIcon="pi-angle-left"
          onClickLeftIcon={() => {
            setShowPlanForm(false);
            setShowSelectExerciseForm(true);
            setExerciseToAdd(null);
          }}
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
              <PrimaryText>
                <span>Set {index + 1}</span>
                {set.dropset && (
                  <Tag
                    value="Dropset"
                    style={{
                      marginLeft: "1rem",
                      padding: ".25rem",
                      paddingTop: ".1rem",
                      paddingBottom: ".1rem",
                    }}
                  ></Tag>
                )}
              </PrimaryText>
              <SecondaryText>{getSetDetails(set)}</SecondaryText>
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
              setSetConfig((prev) => [...prev, defaultSingleSetConfig()])
            }
          />
        </div>
      </div>

      <Button label="Save Exercise" onClick={onSaveExercise} />
    </div>
  );
};
