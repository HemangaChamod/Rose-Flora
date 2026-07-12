import { Router } from "express";

import adminAuthMiddleware from "../../middleware/adminAuthMiddleware.js";

import customerAuthMiddleware from "../../middleware/customerAuthMiddleware.js";

import validate from "../../middleware/validate.js";

import {
    createOrderSchema,
    updateOrderStatusSchema,
    updatePaymentStatusSchema,
} from "./order.schema.js";

import {
    createCOD,
    getMyOrders,
    getMyOrder,
    getAll,
    getOne,
    updateStatus,
    updatePayment,
} from "./order.controller.js";


const router = Router();


/* =====================================================
   Customer Order Routes
===================================================== */

router.post(
    "/cod",
    customerAuthMiddleware,
    validate(createOrderSchema),
    createCOD
);


router.get(
    "/my-orders",
    customerAuthMiddleware,
    getMyOrders
);


router.get(
    "/my-orders/:id",
    customerAuthMiddleware,
    getMyOrder
);


/* =====================================================
   Admin Order Routes
===================================================== */

router.get(
    "/",
    adminAuthMiddleware,
    getAll
);


router.get(
    "/:id",
    adminAuthMiddleware,
    getOne
);


router.patch(
    "/:id/status",
    adminAuthMiddleware,
    validate(updateOrderStatusSchema),
    updateStatus
);


router.patch(
    "/:id/payment-status",
    adminAuthMiddleware,
    validate(updatePaymentStatusSchema),
    updatePayment
);


export default router;