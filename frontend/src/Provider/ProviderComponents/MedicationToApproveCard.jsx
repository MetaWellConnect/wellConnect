import ApproveMedicationButton from "./ApproveMedicationButton";
import DenyMedicationButton from "./DenyMedicationButton";
import ViewTreatmentPlanButton from "./ViewTreatmentPlanButton";

function MedicationToApproveCard({ medication }) {
    return (
        <div className="bg-body-secondary rounded-3 my-3 p-2">
            <p>Medication for {medication.patient}</p>
            <h3>{medication.name}</h3>
            <img src={medication.photoURL} alt={`Photo of ${medication.name}`} />

            <section className="medication-card-buttons">
                <ViewTreatmentPlanButton />
                <ApproveMedicationButton />
                <DenyMedicationButton />
            </section>
        </div>
    );
}

export default MedicationToApproveCard
