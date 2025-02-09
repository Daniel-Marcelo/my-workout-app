import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const handleSignup = async (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

const handleLogin = async (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const authApi = {
  handleSignup,
  handleLogin,
};
