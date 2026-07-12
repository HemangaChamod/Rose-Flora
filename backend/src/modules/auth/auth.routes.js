import { Router } from "express";
import authMiddleware from "../../middleware/customerAuthMiddleware.js";
import customerAuthMiddleware from "../../middleware/customerAuthMiddleware.js";
import adminAuthMiddleware from "../../middleware/adminAuthMiddleware.js";

import {
    register,
    verifyEmail,
    login,
    adminLogin,
    getCurrentUser,
    getCurrentAdmin,
    logout,
    adminLogout,
} from "./auth.controller.js";

import validate from "../../middleware/validate.js";

import {
    registerSchema,
    loginSchema,
    adminLoginSchema,
} from "./auth.schema.js";

const router = Router();

router.get(
    "/me",
    authMiddleware,
    getCurrentUser
);

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.get(
    "/verify-email",
    verifyEmail
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.post(
    "/logout",
    logout
);

router.post(
    "/admin/login",
    validate(adminLoginSchema),
    adminLogin
);

router.get(
    "/admin/me",
    adminAuthMiddleware,
    getCurrentAdmin
);

router.post(
    "/admin/logout",
    adminLogout
);

export default router;