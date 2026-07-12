import { Router } from "express";

import {
    stripeWebhook,
} from "./payment.controller.js";


const router = Router();


router.post(
    "/stripe-webhook",
    stripeWebhook
);


export default router;