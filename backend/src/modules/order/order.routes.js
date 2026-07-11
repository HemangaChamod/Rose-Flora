import { Router } from "express";

import adminAuthMiddleware from "../../middleware/adminAuthMiddleware.js";

import validate from "../../middleware/validate.js";

import {
    updateOrderStatusSchema,
    updatePaymentStatusSchema,
} from "./order.schema.js";

import {
    getAll,
    getOne,
    updateStatus,
    updatePayment,
} from "./order.controller.js";

const router = Router();

router.use(adminAuthMiddleware);

router.get(
    "/",
    getAll
);

router.get(
    "/:id",
    getOne
);

router.patch(
    "/:id/status",
    validate(updateOrderStatusSchema),
    updateStatus
);

router.patch(
    "/:id/payment-status",
    validate(updatePaymentStatusSchema),
    updatePayment
);

export default router;