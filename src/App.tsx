import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Base route</div>} />
      <Route path="/contact" element={<div>Contact</div>} />
    </Routes>
  );
}

export default App;
