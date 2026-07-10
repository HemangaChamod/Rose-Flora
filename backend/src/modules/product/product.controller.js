import asyncHandler from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/response.js";

import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from "./product.service.js";

export const create = asyncHandler(async (req, res) => {
    const product = await createProduct(req.body);

    return successResponse(
        res,
        "Product created successfully.",
        product,
        201
    );
});

export const getAll = asyncHandler(async (req, res) => {
    const products = await getProducts(req.query);

    return successResponse(
        res,
        "Products fetched successfully.",
        products
    );
});

export const getOne = asyncHandler(async (req, res) => {
    const product = await getProduct(req.params.id);

    return successResponse(
        res,
        "Product fetched successfully.",
        product
    );
});

export const update = asyncHandler(async (req, res) => {
    const product = await updateProduct(
        req.params.id,
        req.body
    );

    return successResponse(
        res,
        "Product updated successfully.",
        product
    );
});

export const remove = asyncHandler(async (req, res) => {
    await deleteProduct(req.params.id);

    return successResponse(
        res,
        "Product deleted successfully."
    );
});