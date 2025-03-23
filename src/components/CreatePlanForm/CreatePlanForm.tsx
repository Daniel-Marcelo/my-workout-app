import { InputText } from "primereact/inputtext";
import { PageHeader } from "../PageHeader";
import { PrimaryText } from "../PrimaryText";
import { SecondaryText } from "../SecondaryText";
import { Button } from "primereact/button";
import { PlanWorkout, WorkoutPlanForm } from "../../types/Workout";
import { UseControllerReturn, UseFormReturn } from "react-hook-form";

type CreatePlanFormProps = {
  onClickExercise: (planExerciseConfig: PlanWorkout) => void;
  planForm: UseFormReturn<WorkoutPlanForm>;
  nameControl: UseControllerReturn<WorkoutPlanForm, "name">;
  setShowPlanForm: (showPlanForm: boolean) => void;
  setShowSelectExerciseForm: (showSelectExerciseForm: boolean) => void;
  planExercises: PlanWorkout[] | undefined;
  savePlan: () => void;
};
export const CreatePlanForm = ({
  onClickExercise,
  planForm,
  nameControl,
  setShowPlanForm,
  setShowSelectExerciseForm,
  planExercises,
  savePlan,
}: CreatePlanFormProps) => {
  console.log("planForm.formState.errors", planForm.formState.errors);
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
          title="New Plan"
          leftContent={
            <i
              className="pi pi-times"
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => {}}
            ></i>
          }
        />

        <InputText
          invalid={nameControl.fieldState.invalid}
          placeholder="Plan Name"
          style={{
            width: "100%",
          }}
          value={nameControl.field.value}
          onChange={(e) => nameControl.field.onChange(e.target.value)}
        />
        <div
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            display: "flex",
            width: "100%",
            flex: 1,
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowPlanForm(false);
            setShowSelectExerciseForm(true);
          }}
        >
          <div style={{ color: "black" }}>Add exercises to your plan</div>
          <div>
            <i className="pi pi-plus" style={{ color: "black" }}></i>
          </div>
        </div>

        {planExercises?.map((planExerciseConfig) => (
          <div
            key={`${planExerciseConfig.exercise.id}-plan-exercise`}
            onClick={() => onClickExercise(planExerciseConfig)}
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
              <PrimaryText>{planExerciseConfig.exercise.name}</PrimaryText>
              <SecondaryText>
                {planExerciseConfig.setConfig.length} sets
              </SecondaryText>
            </div>
            <div>
              <i className="pi pi-trash" style={{ color: "red" }}></i>
            </div>
          </div>
        ))}
      </div>
      <div>
        {!!planForm.formState.errors.planExercises && (
          <SecondaryText
            style={{
              textAlign: "center",
              color: "red",
              marginBottom: "1rem",
            }}
          >
            Please add exercises to create a plan
          </SecondaryText>
        )}
        <Button
          label="Save Plan"
          onClick={savePlan}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};
