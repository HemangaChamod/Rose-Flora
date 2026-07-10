import { Router } from "express";

import validate from "../../middleware/validate.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./category.controller.js";

const router = Router();

router.get(
  "/",
  getAll
);

router.get(
  "/:id",
  getOne
);

router.post(
  "/",
  validate(createCategorySchema),
  create
);

router.put(
  "/:id",
  validate(updateCategorySchema),
  update
);

router.delete(
  "/:id",
  remove
);

export default router;