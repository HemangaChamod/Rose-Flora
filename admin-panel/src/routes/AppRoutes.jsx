import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

import Products from "../pages/Products/Products";
import AddProduct from "../pages/Products/AddProduct";
import EditProduct from "../pages/Products/EditProduct";

import Categories from "../pages/Categories/Categories";
import AddCategory from "../pages/Categories/AddCategory";
import EditCategory from "../pages/Categories/EditCategory";

import Orders from "../pages/Orders/Orders";
import ViewOrder from "../pages/Orders/ViewOrder";

import Customers from "../pages/Customers/Customers";
import ViewCustomer from "../pages/Customers/ViewCustomer";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
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

            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders/:id"
                element={
                    <ProtectedRoute>
                        <ViewOrder />
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
                path="/customers/:id"
                element={
                    <ProtectedRoute>
                        <ViewCustomer />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRoutes;