import { useEffect, useState } from "react";
import ApproveMedicationButton from "./ApproveMedicationButton";
import DenyMedicationButton from "./DenyMedicationButton";
import ViewTreatmentPlanButton from "./ViewTreatmentPlanButton";
import { getPatient } from "../../api";

function MedicationToApproveCard({ pendingMedication }) {
    const [patient, setPatient] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setPatient(await getPatient(pendingMedication.patient_id));
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <>
            <div className="bg-body-secondary rounded-3 my-3 p-2">
                <p>Medication for {patient.user.first_name} {patient.user.last_name}</p>
                <h3>{pendingMedication.name}</h3>
                <img src={pendingMedication.photo_url} alt={`Photo of medication`} className="rounded-3" />

                <section className="medication-card-buttons">
                    <ViewTreatmentPlanButton patient={patient} />
                    <ApproveMedicationButton patient={patient} pendingMedication={pendingMedication} />
                    <DenyMedicationButton />
                </section>
            </div>
        </>
    );
}

export default MedicationToApproveCard
