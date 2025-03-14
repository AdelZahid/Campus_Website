import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css"; // Added import statement for index.css

// Import styles in the correct order
import "./styles/reset.css";
//import "./index.css"; //This line is already imported above. Removing to avoid duplication.
import "./styles/utilities.css";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import AppQueryClientProvider from "./context/QueryClientProvider";

console.log("Rendering application...");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppQueryClientProvider>
          <App />
        </AppQueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
