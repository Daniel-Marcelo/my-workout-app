import { addDoc, collection, getDocs } from "firebase/firestore";
import { Exercise } from "../types/Workout";
import { db } from "../firebase";
import { WithId } from "../types/General";

const getExercises = async (userId: string): Promise<WithId<Exercise>[]> => {
  const workoutsCollectionRef = collection(db, `users/${userId}/exercises`);
  const exercisesSnapshot = await getDocs(workoutsCollectionRef);

  if (exercisesSnapshot.empty) return [];
  const existingExercises = exercisesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Exercise),
  }));
  return existingExercises;
};

const createExercise = (userId: string, exercise: Exercise) =>
  addDoc(collection(db, `users/${userId}/exercises`), exercise);

export const ExerciseApi = {
  getExercises,
  createExercise,
};
