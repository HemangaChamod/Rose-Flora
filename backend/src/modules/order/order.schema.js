import { z } from "zod";


const orderItemSchema = z.object({

    productId: z
        .string()
        .min(1),

    quantity: z
        .number()
        .int()
        .positive(),

});


const baseOrderSchema = z.object({

    firstName: z
        .string()
        .trim()
        .min(1, "First name is required."),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required."),

    email: z
        .string()
        .trim()
        .email("Enter a valid email address."),

    phone: z
        .string()
        .trim()
        .min(1, "Phone number is required."),

    addressLine1: z
        .string()
        .trim()
        .min(1, "Delivery address is required."),

    addressLine2: z
        .string()
        .trim()
        .optional()
        .default(""),

    city: z
        .string()
        .trim()
        .min(1, "City is required."),

    district: z
        .string()
        .trim()
        .min(1, "District is required."),

    postalCode: z
        .string()
        .trim()
        .optional()
        .default(""),

    orderNotes: z
        .string()
        .trim()
        .optional()
        .default(""),

    items: z
        .array(orderItemSchema)
        .min(
            1,
            "Order must contain at least one product."
        ),

});


export const createCODOrderSchema =
    baseOrderSchema.extend({

        paymentMethod:
            z.literal("COD"),

    });


export const createCardOrderSchema =
    baseOrderSchema.extend({

        paymentMethod:
            z.literal("CARD"),

    });


export const updateOrderStatusSchema =
    z.object({

        orderStatus: z.enum([
            "PENDING",
            "PROCESSING",
            "SHIPPED",
            "DELIVERED",
        ]),

    });


export const updatePaymentStatusSchema =
    z.object({

        paymentStatus: z.enum([
            "PENDING",
            "PAID",
            "FAILED",
            "REFUNDED",
        ]),

    });