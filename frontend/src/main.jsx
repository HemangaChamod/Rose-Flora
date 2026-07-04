import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

// Template CSS
import "../public/css/font-icons.css";
import "../public/css/plugins.css";
import "../public/css/style.css";
import "../public/css/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);