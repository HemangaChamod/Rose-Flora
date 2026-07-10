import streamifier from "streamifier";

import cloudinary from "../../config/cloudinary.js";

import asyncHandler from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/response.js";

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "lassanaflora/products",
                transformation: [
                    {
                        width: 1200,
                        height: 1200,
                        crop: "limit",
                        quality: "auto",
                        fetch_format: "auto",
                    },
                ],
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

export const uploadImages = asyncHandler(async (req, res) => {

    if (!req.files || req.files.length === 0) {
        throw new Error("No images uploaded.");
    }

    const uploadedImages = [];

    for (const file of req.files) {

        const result = await uploadToCloudinary(file.buffer);

        uploadedImages.push({
            imageUrl: result.secure_url,
            publicId: result.public_id,
        });
    }

    return successResponse(
        res,
        "Images uploaded successfully.",
        uploadedImages,
        201
    );
});