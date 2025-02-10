import { useAddExerciseForm } from "./useAddExerciseForm";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { FlexBox } from "../../components/FlexBox";

export const AddExercisePage = () => {
  const { form, nameControl, muscleGroupsControl, formErrors } =
    useAddExerciseForm();

  const submitForm = form.handleSubmit(
    (data) => console.log(data),
    (er) => console.log(er)
  );

  return (
    <div style={{ padding: "3rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Create Exercise
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          return submitForm();
        }}
      >
        <FlexBox
          direction="column"
          gap="1rem"
          style={{ width: "30%", marginBottom: "1rem" }}
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
          style={{ width: "30%", marginBottom: "1rem" }}
        >
          <label htmlFor="name">Muscle Groups</label>
          <AutoComplete
            field="name"
            multiple
            value={muscleGroupsControl.field.value}
            suggestions={muscleGroupsControl.filteredMuscleGroups}
            completeMethod={muscleGroupsControl.search}
            onChange={muscleGroupsControl.field.onChange}
          />
        </FlexBox>
        <Button label="Submit" />
      </form>
    </div>
  );
};
