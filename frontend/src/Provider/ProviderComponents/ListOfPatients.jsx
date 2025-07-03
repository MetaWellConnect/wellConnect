import PatientCard from "./PatientCard"
import React, { useEffect, useState } from "react";
import {getProviderPatients} from "../../../testAPI"

export default function ListOfPatients({ providerId }) {
    const [patients, setPatients] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setPatients(await getProviderPatients(providerId));
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }


    return (
        <div className="">
            {patients.map((patient, index) => {
                return (
                    <PatientCard key={index} patient={patient} />
                );
            })}
        </div>
    );
}
