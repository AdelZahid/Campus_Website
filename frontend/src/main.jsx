import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Correct structure
import AccountPage from "./pages/Acount/account.jsx";
import MessagePage from "./pages/Chatpage/Pages/home.jsx";
import App from "./components/App.jsx";
console.log("Rendering application...");

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
