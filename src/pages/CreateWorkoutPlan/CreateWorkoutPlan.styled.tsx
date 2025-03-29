import { PropsWithChildren } from "react";

export const CreateWorkoutPlanContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "1rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      {children}
    </div>
  );
};
