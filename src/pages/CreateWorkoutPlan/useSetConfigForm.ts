import { useController, useForm } from "react-hook-form";
import { defaultSingleSetConfig } from "../../const/workout";
import { PlanExerciseSetConfigForm } from "../../types/Workout";

export const useSetConfigForm = () => {
  const setConfigForm = useForm<PlanExerciseSetConfigForm>({
    defaultValues: {
      setConfig: [
        defaultSingleSetConfig(),
        defaultSingleSetConfig(),
        defaultSingleSetConfig(),
      ],
    },
  });

  const setConfigControl = useController({
    name: "setConfig",
    control: setConfigForm.control,
  });

  return {
    setConfigForm,
    setConfigControl,
  };
};
