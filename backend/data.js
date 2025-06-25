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
        timeUntilNextDose: new Date("2025-06-23T09:00:00Z"),
        nextDoseMedication: "Lisinopril",
    },
];

export const medications = [
    {
        name: "Aspirin",
        strength: 500,
        time_of_last_dose: new Date("2025-06-22T08:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T20:00:00Z"),
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
