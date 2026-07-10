import prisma from "../../config/prisma.js";

export const getDashboardData = async () => {

    const [
        totalProducts,
        totalCategories,
        totalCustomers,
        totalOrders,
        recentOrders,
        lowStockProducts,
    ] = await Promise.all([

        prisma.product.count({
            where: {
                deletedAt: null,
            },
        }),

        prisma.category.count(),

        prisma.customer.count(),

        prisma.order.count(),

        prisma.order.findMany({

            take: 5,

            orderBy: {
                createdAt: "desc",
            },

            include: {
                customer: true,
            },

        }),

        prisma.product.findMany({

            where: {
                deletedAt: null,
                quantity: {
                    lte: 10,
                },
            },

            orderBy: {
                quantity: "asc",
            },

            take: 5,

        }),

    ]);

    return {

        totalProducts,

        totalCategories,

        totalCustomers,

        totalOrders,

        recentOrders,

        lowStockProducts,

    };

};