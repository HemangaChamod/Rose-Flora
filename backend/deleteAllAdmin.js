import prisma from "./src/lib/prisma.js";

async function main() {

    const result = await prisma.admin.deleteMany();

    console.log(`${result.count} admin account(s) deleted successfully.`);

}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });