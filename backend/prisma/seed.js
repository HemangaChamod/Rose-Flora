import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

    const existingAdmin = await prisma.admin.findUnique({
        where: {
            email: "admin@lassanaflora.com",
        },
    });

    if (existingAdmin) {
        console.log("Admin already exists.");
        return;
    }

    const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
    );

    await prisma.admin.create({
        data: {
            firstName: process.env.ADMIN_FIRST_NAME,
            lastName: process.env.ADMIN_LAST_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Admin created successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });