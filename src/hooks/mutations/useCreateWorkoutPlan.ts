import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { WorkoutApi } from "../../api/workoutApi";
import { WorkoutPlanForm } from "../../types/Workout";

export const useCreateWorkoutPlan = () => {
  const { user } = useAuth();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ workoutPlan }: { workoutPlan: WorkoutPlanForm }) =>
      WorkoutApi.createWorkoutPlan(user!.uid, workoutPlan),
    onSuccess: () =>
      toast.showToast({
        severity: "success",
        summary: "Success",
        detail: "Workout Template created",
      }),
    onError: (e) => console.log(e),
  });
};
