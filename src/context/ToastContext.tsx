// src/ToastContext.tsx

import React, { createContext, useContext, useRef } from "react";
import { Toast, ToastMessage } from "primereact/toast";
import { ToastSeverity } from "../types/Toast";

// Define the context type
interface ToastContextType {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Create a custom hook for easy access to the context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (toastMessage: ToastMessage | ToastMessage[]) => {
    toastRef.current?.show(toastMessage);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
};
