import asyncHandler from "../../utils/asyncHandler.js";

import {
    getProfile,
    updateProfile,
    changePassword,
    getCustomerOrders,
    getCustomers,
    getCustomerById,
} from "./customer.service.js";

import {
    successResponse,
} from "../../utils/response.js";


export const profile = asyncHandler(
    async (req, res) => {

        const customer =
            await getProfile(
                req.user.id
            );


        return successResponse(
            res,
            "Profile retrieved successfully.",
            customer
        );

    }
);


export const update = asyncHandler(
    async (req, res) => {

        const customer =
            await updateProfile(
                req.user.id,
                req.body
            );


        return successResponse(
            res,
            "Profile updated successfully.",
            customer
        );

    }
);


export const updatePassword =
    asyncHandler(async (req, res) => {

        await changePassword(
            req.user.id,
            req.body
        );


        return successResponse(
            res,
            "Password updated successfully."
        );

    });


/* =======================================================
   Customer Orders
======================================================= */

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


/* =======================================================
   Admin Customer Management
======================================================= */

export const getAllCustomers = asyncHandler(
    async (req, res) => {

        const customers =
            await getCustomers();


        return successResponse(
            res,
            "Customers fetched successfully.",
            customers
        );

    }
);


export const getCustomer = asyncHandler(
    async (req, res) => {

        const customer =
            await getCustomerById(
                req.params.id
            );


        return successResponse(
            res,
            "Customer fetched successfully.",
            customer
        );

    }
);