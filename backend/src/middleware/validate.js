const validate = (schema) => {

    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {

            const fieldErrors =
                result.error.flatten().fieldErrors;

            const firstError =
                Object.values(fieldErrors)
                    .flat()
                    .find(Boolean);

            return res.status(400).json({

                success: false,

                message:
                    firstError || "Validation failed.",

                errors: fieldErrors,

            });

        }

        req.body = result.data;

        next();

    };

};

export default validate;