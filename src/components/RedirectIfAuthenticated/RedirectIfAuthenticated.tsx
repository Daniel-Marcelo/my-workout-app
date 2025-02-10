// src/RedirectIfAuthenticated.tsx
import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppRoutes } from "../../const/routes";

interface RedirectIfAuthenticatedProps {
  children: ReactNode;
}

const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProps> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(AppRoutes.Dashboard);
    }
  }, [user, loading, navigate]);

  if (loading) return <ProgressSpinner />;
  if (!user) return children;
  return <ProgressSpinner />;
};

export default RedirectIfAuthenticated;
