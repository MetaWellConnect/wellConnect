import React from "react";
import Modal from "react-bootstrap/Modal"


export default function ApproveModal({ onHide, show }) {
    function handleMedicationApproval() {

    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide}>
            <Modal.Header closeButton>
                <h2>Medication for: </h2>
            </Modal.Header>

            <Modal.Body>
                {/*
                    This form has not been finalized as the way this information will be handled hasn't been decided.
                    This is the general idea of the information the provider will need to provide
                */}
                <div className="container-fluid row">
                    <img className="col-sm" src="https://picsum.photos/200" alt="Photo of medication" />

                    <form className="col-sm" id="medication-approval-form" onSubmit={handleMedicationApproval}>
                        <input type="text" className="rounded-pill form-control w-75 p-3 my-3 mx-auto" placeholder="Medication Name" required />
                        <input type="text" className="rounded-pill form-control w-75 p-3 my-3 mx-auto" placeholder="Consumption instructions" required />
                        <input type="text" className="rounded-pill form-control w-75 p-3 my-3 mx-auto" placeholder="Number of doses" required />
                        <input type="text" className="rounded-pill form-control w-75 p-3 my-3 mx-auto" placeholder="Interval of doses" required />
                    </form>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-success" type="submit" form="medication-approval-form">Confirm</button>
                <button className="btn btn-danger" onClick={onHide}>Cancel</button>
            </Modal.Footer>
        </Modal>
    );
}
