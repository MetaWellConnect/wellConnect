const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

/* ----------  ENUMS  ---------- */
const Role = {
    PATIENT: 'PATIENT',
    PROVIDER: 'PROVIDER',
}

/* ----------  USER  ---------- */
const User = [
    /* Patients */
    { first_name: 'Lucy', last_name: 'Adams', email: 'a@test.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'Mike', last_name: 'Baker', email: 'mike.baker@example.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'Sara', last_name: 'Clark', email: 'sara.clark@example.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'David', last_name: 'Duncan', email: 'david.duncan@example.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'Emma', last_name: 'Evans', email: 'emma.evans@example.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'Tom', last_name: 'Foster', email: 'tom.foster@example.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },

    /* Providers */
    { first_name: 'Anna', last_name: 'Lee', email: 'b@test.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PROVIDER },
    { first_name: 'Robert', last_name: 'Young', email: 'robert.young@health.org', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PROVIDER },
    { first_name: 'Karen', last_name: 'White', email: 'karen.white@health.org', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PROVIDER },
];

/* ----------  PROVIDER  ---------- */
const Provider = [
    { id: 7 },
    { id: 8 },
    { id: 9 },
];

/* ----------  PATIENT  ---------- */
const Patient = [
    { id: 1, provider_id: 7, treatment_id: 1 },
    { id: 2, provider_id: 7, treatment_id: null },
    { id: 3, provider_id: 8, treatment_id: 2 },
    { id: 4, provider_id: 8, treatment_id: null },
    { id: 5, provider_id: 9, treatment_id: 3 },
    { id: 6, provider_id: 9, treatment_id: null },
];

/* ----------  TREATMENT  ---------- */
const Treatment = [
    {
        id: 1,
        overview: 'Hypertension management plan',
        patient_id: 1,
        provider_id: 7,
    },
    {
        id: 2,
        overview: 'Type 2 diabetes initial regimen',
        patient_id: 3,
        provider_id: 8,
    },
    {
        id: 3,
        overview: 'Asthma control & education',
        patient_id: 5,
        provider_id: 9,
    },
];

/* ----------  MEDICATION  ---------- */
const Medication = [
    /* --- Patient 1 / Treatment 1 --- */
    {
        id: 1,
        name: 'Lisinopril',
        description: 'ACE inhibitor for blood-pressure control',
        strength: '10 mg',
        time_of_last_dose: new Date('2025-07-06T08:00:00Z'),
        time_of_next_dose: new Date('2025-07-07T08:00:00Z'),
        number_of_required_doses: 30,
        number_of_taken_doses: 5,
        photo_url: 'https://picsum.photos/seed/lisinopril/200/200',
        approved: true,
        patient_id: 1,
        treatment_id: 1,
    },
    {
        id: 2,
        name: 'Amlodipine',
        description: 'Calcium-channel blocker once daily',
        strength: '5 mg',
        time_of_last_dose: new Date('2025-07-06T08:00:00Z'),
        time_of_next_dose: new Date('2025-07-07T08:00:00Z'),
        number_of_required_doses: 30,
        number_of_taken_doses: 5,
        photo_url: 'https://picsum.photos/seed/amlodipine/200/200',
        approved: null,
        patient_id: 1,
        treatment_id: 1,
    },

    /* --- Patient 3 / Treatment 2 --- */
    {
        id: 3,
        name: 'Metformin',
        description: 'Biguanide with meals',
        strength: '500 mg',
        time_of_last_dose: new Date('2025-07-06T13:00:00Z'),
        time_of_next_dose: new Date('2025-07-06T19:00:00Z'),
        number_of_required_doses: 60,
        number_of_taken_doses: 12,
        photo_url: 'https://picsum.photos/seed/metformin/200/200',
        approved: null,
        patient_id: 3,
        treatment_id: 2,
    },
    {
        id: 4,
        name: 'Glipizide',
        description: 'Sulfonylurea before breakfast',
        strength: '5 mg',
        time_of_last_dose: new Date('2025-07-06T07:30:00Z'),
        time_of_next_dose: new Date('2025-07-07T07:30:00Z'),
        number_of_required_doses: 30,
        number_of_taken_doses: 6,
        photo_url: 'https://picsum.photos/seed/glipizide/200/200',
        approved: false,
        patient_id: 3,
        treatment_id: 2,
    },

    /* --- Patient 5 / Treatment 3 --- */
    {
        id: 5,
        name: 'Albuterol Inhaler',
        description: 'SABA — two puffs PRN',
        strength: '90 µg/puff',
        time_of_last_dose: new Date('2025-07-06T16:45:00Z'),
        time_of_next_dose: new Date('2025-07-06T22:45:00Z'),
        number_of_required_doses: 999,  // PRN rescue
        number_of_taken_doses: 15,
        photo_url: 'https://picsum.photos/seed/albuterol/200/200',
        approved: true,
        patient_id: 5,
        treatment_id: 3,
    },
    {
        id: 6,
        name: 'Budesonide + Formoterol',
        description: 'ICS/LABA maintenance inhaler, one puff BID',
        strength: '160/4.5 µg',
        time_of_last_dose: new Date('2025-07-06T07:00:00Z'),
        time_of_next_dose: new Date('2025-07-06T19:00:00Z'),
        number_of_required_doses: 60,
        number_of_taken_doses: 10,
        photo_url: 'https://picsum.photos/seed/budesonide/200/200',
        approved: true,
        patient_id: 5,
        treatment_id: 3,
    },
];



async function main() {
    for (const user of User) {
        await prisma.user.create({ data: user });
    }
    for (const provider of Provider) {
        await prisma.provider.create({ data: provider });
    }
    for (const patient of Patient) {
        await prisma.patient.create({ data: patient });
    }
    for (const treatment of Treatment) {
        await prisma.treatment.create({ data: treatment });
    }
    for (const medication of Medication) {
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
