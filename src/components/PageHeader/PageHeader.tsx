import { FlexBox } from "../FlexBox";

export const PageHeader = ({
  title,
  leftContent,
}: {
  title: string;
  leftContent?: React.ReactNode;
}) => {
  return (
    <FlexBox className="new-plan-header" style={{ marginBottom: "2rem" }}>
      <FlexBox>{leftContent}</FlexBox>
      <div
        style={{
          color: "black",
          flex: 1,
          fontSize: "1.25rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title}
      </div>
    </FlexBox>
  );
};
