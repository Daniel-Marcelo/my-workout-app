// src/ProtectedRoute.tsx
import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Menu } from "../Menu";
import { FlexBox } from "../FlexBox";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuth();

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (loading)
    return (
      <FlexBox style={{ height: "100%" }} justify="center" align="center">
        <ProgressSpinner />
      </FlexBox>
    );

  return (
    <>
      <Menu />
      <div style={{ flex: 1 }}>{children}</div>
    </>
  );
};

export default ProtectedRoute;
