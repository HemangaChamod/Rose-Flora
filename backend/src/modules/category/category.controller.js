import asyncHandler from "../../utils/asyncHandler.js";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.service.js";

import {
  successResponse,
} from "../../utils/response.js";

export const create = asyncHandler(
  async (req, res) => {

    const category =
      await createCategory(req.body);

    return successResponse(
      res,
      "Category created successfully.",
      category,
      201
    );

  }
);

export const getAll = asyncHandler(
  async (req, res) => {

    const categories =
      await getCategories();

    return successResponse(
      res,
      "Categories fetched successfully.",
      categories
    );

  }
);

export const getOne = asyncHandler(
  async (req, res) => {

    const category =
      await getCategoryById(
        req.params.id
      );

    return successResponse(
      res,
      "Category fetched successfully.",
      category
    );

  }
);

export const update = asyncHandler(
  async (req, res) => {

    const category =
      await updateCategory(
        req.params.id,
        req.body
      );

    return successResponse(
      res,
      "Category updated successfully.",
      category
    );

  }
);

export const remove = asyncHandler(
  async (req, res) => {

    await deleteCategory(
      req.params.id
    );

    return successResponse(
      res,
      "Category deleted successfully."
    );

  }
);