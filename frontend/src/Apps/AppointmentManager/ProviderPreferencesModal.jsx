import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Alert } from 'react-bootstrap';
import * as API from "../../api";

export default function ProviderPreferencesModal({ user, onHide, show }) {
    const formCss = "rounded-2 form-control";
    const [isFailureAlertShowing, setIsFailureAlertShowing] = useState(false);
    const [isSuccessAlertShowing, setIsSuccessAlertShowing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [availableDays, setAvailableDays] = useState(["sun", "mon", "tue", "wed", "thu", "fri", "sat"]);
    const [appointmentLeadTimeMin, setAppointmentLeadTimeMin] = useState(120);
    const [futureAppointmentLimit, setFutureAppointmentLimit] = useState(30);
    const [maxAppointmentsPerDay, setMaxAppointmentsPerDay] = useState(10);
    const [endHour, setEndHour] = useState("America/Los_Angeles");
    const [minBufferMinutes, setMinBufferMinutes] = useState(15);
    const [startHour, setStartHour] = useState(9);
    const [timezone, setTimezone] = useState(17);

    useEffect(() => {
        (async () => {
            const preferences = await API.getProviderPreferences(user.id);

            setMaxAppointmentsPerDay(preferences.max_appointments_per_day);
            setMinBufferMinutes(preferences.min_buffer_minutes);
            setAppointmentLeadTimeMin(preferences.appointment_lead_time_min);
            setFutureAppointmentLimit(preferences.future_appointment_limit);
            setAvailableDays(preferences.available_days);
            setStartHour(preferences.start_hour);
            setEndHour(preferences.end_hour);
            setTimezone(preferences.timezone);
        })();
    }, [show]);

    function handleShowSuccessAlert() {
        setIsSuccessAlertShowing(true);
        setTimeout(() => setIsSuccessAlertShowing(false), 3000);
    }

    function handleShowFailureAlert() {
        setIsFailureAlertShowing(true);
        setTimeout(() => setIsFailureAlertShowing(false), 3000);
    }

    async function handlePreferencesUpdate(e) {
        e.preventDefault();

        try {
            const preferences = {
                appointment_lead_time_min: appointmentLeadTimeMin,
                future_appointment_limit: futureAppointmentLimit,
                max_appointments_per_day: maxAppointmentsPerDay,
                min_buffer_minutes: minBufferMinutes,
                available_days: availableDays.split(","),
                start_hour: startHour,
                timezone: timezone,
                end_hour: endHour,
            }
            await API.postProviderPreferences(user.id, preferences);
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
                    <h2>Change Appointment Preferences</h2>
                </Modal.Header>

                <Modal.Body>
                    <div className="container-fluid row">
                        <form className="col d-flex flex-column justify-content-center align-items-center" id="appointment-preferences-form" onSubmit={(e) => handlePreferencesUpdate(e)}>
                            <div class="form-floating mb-3">
                                <input type="text" className={formCss} value={maxAppointmentsPerDay} onChange={(e) => setMaxAppointmentsPerDay(Number(e.target.value))} placeholder="Max Appointments Per Day" required />
                                <label for="floatingInput">Max Appointments Per Day</label>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="text" className={formCss} value={minBufferMinutes} onChange={(e) => setMinBufferMinutes(Number(e.target.value))} placeholder="Minimum Buffer Time in Minutes" required />
                                <label for="floatingInput">Minimum Buffer Time in Minutes</label>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="text" className={formCss} value={appointmentLeadTimeMin} onChange={(e) => setAppointmentLeadTimeMin(Number(e.target.value))} placeholder="Appointment Lead Time in Minutes" required />
                                <label for="floatingInput">Appointment Lead Time in Minutes</label>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="text" className={formCss} value={futureAppointmentLimit} onChange={(e) => setFutureAppointmentLimit(Number(e.target.value))} placeholder="Appointment Horizon Limit" required />
                                <label for="floatingInput">Appointment Horizon Limit</label>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="text" className={formCss} value={availableDays} onChange={(e) => setAvailableDays(e.target.value)} placeholder="Max Appointments Per Day" required />
                                <label for="floatingInput">Available Days</label>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="text" className={formCss} value={startHour} onChange={(e) => setStartHour(Number(e.target.value))} placeholder="Work Start Hour (24hr clock)" required />
                                <label for="floatingInput">Work Start Hour (24hr clock)</label>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="text" className={formCss} value={endHour} onChange={(e) => setEndHour(Number(e.target.value))} placeholder="Work End Hour (24hr clock)" required />
                                <label for="floatingInput">Work End Hour (24hr clock)</label>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="text" className={formCss} value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="Timezone" required />
                                <label for="floatingInput">Timezone</label>
                            </div>

                        </form>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-success m-3" type="submit" form="appointment-preferences-form">Confirm</button>
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
