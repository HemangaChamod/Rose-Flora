import prisma from "../lib/prisma.js";
import { verifyToken } from "../utils/jwt.js";

const adminAuthMiddleware = async (req, res, next) => {

    try {

        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const decoded = verifyToken(token);

        const admin = await prisma.admin.findUnique({

            where: {
                id: decoded.id,
            },

            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
            },

        });

        if (!admin) {

            return res.status(401).json({
                success: false,
                message: "Admin not found.",
            });

        }

        req.admin = admin;

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });

    }

};

export default adminAuthMiddleware;