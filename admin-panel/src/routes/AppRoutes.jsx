import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

import Products from "../pages/Products/Products";
import Categories from "../pages/Categories/Categories";
import Orders from "../pages/Orders/Orders";
import Customers from "../pages/Customers/Customers";

import AddProduct from "../pages/Products/AddProduct";
import EditProduct from "../pages/Products/EditProduct";

import AddCategory from "../pages/Categories/AddCategory";
import EditCategory from "../pages/Categories/EditCategory";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
            path="/products"
            element={
                <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
            }
        />

        <Route
            path="/categories"
            element={
                <ProtectedRoute>
                    <Categories />
                </ProtectedRoute>
            }
        />

        <Route
            path="/orders"
            element={
                <ProtectedRoute>
                    <Orders />
                </ProtectedRoute>
            }
        />

        <Route
            path="/customers"
            element={
                <ProtectedRoute>
                    <Customers />
                </ProtectedRoute>
            }
        />

        <Route
            path="/products"
            element={
                <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
            }
        />

        <Route
            path="/products/add"
            element={
                <ProtectedRoute>
                    <AddProduct />
                </ProtectedRoute>
            }
        />

        <Route
            path="/products/edit/:id"
            element={
                <ProtectedRoute>
                    <EditProduct />
                </ProtectedRoute>
            }
        />

        <Route
            path="/categories"
            element={
                <ProtectedRoute>
                    <Categories />
                </ProtectedRoute>
            }
        />

        <Route
            path="/categories/add"
            element={
                <ProtectedRoute>
                    <AddCategory />
                </ProtectedRoute>
            }
        />

        <Route
            path="/categories/edit/:id"
            element={
                <ProtectedRoute>
                    <EditCategory />
                </ProtectedRoute>
            }
        />

        </Routes>
    );
}

export default AppRoutes;