import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        password: z.string().min(8),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),
});

export const adminLoginSchema = z.object({
    email: z
        .string()
        .email("Valid email is required."),

    password: z
        .string()
        .min(6, "Password is required."),
});