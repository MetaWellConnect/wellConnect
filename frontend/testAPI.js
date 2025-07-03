/* ─────────────────────────  USERS  ───────────────────────── */
const users = [
    { id: 1, first_name: "Alice", last_name: "Smith", email: "alice.smith@example.com", password_hash: "hashedpassword1", role: "PATIENT" },
    { id: 2, first_name: "Bob", last_name: "Johnson", email: "bob.johnson@example.com", password_hash: "hashedpassword2", role: "PATIENT" },
    { id: 3, first_name: "Charlie", last_name: "Lee", email: "charlie.lee@example.com", password_hash: "hashedpassword3", role: "PATIENT" },
    { id: 4, first_name: "Gregory", last_name: "House", email: "g.house@princeton-plainsboro.org", password_hash: "hashedprovider1", role: "PROVIDER" },
];

/* ─────────────────────────  PROVIDERS  ───────────────────── */
const providers = [
    { id: 4 },
];

/* ─────────────────────────  TREATMENT PLANS  ─────────────── */
const treatmentPlans = [
    {
        id: 1,
        overview: /* Alice’s plan */ `
        **Patient**: Alice Smith (58 y)
        **Goals**: 1 analgesia 2 HbA1c < 7 % 3 LDL-C < 100.
        **Plan**: Aspirin 500 mg BID | Metformin 850 mg BID | Atorvastatin 40 mg QHS.
        Lifestyle: Mediterranean diet, 150 min/wk exercise. Labs q3 mo.
      `,
        patient_id: 1,
        provider_id: 4,
    },
    {
        id: 2,
        overview: /* Bob’s plan */ `
        **Patient**: Bob Johnson (65 y)
        **Goals**: BP < 130/80, LDL-C ↓ ≥ 50 %, resolve oedema.
        **Plan**: Lisinopril 20 mg daily (titrate PRN) | Simvastatin 20 mg HS |
        HCTZ 25 mg daily.  DASH diet, 2 g Na, home BP log.
      `,
        patient_id: 2,
        provider_id: 4,
    },
    {
        id: 3,
        overview: /* Charlie’s plan */ `
        **Patient**: Charlie Lee (42 y)
        Multi-system targets: TSH 0.5-2.5 | heal GERD | neuropathic pain ≤ 3/10
        + mood stabilisation + asthma rescue + 7-day sinusitis abx course.
      `,
        patient_id: 3,
        provider_id: 4,
    },
];

/* ─────────────────────────  PATIENTS  ────────────────────── */
const patients = [
    { id: 1, provider_id: 4, treatment_plan_id: 1 },
    { id: 2, provider_id: 4, treatment_plan_id: 2 },
    { id: 3, provider_id: 4, treatment_plan_id: 3 },
];

/* ─────────────────────────  MEDICATIONS  ─────────────────── */
const medications = [
    /* — Alice (treatment_id: 1) — */
    {
        id: 1,
        name: "Aspirin",
        description: "Analgesic/antipyretic; CV prophylaxis.",
        strength: 500,
        time_of_last_dose: new Date("2025-06-22T08:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T20:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 720,
        number_of_required_doses: 60,
        number_of_doses_token: 45,
        patient_id: 1,
        treatment_id: 1,
        validated: null
    },
    {
        id: 2,
        name: "Metformin",
        description: "Biguanide; lowers hepatic glucose output.",
        strength: 850,
        time_of_last_dose: new Date("2025-06-22T07:30:00Z"),
        time_of_next_dose: new Date("2025-06-22T19:30:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 720,
        number_of_required_doses: 60,
        number_of_doses_token: 58,
        patient_id: 1,
        treatment_id: 1,
        validated: null
    },
    {
        id: 3,
        name: "Atorvastatin",
        description: "Statin; LDL-C reduction.",
        strength: 40,
        time_of_last_dose: new Date("2025-06-22T21:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T21:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 1440,
        number_of_required_doses: 30,
        number_of_doses_token: 26,
        patient_id: 1,
        treatment_id: 1,
        validated: null
    },

    /* — Bob (treatment_id: 2) — */
    {
        id: 4,
        name: "Lisinopril",
        description: "ACE inhibitor; antihypertensive.",
        strength: 20,
        time_of_last_dose: new Date("2025-06-22T09:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T09:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 1440,
        number_of_required_doses: 30,
        number_of_doses_token: 27,
        patient_id: 2,
        treatment_id: 2,
    },
    {
        id: 5,
        name: "Simvastatin",
        description: "Statin for cholesterol control.",
        strength: 20,
        time_of_last_dose: new Date("2025-06-22T22:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T22:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 1440,
        number_of_required_doses: 30,
        number_of_doses_token: 29,
        patient_id: 2,
        treatment_id: 2,
    },
    {
        id: 6,
        name: "Hydrochlorothiazide",
        description: "Thiazide diuretic.",
        strength: 25,
        time_of_last_dose: new Date("2025-06-22T07:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T07:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 1440,
        number_of_required_doses: 30,
        number_of_doses_token: 28,
        patient_id: 2,
        treatment_id: 2,
    },

    /* — Charlie (treatment_id: 3) — */
    {
        id: 7,
        name: "Levothyroxine",
        description: "Thyroid hormone replacement.",
        strength: 100,
        time_of_last_dose: new Date("2025-06-22T06:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T06:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 1440,
        number_of_required_doses: 90,
        number_of_doses_token: 89,
        patient_id: 3,
        treatment_id: 3,
    },
    {
        id: 8,
        name: "Omeprazole",
        description: "PPI for acid reflux / GERD.",
        strength: 20,
        time_of_last_dose: new Date("2025-06-22T08:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T08:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 1440,
        number_of_required_doses: 60,
        number_of_doses_token: 57,
        patient_id: 3,
        treatment_id: 3,
    },
    {
        id: 9,
        name: "Gabapentin",
        description: "α2δ ligand; neuropathic pain.",
        strength: 300,
        time_of_last_dose: new Date("2025-06-22T18:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T22:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 240,
        number_of_required_doses: 120,
        number_of_doses_token: 118,
        patient_id: 3,
        treatment_id: 3,
    },
    {
        id: 10,
        name: "Sertraline",
        description: "SSRI antidepressant.",
        strength: 50,
        time_of_last_dose: new Date("2025-06-22T09:00:00Z"),
        time_of_next_dose: new Date("2025-06-23T09:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 1440,
        number_of_required_doses: 30,
        number_of_doses_token: 28,
        patient_id: 3,
        treatment_id: 3,
    },
    {
        id: 11,
        name: "Albuterol",
        description: "SABA bronchodilator.",
        strength: 2,
        time_of_last_dose: new Date("2025-06-22T10:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T16:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 360,
        number_of_required_doses: 12,
        number_of_doses_token: 9,
        patient_id: 3,
        treatment_id: 3,
    },
    {
        id: 12,
        name: "Amoxicillin",
        description: "Broad-spectrum penicillin antibiotic.",
        strength: 500,
        time_of_last_dose: new Date("2025-06-22T13:00:00Z"),
        time_of_next_dose: new Date("2025-06-22T21:00:00Z"),
        photo_url: "https://picsum.photos/200",
        internval_of_dose: 480,
        number_of_required_doses: 21,
        number_of_doses_token: 18,
        patient_id: 3,
        treatment_id: 3,
    },
];

export async function getPatient(patientId) {
    return users[patientId - 1];
}

export async function getPatientMedications(patientId) {
    let medicationsToReturn = [];

    medications.forEach((med) => {
        if (med.patient_id == patientId) { medicationsToReturn.push(med) }
    })

    return medicationsToReturn;
}

export async function getPatientMedication(patientId, medicationId) {
    let medicationsToReturn;

    medications.forEach((med) => {
        if (med.patient_id == patientId && med.id == medicationId) { medicationsToReturn = med }
    })

    return medicationsToReturn;
}

export async function getPatientTreatmentPlan(patientId) {
    let treatmentPlanToReturn;

    treatmentPlans.forEach((treatmentPlan) => {
        if (treatmentPlan.patient_id == patientId) { treatmentPlanToReturn = treatmentPlan }
    })

    return treatmentPlanToReturn;
}

export async function getProvider(providerId) {
    return users[providerId - 1];
}

export async function getProviderPatients(providerId) {
    let patientsToReturn = [];

    patients.forEach((patient) => {
        if (patient.provider_id == providerId) {
            patientsToReturn.push(users[patient.id - 1]);
        }
    })

    return patientsToReturn;
}

export async function getProviderMedicationsToApprove(providerId) {
    let medicationsToReturn = [];

    medications.forEach((med) => {
        if (med.validated === null ) {
            medicationsToReturn.push(med);
        }
    })

    return medicationsToReturn
}
