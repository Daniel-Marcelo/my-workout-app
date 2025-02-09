import { Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUp";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/Dashboard";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated/RedirectIfAuthenticated";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/signUp"
        element={
          <RedirectIfAuthenticated>
            <SignUpPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="/" element={<div>Base route</div>} />
      <Route path="/contact" element={<div>Contact</div>} />
    </Routes>
  );
}

export default App;
