import prisma from "../../config/prisma.js";
import cloudinary from "../../config/cloudinary.js";
import slugify from "slugify";

export const createProduct = async (data) => {
    const slug = slugify(data.name, {
        lower: true,
        strict: true,
    });

    const existingProduct = await prisma.product.findFirst({
        where: {
            OR: [
                { slug },
                { sku: data.sku },
            ],
        },
    });

    if (existingProduct) {
    throw new Error("Product already exists.");
}

    const category = await prisma.category.findUnique({
        where: {
            id: data.categoryId,
        },
    });

    if (!category) {
        throw new Error("Category not found.");
    }

    const product = await prisma.product.create({
        data: {
            name: data.name,
            slug,

            shortDescription: data.shortDescription,
            fullDescription: data.fullDescription,

            regularPrice: data.regularPrice,
            salePrice: data.salePrice,

            quantity: data.quantity,

            sku: data.sku,

            featured: data.featured ?? false,
            newArrival: data.newArrival ?? false,

            categoryId: data.categoryId,

            images: {
                create: data.images.map((image, index) => ({
                    imageUrl: image.imageUrl,
                    publicId: image.publicId,
                    isMain: index === 0,
                    displayOrder: index + 1,
                })),
            },
        },

        include: {
            category: true,
            images: true,
            tags: {
                include: {
                    tag: true,
                },
            },
        },
    });

    return product;
};

export const getProducts = async ({
    page = 1,
    limit = 10,
    search = "",
    category = "",
    featured,
    newArrival,
}) => {

    page = Number(page);
    limit = Number(limit);

    const where = {

        deletedAt: null,

        ...(search && {
            name: {
                contains: search,
            },
        }),

        ...(category && {
            categoryId: category,
        }),

        ...(featured !== undefined && {
            featured: featured === "true",
        }),

        ...(newArrival !== undefined && {
            newArrival: newArrival === "true",
        }),

    };

    const total = await prisma.product.count({
        where,
    });

    const products = await prisma.product.findMany({

        where,

        include: {

            category: true,

            images: true,

        },

        orderBy: {
            createdAt: "desc",
        },

        skip: (page - 1) * limit,

        take: limit,

    });

    return {

        products,

        pagination: {

            page,

            limit,

            total,

            totalPages: Math.ceil(total / limit),

        },

    };

};

export const getProduct = async (id) => {

    const product = await prisma.product.findFirst({

        where: {
            id,
            deletedAt: null,
        },

        include: {
            category: true,
            images: true,
            tags: {
                include: {
                    tag: true,
                },
            },
        },

    });

    if (!product) {
        throw new Error("Product not found.");
    }

    return product;
};

export const deleteProduct = async (id) => {

    const product = await prisma.product.findUnique({

        where: {
            id,
        },

        include: {
            images: true,
        },

    });

    if (!product) {

        throw new Error(
            "Product not found."
        );

    }

    for (const image of product.images) {

        try {

            await cloudinary.uploader.destroy(
                image.publicId
            );

        } catch (error) {

            console.error(
                `Unable to delete Cloudinary image: ${image.publicId}`,
                error
            );

        }

    }

    return await prisma.product.delete({

        where: {
            id,
        },

    });

};

export const updateProduct = async (id, data) => {

    const slug = slugify(data.name, {
        lower: true,
        strict: true,
    });

    const existing = await prisma.product.findFirst({
    where: {
        OR: [
            {
                slug,
            },
            {
                sku: data.sku,
            },
        ],
        NOT: {
            id,
        },
    },
});

    if (existing) {
        throw new Error("Product name already exists.");
    }

    const oldImages = await prisma.productImage.findMany({
        where: {
            productId: id,
        },
    });

    for (const image of oldImages) {

        try {

            await cloudinary.uploader.destroy(image.publicId);

        } catch {}

    }

    await prisma.productImage.deleteMany({
    where: {
        productId: id,
    },
});

    const category = await prisma.category.findUnique({
        where: {
            id: data.categoryId,
        },
    });

    if (!category) {
        throw new Error("Category not found.");
    }

    return prisma.product.update({

        where: {
            id,
        },

        data: {

            name: data.name,

            slug,

            shortDescription: data.shortDescription,

            fullDescription: data.fullDescription,

            regularPrice: data.regularPrice,

            salePrice: data.salePrice,

            quantity: data.quantity,

            sku: data.sku,

            featured: data.featured,

            newArrival: data.newArrival,

            categoryId: data.categoryId,

            images: {

                create: data.images.map((image, index) => ({

                    imageUrl: image.imageUrl,

                    publicId: image.publicId,

                    isMain: index === 0,

                    displayOrder: index + 1,

                })),

            },

        },

        include: {

            category: true,

            images: true,

            tags: {
                include: {
                    tag: true,
                },
            },

        },

    });

};