import { z } from "zod";

export const createProductSchema = z.object({
    name: z
        .string()
        .min(3, "Product name is required."),

    shortDescription: z
        .string()
        .min(10, "Short description is required."),

    fullDescription: z
        .string()
        .min(20, "Full description is required."),

    regularPrice: z.coerce
        .number()
        .positive("Regular price must be greater than 0."),

    salePrice: z.coerce
        .number()
        .nullable()
        .optional(),

    quantity: z.coerce
        .number()
        .int()
        .min(0),

    sku: z
        .string()
        .min(3),

    categoryId: z
        .string()
        .min(1),

    featured: z
        .coerce
        .boolean()
        .optional(),

    newArrival: z
        .coerce
        .boolean()
        .optional(),

    tags: z
        .array(z.string())
        .optional(),

    images: z
        .array(
            z.object({
                imageUrl: z.string(),
                publicId: z.string(),
            })
        )
        .min(1, "At least one image is required.")
        .max(4),
});

export const updateProductSchema =
    createProductSchema.partial();