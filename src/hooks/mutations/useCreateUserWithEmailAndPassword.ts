import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import { SignUpForm } from "../../types/SignUp";
import { useToast } from "../../context/ToastContext";

export const useCreateUserWithEmailAndPassword = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: ({ email, password }: SignUpForm) =>
      authApi.handleSignup(email, password),
    onError: () => {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Failed to create user",
        life: 3000,
      });
    },
  });
};
