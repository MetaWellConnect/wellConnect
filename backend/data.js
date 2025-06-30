export const users = [
    {
        name: "Alice Smith",
        email: "alice.smith@example.com",
        password: "hashedpassword1",
        timeUntilNextDose: new Date("2025-06-22T20:00:00Z"),
        nextDoseMedication: "Aspirin",
    },
    {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        password: "hashedpassword2",
        timeUntilNextDose: new Date("2025-06-22T19:30:00Z"),
        nextDoseMedication: "Metformin",
    },
    {
        name: "Charlie Lee",
        email: "charlie.lee@example.com",
        password: "hashedpassword3",
        timeUntilNextDose: new Date("2026-06-23T09:00:00Z"),
        nextDoseMedication: "Lisinopril",
    },
];

export const medications = [
    {
        name: "Aspirin",
        strength: 500,
        time_of_last_dose: new Date("2025-06-22T08:00:00Z"),
        time_of_next_dose: new Date("2026-06-22T20:00:00Z"),
        description: "Used to reduce pain, fever, or inflammation.",
        photo_url: "https://example.com/photos/aspirin.jpg",
    },
    {
        name: "Metformin",
        strength: 850,
        time_of_last_dose: new Date("2025-06-22T07:30:00Z"),
        time_of_next_dose: new Date("2025-06-22T19:30:00Z"),
        description: "Used to treat type 2 diabetes by decreasing glucose production in the liver and increasing insulin sensitivity.",
        photo_url: "https://example.com/photos/metformin.jpg",
    },
    {
        name: "Lisinopril",
        strength: 20,
        time_of_last_dose: new Date("2025-06-22T09:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T09:00:00Z"),
        description: "Used to treat high blood pressure by relaxing blood vessels and reducing blood pressure.",
        photo_url: "https://example.com/photos/lisinopril.jpg",
    },
    {
        name: "Atorvastatin",
        strength: 40,
        time_of_last_dose: new Date("2025-06-22T21:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T21:00:00Z"),
        description: "Used to lower cholesterol and reduce the risk of heart disease.",
        photo_url: "https://example.com/photos/atorvastatin.jpg",
    },
    {
        name: "Amoxicillin",
        strength: 500,
        time_of_last_dose: new Date("2025-06-22T13:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T21:00:00Z"),
        description: "An antibiotic used to treat a wide variety of bacterial infections.",
        photo_url: "https://example.com/photos/amoxicillin.jpg",
    },
    {
        name: "Albuterol",
        strength: 2,
        time_of_last_dose: new Date("2025-06-22T10:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T16:00:00Z"),
        description: "A bronchodilator used to treat or prevent bronchospasm in people with asthma.",
        photo_url: "https://example.com/photos/albuterol.jpg",
    },
    {
        name: "Levothyroxine",
        strength: 100,
        time_of_last_dose: new Date("2025-06-22T06:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T06:00:00Z"),
        description: "Used to treat hypothyroidism by replacing thyroid hormone.",
        photo_url: "https://example.com/photos/levothyroxine.jpg",
    },
    {
        name: "Omeprazole",
        strength: 20,
        time_of_last_dose: new Date("2025-06-22T08:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T08:00:00Z"),
        description: "Used to treat gastroesophageal reflux disease (GERD) and other stomach acid-related conditions.",
        photo_url: "https://example.com/photos/omeprazole.jpg",
    },
    {
        name: "Simvastatin",
        strength: 20,
        time_of_last_dose: new Date("2025-06-22T22:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T22:00:00Z"),
        description: "Used to lower cholesterol and triglyceride levels in the blood.",
        photo_url: "https://example.com/photos/simvastatin.jpg",
    },
    {
        name: "Gabapentin",
        strength: 300,
        time_of_last_dose: new Date("2025-06-22T18:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T22:00:00Z"),
        description: "Used to treat nerve pain and seizures.",
        photo_url: "https://example.com/photos/gabapentin.jpg",
    },
    {
        name: "Hydrochlorothiazide",
        strength: 25,
        time_of_last_dose: new Date("2025-06-22T07:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T07:00:00Z"),
        description: "A diuretic used to treat high blood pressure and fluid retention.",
        photo_url: "https://example.com/photos/hydrochlorothiazide.jpg",
    },
    {
        name: "Sertraline",
        strength: 50,
        time_of_last_dose: new Date("2025-06-22T09:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T09:00:00Z"),
        description: "An antidepressant used to treat depression, anxiety, and other mood disorders.",
        photo_url: "https://example.com/photos/sertraline.jpg",
    },
];

export const treatments = [
    {
        treatmentOverview: "The goal of this treatment is to manage Alice's chronic pain and type 2 diabetes. Aspirin will be used to reduce pain and inflammation, while Metformin will help regulate her blood sugar levels by decreasing glucose production in the liver and increasing insulin sensitivity. Regular monitoring of her blood sugar and pain levels will be necessary to adjust the treatment plan as needed.",
        user: "Alice Smith",
        medications: ["Aspirin", "Metformin"],
    },
    {
        treatmentOverview: "This treatment aims to control Bob's high blood pressure and reduce his risk of cardiovascular disease. Lisinopril will be used to relax his blood vessels and lower his blood pressure. Regular monitoring of his blood pressure and kidney function will be necessary to adjust the treatment plan as needed.",
        user: "Bob Johnson",
        medications: ["Lisinopril"],
    }
]

export const pendingMedications = [
    {
        name: "Aspirin",
        strength: 500,
        time_of_last_dose: new Date("2025-06-22T08:00:00Z"),
        time_of_next_dose: new Date("2026-06-22T20:00:00Z"),
        description: "Used to reduce pain, fever, or inflammation.",
        photoURL: "https://picsum.photos/200",
        patient: "Alice Smith",
        status: "pending",
        prescription_date: new Date("2025-06-15T10:00:00Z"),
        expiration_date: new Date("2026-06-15T10:00:00Z"),
        dosage_instructions: "Take one tablet by mouth twice daily",
        refill_count: 3,
        refill_status: "refill_pending"
    },
    {
        name: "Metformin",
        strength: 850,
        time_of_last_dose: new Date("2025-06-22T07:30:00Z"),
        time_of_next_dose: new Date("2025-06-22T19:30:00Z"),
        description: "Used to treat type 2 diabetes by decreasing glucose production in the liver and increasing insulin sensitivity.",
        photoURL: "https://picsum.photos/200",
        patient: "Bob Johnson",
        status: "pending",
        prescription_date: new Date("2025-06-10T14:00:00Z"),
        expiration_date: new Date("2026-06-10T14:00:00Z"),
        dosage_instructions: "Take one tablet by mouth three times daily",
        refill_count: 2,
        refill_status: "refill_pending"
    }
];
