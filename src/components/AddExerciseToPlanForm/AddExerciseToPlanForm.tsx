import { InputText } from "primereact/inputtext";
import { PageHeader } from "../PageHeader";
import { WithId } from "../../types/General";
import { ExerciseTemplate } from "../../types/Workout";
import { PrimaryText } from "../PrimaryText";
import { SecondaryText } from "../SecondaryText";
import {
  AddExerciseToPlanFormSearchIcon,
  ptAddExerciseToPlanForm,
  styleAddExerciseToPlanForm,
} from "./AddExerciseToPlanForm.styled";
import { useFilteredExercises } from "./useFilteredExercises";

type AddExerciseToPlanFormProps = {
  exerciseQueryText: string;
  setExerciseToAdd: (exerciseToAdd: WithId<ExerciseTemplate> | null) => void;
  setExerciseQueryText: (exerciseQueryText: string) => void;
  setShowPlanForm: (showPlanForm: boolean) => void;
  setShowSelectExerciseForm: (showSelectExerciseForm: boolean) => void;
};
export const AddExerciseToPlanForm = ({
  exerciseQueryText,
  setExerciseToAdd,
  setExerciseQueryText,
  setShowPlanForm,
  setShowSelectExerciseForm,
}: AddExerciseToPlanFormProps) => {
  const { filteredExercises, onUpdateFilteredExercises } =
    useFilteredExercises();

  return (
    <>
      <PageHeader
        title="Select Exercise to Add"
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
      <div style={{ position: "relative", marginBottom: "2rem" }}>
        <AddExerciseToPlanFormSearchIcon />
        <InputText
          pt={ptAddExerciseToPlanForm.InputText}
          style={{
            width: "100%",
          }}
          placeholder="Search for exercises"
          value={exerciseQueryText}
          onChange={(e) => {
            setExerciseQueryText(e.target.value);
            onUpdateFilteredExercises(e.target.value);
          }}
        />
      </div>

      {filteredExercises.map((exercise) => (
        <div
          key={`${exercise.id}-exercise`}
          onClick={() => {
            setExerciseToAdd(exercise);
            setShowSelectExerciseForm(false);
          }}
          style={styleAddExerciseToPlanForm.FilteredExercise}
        >
          <div>
            <PrimaryText>{exercise.name}</PrimaryText>
            <SecondaryText>{exercise.muscleGroups.join(", ")}</SecondaryText>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="pi pi-arrow-right" style={{ color: "black" }}></i>
          </div>
        </div>
      ))}
    </>
  );
};
