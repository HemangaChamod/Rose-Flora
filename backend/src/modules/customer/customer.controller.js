import asyncHandler from "../../utils/asyncHandler.js";

import {
    getProfile,
    updateProfile,
    changePassword,
} from "./customer.service.js";

import { successResponse } from "../../utils/response.js";

export const profile = asyncHandler(
    async (req, res) => {

        const customer =
            await getProfile(req.user.id);

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