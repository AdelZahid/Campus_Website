import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./components/App.jsx";
import Login from "./pages/LoginPage.jsx";
import Messagepage from "./pages/Chatpage/Pages/home.jsx";
import AccountPage from "./pages/Acount/account.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
console.log("Rendering application...");

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
