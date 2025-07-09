import { useState, useEffect } from "react";
import { getPatientTreatment } from "../../../api";

function TreatmentOverview() {
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
            <p>{treatment.overview}</p>
            <h2>Time Until Next Dose</h2>
            {/* Time of the next dose needs to be added to treatment schema */}
            <p>Aspirin</p>
            <p>8hrs, 20mins, 10s</p>
        </div>
    );
}

export default TreatmentOverview;
