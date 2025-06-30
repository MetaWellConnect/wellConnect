import MedicationCard from "../Patient/PatientComponents/PatientDashboardPageComponents/MedicationCard.jsx";
import MedicationToApproveCard from "../Provider/ProviderComponents/MedicationToApproveCard.jsx"
import { medications } from "../../../backend/data.js";

function ListOfMedications({ renderApprovalMedicationCard }) {
    const medicationList = medications.slice(0, 5); // Simulates API call to retrieve medications

    return (
        <div className="">
            {medicationList.map((medication, index) => {
                return (
                    <>
                        {renderApprovalMedicationCard ? <MedicationCard key={index} medication={medication} /> : <MedicationToApproveCard key={index} medication={medication} />}
                    </>
                );
            })}
        </div>
    );
}

export default ListOfMedications;
