import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";

import {
    register,
    login,
    getCurrentUser,
    logout,
} from "./auth.controller.js";

import validate from "../../middleware/validate.js";

import {
    registerSchema,
    loginSchema,
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

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.post(
    "/logout",
    logout
);

export default router;