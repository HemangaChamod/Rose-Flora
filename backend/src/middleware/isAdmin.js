const isAdmin = (req, res, next) => {

    if (!req.admin) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    if (req.admin.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Access denied.",
        });
    }

    next();

};

export default isAdmin;