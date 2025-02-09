import React from "react";
import { MenuItem } from "primereact/menuitem";
import "./Menu.css";
import { Menubar } from "primereact/menubar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useToast } from "../../context/ToastContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const Menu: React.FC = () => {
  const toast = useToast();

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
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
