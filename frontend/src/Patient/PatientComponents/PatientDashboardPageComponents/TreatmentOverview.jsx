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
            {treatment && treatment.medications.map((med, index) =>
                <p key={index}>{med.name}</p>
            )}
        </div>
    );
}

export default TreatmentOverview;
