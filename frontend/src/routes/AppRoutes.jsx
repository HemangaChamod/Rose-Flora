import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Account from "../pages/Account/Account";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/shop" element={<Shop />} />

            <Route path="/ProductDetails" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />

            <Route
                path="/checkout"
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/account"
                element={
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                }
            />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

        </Routes>
    );
}

export default AppRoutes;