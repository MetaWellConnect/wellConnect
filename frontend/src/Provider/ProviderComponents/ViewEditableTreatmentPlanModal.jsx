import React, {useState} from "react";
import Modal from "react-bootstrap/Modal"
import { treatments } from "../../../../backend/data";


export default function ViewTreatmentPlanModal({ patientId, onHide, show }) {
    const treatment = treatments[patientId] // Simulate API call to retrieve the treatment plan of the patient

    const [treatmentOverview, setTreatmentOverview] = useState(treatment.treatmentOverview);
    const [medicationList, setMedicationList] = useState([...treatment.medications]);

    function updateMedicationList(e) {
        medicationList[e.target.id] = e.target.value;
        setMedicationList([...medicationList]);
    }

    function handleTreatmentPlanEditSubmit() {

    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide}>
            <Modal.Header closeButton>
                <h2>{treatment.user}</h2>
            </Modal.Header>

            <Modal.Body>
                {/*
                    This modal has not been finalized as the schema for this information hasn't been decided.
                    This is the general idea of the information the treatment overview will provide
                */}
                <form id="treatment-edit-form" onSubmit={handleTreatmentPlanEditSubmit}>
                    <textarea form="treatment-edit-form" type="text" placeholder="Treatment Overview" className="form-control p-3 my-3" value={treatmentOverview} onChange={(e) => setTreatmentOverview(e.target.value)} required></textarea>

                    <h3>Medications</h3>
                    {medicationList.map((medication, index) => {
                        return (
                            <input form="treatment-edit-form" name={medication} className="form-control w-auto p-3 my-3" key={index} id={index} value={medication} onChange={(e) => updateMedicationList(e)} required/>
                        );
                    })}
                    <button type="button" className="btn btn-primary" onClick={() => setMedicationList([...medicationList, ""])}>Add another medication</button>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-success" type="submit" form="treatment-edit-form">Save</button>
            </Modal.Footer>
        </Modal>
    );
}
