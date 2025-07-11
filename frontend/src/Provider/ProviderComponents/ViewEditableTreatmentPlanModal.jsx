import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal"
import {getPatientTreatment, getPatientMedications} from "../../api"


export default function ViewTreatmentPlanModal({ patient, onHide, show }) {
        const [treatment, setTreatment] = useState("");
        const [medications, setMedications] = useState([]);
        const [isLoading, setIsLoading] = useState(true);

        const [treatmentOverview, setTreatmentOverview] = useState();
        const [medicationList, setMedicationList] = useState();

        useEffect(() => {
            (async () => {
                const treatmentResponse = await getPatientTreatment(patient.id);
                setTreatment(treatmentResponse);

                const medicationsResponse = await getPatientMedications(patient.id);
                setMedications(medicationsResponse);

                setTreatmentOverview(treatmentResponse.overview);
                setMedicationList([...medicationsResponse]);

                setIsLoading(false);
            })();
        }, []);

    function updateMedicationList(e) {
        medicationList[e.target.id] = e.target.value;
        setMedicationList([...medicationList]);
    }

    function handleTreatmentPlanEditSubmit() {

    }

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
                <form id="treatment-edit-form" onSubmit={handleTreatmentPlanEditSubmit}>
                    <textarea form="treatment-edit-form" type="text" placeholder="Treatment Overview" className="form-control p-3 my-3" value={treatmentOverview} onChange={(e) => setTreatmentOverview(e.target.value)} required></textarea>

                    <h3>Medications</h3>
                    {medicationList.map((medication, index) => {
                        return (
                            <input form="treatment-edit-form" name={medication.name} className="form-control w-auto p-3 my-3" key={index} id={index} value={medication.name} onChange={(e) => updateMedicationList(e)} required/>
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
