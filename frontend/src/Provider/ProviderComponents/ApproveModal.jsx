import { useState } from "react";
import * as API from "../../api";
import Modal from "react-bootstrap/Modal";

export default function ApproveModal({ patient, pendingMedication, setMedicationList, onHide, show }) {
    const [dose, setDose] = useState("");
    const [name, setName] = useState(pendingMedication.name || "");
    const [frequency_in_hours, setFrequencyInHours] = useState("");
    const [strength, setStrength] = useState(pendingMedication.strength || "");
    const [number_of_required_doses, setNumberOfRequiredDoses] = useState("");
    const approveModalFormCss = "rounded-pill form-control w-75 p-3 m-2";

    async function handleMedicationApproval(e) {
        e.preventDefault();

        const medicationInfo = {
            approved: true,
            name,
            dose,
            strength,
            frequency_in_hours,
            number_of_required_doses,
            number_of_taken_doses: 0,
            time_of_next_dose: new Date()
        }

        try {
            await API.putMedication(patient.id, pendingMedication.id, medicationInfo);
            onHide();

            setMedicationList((prevMedicationList) =>
                prevMedicationList.filter((medication) =>
                    medication.id !== pendingMedication.id));
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide}>
            <Modal.Header closeButton>
                <h2>Medication for: {patient.user.first_name} {patient.user.last_name}</h2>
            </Modal.Header>

            <Modal.Body>
                <div className="container-fluid row">
                    <img className="col-sm" src={pendingMedication.photo_url} alt={pendingMedication.name} />

                    <form className="col-sm d-flex flex-column justify-content-center align-items-center" id="medication-approval-form" onSubmit={(e) => handleMedicationApproval(e)}>
                        <input type="text" className={approveModalFormCss}
                            value={name} onChange={(e) => setName(e.target.value)} placeholder="Medication Name" required />

                        <input type="text" className={approveModalFormCss}
                            value={strength} onChange={(e) => setStrength(e.target.value)} placeholder="Medication Strength" required />

                        <input type="text" className={approveModalFormCss}
                            value={dose} onChange={(e) => setDose(e.target.value)} placeholder="Dose to take" required />

                        <input type="text" className={approveModalFormCss}
                            value={number_of_required_doses} onChange={(e) => setNumberOfRequiredDoses(Number(e.target.value))} placeholder="Number of doses" required />

                        <input type="text" className={approveModalFormCss}
                            value={frequency_in_hours} onChange={(e) => setFrequencyInHours(Number(e.target.value))} placeholder="Interval of doses in hours" required />
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
