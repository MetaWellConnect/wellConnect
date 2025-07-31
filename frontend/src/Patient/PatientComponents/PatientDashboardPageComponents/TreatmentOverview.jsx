import { useState, useEffect } from "react";
import { getPatientTreatment } from "../../../api";

function TreatmentOverview({ id }) {
    const [treatment, setTreatment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setTreatment(await getPatientTreatment(id));
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="bg-body-secondary rounded-3 p-3 my-3">
            <h2>Treatment Overview</h2>
            <p>{treatment?.overview || "No Treatment Assigned"}</p>
            <h2>Assigned Prescriptions</h2>
            {treatment.medications.length > 0 && treatment.medications.map((med, index) =>
                <div className="mb-2" key={index}>
                    <p className="m-0">{med.name}</p>
                    <p className="m-0">Dose: {med.dose}</p>
                    <p className="m-0">Frequency in Hours: {med.frequency_in_hours}</p>
                    <p className="m-0">Number of Doses Required: {med.number_of_required_doses}</p>
                </div>
            )}
        </div>
    );
}

export default TreatmentOverview;
