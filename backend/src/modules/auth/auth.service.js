import bcrypt from "bcrypt";
import prisma from "../../lib/prisma.js";

export const registerCustomer = async (data) => {

    const existingCustomer = await prisma.customer.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingCustomer) {
        throw new Error("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const customer = await prisma.customer.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
        },
    });

    const { password, ...customerWithoutPassword } = customer;

    return customerWithoutPassword;
};

export const loginCustomer = async ({ email, password }) => {

    const customer = await prisma.customer.findUnique({
        where: {
            email,
        },
    });

    if (!customer) {
        throw new Error("Invalid email or password.");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        customer.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }

    const { password: _, ...customerWithoutPassword } = customer;

    return customerWithoutPassword;
};

export const loginAdmin = async ({ email, password }) => {

    const admin = await prisma.admin.findUnique({
        where: {
            email,
        },
    });

    if (!admin) {
        throw new Error("Invalid email or password.");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        admin.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }

    const { password: _, ...adminWithoutPassword } = admin;

    return adminWithoutPassword;
};

export const getAdminById = async (id) => {

    const admin = await prisma.admin.findUnique({
        where: {
            id,
        },
    });

    if (!admin) {
        throw new Error("Admin not found.");
    }

    const { password, ...adminWithoutPassword } = admin;

    return adminWithoutPassword;
};