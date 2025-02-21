import { Dialog } from "primereact/dialog";
import React, { ReactNode } from "react";
import { FlexBox } from "../FlexBox";
import { Tag } from "primereact/tag";
import { InputOption } from "../../types/General";
import { ViewNotesCode } from "../../const/workout";

type DialogProps<Item> = {
  visible: boolean;
  onHide: () => void;
  header: string;
  options: InputOption<string, Item>[];
  onEditOption: (option: InputOption<string, Item>) => void;
  infoMessage?: ReactNode;
};

export const SelectDialog = <Item,>({
  visible,
  onHide,
  options,
  onEditOption,
  header,
  infoMessage,
}: DialogProps<Item>) => {
  const [showViewNotesMessage, setShowViewNotesMessage] = React.useState(false);

  const renderTag = (option: InputOption<string, Item>) => (
    <Tag
      style={{ cursor: "pointer", width: "50%", flex: 0.5 }}
      pt={{
        root: {
          style: {
            padding: ".5rem",
          },
        },
      }}
      key={option.name}
      onClick={() => onEditOption(option)}
    >
      {option.name}
    </Tag>
  );

  return (
    <Dialog
      visible={visible}
      header={header}
      onHide={onHide}
      style={{
        width: "30vw",
      }}
    >
      <FlexBox gap="1rem" direction="column" align="center" justify="center">
        {options.map((option) => {
          return option.code !== ViewNotesCode ? (
            renderTag(option)
          ) : (
            <>
              <FlexBox>
                <div>OR</div>
              </FlexBox>
              <FlexBox style={{ width: "100%" }}>
                <div style={{ flex: 0.25 }}></div>
                {renderTag(option)}
                <FlexBox style={{ flex: 0.25 }} justify="center" align="center">
                  <i
                    onClick={() => setShowViewNotesMessage((prev) => !prev)}
                    className="pi pi-info-circle"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </FlexBox>
              </FlexBox>
            </>
          );
        })}

        {showViewNotesMessage && infoMessage}
      </FlexBox>
    </Dialog>
  );
};
