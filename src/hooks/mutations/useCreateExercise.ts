import { useMutation } from "@tanstack/react-query";
import { ExerciseApi } from "../../api/exerciseApi";
import { useAuth } from "../../context/AuthContext";
import { Exercise } from "../../types/Workout";
import { useToast } from "../../context/ToastContext";

export const useCreateExercise = () => {
  const { user } = useAuth();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ exercise }: { exercise: Exercise }) =>
      ExerciseApi.createExercise(user!.uid, exercise),
    onError: () =>
      toast.showToast({
        severity: "error",
        summary: "Error",
        detail: "Failed to create exercise",
      }),
  });
};
