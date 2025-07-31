-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'PROVIDER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL,
    "provider_id" INTEGER,
    "treatment_id" INTEGER,
    "timezone" TEXT NOT NULL DEFAULT 'America/Los_Angeles',

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "approved" BOOLEAN,
    "time_of_last_dose" TIMESTAMP(3),
    "time_of_next_dose" TIMESTAMP(3),
    "number_of_required_doses" INTEGER,
    "number_of_taken_doses" INTEGER,
    "frequency_in_hours" INTEGER,
    "dose" TEXT,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" SERIAL NOT NULL,
    "overview" TEXT NOT NULL,
    "medications" JSONB,
    "patient_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration_in_minutes" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderPreferences" (
    "id" SERIAL NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "start_hour" INTEGER NOT NULL DEFAULT 9,
    "end_hour" INTEGER NOT NULL DEFAULT 17,
    "available_days" TEXT[] DEFAULT ARRAY['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']::TEXT[],
    "max_appointments_per_day" INTEGER NOT NULL DEFAULT 10,
    "min_buffer_minutes" INTEGER NOT NULL DEFAULT 15,
    "appointment_lead_time_min" INTEGER NOT NULL DEFAULT 120,
    "future_appointment_limit" INTEGER NOT NULL DEFAULT 30,
    "timezone" TEXT NOT NULL DEFAULT 'America/Los_Angeles',

    CONSTRAINT "ProviderPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentReminders" (
    "id" SERIAL NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provider_id" INTEGER NOT NULL,
    "provider_email" TEXT NOT NULL,
    "patient_first_name" TEXT NOT NULL,
    "patient_last_name" TEXT NOT NULL,
    "medication_name" TEXT NOT NULL,
    "medication_dose" TEXT NOT NULL,

    CONSTRAINT "SentReminders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Treatment_patient_id_key" ON "Treatment"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderPreferences_provider_id_key" ON "ProviderPreferences"("provider_id");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderPreferences" ADD CONSTRAINT "ProviderPreferences_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
