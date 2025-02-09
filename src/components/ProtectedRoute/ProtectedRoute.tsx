// src/ProtectedRoute.tsx
import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuth();

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (loading) return <ProgressSpinner />;

  return children;
};

export default ProtectedRoute;
