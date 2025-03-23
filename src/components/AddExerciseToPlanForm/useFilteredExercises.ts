import { useState } from "react";
import { ExerciseTemplate } from "../../types/Workout";
import { WithId } from "../../types/General";
import { useGetExercises } from "../../hooks/queries/useGetExercises";

export const useFilteredExercises = () => {
  const getExercises = useGetExercises();

  const [filteredExercises, setFilteredExercises] = useState<
    WithId<ExerciseTemplate>[]
  >([]);

  const onUpdateFilteredExercises = (queryText: string) => {
    let filteredExercises: WithId<ExerciseTemplate>[];

    if (!queryText.trim().length) {
      filteredExercises = getExercises?.data ? [...getExercises.data] : [];
    } else {
      filteredExercises =
        getExercises.data?.filter((exercise) => {
          return exercise.name.toLowerCase().includes(queryText.toLowerCase());
        }) ?? [];
    }

    setFilteredExercises(filteredExercises);
  };

  return { filteredExercises, onUpdateFilteredExercises };
};
