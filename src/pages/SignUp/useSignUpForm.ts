import { useController, useForm } from "react-hook-form";
import { SignUpForm } from "../../types/SignUp";

export const useSignUpForm = () => {
  const form = useForm<SignUpForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailControl = useController({
    control: form.control,
    name: "email",
    rules: {
      required: "Email is required",
    },
  });

  const passwordControl = useController({
    control: form.control,
    name: "password",
    rules: {
      required: "Password is required",
    },
  });

  const formErrors = form.formState.errors;

  return {
    form,
    formErrors,
    emailControl,
    passwordControl,
  };
};
