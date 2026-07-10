import { z } from "zod";

export const updateProfileSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters."),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters."),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits."),
});

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8),

        newPassword: z
            .string()
            .min(8),

        confirmPassword: z
            .string()
            .min(8),
    })
    .refine(
        (data) =>
            data.newPassword ===
            data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        }
    );