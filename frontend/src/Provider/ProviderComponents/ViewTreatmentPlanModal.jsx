import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal"
import { getPatientTreatmentPlan, getPatientMedications } from "../../../testAPI";


export default function ViewTreatmentPlanModal({ patientId, onHide, show }) {
    const [treatment, setTreatment] = useState("");
    const [medications, setMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setTreatment(await getPatientTreatmentPlan(patientId));
            setMedications(await getPatientMedications(patientId));
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide}>
            <Modal.Header closeButton>
                <h2>{treatment.patient_id}</h2>
            </Modal.Header>

            <Modal.Body>
                <p>{treatment.overview}</p>

                <h3>Medications</h3>
                {medications.map((medication, index) => {
                    return (
                        <p key={index}>{medication.name}</p>
                    );
                })}
            </Modal.Body>
        </Modal>
    );
}
