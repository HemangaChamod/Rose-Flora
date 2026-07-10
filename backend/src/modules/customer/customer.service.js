import bcrypt from "bcrypt";
import prisma from "../../lib/prisma.js";

export const getProfile = async (customerId) => {

    return prisma.customer.findUnique({
        where: {
            id: customerId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            createdAt: true,
            updatedAt: true,
        },
    });

};

export const updateProfile = async (
    customerId,
    data
) => {

    return prisma.customer.update({
        where: {
            id: customerId,
        },
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            createdAt: true,
            updatedAt: true,
        },
    });

};

export const changePassword = async (
    customerId,
    data
) => {

    const customer =
        await prisma.customer.findUnique({
            where: {
                id: customerId,
            },
        });

    const passwordMatch =
        await bcrypt.compare(
            data.currentPassword,
            customer.password
        );

    if (!passwordMatch) {
        throw new Error(
            "Current password is incorrect."
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            data.newPassword,
            10
        );

    await prisma.customer.update({
        where: {
            id: customerId,
        },
        data: {
            password: hashedPassword,
        },
    });

};