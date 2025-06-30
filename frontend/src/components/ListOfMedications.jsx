import MedicationCard from "../Patient/PatientComponents/PatientDashboardPageComponents/MedicationCard.jsx";
import { medications } from "../../../backend/data.js";

function ListOfMedications() {
    const medicationList = medications.slice(0,5); // Simulates API call to retrieve medications

    return(
        <div className="">
            {medicationList.map((medication, index) => {
                return (
                    <MedicationCard key={index} medication={medication}/>
                );
            })}
        </div>
    );
}

export default ListOfMedications;
