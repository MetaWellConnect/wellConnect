import AppointmentCreationModal from "./AppointmentCreationModal";
import ProviderPreferencesModal from "./ProviderPreferencesModal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuth } from "../../hooks/AuthProvider";
import { useEffect, useState } from "react";
import * as API from '../../api'
import moment from 'moment'

const localizer = momentLocalizer(moment);

function AppointmentManagerPage() {
    /*
    What appointments look like
    const appointments = [
        {
            title: "Busy",
            start: new Date("2025-07-17T10:00:00"),
            end: new Date("2025-07-17T12:00:00"),
        },
        {
            title: "Appointment",
            start: new Date("2025-07-18T10:00:00"),
            end: new Date("2025-07-18T12:00:00"),
        }
    ]
    */
    const [selectedSuggestedAppointment, setSelectedSuggestedAppointment] = useState("");
    const [formattedAppointments, setFormattedAppointments] = useState([]);
    const [suggestedAppointments, setSuggestedAppointments] = useState([]);
    const [togglePreferencesModal, setTogglePreferencesModal] = useState(false);
    const [toggleAppointmentModal, setToggleAppointmentModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [duration, setDuration] = useState(15);
    const { user } = useAuth();

    async function fetchAppointments(id, role) {
        const appointments = await API.getAppointments(id, role);
        setAppointments(appointments);

        let formattedAppointmentsArray = [];    // Stores the appointments formatted for the calendar
        for (let index = 0; index < appointments.length; index++) {
            const appointmentName = appointments[index].patient ? appointments[index].name : "Busy"

            const startTime = new Date(appointments[index].date);
            const endTime = new Date(appointments[index].date);
            endTime.setMinutes(endTime.getMinutes() + appointments[index].duration_in_minutes);

            const formattedAppointment = {
                title: appointmentName,
                start: startTime,
                end: endTime,
            }

            formattedAppointmentsArray.push(formattedAppointment)
        }

        setFormattedAppointments(formattedAppointmentsArray);
    }

    async function fetchAppointmentSuggestions(id, role, duration) {
        const suggestedAppointmentsResponse = await API.getSuggestedAppointments(id, role, duration);

        let formattedAppointmentsArray = [];    // Stores the appointments formatted for the calendar
        suggestedAppointmentsResponse.forEach((appointment) => {

            const startTime = new Date(appointment.timeSlot);
            const endTime = new Date(appointment.timeSlot);
            endTime.setMinutes(endTime.getMinutes() + duration);

            const formattedAppointment = {
                title: "",
                start: startTime,
                end: endTime,
            }

            formattedAppointmentsArray.push(formattedAppointment);
        });

        setSuggestedAppointments(formattedAppointmentsArray);
    }

    useEffect(() => {
        (async () => {
            await fetchAppointments(user.id, user.role);
            await fetchAppointmentSuggestions(user.id, user.role, duration);
            setIsLoading(false);
        })();
    }, [duration]);


    function BookAppointment() {
        setToggleAppointmentModal(true);
    }

    function selectSuggestion(e) {
        const appointmentOptions = {
            SLOT_ONE: "appointment-suggestion-1",
            SLOT_TWO: "appointment-suggestion-2",
            SLOT_THREE: "appointment-suggestion-3"
        };

        switch (e.target.id) {
            case appointmentOptions.SLOT_ONE:
                setSelectedSuggestedAppointment(suggestedAppointments[0]);
                break;
            case appointmentOptions.SLOT_TWO:
                setSelectedSuggestedAppointment(suggestedAppointments[1]);
                break;
            case appointmentOptions.SLOT_THREE:
                setSelectedSuggestedAppointment(suggestedAppointments[2]);
                break;
        }
    }

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    // Store today for calendar setup
    const today = new Date();

    return (
        <div className="container pt-5">
            <h1>Appointment Manager</h1>
            <section className="appointment-suggestion-selector border-secondary border-1 rounded-3 d-flex align-items-center">
                <div className="p-2">
                    <h2>
                        Suggested Meeting Times
                    </h2>
                    <p>
                        Select a suggested time for your appointment.
                    </p>
                    <label> Appointment Duration:&nbsp;</label>
                    <select value={duration} onChange={e => setDuration(Number(e.target.value))}>
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                    </select>
                </div>

                <div className="form-check" onChange={e => selectSuggestion(e)}>
                    <input type="radio" className="btn-check" name="appointment-suggestion" id="appointment-suggestion-1" />
                    <label className="btn btn-outline-primary m-2" htmlFor="appointment-suggestion-1">
                        <strong>Suggestion 1<br /></strong>
                        <span>{suggestedAppointments[0].start.toLocaleDateString()}<br /></span>
                        <span>{suggestedAppointments[0].start.toLocaleTimeString()} - {suggestedAppointments[0].end.toLocaleTimeString()}</span>
                    </label>

                    <input type="radio" className="btn-check" name="appointment-suggestion" id="appointment-suggestion-2" />
                    <label className="btn btn-outline-primary m-2" htmlFor="appointment-suggestion-2">
                        <strong>Suggestion 2<br /></strong>
                        <span>{suggestedAppointments[1].start.toLocaleDateString()}<br /></span>
                        <span>{suggestedAppointments[1].start.toLocaleTimeString()} - {suggestedAppointments[1].end.toLocaleTimeString()}</span>
                    </label>

                    <input type="radio" className="btn-check" name="appointment-suggestion" id="appointment-suggestion-3" />
                    <label className="btn btn-outline-primary m-2" htmlFor="appointment-suggestion-3">
                        <strong>Suggestion 3<br /></strong>
                        <span>{suggestedAppointments[2].start.toLocaleDateString()}<br /></span>
                        <span>{suggestedAppointments[2].start.toLocaleTimeString()} - {suggestedAppointments[2].end.toLocaleTimeString()}</span>
                    </label>
                </div>

                <button className="btn btn-primary" onClick={BookAppointment}>
                    Create Appointment
                </button>
            </section>

            <Calendar
                localizer={localizer}
                events={formattedAppointments}
                startAccessor="start"
                style={{ height: "70vh" }}
                defaultView="work_week"
                views={["day", "work_week"]}
                timeslots={1}
                step={15}
                max={new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    22
                )}
                min={new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    7
                )}
            />
            {user.role === "PROVIDER" && <button className="btn btn-primary m-2" onClick={setTogglePreferencesModal}>Edit Scheduling Preferences</button>}

            <AppointmentCreationModal user={user} appointment_duration={duration} selectedSuggestedAppointment={selectedSuggestedAppointment} setFormattedAppointments={setFormattedAppointments} show={toggleAppointmentModal} onHide={() => setToggleAppointmentModal(false)} />
            {user.role === "PROVIDER" && <ProviderPreferencesModal user={user} show={togglePreferencesModal} onHide={() => setTogglePreferencesModal(false)} />}
        </div>
    );
}

export default AppointmentManagerPage;
