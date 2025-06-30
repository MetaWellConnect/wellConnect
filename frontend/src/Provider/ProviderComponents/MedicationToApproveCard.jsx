import ApproveMedicationButton from "./ApproveMedicationButton";
import DenyMedicationButton from "./DenyMedicationButton";
import ViewTreatmentPlanButton from "./ViewTreatmentPlanButton";

function MedicationToApproveCard({medication}) {
    return(
        <div className="bg-body-secondary rounded-3 my-3 p-2">
            <h3>{medication.name}</h3>
            <p>{medication.description}</p>

            <section className="medication-card-buttons">
                <ViewTreatmentPlanButton />
                <ApproveMedicationButton />
                <DenyMedicationButton />
            </section>
        </div>
    );
}

export default MedicationToApproveCard
