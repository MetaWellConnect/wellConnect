import MedicationCard from "../Patient/PatientComponents/PatientDashboardPageComponents/MedicationCard.jsx";
import MedicationToApproveCard from "../Provider/ProviderComponents/MedicationToApproveCard.jsx"
import { Fragment, useEffect, useState } from "react";
import { getPatientMedications, getMedicationsToApprove } from "../api.js";

function ListOfMedications({ renderApprovalMedicationCard, id }) {
    const [medicationList, setMedicationList] = useState([""]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (renderApprovalMedicationCard) {
                setMedicationList(await getMedicationsToApprove(id));
            }

            else {
                setMedicationList(await getPatientMedications(id));
            }
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            {medicationList.map((medication, index) => {
                return (
                    <Fragment key={index}>
                        {renderApprovalMedicationCard ? <MedicationToApproveCard key={index} pendingMedication={medication} /> : <MedicationCard key={index} medication={medication} />}
                    </ Fragment>
                );
            })}
        </div>
    );
}

export default ListOfMedications;
