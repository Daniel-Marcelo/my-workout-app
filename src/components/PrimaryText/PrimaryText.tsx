import { PropsWithChildren } from "react";

export const PrimaryText = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        color: "black",
        fontWeight: "bold",
        fontSize: "1rem",
        lineHeight: "24px",
      }}
    >
      {children}
    </div>
  );
};
