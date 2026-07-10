const errorMiddleware = (err, req, res, next) => {
    console.error("========== ERROR ==========");
    console.error(err);
    console.error("===========================");

    res.status(err.status || 500).json({
        success: false,
        message: err.message,
        stack: err.stack,
    });
};

export default errorMiddleware;