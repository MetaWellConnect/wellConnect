import React from "react";
import Modal from "react-bootstrap/Modal"
import { treatments } from "../../../../backend/data";


export default function ApproveModal({ onHide, show }) {
    const treatment = treatments[0] // Simulate API call to retrieve the treatment plan of the patient

    return (
        <Modal show={show} size="lg" centered onHide={onHide}>
            <Modal.Header closeButton>
                <h2>{treatment.user}</h2>
            </Modal.Header>

            <Modal.Body>
                {/*
                    This form has not been finalized as the way this information will be handled hasn't been decided.
                    This is the general idea of the information the treatment overview will provide
                */}
                <p>{treatment.treatmentOverview}</p>

                <h3>Medications</h3>
                {treatment.medications.map((medication, index) => {
                    return (
                        <p key={index}>{medication}</p>
                    );
                })}
            </Modal.Body>
        </Modal>
    );
}
