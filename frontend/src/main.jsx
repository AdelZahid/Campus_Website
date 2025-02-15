import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Home from "./pages/HomePage/HomePage.jsx";
import Login from "./pages/LoginPage/LoginPage.jsx";
import Library from "./pages/LibraryPage/LibraryPage.jsx";
import Messages from "./pages/Chatpage/Pages/home.jsx"
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Messages />
  </StrictMode>
);
