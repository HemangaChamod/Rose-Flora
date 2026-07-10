import { Router } from "express";

import adminAuthMiddleware from "../../middleware/adminAuthMiddleware.js";

import { getDashboard } from "./dashboard.controller.js";

const router = Router();

router.get(
    "/",
    adminAuthMiddleware,
    getDashboard
);

export default router;