import { DataTable } from "primereact/datatable";
import { FlexBox } from "../FlexBox";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { AddExerciseToWorkoutTemplateForm } from "../../types/Workout";

type WorkoutTemplateExerciseCardProps = {
  expanded: boolean;
  toggleExpanded: () => void;
  exercise: AddExerciseToWorkoutTemplateForm;
};

export const WorkoutTemplateExerciseCard = ({
  expanded,
  toggleExpanded,
  exercise,
}: WorkoutTemplateExerciseCardProps) => {
  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={toggleExpanded}
      pt={{
        title: {
          style: { marginBottom: 0 },
        },
      }}
      subTitle={expanded ? exercise.notes : ""}
      title={
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FlexBox gap="1rem">
            <div>{exercise.name}</div>
            {exercise.superset && <Tag severity="success">Superset</Tag>}
          </FlexBox>
          <i
            className={`pi ${expanded ? "pi-chevron-up" : "pi-chevron-down"}`}
            style={{ fontSize: "1rem" }}
          />
        </div>
      }
    >
      {expanded && (
        <div>
          <DataTable value={exercise.sets}>
            <Column field="setNumber" header="Set"></Column>
            <Column field="reps" header="Reps"></Column>
            <Column field="speed" header="Speed"></Column>
            <Column field="intensity" header="Intensity"></Column>
          </DataTable>
        </div>
      )}
    </Card>
  );
};
