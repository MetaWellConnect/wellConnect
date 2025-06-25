import { treatments, users } from "../../../../../backend/data";

function TreatmentOverview() {
    return (
        <div className="bg-body-secondary rounded-3 p-3 my-3">
            <h2>Treatment Overview</h2>
            <p>{treatments[0].treatmentOverview}</p>
            <h2>Time Until Next Dose</h2>
            <p>{users[0].nextDoseMedication}</p>
            <p>8hrs, 20mins, 10s</p>
        </div>
    );
}

export default TreatmentOverview;
