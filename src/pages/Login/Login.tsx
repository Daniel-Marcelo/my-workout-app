import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FlexBox } from "../../components/FlexBox";
import { Toast } from "primereact/toast";
import { useSignUpForm } from "./useLoginForm";
import { useLoginUserWithEmailAndPassword } from "../../hooks/mutations/useLoginUserWithEmailAndPassword";

export const LoginPage = () => {
  const toast = useRef<Toast | null>(null);
  const createUser = useLoginUserWithEmailAndPassword(toast.current);

  const { form, formErrors, emailControl, passwordControl } = useSignUpForm();

  const handleSubmit = form.handleSubmit((data) => createUser.mutate(data));

  return (
    <FlexBox justify="center" align="center" style={{ minHeight: "100vh" }}>
      <Toast ref={toast} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{
          padding: ".5rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
        <FlexBox direction="column" gap="1rem">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            value={emailControl.field.value}
            onChange={emailControl.field.onChange}
            invalid={!!formErrors.password?.message}
          />
        </FlexBox>
        <FlexBox direction="column" gap="1rem">
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            style={{ width: "100%" }}
            inputStyle={{ width: "100%" }}
            value={passwordControl.field.value}
            onChange={passwordControl.field.onChange}
            invalid={!!formErrors.password?.message}
            toggleMask
            feedback={false}
          />
        </FlexBox>
        <Divider />
        <Button label="Submit" />
      </form>
    </FlexBox>
  );
};
