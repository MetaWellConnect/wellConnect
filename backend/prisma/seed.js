const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const usersSeed = [
    {
        first_name: 'Alice',
        last_name: 'Brown',
        email: 'alice.brown@clinic.com',
        password_hash: '$2b$10$A1ic3Br0wnHashXXXXXXXXXXXXXXX', // Dr Alice Brown (provider)
    },
    {
        first_name: 'Bob',
        last_name: 'Green',
        email: 'bob.green@health.org',
        password_hash: '$2b$10$B0bGr33nHashXXXXXXXXXXXXXXX', // Dr Bob Green (provider)
    },
    {
        first_name: 'Charlie',
        last_name: 'Smith',
        email: 'charlie.smith@example.com',
        password_hash: '$2b$10$Ch4rl1eSm1thHashXXXXXXXXXX', // patient of Dr Brown
    },
    {
        first_name: 'Dana',
        last_name: 'White',
        email: 'dana.white@example.com',
        password_hash: '$2b$10$D4n4Wh1t3HashXXXXXXXXXXXXX', // patient of Dr Brown
    },
    {
        first_name: 'Evan',
        last_name: 'Lee',
        email: 'evan.lee@example.com',
        password_hash: '$2b$10$Ev4nL33HashXXXXXXXXXXXXXXX', // patient of Dr Green
    },
];

const providersSeed = [
    {},
    {},
];

const patientsSeed = [
    { provider_id: 1 }, // Charlie Smith  -> Dr Brown
    { provider_id: 1 }, // Dana White     -> Dr Brown
    { provider_id: 2 }, // Evan Lee       -> Dr Green
];

const medicationsSeed = [
    {
        name: 'Lisinopril',
        description: 'ACE-inhibitor for hypertension',
        strength: 10,
        time_of_last_dose: new Date('2025-07-02T08:00:00Z'),
        time_of_next_dose: new Date('2025-07-02T20:00:00Z'),
        photo_url: 'https://example.com/img/lisinopril.jpg',
        patient_id: 1, // Charlie Smith
    },
    {
        name: 'Metformin',
        description: 'First-line therapy for type 2 diabetes',
        strength: 500,
        time_of_last_dose: new Date('2025-07-02T07:30:00Z'),
        time_of_next_dose: new Date('2025-07-02T19:30:00Z'),
        photo_url: 'https://example.com/img/metformin.jpg',
        patient_id: 1, // Charlie Smith
    },
    {
        name: 'Amoxicillin',
        description: 'Broad-spectrum antibiotic',
        strength: 500,
        time_of_last_dose: new Date('2025-07-01T12:00:00Z'),
        time_of_next_dose: new Date('2025-07-01T20:00:00Z'),
        photo_url: 'https://example.com/img/amoxicillin.jpg',
        patient_id: 2, // Dana White
    },
    {
        name: 'Albuterol Inhaler',
        description: 'Rescue inhaler for asthma',
        strength: 90, // µg per actuation
        time_of_last_dose: new Date('2025-07-02T06:45:00Z'),
        time_of_next_dose: new Date('2025-07-02T12:45:00Z'),
        photo_url: 'https://example.com/img/albuterol.jpg',
        patient_id: 3, // Evan Lee
    },
];


async function main() {
    for (const user of usersSeed) {
        await prisma.user.create({ data: user });
    }
    for (const provider of providersSeed) {
        await prisma.provider.create({ data: provider });
    }
    for (const patient of patientsSeed) {
        await prisma.patient.create({ data: patient });
    }
    for (const medication of medicationsSeed) {
        await prisma.medication.create({ data: medication });
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
