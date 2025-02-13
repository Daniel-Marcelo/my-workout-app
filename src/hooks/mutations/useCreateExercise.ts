import { useMutation } from "@tanstack/react-query";
import { ExerciseApi } from "../../api/exerciseApi";
import { useAuth } from "../../context/AuthContext";
import { ExerciseTemplate } from "../../types/Workout";
import { useToast } from "../../context/ToastContext";

export const useCreateExercise = () => {
  const { user } = useAuth();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ exercise }: { exercise: ExerciseTemplate }) =>
      ExerciseApi.createExercise(user!.uid, exercise),
    onSuccess: () =>
      toast.showToast({
        severity: "success",
        summary: "Success",
        detail: "Exercise created",
      }),
    onError: () =>
      toast.showToast({
        severity: "error",
        summary: "Error",
        detail: "Failed to create exercise",
      }),
  });
};
