import prisma from "../lib/prisma.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const decoded = verifyToken(token);

        const customer =
            await prisma.customer.findUnique({
                where: {
                    id: decoded.id,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

        if (!customer) {
            return res.status(401).json({
                success: false,
                message: "Customer not found.",
            });
        }

        req.user = customer;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });

    }
};

export default authMiddleware;