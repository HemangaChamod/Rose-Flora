import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "./config/cors.js";

import authRoutes from "./modules/auth/auth.routes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";


const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(errorMiddleware);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "LassanaFlora API Running"
    });
});

export default app;