import { CSSProperties, PropsWithChildren } from "react";

export const SecondaryText = ({
  children,
  bold,
  style = {},
}: PropsWithChildren & {
  bold?: boolean;
  style?: CSSProperties | undefined;
}) => {
  return (
    <div
      style={{
        color: "grey",
        fontSize: ".875rem",
        lineHeight: "20px",
        fontWeight: bold ? "bold" : "normal",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
