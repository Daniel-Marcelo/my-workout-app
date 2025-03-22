import { Navigate, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUp";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/Dashboard";
import { AddExercisePage } from "./pages/AddExercise";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated/RedirectIfAuthenticated";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";
import { AppRoutes } from "./const/routes";
import { CreateWorkoutTemplatePage } from "./pages/CreateWorkoutTemplate";
import {
  defaultTheme,
  ThemeProvider,
  Preflight,
} from "@xstyled/styled-components";
import { CreateWorkoutPlan } from "./pages/CreateWorkoutPlan";

const theme = {
  ...defaultTheme,
  // Customize your theme here
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <Routes>
        <Route
          path={AppRoutes.CreateWorkoutPlan}
          element={
            <ProtectedRoute>
              <CreateWorkoutPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.Dashboard}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.AddExercise}
          element={
            <ProtectedRoute>
              <AddExercisePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.WorkoutTemplate}
          element={
            <ProtectedRoute>
              <CreateWorkoutTemplatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.Login}
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path={AppRoutes.SignUp}
          element={
            <RedirectIfAuthenticated>
              <SignUpPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/" element={<Navigate to={AppRoutes.Dashboard} />} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
