import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal"
import * as API from "../../api"


export default function ViewTreatmentPlanModal({ patient, onHide, show }) {
    const [treatmentOverview, setTreatmentOverview] = useState("");
    const [medications, setMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const medicationFields = {
        MEDICATION_NAME: "Medication Name",
        MEDICATION_STRENGTH: "Medication Strength",
        MEDICATION_REQUIRED_DOSES: "Required Doses",
        MEDICATION_TAKEN_DOSES: "Taken Doses",
        MEDICATION_FREQUENCY: "Frequency of Doses",
        MEDICATION_DOSE: "Medication Dose"
    }

    useEffect(() => {
        (async () => {
            const treatmentResponse = await API.getPatientTreatment(patient.id);
            setMedications([...treatmentResponse.medications]);
            setTreatmentOverview(treatmentResponse.overview);

            setIsLoading(false);
        })();
    }, []);

    function updateMedicationField(e, id) {
        switch (e.target.placeholder) {
            case medicationFields.MEDICATION_NAME:
                setMedications(prev =>
                    prev.map(med =>
                        med.id === id ? { ...med, name: e.target.value } : med
                    ));
                break;

            case medicationFields.MEDICATION_STRENGTH:
                setMedications(prev =>
                    prev.map(med =>
                        med.id === id ? { ...med, strength: e.target.value } : med
                    ));
                break;

            case medicationFields.MEDICATION_REQUIRED_DOSES:
                setMedications(prev =>
                    prev.map(med =>
                        med.id === id ? { ...med, number_of_required_doses: e.target.value } : med
                    ));
                break;

            case medicationFields.MEDICATION_TAKEN_DOSES:
                setMedications(prev =>
                    prev.map(med =>
                        med.id === id ? { ...med, number_of_taken_doses: e.target.value } : med
                    ));
                break;

            case medicationFields.MEDICATION_FREQUENCY:
                setMedications(prev =>
                    prev.map(med =>
                        med.id === id ? { ...med, frequency_in_hours: e.target.value } : med
                    ));
                break;

            case medicationFields.MEDICATION_DOSE:
                setMedications(prev =>
                    prev.map(med =>
                        med.id === id ? { ...med, dose: e.target.value } : med
                    ));
                break;
        }
    }

    function handleTreatmentPlanEditSubmit() {

    }

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <Modal show={show} size="xl" centered onHide={onHide}>
            <Modal.Header closeButton>
                <h2>{patient.user.first_name} {patient.user.last_name}</h2>
            </Modal.Header>

            <Modal.Body>
                <form id="treatment-edit-form" onSubmit={handleTreatmentPlanEditSubmit}>
                    <h3>Overview</h3>
                    <textarea form="treatment-edit-form" type="text" placeholder="Treatment Overview" className="form-control p-3 my-3" value={treatmentOverview} onChange={(e) => setTreatmentOverview(e.target.value)} required></textarea>

                    <h3>Medications</h3>
                    {medications.map((medication, index) => {
                        return (
                            <div key={index} className="d-flex flex-row align-items-center mb-3">
                                <button type="button" className="btn-close" onClick={() => setMedications(prev => prev.filter(med => med.id !== medication.id))}></button>
                                <div className="form-floating m-2">
                                    <input type="text" className="rounded-2 form-control" value={medication.name} onChange={(e) => updateMedicationField(e, medication.id)} placeholder={medicationFields.MEDICATION_NAME} required />
                                    <label htmlFor="floatingInput">Medication Name</label>
                                </div>

                                <div className="form-floating m-2">
                                    <input type="text" className="rounded-2 form-control" value={medication.strength} onChange={(e) => updateMedicationField(e, medication.id)} placeholder={medicationFields.MEDICATION_STRENGTH} required />
                                    <label htmlFor="floatingInput">Medication Strength</label>
                                </div>

                                <div className="form-floating m-2">
                                    <input type="text" className="rounded-2 form-control" value={medication.number_of_required_doses} onChange={(e) => updateMedicationField(e, medication.id)} placeholder={medicationFields.MEDICATION_REQUIRED_DOSES} required />
                                    <label htmlFor="floatingInput">Required Doses</label>
                                </div>

                                <div className="form-floating m-2">
                                    <input type="text" className="rounded-2 form-control" value={medication.number_of_taken_doses} onChange={(e) => updateMedicationField(e, medication.id)} placeholder={medicationFields.MEDICATION_TAKEN_DOSES} required />
                                    <label htmlFor="floatingInput">Taken Doses</label>
                                </div>

                                <div className="form-floating m-2">
                                    <input type="text" className="rounded-2 form-control" value={medication.frequency_in_hours} onChange={(e) => updateMedicationField(e, medication.id)} placeholder={medicationFields.MEDICATION_FREQUENCY} required />
                                    <label htmlFor="floatingInput">Frequency of Doses</label>
                                </div>

                                <div className="form-floating m-2">
                                    <input type="text" className="rounded-2 form-control" value={medication.dose} onChange={(e) => updateMedicationField(e, medication.id)} placeholder={medicationFields.MEDICATION_DOSE} required />
                                    <label htmlFor="floatingInput">Medication Dose</label>
                                </div>
                            </div>
                        );
                    })}
                    <button type="button" className="btn btn-primary" onClick={() => setMedications(prev => [...prev, { name: "", strength: "", number_of_required_doses: "", number_of_taken_doses: "", frequency_in_hours: "", dose: "" }])}>Add another medication</button>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-success" type="submit" form="treatment-edit-form">Save</button>
            </Modal.Footer>
        </Modal>
    );
}
