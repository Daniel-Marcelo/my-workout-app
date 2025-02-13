import { addDoc, collection, getDocs } from "firebase/firestore";
import { ExerciseTemplate } from "../types/Workout";
import { db } from "../firebase";
import { WithId } from "../types/General";

const getExercises = async (
  userId: string
): Promise<WithId<ExerciseTemplate>[]> => {
  const workoutsCollectionRef = collection(db, `users/${userId}/exercises`);
  const exercisesSnapshot = await getDocs(workoutsCollectionRef);

  if (exercisesSnapshot.empty) return [];
  const existingExercises = exercisesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ExerciseTemplate),
  }));
  return existingExercises;
};

const createExercise = (userId: string, exercise: ExerciseTemplate) =>
  addDoc(collection(db, `users/${userId}/exercises`), exercise);

export const ExerciseApi = {
  getExercises,
  createExercise,
};
