import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as API from "../../api";

export default function ProviderPreferencesModal({ user, onHide, show }) {
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

        })();
    }, [show])

    async function handlePreferencesUpdate(e) {
        e.preventDefault();

        try {
            const preferences = {
                endHour,
                timezone,
                startHour,
                availableDays,
                minBufferMinutes,
                maxAppointmentsPerDay,
                appointmentLeadTimeMin,
                futureAppointmentLimit
            }
            await API.postProviderPreferences(user.id, preferences);
            onHide();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide}>
            <Modal.Header closeButton>
                <h2>Change Appointment Preferences</h2>
            </Modal.Header>

            <Modal.Body>
                <div className="container-fluid row">
                    <form className="col-sm d-flex flex-column justify-content-center align-items-center" id="appointment-preferences-form" onSubmit={(e) => handlePreferencesUpdate(e)}>
                        <input type="text" className={formCss} value={maxAppointmentsPerDay} onChange={(e) => setMaxAppointmentsPerDay(e.target.value)} placeholder="Max Appointments Per Day" required />
                        <input type="text" className={formCss} value={minBufferMinutes} onChange={(e) => setMinBufferMinutes(e.target.value)} placeholder="Minimum Buffer Time in Minutes" required />
                        <input type="text" className={formCss} value={appointmentLeadTimeMin} onChange={(e) => setAppointmentLeadTimeMin(e.target.value)} placeholder="Appointment Lead Time in Minutes" required />
                        <input type="text" className={formCss} value={futureAppointmentLimit} onChange={(e) => setFutureAppointmentLimit(e.target.value)} placeholder="Appointment Horizon Limit" required />
                        <input type="text" className={formCss} value={availableDays} onChange={(e) => setAvailableDays(e.target.value)} placeholder="Max Appointments Per Day" required />
                        <input type="text" className={formCss} value={startHour} onChange={(e) => setStartHour(e.target.value)} placeholder="Work Start Hour (24hr clock)" required />
                        <input type="text" className={formCss} value={endHour} onChange={(e) => setEndHour(e.target.value)} placeholder="Work End Hour (24hr clock)" required />
                        <input type="text" className={formCss} value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="Timezone" required />
                    </form>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-success" type="submit" form="appointment-preferences-form">Confirm</button>
                <button className="btn btn-danger" onClick={onHide}>Cancel</button>
            </Modal.Footer>
        </Modal>
    );
}
