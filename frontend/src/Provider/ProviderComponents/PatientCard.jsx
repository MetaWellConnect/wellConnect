import React from "react";
import ViewTreatmentPlanButton from "./ViewTreatmentPlanButton";

export default function PatientCard({ patient }) {
    return (
        <div className="bg-body-secondary rounded-3 my-3 p-2">
            <h3>{patient.user.first_name} {patient.user.last_name}</h3>
            <ViewTreatmentPlanButton patient={patient} allowTreatmentEdit={true} />
        </div>
    );
}
