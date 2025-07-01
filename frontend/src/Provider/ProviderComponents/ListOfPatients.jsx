import PatientCard from "./PatientCard"
import { users } from "../../../../backend/data";
import React from "react";

export default function ListOfPatients() {
    return (
        <div className="">
            {users.map((patient, index) => {
                return (
                    <PatientCard key={index} patient={patient} />
                );
            })}
        </div>
    );
}
