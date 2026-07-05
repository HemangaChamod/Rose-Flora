import asyncHandler from "../../utils/asyncHandler.js";
import {
    registerCustomer,
    loginCustomer,
} from "./auth.service.js";

import { generateToken } from "../../utils/jwt.js";
import { successResponse } from "../../utils/response.js";

export const register = asyncHandler(async (req, res) => {
    const customer = await registerCustomer(req.body);

    const token = generateToken(customer.id);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return successResponse(
        res,
        "Registration successful.",
        customer,
        201
    );
});

export const login = asyncHandler(async (req, res) => {
    const customer = await loginCustomer(req.body);

    const token = generateToken(customer.id);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return successResponse(
        res,
        "Login successful.",
        customer
    );
});

export const getCurrentUser = asyncHandler(
    async (req, res) => {

        return successResponse(
            res,
            "Customer retrieved successfully.",
            req.user
        );

    }
);

export const logout = asyncHandler(
    async (req, res) => {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
        });

        return successResponse(
            res,
            "Logout successful."
        );

    }
);