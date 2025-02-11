import { SpeedDial } from "primereact/speeddial";
import { useState } from "react";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../const/routes";

export const Fab = () => {
  const [fabOpen, setFabOpen] = useState(false);
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Create Workout Template",
      icon: "pi pi-file-plus",
      style: { fontSize: ".75rem" },
      command: () => navigate(AppRoutes.WorkoutTemplate),
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
      command: () => navigate(AppRoutes.AddExercise),
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
