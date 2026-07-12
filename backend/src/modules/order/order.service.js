import prisma from "../../lib/prisma.js";


const generateOrderNumber = () => {

    const timestamp = Date.now();

    const randomNumber = Math.floor(
        1000 + Math.random() * 9000
    );

    return `LF-${timestamp}-${randomNumber}`;

};


export const createCODOrder = async (
    customerId,
    data
) => {

    const productIds = [
        ...new Set(
            data.items.map(
                (item) => item.productId
            )
        ),
    ];


    if (
        productIds.length !==
        data.items.length
    ) {

        throw new Error(
            "Duplicate products are not allowed in an order."
        );

    }


    const products = await prisma.product.findMany({

        where: {

            id: {
                in: productIds,
            },

            isActive: true,

            deletedAt: null,

        },

        include: {

            images: {

                orderBy: {
                    displayOrder: "asc",
                },

                take: 1,

            },

        },

    });


    if (
        products.length !==
        productIds.length
    ) {

        throw new Error(
            "One or more products are unavailable."
        );

    }


    const productMap = new Map(

        products.map(
            (product) => [
                product.id,
                product,
            ]
        )

    );


    const preparedItems = data.items.map(
        (item) => {

            const product = productMap.get(
                item.productId
            );


            if (!product) {

                throw new Error(
                    "Product not found."
                );

            }


            if (
                product.quantity <
                item.quantity
            ) {

                throw new Error(
                    `${product.name} does not have enough stock.`
                );

            }


            const price = Number(
                product.salePrice ??
                product.regularPrice
            );


            const subtotal =
                price * item.quantity;


            return {

                productId: product.id,

                productName: product.name,

                sku: product.sku,

                productImage:
                    product.images[0]
                        ?.imageUrl || "",

                price,

                quantity: item.quantity,

                subtotal,

            };

        }
    );


    const subtotal = preparedItems.reduce(

        (total, item) =>
            total + item.subtotal,

        0

    );


    const shippingCost = 0;

    const total =
        subtotal + shippingCost;


    const order = await prisma.$transaction(

        async (tx) => {

            /*
                Stock is checked again inside
                the transaction.

                The conditional update prevents
                stock from becoming negative.
            */

            for (
                const item of preparedItems
            ) {

                const stockUpdate =
                    await tx.product.updateMany({

                        where: {

                            id: item.productId,

                            isActive: true,

                            deletedAt: null,

                            quantity: {
                                gte: item.quantity,
                            },

                        },

                        data: {

                            quantity: {
                                decrement:
                                    item.quantity,
                            },

                        },

                    });


                if (
                    stockUpdate.count !== 1
                ) {

                    throw new Error(
                        `${item.productName} does not have enough stock.`
                    );

                }

            }


            return tx.order.create({

                data: {

                    orderNumber:
                        generateOrderNumber(),

                    customerId,

                    shippingFirstName:
                        data.firstName,

                    shippingLastName:
                        data.lastName,

                    shippingPhone:
                        data.phone,

                    shippingEmail:
                        data.email,

                    streetAddress:
                        [
                            data.addressLine1,
                            data.addressLine2,
                        ]
                            .filter(Boolean)
                            .join(", "),

                    city: data.city,

                    state: data.district,

                    zipCode:
                        data.postalCode || "",

                    paymentMethod: "COD",

                    paymentStatus: "PENDING",

                    orderStatus: "PENDING",

                    subtotal,

                    shippingCost,

                    total,

                    items: {

                        create:
                            preparedItems.map(
                                (item) => ({

                                    productId:
                                        item.productId,

                                    productName:
                                        item.productName,

                                    sku:
                                        item.sku,

                                    productImage:
                                        item.productImage,

                                    price:
                                        item.price,

                                    quantity:
                                        item.quantity,

                                    subtotal:
                                        item.subtotal,

                                })
                            ),

                    },

                },

                include: {

                    items: true,

                },

            });

        }

    );


    return order;

};


export const getCustomerOrders = async (
    customerId
) => {

    return prisma.order.findMany({

        where: {
            customerId,
        },

        include: {

            items: {

                orderBy: {
                    createdAt: "asc",
                },

            },

        },

        orderBy: {
            createdAt: "desc",
        },

    });

};


export const getCustomerOrderById = async (
    customerId,
    orderId
) => {

    const order = await prisma.order.findFirst({

        where: {

            id: orderId,

            customerId,

        },

        include: {

            items: {

                orderBy: {
                    createdAt: "asc",
                },

            },

        },

    });


    if (!order) {

        throw new Error(
            "Order not found."
        );

    }


    return order;

};


export const getOrders = async ({
    page = 1,
    limit = 10,
    search = "",
    orderStatus = "",
    paymentStatus = "",
    paymentMethod = "",
}) => {

    page = Math.max(
        Number(page) || 1,
        1
    );

    limit = Math.min(
        Math.max(
            Number(limit) || 10,
            1
        ),
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


    const [orders, total] =
        await Promise.all([

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

                skip:
                    (page - 1) * limit,

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

            totalPages:
                Math.ceil(
                    total / limit
                ),

        },

    };

};


export const getOrderById = async (id) => {

    const order =
        await prisma.order.findUnique({

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

        throw new Error(
            "Order not found."
        );

    }


    return order;

};


export const updateOrderStatus = async (
    id,
    orderStatus
) => {

    const order =
        await prisma.order.findUnique({

            where: {
                id,
            },

        });


    if (!order) {

        throw new Error(
            "Order not found."
        );

    }


    const statusOrder = [
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
    ];


    const currentIndex =
        statusOrder.indexOf(
            order.orderStatus
        );


    const newIndex =
        statusOrder.indexOf(
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

    const order =
        await prisma.order.findUnique({

            where: {
                id,
            },

        });


    if (!order) {

        throw new Error(
            "Order not found."
        );

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