const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const users = [
    {
        first_name: "Alice",
        last_name: "Smith",
        email: "alice.smith@example.com",
        passwordHash: "$argon2id$v=19$m=65536,t=3,p=4$UdigrfpCxvOFNgGArENqBw$F1SYQVsuK4RDl8YpiCdpQK5Si6e4GFu6kLgDq90r0XI",
    },
    {
        first_name: "Bob",
        last_name: "Johnson",
        email: "bob.johnson@example.com",
        passwordHash: "hashedpassword2",
    },
    {
        first_name: "Charlie",
        last_name: "Lee",
        email: "charlie.lee@example.com",
        passwordHash: "hashedpassword3",
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
