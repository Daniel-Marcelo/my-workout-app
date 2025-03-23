import { useEffect, useState } from "react";
import { ExerciseTemplate } from "../../types/Workout";
import { WithId } from "../../types/General";
import { useGetExercises } from "../../hooks/queries/useGetExercises";
import { isNil } from "lodash";

export const useFilteredExercises = () => {
  const getExercises = useGetExercises();

  const [filteredExercises, setFilteredExercises] = useState<
    WithId<ExerciseTemplate>[] | undefined
  >(undefined);

  useEffect(() => {
    if (isNil(filteredExercises)) setFilteredExercises(getExercises.data);
  }, [getExercises.data, filteredExercises]);

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

  return {
    filteredExercises: filteredExercises ?? [],
    onUpdateFilteredExercises,
  };
};
