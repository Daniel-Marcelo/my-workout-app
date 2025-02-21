import { Dialog } from "primereact/dialog";
import { FlexBox } from "../FlexBox";
import { Button } from "primereact/button";

type DeleteSetFromWorkoutTemplateDialogProps = {
  setIndexToDelete: number | null;
  setSetIndexToDelete: (index: number | null) => void;
  onDeleteSet: (setNumber: number | null) => void;
};
export const DeleteSetFromWorkoutTemplateDialog = ({
  setIndexToDelete,
  setSetIndexToDelete,
  onDeleteSet,
}: DeleteSetFromWorkoutTemplateDialogProps) => {
  return (
    <Dialog
      header={`Delete Set ${(setIndexToDelete ?? 0) + 1}`}
      visible={setIndexToDelete !== null}
      style={{ width: "75vw" }}
      onHide={() => setSetIndexToDelete(null)}
    >
      Confirm deletion of set
      <FlexBox gap="1rem" justify="flex-end" style={{ marginTop: "2rem" }}>
        <Button severity="secondary" onClick={() => setSetIndexToDelete(null)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDeleteSet(setIndexToDelete);
            setSetIndexToDelete(null);
          }}
        >
          Delete
        </Button>
      </FlexBox>
    </Dialog>
  );
};
