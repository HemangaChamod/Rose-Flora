import { Router } from "express";

import authMiddleware from "../../middleware/customerAuthMiddleware.js";
import validate from "../../middleware/validate.js";

import {
    profile,
    update,
    updatePassword,
} from "./customer.controller.js";

import {
    updateProfileSchema,
    changePasswordSchema,
} from "./customer.schema.js";

const router = Router();

router.get(
    "/profile",
    authMiddleware,
    profile
);

router.put(
    "/profile",
    authMiddleware,
    validate(updateProfileSchema),
    update
);

router.put(
    "/change-password",
    authMiddleware,
    validate(changePasswordSchema),
    updatePassword
);

export default router;