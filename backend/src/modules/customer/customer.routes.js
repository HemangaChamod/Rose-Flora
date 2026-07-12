import {
    Router,
} from "express";

import customerAuthMiddleware
    from "../../middleware/customerAuthMiddleware.js";

import adminAuthMiddleware
    from "../../middleware/adminAuthMiddleware.js";

import validate
    from "../../middleware/validate.js";

import {
    profile,
    update,
    updatePassword,
    getMyOrders,
    getAllCustomers,
    getCustomer,
} from "./customer.controller.js";

import {
    updateProfileSchema,
    changePasswordSchema,
} from "./customer.schema.js";


const router = Router();


/* =====================================================
   Customer Routes
===================================================== */

router.get(
    "/profile",
    customerAuthMiddleware,
    profile
);


router.put(
    "/profile",
    customerAuthMiddleware,
    validate(updateProfileSchema),
    update
);


router.put(
    "/change-password",
    customerAuthMiddleware,
    validate(changePasswordSchema),
    updatePassword
);


router.get(
    "/orders",
    customerAuthMiddleware,
    getMyOrders
);


/* =====================================================
   Admin Routes
===================================================== */

router.get(
    "/",
    adminAuthMiddleware,
    getAllCustomers
);


router.get(
    "/:id",
    adminAuthMiddleware,
    getCustomer
);


export default router;