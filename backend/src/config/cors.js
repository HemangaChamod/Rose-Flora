const developmentOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
];

const productionOrigins = (
    process.env.CORS_ORIGINS || ""
)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = [
    ...developmentOrigins,
    ...productionOrigins,
];

const corsOptions = {

    origin: (origin, callback) => {

        if (
            !origin ||
            allowedOrigins.includes(origin)
        ) {

            return callback(null, true);

        }

        console.error(
            `CORS blocked origin: ${origin}`
        );

        return callback(
            new Error("Not allowed by CORS")
        );

    },

    credentials: true,

};

export default corsOptions;