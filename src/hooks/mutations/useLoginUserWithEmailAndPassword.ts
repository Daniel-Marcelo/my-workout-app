import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import { SignUpForm } from "../../types/signUp";
import { Toast } from "primereact/toast";

export const useLoginUserWithEmailAndPassword = (toast: Toast | null) => {
  return useMutation({
    mutationFn: ({ email, password }: SignUpForm) =>
      authApi.handleLogin(email, password),
    onError: () => {
      toast?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to login user",
        life: 3000,
      });
    },
  });
};
