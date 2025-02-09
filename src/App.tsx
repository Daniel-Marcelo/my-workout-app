import "./App.css";
import { Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { SignUpPage } from "./pages/SignUp";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginPage } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { DashboardPage } from "./pages/Dashboard";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated/RedirectIfAuthenticated";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>
          <Routes>
            <Route path="/dashboard" Component={DashboardPage} />
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
        </PrimeReactProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
