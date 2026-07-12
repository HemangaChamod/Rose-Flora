import prisma from "../../lib/prisma.js";
import stripe from "../../lib/stripe.js";

const generateOrderNumber = () => {
    const timestamp = Date.now();
    const randomNumber = Math.floor(
        1000 + Math.random() * 9000
    );
    return `LF-${timestamp}-${randomNumber}`;
};

const prepareOrderItems = async (data) => {
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

    return {
        preparedItems,
        subtotal,
        shippingCost,
        total,
    };
};

const createOrderData = ({
    customerId,
    data,
    preparedItems,
    subtotal,
    shippingCost,
    total,
    paymentMethod,
}) => {
    return {
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
        city:
            data.city,
        state:
            data.district,
        zipCode:
            data.postalCode || "",
        paymentMethod,
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
    };
};

export const createCODOrder = async (
    customerId,
    data
) => {
    const {
        preparedItems,
        subtotal,
        shippingCost,
        total,
    } = await prepareOrderItems(data);

    const order = await prisma.$transaction(
        async (tx) => {
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
                data: createOrderData({
                    customerId,
                    data,
                    preparedItems,
                    subtotal,
                    shippingCost,
                    total,
                    paymentMethod: "COD",
                }),
                include: {
                    items: true,
                },
            });
        }
    );

    return order;
};

export const createCardOrder = async (
    customerId,
    data
) => {
    const {
        preparedItems,
        subtotal,
        shippingCost,
        total,
    } = await prepareOrderItems(data);

    const order = await prisma.order.create({
        data: createOrderData({
            customerId,
            data,
            preparedItems,
            subtotal,
            shippingCost,
            total,
            paymentMethod: "CARD",
        }),
        include: {
            items: true,
        },
    });

    try {
        const frontendUrl =
            process.env.FRONTEND_URL ||
            "http://localhost:5174";

        const checkoutSession =
            await stripe.checkout.sessions.create(
                {
                    mode: "payment",
                    payment_method_types: [
                        "card",
                    ],
                    customer_email:
                        data.email,
                    line_items:
                        preparedItems.map(
                            (item) => ({
                                price_data: {
                                    currency: "lkr",
                                    product_data: {
                                        name:
                                            item.productName,
                                        metadata: {
                                            productId:
                                                item.productId,
                                            sku:
                                                item.sku,
                                        },
                                    },
                                    unit_amount:
                                        Math.round(
                                            Number(
                                                item.price
                                            ) * 100
                                        ),
                                },
                                quantity:
                                    item.quantity,
                            })
                        ),
                    metadata: {
                        orderId:
                            order.id,
                        orderNumber:
                            order.orderNumber,
                        customerId,
                    },
                    payment_intent_data: {
                        metadata: {
                            orderId:
                                order.id,
                            orderNumber:
                                order.orderNumber,
                            customerId,
                        },
                    },
                    success_url:
                        `${frontendUrl}/PaymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url:
                        `${frontendUrl}/Checkout?payment=cancelled`,
                },
                {
                    idempotencyKey:
                        `checkout-order-${order.id}`,
                }
            );

        if (!checkoutSession.url) {
            throw new Error(
                "Stripe Checkout URL was not generated."
            );
        }

        const updatedOrder =
            await prisma.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    stripePaymentId:
                        checkoutSession.payment_intent
                            ? String(
                                checkoutSession.payment_intent
                            )
                            : null,
                },
                include: {
                    items: true,
                },
            });

        return {
            order: updatedOrder,
            checkoutUrl:
                checkoutSession.url,
            checkoutSessionId:
                checkoutSession.id,
        };
    } catch (error) {
        console.error(
            "Unable to create Stripe Checkout Session:",
            error
        );

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentStatus: "FAILED",
            },
        });

        throw error;
    }
};

export const getStripeCheckoutOrder = async (
    customerId,
    sessionId
) => {
    if (!sessionId) {
        throw new Error(
            "Stripe Checkout Session ID is required."
        );
    }

    const checkoutSession =
        await stripe.checkout.sessions.retrieve(
            sessionId,
            {
                expand: [
                    "payment_intent",
                ],
            }
        );

    if (!checkoutSession) {
        throw new Error(
            "Stripe Checkout Session not found."
        );
    }

    const sessionCustomerId =
        checkoutSession.metadata?.customerId;

    const orderId =
        checkoutSession.metadata?.orderId;

    if (
        !sessionCustomerId ||
        sessionCustomerId !== customerId
    ) {
        throw new Error(
            "You are not authorized to view this payment."
        );
    }

    if (!orderId) {
        throw new Error(
            "Order information was not found in the Stripe session."
        );
    }

    if (
        checkoutSession.payment_status !==
        "paid"
    ) {
        throw new Error(
            "Payment has not been completed."
        );
    }

    const paymentIntent =
        checkoutSession.payment_intent;

    await processSuccessfulCardPayment(
        paymentIntent
    );

    const order =
        await prisma.order.findFirst({
            where: {
                id: orderId,
                customerId,
                paymentMethod: "CARD",
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

    return {
        order,
        paymentConfirmed: true,
        stripeSessionId:
            checkoutSession.id,
    };
}; // <-- Fixed: Added the missing closing bracket here!

export const processSuccessfulCardPayment = async (
    paymentIntent
) => {
    const orderId =
        paymentIntent.metadata?.orderId;

    if (!orderId) {
        throw new Error(
            "Stripe PaymentIntent does not contain an order ID."
        );
    }

    return prisma.$transaction(
        async (tx) => {
            const order =
                await tx.order.findUnique({
                    where: {
                        id: orderId,
                    },
                    include: {
                        items: true,
                    },
                });

            if (!order) {
                throw new Error(
                    "Order not found."
                );
            }

            if (
                order.paymentMethod !==
                "CARD"
            ) {
                throw new Error(
                    "Invalid payment method for Stripe payment."
                );
            }

            if (
                order.stripePaymentId &&
                order.stripePaymentId !==
                paymentIntent.id
            ) {
                throw new Error(
                    "Stripe PaymentIntent does not match the order."
                );
            }

            const expectedAmount =
                Math.round(
                    Number(order.total) * 100
                );

            if (
                paymentIntent.amount_received !==
                expectedAmount
            ) {
                throw new Error(
                    "Stripe payment amount does not match the order total."
                );
            }

            if (
                paymentIntent.currency !== "lkr"
            ) {
                throw new Error(
                    "Stripe payment currency does not match the order currency."
                );
            }

            if (
                order.paymentStatus === "PAID" &&
                order.stockProcessed
            ) {
                return order;
            }

            if (!order.stockProcessed) {
                for (
                    const item of order.items
                ) {
                    const stockUpdate =
                        await tx.product.updateMany({
                            where: {
                                id: item.productId,
                                isActive: true,
                                deletedAt: null,
                                quantity: {
                                    gte:
                                        item.quantity,
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
            }

            return tx.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    stripePaymentId:
                        paymentIntent.id,
                    paymentStatus: "PAID",
                    stockProcessed: true,
                },
                include: {
                    items: true,
                },
            });
        }
    );
};

export const markCardPaymentFailed = async (
    paymentIntent
) => {
    const orderId =
        paymentIntent.metadata?.orderId;

    if (!orderId) {
        return null;
    }

    const order =
        await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

    if (!order) {
        return null;
    }

    if (
        order.paymentMethod !== "CARD"
    ) {
        return order;
    }

    if (
        order.stripePaymentId !==
        paymentIntent.id
    ) {
        return order;
    }

    if (
        order.paymentStatus === "PAID"
    ) {
        return order;
    }

    return prisma.order.update({
        where: {
            id: order.id,
        },
        data: {
            paymentStatus: "FAILED",
        },
    });
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
    const order =
        await prisma.order.findFirst({
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