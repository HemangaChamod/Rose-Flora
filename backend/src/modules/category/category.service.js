import prisma from "../../lib/prisma.js";

export const createCategory = async (data) => {

  const existingCategory =
    await prisma.category.findFirst({
      where: {
        OR: [
          {
            name: data.name,
          },
          {
            slug: data.slug,
          },
        ],
      },
    });

  if (existingCategory) {
    throw new Error(
      "Category name or slug already exists."
    );
  }

  return await prisma.category.create({
    data,
  });
};

export const getCategories = async () => {

  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

};

export const getCategoryById = async (id) => {

  const category =
    await prisma.category.findUnique({
      where: {
        id,
      },
    });

  if (!category) {
    throw new Error(
      "Category not found."
    );
  }

  return category;

};

export const updateCategory = async (
  id,
  data
) => {

  const category =
    await prisma.category.findUnique({
      where: {
        id,
      },
    });

  if (!category) {
    throw new Error(
      "Category not found."
    );
  }

  return await prisma.category.update({
    where: {
      id,
    },
    data,
  });

};

export const deleteCategory = async (
  id
) => {

  const category =
    await prisma.category.findUnique({
      where: {
        id,
      },
    });

  if (!category) {
    throw new Error(
      "Category not found."
    );
  }

  return await prisma.category.delete({
    where: {
      id,
    },
  });

};