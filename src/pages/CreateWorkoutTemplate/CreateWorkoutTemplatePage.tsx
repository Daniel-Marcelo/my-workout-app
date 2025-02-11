import { InputText } from "primereact/inputtext";
import { FlexBox } from "../../components/FlexBox";
import { AutoComplete } from "primereact/autocomplete";
import { useCreateWorkoutTemplateForm } from "./useCreateWorkoutTemplateForm";

export const CreateWorkoutTemplatePage = () => {
  const { formErrors, nameControl, muscleGroupsControl } =
    useCreateWorkoutTemplateForm();
  return (
    <div style={{ padding: "3rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Create Workout Template
      </h2>
      <form>
        <FlexBox
          direction="column"
          gap="1rem"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            type="text"
            value={nameControl.field.value}
            onChange={nameControl.field.onChange}
            invalid={!!formErrors.name?.message}
          />
        </FlexBox>

        <FlexBox
          direction="column"
          gap="1rem"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <label htmlFor="name">Muscle Groups</label>
          <AutoComplete
            field="name"
            multiple
            value={muscleGroupsControl.field.value}
            suggestions={muscleGroupsControl.filteredMuscleGroups}
            completeMethod={(e) => muscleGroupsControl.search(e.query)}
            onFocus={() => muscleGroupsControl.search("")}
            onChange={muscleGroupsControl.field.onChange}
            pt={{
              container: {
                style: {
                  width: "100%",
                },
              },
            }}
          />
        </FlexBox>
      </form>
    </div>
  );
};
