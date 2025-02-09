import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Chatpage/Pages/home.jsx";
import Login from "./pages/LoginPage.jsx";
// Initialize QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}></QueryClientProvider>
    <Login />
  </StrictMode>
);
