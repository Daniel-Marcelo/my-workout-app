import { CSSProperties, ReactNode } from "react";

interface FlexBoxProps {
  children: ReactNode;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: string;
  grow?: number;
  shrink?: number;
  basis?: string | number;
  style?: CSSProperties;
  onClick?: () => void;
  className?: string;
}
// FlexBox component definition
export const FlexBox = ({
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  gap = "0px",
  grow = 0,
  shrink = 1,
  basis = "auto",
  style = {},
  ...rest
}: FlexBoxProps) => {
  // Combine inline styles with flex properties
  const flexStyles = {
    display: "flex",
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap: gap,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    ...style, // Allow overriding styles
  };

  return (
    <div style={flexStyles} {...rest}>
      {children}
    </div>
  );
};
