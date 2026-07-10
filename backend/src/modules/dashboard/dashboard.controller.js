import asyncHandler from "../../utils/asyncHandler.js";

import { successResponse } from "../../utils/response.js";

import { getDashboardData } from "./dashboard.service.js";

export const getDashboard = asyncHandler(

    async (req, res) => {

        const dashboard =
            await getDashboardData();

        return successResponse(

            res,

            "Dashboard loaded successfully.",

            dashboard

        );

    }

);