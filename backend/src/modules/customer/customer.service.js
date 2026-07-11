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

    export const getCustomers = async () => {

    const customers = await prisma.customer.findMany({

        orderBy: {
            createdAt: "desc",
        },

        include: {

            orders: {

                select: {
                    total: true,
                },

            },

        },

    });

    return customers.map(customer => ({

        id: customer.id,

        firstName: customer.firstName,

        lastName: customer.lastName,

        email: customer.email,

        phone: customer.phone,

        createdAt: customer.createdAt,

        orderCount: customer.orders.length,

        totalSpent: customer.orders.reduce(

            (sum, order) =>

                sum + Number(order.total),

            0

        ),

    }));

};

export const getCustomerById = async (id) => {

    const customer = await prisma.customer.findUnique({

        where: {
            id,
        },

        include: {

            orders: {

                include: {

                    items: true,

                },

                orderBy: {
                    createdAt: "desc",
                },

            },

        },

    });

    if (!customer) {

        throw new Error("Customer not found.");

    }

    return customer;
 }

