import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { CreateWorkoutTemplateForm } from "../../types/Workout";
import { useToast } from "../../context/ToastContext";
import { WorkoutApi } from "../../api/workoutApi";

export const useCreateWorkoutTemplate = () => {
  const { user } = useAuth();
  const toast = useToast();
  return useMutation({
    mutationFn: ({
      workoutTemplate,
    }: {
      workoutTemplate: CreateWorkoutTemplateForm;
    }) => WorkoutApi.createWorkoutTemplate(user!.uid, workoutTemplate),
    onSuccess: () =>
      toast.showToast({
        severity: "success",
        summary: "Success",
        detail: "Workout Template created",
      }),
    onError: (e) => console.log(e),
  });
};
