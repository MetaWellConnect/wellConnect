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
    { first_name: 'Mike', last_name: 'Baker', email: 'th992984@ucf.edu', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'Sara', last_name: 'Clark', email: 'c@test.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'David', last_name: 'Duncan', email: 'david.duncan@example.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'Emma', last_name: 'Evans', email: 'thomastrivino40@gmail.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },
    { first_name: 'Tom', last_name: 'Foster', email: 'tom.foster@example.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PATIENT },

    /* Providers */
    { first_name: 'Anna', last_name: 'Lee', email: 'b@test.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PROVIDER },
    { first_name: 'Robert', last_name: 'Young', email: 'drt2063@gmail.com', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PROVIDER },
    { first_name: 'Karen', last_name: 'White', email: 'karen.white@health.org', password_hash: '$argon2id$v=19$m=65536,t=3,p=4$QfoolOAKk1+gRXHner2BWg$DsUgYqJgjh8DV7/p8Z1Y58lFgFuNQNKuposxeYrS7Kk', role: Role.PROVIDER },
];

/* ----------  PROVIDER  ---------- */
const Provider = [
    { id: 7 },
    { id: 8 },
    { id: 9 },
];

const ProviderPreferences = [
    { provider_id: 7 },
    { provider_id: 8 },
    { provider_id: 9 },
];


/* ----------  PATIENT  ---------- */
const Patient = [
    { id: 1, provider_id: 7, treatment_id: 1 },
    { id: 2, provider_id: 7, treatment_id: 2 },
    { id: 3, provider_id: 8, treatment_id: 3 },
    { id: 4, provider_id: 8, treatment_id: 4 },
    { id: 5, provider_id: 9, treatment_id: 5 },
    { id: 6, provider_id: 9, treatment_id: 6 },
];

/* ----------  APPOINTMENT  ---------- */
const Appointment = require("./appointmentSeed");



/* ----------  TREATMENT  ---------- */
const Treatment = [
    {
        overview: 'Comprehensive hypertension management plan, including lifestyle modifications and medication therapy',
        patient_id: 1,
        provider_id: 7,
        medications: [
            {
                id: 1,
                name: 'Lisinopril',
                strength: '10 mg',
                dose: '10 mg orally once daily',
                frequency_in_hours: 24,
                number_of_required_doses: 30,
                number_of_taken_doses: 5
            },
            {
                id: 2,
                name: 'Amlodipine',
                strength: '5 mg',
                dose: 'Take one tablet by mouth daily',
                frequency_in_hours: 24,
                number_of_required_doses: 30,
                number_of_taken_doses: 5
            }
        ]
    },
    {
        overview: 'General wellness assessment and preventive care plan, including routine check-ups and screenings',
        patient_id: 2,
        provider_id: 7,
        medications: []
    },
    {
        overview: 'Initial treatment regimen for type 2 diabetes, including medication therapy and lifestyle modifications',
        patient_id: 3,
        provider_id: 8,
        medications: [
            {
                id: 1,
                name: 'Metformin',
                strength: '500 mg',
                dose: '1000 mg (two tablets) orally three times a day with meals',
                frequency_in_hours: 6,
                number_of_required_doses: 60,
                number_of_taken_doses: 12
            },
            {
                id: 2,
                name: 'Glipizide',
                strength: '5 mg',
                dose: 'Take one tablet orally before breakfast',
                frequency_in_hours: 24,
                number_of_required_doses: 30,
                number_of_taken_doses: 6
            }
        ]
    },
    {
        overview: 'Personalized weight management counseling and support plan, including nutrition and exercise guidance',
        patient_id: 4,
        provider_id: 8,
        medications: []
    },
    {
        overview: 'Comprehensive asthma control and education plan, including medication therapy and lifestyle modifications',
        patient_id: 5,
        provider_id: 9,
        medications: [
            {
                id: 1,
                name: 'Albuterol Inhaler',
                strength: '90 µg/puff',
                dose: '2 puffs as needed for symptoms',
                frequency_in_hours: 1,
                number_of_required_doses: 999,
                number_of_taken_doses: 15
            },
            {
                id: 2,
                name: 'Budesonide + Formoterol',
                strength: '160/4.5 µg',
                dose: 'Inhale 2 inhalations twice daily',
                frequency_in_hours: 12,
                number_of_required_doses: 60,
                number_of_taken_doses: 10
            }
        ]
    },
    {
        overview: 'Treatment plan for seasonal allergies, including medication therapy and lifestyle modifications',
        patient_id: 6,
        provider_id: 9,
        medications: []
    },
];


/* ----------  MEDICATION  ---------- */
const Medication = [
  /* --- Patient 1 / Treatment 1 --- */
  {
    name: 'Lisinopril',
    strength: '10 mg',
    dose: '10 mg orally once daily',
    photo_url: 'https://picsum.photos/seed/lisinopril/636/477',
    patient_id: 1,
    approved: true,
    time_of_last_dose: new Date('2025-07-15T14:00:00Z'),
    time_of_next_dose: new Date('2025-07-16T02:00:00Z'),
    number_of_required_doses: 30,
    number_of_taken_doses: 5,
    frequency_in_hours: 24, // assuming once daily
  },
  {
    name: 'Amlodipine',
    strength: '5 mg',
    dose: 'Take one tablet by mouth daily',
    photo_url: 'https://picsum.photos/seed/amlodipine/636/477',
    patient_id: 1,
    approved: null,
    time_of_last_dose: new Date('2025-07-15T14:00:00Z'),
    time_of_next_dose: new Date('2025-07-16T02:00:00Z'),
    number_of_required_doses: 30,
    number_of_taken_doses: 5,
    frequency_in_hours: 24, // assuming once daily
  },

  /* --- Patient 3 / Treatment 2 --- */
  {
    name: 'Metformin',
    strength: '500 mg',
    dose: '1000 mg (two tablets) orally three times a day with meals',
    photo_url: 'https://picsum.photos/seed/metformin/636/477',
    patient_id: 3,
    approved: null,
    time_of_last_dose: new Date('2025-07-15T14:00:00Z'),
    time_of_next_dose: new Date('2025-07-15T20:00:00Z'),
    number_of_required_doses: 60,
    number_of_taken_doses: 12,
    frequency_in_hours: 6, // assuming with meals (TID)
  },
  {
    name: 'Glipizide',
    strength: '5 mg',
    dose: '5 mg',
    photo_url: 'https://picsum.photos/seed/glipizide/200/200',
    patient_id: 3,
    approved: false,
    time_of_last_dose: new Date('2025-07-15T14:00:00Z'),
    time_of_next_dose: new Date('2025-07-16T02:00:00Z'),
    number_of_required_doses: 30,
    number_of_taken_doses: 6,
    frequency_in_hours: 24, // assuming once daily
  },

  /* --- Patient 5 / Treatment 3 --- */
  {
    name: 'Albuterol Inhaler',
    strength: '90 µg/puff',
    dose: '2 puffs as needed for symptoms',
    photo_url: 'https://picsum.photos/seed/albuterol/636/477',
    patient_id: 5,
    approved: true,
    time_of_last_dose: new Date('2025-07-15T14:00:00Z'),
    time_of_next_dose: new Date('2025-07-15T20:00:00Z'),
    number_of_required_doses: 999,
    number_of_taken_doses: 15,
    frequency_in_hours: 1,
  },
  {
    name: 'Budesonide + Formoterol',
    strength: '160/4.5 µg',
    photo_url: 'https://picsum.photos/seed/budesonide/636/477',
    dose: '320/4.5 µg',
    patient_id: 5,
    approved: true,
    time_of_last_dose: new Date('2025-07-15T14:00:00Z'),
    time_of_next_dose: new Date('2025-07-16T02:00:00Z'),
    number_of_required_doses: 60,
    number_of_taken_doses: 10,
    frequency_in_hours: 12, // BID
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
    for (const appointment of Appointment) {
        await prisma.appointment.create({ data: appointment });
    }
    for (const preferences of ProviderPreferences) {
        await prisma.providerPreferences.create({ data: preferences });
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
