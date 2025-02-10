import { SpeedDial } from "primereact/speeddial";
import { useState } from "react";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";

export const Fab = () => {
  const [fabOpen, setFabOpen] = useState(false);
  const items: MenuItem[] = [
    {
      label: "Create Routine Template",
      icon: "pi pi-file-plus",
      style: { fontSize: ".75rem" },
    },
    {
      label: "Record Workout",
      icon: "pi pi-pen-to-square",
      style: { fontSize: ".75rem" },
    },
    {
      label: "Create Exercise",
      icon: " pi pi-file",
      style: { fontSize: ".75rem" },
    },
  ];

  return (
    <>
      <SpeedDial
        style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        direction="up"
        transitionDelay={80}
        showIcon="pi pi-bars"
        hideIcon="pi pi-times"
        buttonClassName="p-button-outlined"
        onClick={() => setFabOpen((prev) => !prev)}
      />
      {fabOpen && (
        <Menu
          style={{ position: "fixed", bottom: "6rem", right: "1rem" }}
          model={items}
          pt={{
            root: {
              style: { width: "30%" },
            },
            icon: {
              style: { fontSize: ".875rem" },
            },
          }}
        />
      )}
    </>
  );
};
