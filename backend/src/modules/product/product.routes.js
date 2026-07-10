import { Router } from "express";

import validate from "../../middleware/validate.js";
import adminAuthMiddleware from "../../middleware/adminAuthMiddleware.js";
import isAdmin from "../../middleware/isAdmin.js";

import {
    createProductSchema,
    updateProductSchema,
} from "./product.schema.js";

import {
    create,
    getAll,
    getOne,
    update,
    remove,
} from "./product.controller.js";

const router = Router();

router.post(
    "/",
    adminAuthMiddleware,
    isAdmin,
    validate(createProductSchema),
    create
);

router.get(
    "/",
    getAll
);

router.get(
    "/:id",
    getOne
);

router.put(
    "/:id",
    adminAuthMiddleware,
    isAdmin,
    validate(updateProductSchema),
    update
);

router.delete(
    "/:id",
    adminAuthMiddleware,
    isAdmin,
    remove
);

export default router;