import MedicationCard from "./MedicationCard.jsx";
import { medications } from "../../../../../backend/data.js";

function ListOfMedications() {
    return(
        <div className="">
            {medications.slice(0,5).map((medication, index) => {
                return (
                    <MedicationCard key={index} medication={medication}/>
                );
            })}
        </div>
    );
}

export default ListOfMedications;
