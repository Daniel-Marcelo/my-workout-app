import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { ReactNode, useState } from "react";
import { SecondaryText } from "../SecondaryText";
import { useNavigate } from "react-router-dom";

export const AppBar = ({
  title,
  leftIcon,
  onClickLeftIcon,
}: {
  title: string;
  leftIcon?: string;
  onClickLeftIcon: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "1rem",
          display: "flex",
          background: "white",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <div onClick={() => navigate("/workout/plan")}>
              <SecondaryText
                style={{
                  cursor: "pointer",
                }}
              >
                Create New Plan
              </SecondaryText>
            </div>
          </Sidebar>
          {leftIcon && (
            <Button
              rounded
              text
              severity="secondary"
              icon={`pi ${leftIcon}`}
              onClick={onClickLeftIcon}
            />
          )}
          <Button
            rounded
            text
            severity="secondary"
            icon="pi pi-bars"
            onClick={() => setVisible(true)}
          />
          <div
            style={{
              color: "black",
              flex: 1,
              fontSize: "1.25rem",
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: ".75rem",
              paddingBottom: ".75rem",
            }}
          >
            {title}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "3rem" }}></div>
    </>
  );
};
