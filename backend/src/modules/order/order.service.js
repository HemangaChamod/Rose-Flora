import prisma from "../../lib/prisma.js";

export const getOrders = async ({
    page = 1,
    limit = 10,
    search = "",
    orderStatus = "",
    paymentStatus = "",
    paymentMethod = "",
}) => {

    page = Math.max(Number(page) || 1, 1);
    limit = Math.min(
        Math.max(Number(limit) || 10, 1),
        100
    );

    const where = {

        ...(search && {
            OR: [
                {
                    orderNumber: {
                        contains: search,
                    },
                },
                {
                    shippingFirstName: {
                        contains: search,
                    },
                },
                {
                    shippingLastName: {
                        contains: search,
                    },
                },
                {
                    shippingEmail: {
                        contains: search,
                    },
                },
                {
                    shippingPhone: {
                        contains: search,
                    },
                },
            ],
        }),

        ...(orderStatus && {
            orderStatus,
        }),

        ...(paymentStatus && {
            paymentStatus,
        }),

        ...(paymentMethod && {
            paymentMethod,
        }),

    };

    const [orders, total] = await Promise.all([

        prisma.order.findMany({

            where,

            include: {

                customer: {

                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },

                },

                _count: {
                    select: {
                        items: true,
                    },
                },

            },

            orderBy: {
                createdAt: "desc",
            },

            skip: (page - 1) * limit,

            take: limit,

        }),

        prisma.order.count({
            where,
        }),

    ]);

    return {

        orders,

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },

    };

};

export const getOrderById = async (id) => {

    const order = await prisma.order.findUnique({

        where: {
            id,
        },

        include: {

            customer: {

                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                },

            },

            items: {

                orderBy: {
                    createdAt: "asc",
                },

            },

        },

    });

    if (!order) {

        throw new Error("Order not found.");

    }

    return order;

};

export const updateOrderStatus = async (
    id,
    orderStatus
) => {

    const order = await prisma.order.findUnique({

        where: {
            id,
        },

    });

    if (!order) {

        throw new Error("Order not found.");

    }

    const statusOrder = [
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
    ];

    const currentIndex = statusOrder.indexOf(
        order.orderStatus
    );

    const newIndex = statusOrder.indexOf(
        orderStatus
    );

    if (newIndex < currentIndex) {

        throw new Error(
            "Order status cannot move backwards."
        );

    }

    return prisma.order.update({

        where: {
            id,
        },

        data: {
            orderStatus,
        },

    });

};

export const updatePaymentStatus = async (
    id,
    paymentStatus
) => {

    const order = await prisma.order.findUnique({

        where: {
            id,
        },

    });

    if (!order) {

        throw new Error("Order not found.");

    }

    if (
        order.paymentMethod === "CARD" &&
        paymentStatus === "PAID"
    ) {

        throw new Error(
            "Card payments cannot be manually marked as paid."
        );

    }

    return prisma.order.update({

        where: {
            id,
        },

        data: {
            paymentStatus,
        },

    });

};