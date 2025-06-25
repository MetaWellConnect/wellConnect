import MedicationCard from "./MedicationCard.jsx";
import { medications } from "../../../../../backend/data.js";

function ListOfMedications() {
    return(
        <>
            {medications.map((medication) => {
                return (
                    <MedicationCard medication={medication}/>
                );
            })}
        </>
    );
}

export default ListOfMedications;
