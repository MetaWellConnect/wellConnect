import MedicationCard from "../Patient/PatientComponents/PatientDashboardPageComponents/MedicationCard.jsx";
import MedicationToApproveCard from "../Provider/ProviderComponents/MedicationToApproveCard.jsx"
import { Fragment, useEffect, useState } from "react";
import { getPatientMedication, getProviderMedicationsToApprove } from "../../testAPI.js";

function ListOfMedications({ renderApprovalMedicationCard, id }) {
    const [medicationList, setMedicationList] = useState([""]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (renderApprovalMedicationCard) {
                setMedicationList(await getProviderMedicationsToApprove(id));
            } else {
                setMedicationList(await getPatientMedication(id));
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
        <div className="">
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
