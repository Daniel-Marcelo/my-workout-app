import "./App.css";
import { Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { SignUpPage } from "./pages/SignUp";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <Routes>
          <Route path="/signUp" Component={SignUpPage} />
          <Route path="/" element={<div>Base route</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
