import bcrypt from "bcrypt";
import prisma from "./src/lib/prisma.js";

async function main() {

    const password = await bcrypt.hash(
        "admin@123",
        10
    );

    await prisma.admin.create({

        data: {

            firstName: "Super",

            lastName: "Admin",

            email: "admin@lassanaflora.com",

            password,

        },

    });

    console.log("Admin created successfully.");

}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });