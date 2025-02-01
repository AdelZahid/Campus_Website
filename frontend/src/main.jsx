import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./componetns/App.jsx";
import Login from "./componetns/Lgoin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Login />
  </StrictMode>
);
