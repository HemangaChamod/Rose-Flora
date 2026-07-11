import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "../public/css/font-icons.css";
import "../public/css/plugins.css";
import "../public/css/style.css";
import "../public/css/responsive.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import CartProvider from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);



