import asyncHandler from "../../utils/asyncHandler.js";

import {
    successResponse,
} from "../../utils/response.js";

import {
    createCODOrder,
    createCardOrder,
    getStripeCheckoutOrder,
    getCustomerOrders,
    getCustomerOrderById,
    getOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
} from "./order.service.js";


export const createCOD = asyncHandler(
    async (req, res) => {

        const order =
            await createCODOrder(
                req.user.id,
                req.body
            );


        return successResponse(
            res,
            "Order placed successfully.",
            order,
            201
        );

    }
);


export const createCard = asyncHandler(
    async (req, res) => {

        const paymentData =
            await createCardOrder(
                req.user.id,
                req.body
            );


        return successResponse(
            res,
            "Card payment initialized successfully.",
            paymentData,
            201
        );

    }
);

export const getCheckoutSuccess = asyncHandler(
    async (req, res) => {

        const paymentData =
            await getStripeCheckoutOrder(
                req.user.id,
                req.params.sessionId
            );


        return successResponse(
            res,
            "Stripe payment verified successfully.",
            paymentData
        );

    }
);


export const getMyOrders = asyncHandler(
    async (req, res) => {

        const orders =
            await getCustomerOrders(
                req.user.id
            );


        return successResponse(
            res,
            "Orders fetched successfully.",
            orders
        );

    }
);


export const getMyOrder = asyncHandler(
    async (req, res) => {

        const order =
            await getCustomerOrderById(
                req.user.id,
                req.params.id
            );


        return successResponse(
            res,
            "Order fetched successfully.",
            order
        );

    }
);


export const getAll = asyncHandler(
    async (req, res) => {

        const orders =
            await getOrders(
                req.query
            );


        return successResponse(
            res,
            "Orders fetched successfully.",
            orders
        );

    }
);


export const getOne = asyncHandler(
    async (req, res) => {

        const order =
            await getOrderById(
                req.params.id
            );


        return successResponse(
            res,
            "Order fetched successfully.",
            order
        );

    }
);


export const updateStatus = asyncHandler(
    async (req, res) => {

        const order =
            await updateOrderStatus(
                req.params.id,
                req.body.orderStatus
            );


        return successResponse(
            res,
            "Order status updated successfully.",
            order
        );

    }
);


export const updatePayment = asyncHandler(
    async (req, res) => {

        const order =
            await updatePaymentStatus(
                req.params.id,
                req.body.paymentStatus
            );


        return successResponse(
            res,
            "Payment status updated successfully.",
            order
        );

    }
);

