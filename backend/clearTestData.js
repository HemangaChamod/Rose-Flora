import prisma from "./src/lib/prisma.js";

async function main() {

    console.log("Deleting Order Items...");

    await prisma.orderItem.deleteMany();

    console.log("Deleting Orders...");

    await prisma.order.deleteMany();

    console.log("Deleting Customers...");

    await prisma.customer.deleteMany();

    console.log("Test data cleared successfully.");

}

main()
    .catch((error) => {

        console.error(error);

    })
    .finally(async () => {

        await prisma.$disconnect();

    });