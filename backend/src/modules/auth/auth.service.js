import bcrypt from "bcrypt";
import prisma from "../../lib/prisma.js";

import { generateVerificationToken } from "../../utils/emailVerification.js";
import { sendEmail } from "../../lib/mailer.js";

export const registerCustomer = async (data) => {

    const existingEmail = await prisma.customer.findUnique({
            where: {
                email: data.email,
            },
        });

        if (existingEmail) {
            throw new Error(
                "Email address already exists."
            );
        }

        const existingPhone = await prisma.customer.findUnique({
            where: {
                phone: data.phone,
            },
        });

        if (existingPhone) {
            throw new Error(
                "Phone number already exists."
            );
        }

    const hashedPassword =
        await bcrypt.hash(data.password, 10);

    const {
        token,
        expires,
    } = generateVerificationToken();

    const customer =
        await prisma.customer.create({

            data: {

                firstName: data.firstName,

                lastName: data.lastName,

                email: data.email,

                phone: data.phone,

                password: hashedPassword,

                isVerified: false,

                verificationToken: token,

                verificationTokenExpires: expires,

            },

        });

    const verificationLink =
        `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await sendEmail({

        to: customer.email,

        subject: "Verify Your Lassana Flora Account",

        html: `

            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">

                <h2 style="color:#2e7d32;">
                    Welcome to Lassana Flora 🌸
                </h2>

                <p>
                    Thank you for creating your account.
                </p>

                <p>
                    Please verify your email address by clicking the button below.
                </p>

                <div style="margin:30px 0;">

                    <a
                        href="${verificationLink}"
                        style="
                            background:#2e7d32;
                            color:white;
                            text-decoration:none;
                            padding:14px 28px;
                            border-radius:6px;
                            display:inline-block;
                            font-weight:bold;
                        "
                    >
                        Verify Email
                    </a>

                </div>

                <p>
                    Or copy and paste this link into your browser:
                </p>

                <p>
                    ${verificationLink}
                </p>

                <hr>

                <small>

                    This verification link will expire in 24 hours.

                </small>

            </div>

        `,

    });

    const {

        password,

        verificationToken,

        verificationTokenExpires,

        ...customerWithoutPassword

    } = customer;

    return customerWithoutPassword;

};

export const loginCustomer = async ({
    email,
    password,
}) => {

    const customer =
        await prisma.customer.findUnique({

            where: {

                email,

            },

        });

    if (!customer) {

        throw new Error(
            "Invalid email or password."
        );

    }

    const passwordMatch =
        await bcrypt.compare(
            password,
            customer.password
        );

    if (!passwordMatch) {

        throw new Error(
            "Invalid email or password."
        );

    }

    const {

        password: _,

        ...customerWithoutPassword

    } = customer;

    return customerWithoutPassword;

};

export const loginAdmin = async ({
    email,
    password,
}) => {

    const admin =
        await prisma.admin.findUnique({

            where: {

                email,

            },

        });

    if (!admin) {

        throw new Error(
            "Invalid email or password."
        );

    }

    const passwordMatch =
        await bcrypt.compare(
            password,
            admin.password
        );

    if (!passwordMatch) {

        throw new Error(
            "Invalid email or password."
        );

    }

    const {

        password: _,

        ...adminWithoutPassword

    } = admin;

    return adminWithoutPassword;

};

export const getAdminById = async (id) => {

    const admin =
        await prisma.admin.findUnique({

            where: {

                id,

            },

        });

    if (!admin) {

        throw new Error(
            "Admin not found."
        );

    }

    const {

        password,

        ...adminWithoutPassword

    } = admin;

    return adminWithoutPassword;

};

export const verifyCustomerEmail = async (token) => {

    const customer =
        await prisma.customer.findFirst({

            where: {

                verificationToken: token,

            },

        });

    if (!customer) {

        throw new Error(
            "Invalid verification link."
        );

    }

    if (customer.isVerified) {

        throw new Error(
            "Email is already verified."
        );

    }

    if (

        !customer.verificationTokenExpires ||

        customer.verificationTokenExpires < new Date()

    ) {

        throw new Error(
            "Verification link has expired."
        );

    }

    await prisma.customer.update({

        where: {

            id: customer.id,

        },

        data: {

            isVerified: true,

            verificationToken: null,

            verificationTokenExpires: null,

        },

    });

    return true;

};