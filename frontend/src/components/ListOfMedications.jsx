import MedicationCard from "../Patient/PatientComponents/PatientDashboardPageComponents/MedicationCard.jsx";
import MedicationToApproveCard from "../Provider/ProviderComponents/MedicationToApproveCard.jsx"
import { medications } from "../../../backend/data.js";
import { Fragment } from "react";

function ListOfMedications({ renderApprovalMedicationCard }) {
    const medicationList = medications.slice(0, 5); // Simulates API call to retrieve medications

    return (
        <div className="">
            {medicationList.map((medication, index) => {
                return (
                    <Fragment key={index}>
                        {renderApprovalMedicationCard ? <MedicationToApproveCard key={index} medication={medication} /> : <MedicationCard key={index} medication={medication} />}
                    </ Fragment>
                );
            })}
        </div>
    );
}

export default ListOfMedications;
