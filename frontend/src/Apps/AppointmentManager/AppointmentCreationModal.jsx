import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Alert } from 'react-bootstrap';
import * as API from "../../api";

export default function AppointmentCreationModal({ user, appointment_duration, selectedSuggestedAppointment, setFormattedAppointments, onHide, show }) {
    const AccountTypes = {
        PATIENT: "PATIENT",
        PROVIDER: "PROVIDER"
    }

    const formCss = "rounded-pill form-control w-75 p-3 m-2";
    const [isFailureAlertShowing, setIsFailureAlertShowing] = useState(false);
    const [isSuccessAlertShowing, setIsSuccessAlertShowing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [duration, setDuration] = useState(15);
    const [patients, setPatients] = useState([]);
    const [date, setDate] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        (async () => {
            if (user.role === AccountTypes.PROVIDER) {
                const patients = await API.getProviderPatients(user.id);
                setPatients(patients);
            }
        })();

        setDate(selectedSuggestedAppointment.start);
        setDuration(appointment_duration);
    }, [show]);

    function handleShowSuccessAlert() {
        setIsSuccessAlertShowing(true);
        setTimeout(() => setIsSuccessAlertShowing(false), 3000);
    }

    function handleShowFailureAlert() {
        setIsFailureAlertShowing(true);
        setTimeout(() => setIsFailureAlertShowing(false), 3000);
    }

    async function handleAppointmentCreation(e) {
        e.preventDefault();
        console.log("hi")
        try {
            if (!selectedPatient && user.role === AccountTypes.PROVIDER) {
                throw new Error("Patient must be selected!")
            }
            await API.postAppointment(user.id, user.role, date.getTime(), duration, name, (selectedPatient || user.id));

            selectedSuggestedAppointment.title = name;
            setFormattedAppointments((prevAppointments) => [...prevAppointments, selectedSuggestedAppointment]);

            onHide();
            handleShowSuccessAlert();
        } catch (e) {
            setErrorMsg(e.message);
            console.error(e);
            handleShowFailureAlert();
        }
    }

    return (
        <>
            <Modal show={show} size="lg" centered onHide={onHide}>
                <Modal.Header closeButton>
                    <h2>Create Appointment</h2>
                </Modal.Header>

                <Modal.Body>
                    <div className="container-fluid row">
                        <form className="col-sm d-flex flex-column justify-content-center align-items-center" id="appointment-approval-form" onSubmit={(e) => handleAppointmentCreation(e)}>
                            <input type="text" className={formCss} value={name} onChange={(e) => setName(e.target.value)} placeholder="Appointment Name" required />
                        </form>

                        {
                            user.role === AccountTypes.PROVIDER &&
                            <div className="p-3">
                                <label>Patient to Schedule Appointment With:&nbsp;</label>
                                <select value={selectedPatient} onChange={e => setSelectedPatient(Number(e.target.value))} id="appointment-approval-form" required>
                                    <optgroup label="Patients">
                                        <option disabled selected value=""> Select a Patient </option>
                                        {patients.map((patient, index) => {
                                            return (
                                                <option key={index} value={patient.id}>{patient.user.first_name} {patient.user.last_name}</option>
                                            );
                                        })}
                                    </optgroup>
                                </select>
                            </div>
                        }
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-success" type="submit" form="appointment-approval-form">Confirm</button>
                    <button className="btn btn-danger" onClick={onHide}>Cancel</button>
                </Modal.Footer>
            </Modal>

            <Alert show={isSuccessAlertShowing} variant='success' onClose={() => setIsSuccessAlertShowing(false)} dismissible className='position-fixed top-0 start-50 translate-middle-x mt-3'>
                <strong>Medication Uploaded Successfully!</strong>
            </Alert>
            <Alert show={isFailureAlertShowing} variant='danger' onClose={() => setIsFailureAlertShowing(false)} dismissible className='position-fixed top-0 start-50 translate-middle-x mt-3'>
                <strong>Medication Uploaded Failed! Error: {errorMsg}</strong>
            </Alert>
        </>
    );
}
