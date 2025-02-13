import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { CreateWorkoutTemplateForm } from "../types/Workout";

const createWorkoutTemplate = (
  userId: string,
  workoutTemplate: CreateWorkoutTemplateForm
) => addDoc(collection(db, `users/${userId}/workoutTemplate`), workoutTemplate);

export const WorkoutApi = {
  createWorkoutTemplate,
};
