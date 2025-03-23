import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { CreateWorkoutTemplateForm, WorkoutPlanForm } from "../types/Workout";

const createWorkoutTemplate = (
  userId: string,
  workoutTemplate: CreateWorkoutTemplateForm
) => addDoc(collection(db, `users/${userId}/workoutTemplate`), workoutTemplate);

const createWorkoutPlan = (userId: string, workoutTemplate: WorkoutPlanForm) =>
  addDoc(collection(db, `users/${userId}/workoutPlan`), workoutTemplate);

export const WorkoutApi = {
  createWorkoutTemplate,
  createWorkoutPlan,
};
