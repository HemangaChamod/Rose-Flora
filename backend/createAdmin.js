import bcrypt from "bcrypt";
import prisma from "./src/lib/prisma.js";

async function main() {

    const password = await bcrypt.hash(
        "gihan123",
        10
    );

    await prisma.admin.create({

        data: {

            firstName: "Gihan",

            lastName: "Niyumal",

            email: "gihan@lassanaflora.com",

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