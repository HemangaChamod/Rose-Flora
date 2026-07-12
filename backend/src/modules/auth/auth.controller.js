import asyncHandler from "../../utils/asyncHandler.js";

import {
    registerCustomer,
    loginCustomer,
    loginAdmin,
    getAdminById,
    verifyCustomerEmail,
} from "./auth.service.js";

import { generateToken } from "../../utils/jwt.js";

import { successResponse } from "../../utils/response.js";

/* ======================================================
   Customer Register
====================================================== */

export const register = asyncHandler(async (req, res) => {

    const customer =
        await registerCustomer(req.body);

    return successResponse(

        res,

        "Registration successful. Please check your email to verify your account.",

        customer,

        201

    );

});

/* ======================================================
   Verify Customer Email
====================================================== */

export const verifyEmail = asyncHandler(async (req, res) => {

    const { token } = req.query;

    if (!token) {

        throw new Error("Verification token is missing.");

    }

    await verifyCustomerEmail(token);

    return successResponse(

        res,

        "Email verified successfully."

    );

});

/* ======================================================
   Customer Login
====================================================== */

export const login = asyncHandler(async (req, res) => {

    const customer =
        await loginCustomer(req.body);

    const token =
        generateToken(customer.id);

    const isProduction =
        process.env.NODE_ENV === "production";

    res.cookie("token", token, {

        httpOnly: true,

        secure: isProduction,

        sameSite:
            isProduction
                ? "none"
                : "lax",

        maxAge:
            1000 * 60 * 60 * 24 * 7,

    });

    return successResponse(

        res,

        "Login successful.",

        customer

    );

});

/* ======================================================
   Admin Login
====================================================== */

export const adminLogin = asyncHandler(async (req, res) => {

    const admin =
        await loginAdmin(req.body);

    const token =
        generateToken(admin.id);

    const isProduction =
        process.env.NODE_ENV === "production";

    res.cookie("adminToken", token, {

        httpOnly: true,

        secure: isProduction,

        sameSite:
            isProduction
                ? "none"
                : "lax",

        maxAge:
            1000 * 60 * 60 * 24 * 7,

    });

    return successResponse(

        res,

        "Admin login successful.",

        admin

    );

});

/* ======================================================
   Current Admin
====================================================== */

export const getCurrentAdmin = asyncHandler(async (req, res) => {

    const admin =
        await getAdminById(req.admin.id);

    return successResponse(

        res,

        "Admin retrieved successfully.",

        admin

    );

});

/* ======================================================
   Admin Logout
====================================================== */

export const adminLogout = asyncHandler(async (req, res) => {

    res.clearCookie("adminToken", {

        httpOnly: true,

        secure:
            process.env.NODE_ENV === "production",

        sameSite:
            process.env.NODE_ENV === "production"
                ? "none"
                : "lax",

    });

    return successResponse(

        res,

        "Admin logout successful."

    );

});

/* ======================================================
   Current Customer
====================================================== */

export const getCurrentUser = asyncHandler(async (req, res) => {

    return successResponse(

        res,

        "Customer retrieved successfully.",

        req.user

    );

});

/* ======================================================
   Customer Logout
====================================================== */

export const logout = asyncHandler(async (req, res) => {

    res.clearCookie("token", {

        httpOnly: true,

        secure:
            process.env.NODE_ENV === "production",

        sameSite:
            process.env.NODE_ENV === "production"
                ? "none"
                : "lax",

    });

    return successResponse(

        res,

        "Logout successful."

    );

});