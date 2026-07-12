import crypto from "crypto";

export const generateVerificationToken = () => {

    const token =
        crypto.randomBytes(32).toString("hex");

    const expires =
        new Date(
            Date.now() + 1000 * 60 * 60 * 24
        );

    return {

        token,

        expires,

    };

};