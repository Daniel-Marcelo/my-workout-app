import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { ExerciseApi } from "../../api/exerciseApi";

export const useGetExercises = () => {
  const { user } = useAuth();
  return useQuery({
    enabled: !!user?.uid,
    queryKey: ["GetExercises"],
    queryFn: () => ExerciseApi.getExercises(user!.uid),
  });
};
