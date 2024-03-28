import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider> {/* For SEO & Rendering */}
      <CssBaseline /> {/* For basic css boiler plate & Roboto font */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
