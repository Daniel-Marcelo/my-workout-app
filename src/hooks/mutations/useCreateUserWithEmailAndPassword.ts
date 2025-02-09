import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import { SignUpForm } from "../../types/signUp";
import { Toast } from "primereact/toast";

export const useCreateUserWithEmailAndPassword = (toast: Toast | null) => {
  return useMutation({
    mutationFn: ({ email, password }: SignUpForm) =>
      authApi.handleSignup(email, password),
    onError: () => {
      toast?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create user",
        life: 3000,
      });
    },
  });
};
