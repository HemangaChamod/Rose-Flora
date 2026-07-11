import { z } from "zod";

export const updateOrderStatusSchema = z.object({

    orderStatus: z.enum([
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
    ]),

});

export const updatePaymentStatusSchema = z.object({

    paymentStatus: z.enum([
        "PENDING",
        "PAID",
        "FAILED",
        "REFUNDED",
    ]),

});