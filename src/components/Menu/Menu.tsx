import React from "react";
import { MenuItem } from "primereact/menuitem";
import "./Menu.css";
import { Menubar } from "primereact/menubar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useToast } from "../../context/ToastContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../const/routes";

export const Menu: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: () => navigate(AppRoutes.Dashboard),
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-sign-out",
      command: () => {
        confirmDialog({
          message: "Are you sure you want to proceed?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "accept",
          accept: async () => {
            await signOut(auth);
            toast.showToast({
              detail: "Logout successful",
              severity: "success",
            });
          },
        });
      },
    },
  ];

  return (
    <>
      <ConfirmDialog />

      <Menubar model={items} />
    </>
  );
};
