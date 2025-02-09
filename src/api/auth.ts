import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const handleSignup = async (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const authApi = {
  handleSignup,
};
