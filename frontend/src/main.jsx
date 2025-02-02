import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import Login from "./pages/LoginPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Login />
  </StrictMode>
);
