const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const users = [
    {
        name: "Alice Smith",
        email: "alice.smith@example.com",
        password: "hashedpassword1",
    },
    {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        password: "hashedpassword2",
    },
    {
        name: "Charlie Lee",
        email: "charlie.lee@example.com",
        password: "hashedpassword3",
    },
];

const medications = [
    {
        name: "Aspirin",
        weight: 500,
        time_of_last_dose: new Date("2025-06-22T08:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T20:00:00Z"),
        description: "Used to reduce pain, fever, or inflammation.",
        photo_url: "https://example.com/photos/aspirin.jpg",
    },
    {
        name: "Metformin",
        weight: 850,
        time_of_last_dose: new Date("2025-06-22T07:30:00Z"),
        time_of_next_dose: new Date("2025-06-22T19:30:00Z"),
        description: "Used to treat type 2 diabetes.",
        photo_url: "https://example.com/photos/metformin.jpg",
    },
    {
        name: "Lisinopril",
        weight: 20,
        time_of_last_dose: new Date("2025-06-22T09:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T09:00:00Z"),
        description: "Used to treat high blood pressure.",
        photo_url: "https://example.com/photos/lisinopril.jpg",
    },
];

async function main() {
    for (const user of users) {
        await prisma.User.create({ data: user });
    }

    for (const medication of medications) {
        await prisma.Medication.create({ data: medication });
    }

    console.log("Database seeded successfully!");
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
