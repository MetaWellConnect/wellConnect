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
