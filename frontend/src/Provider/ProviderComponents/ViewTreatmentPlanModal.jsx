import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal"
import { getPatientTreatment, getPatientMedications } from "../../api";

export default function ViewTreatmentPlanModal({ patient, onHide, show }) {
    const [treatment, setTreatment] = useState("");
    const [medications, setMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setTreatment(await getPatientTreatment(patient.id));
            setMedications(await getPatientMedications(patient.id));
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
                <h2>{patient.user.first_name} {patient.user.last_name}</h2>
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
