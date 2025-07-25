const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function updateMedicationTimes(medication) {
    const timeOfLastDose = new Date();

    const timeOfNextDose = new Date();
    console.log(medication)
    console.log(timeOfNextDose)
    timeOfNextDose.setHours(timeOfNextDose.getHours() + medication.frequency_in_hours);

    try {
        await prisma.medication.update({
            where: {
                id: medication.id
            },
            data: {
                time_of_last_dose: timeOfLastDose,
                time_of_next_dose: timeOfNextDose
            }
        });
    } catch (e) {
        throw e;
    }
}

async function updateMedicationNumberOfTakenDoses(medication) {
    try {
        await prisma.medication.update({
            where: {
                id: medication.id
            },
            data: {
                number_of_taken_doses: { increment: 1 }
            }
        });
    } catch (e) {
        throw e;
    }
}

async function deleteMedication(medication) {
    try {
        await prisma.medication.delete({
            where: {
                id: medication.id
            }
        });
    } catch (e) {
        throw e;
    }
}

async function updateMedicationDueReminders(medication) {
    try {
        // If a patient has consumed all required doses of a medication, remove it
        if (medication.number_of_taken_doses + 1 === medication.number_of_required_doses) {
            deleteMedication(medication);
            return;
        }

        // Update the information of the medication for future reminders
        updateMedicationTimes(medication);
        updateMedicationNumberOfTakenDoses(medication);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    updateMedicationDueReminders
}
