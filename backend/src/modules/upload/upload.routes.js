import { Router } from "express";

import upload from "../../middleware/upload.js";

import {
    uploadImages,
} from "./upload.controller.js";

const router = Router();

router.post(
    "/",
    upload.array("images", 4),
    uploadImages
);

export default router;