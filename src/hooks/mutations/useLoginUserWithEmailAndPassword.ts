import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import { useToast } from "../../context/ToastContext";
import { SignUpForm } from "../../types/SignUp";

export const useLoginUserWithEmailAndPassword = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ email, password }: SignUpForm) =>
      authApi.handleLogin(email, password),
    onError: () => {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Failed to login user",
        life: 3000,
      });
    },
  });
};
