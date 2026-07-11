import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "./config/cors.js";

import authRoutes from "./modules/auth/auth.routes.js";

import customerRoutes from "./modules/customer/customer.routes.js";

import categoryRoutes from "./modules/category/category.routes.js";

import uploadRoutes from "./modules/upload/upload.routes.js";

import productRoutes from "./modules/product/product.routes.js";

import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";

import orderRoutes from "./modules/order/order.routes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";


const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/customer", customerRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/products", productRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "LassanaFlora API Running"
    });
});

app.use(errorMiddleware);

export default app;