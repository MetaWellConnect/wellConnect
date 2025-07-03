import ApproveMedicationButton from "./ApproveMedicationButton";
import DenyMedicationButton from "./DenyMedicationButton";
import ViewTreatmentPlanButton from "./ViewTreatmentPlanButton";

function MedicationToApproveCard({ pendingMedication }) {
    return (
        <>
            <div className="bg-body-secondary rounded-3 my-3 p-2">
                <p>Medication for {pendingMedication.patient}</p>
                <h3>{pendingMedication.name}</h3>
                <img src={pendingMedication.photo_url} alt={`Photo of medication`} className="rounded-3" />

                <section className="medication-card-buttons">
                    <ViewTreatmentPlanButton patientId={pendingMedication.patient_id} />
                    <ApproveMedicationButton pendingMedication={pendingMedication} />
                    <DenyMedicationButton />
                </section>
            </div>
        </>
    );
}

export default MedicationToApproveCard
