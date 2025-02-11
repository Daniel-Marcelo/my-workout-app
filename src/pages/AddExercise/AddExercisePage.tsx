import { useAddExerciseForm } from "./useAddExerciseForm";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { FlexBox } from "../../components/FlexBox";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import { exerciseTypes } from "../../const/workout";
import { Divider } from "primereact/divider";
import { useCreateExercise } from "../../hooks/mutations/useCreateExercise";

export const AddExercisePage = () => {
  const {
    form,
    nameControl,
    muscleGroupsControl,
    equipmentControl,
    unilateralControl,
    formErrors,
  } = useAddExerciseForm();

  const createExercise = useCreateExercise();

  const submitForm = form.handleSubmit(
    (data) => {
      createExercise.mutate({
        exercise: {
          name: data.name,
          muscleGroups: data.muscleGroups.map((mg) => mg.code),
          unilateral: data.unilateral,
          equipment: data.equipment.code,
        },
      });
      form.reset();
    },
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

        <FlexBox
          direction="column"
          gap="1rem"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <label htmlFor="unilateral">Unilateral</label>
          <InputSwitch
            inputId="unilateral"
            checked={unilateralControl.field.value}
            onChange={unilateralControl.field.onChange}
          />
        </FlexBox>

        <FlexBox
          direction="column"
          gap="1rem"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <label htmlFor="equipment">Equipment</label>

          <Dropdown
            inputId="equipment"
            optionLabel="name"
            value={equipmentControl.field.value}
            onChange={(e) => equipmentControl.field.onChange(e.value)}
            options={exerciseTypes}
          />
        </FlexBox>

        <Divider />

        <Button label="Save" style={{ width: "100%" }} />
      </form>
    </div>
  );
};
