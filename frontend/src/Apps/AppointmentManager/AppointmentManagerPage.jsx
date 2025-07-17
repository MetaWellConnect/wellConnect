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
    const [appointments, setAppointments] = useState([]);
    const [formattedAppointments, setFormattedAppointments] = useState([]);
    const { user } = useAuth();

    async function fetchAppointments(id, role) {
        // Retrieve the appointments
        // If a patient asks for the appointments
        // Return a censored list where other patient info is hidden
        // If a provider asks for the appointments
        // Return all the appointments
        const appointments = await API.getAppointments(id, role);
        setAppointments(appointments);

        let formattedAppointmentsArray = [];                    // Stores the appointments formatted for the calendar
        const timeZoneOffset = new Date().getTimezoneOffset();  // Stores the timezone offset as times in the database are stored in UTC

        for (let index = 0; index < appointments.length; index++) {
            const appointmentName = appointments[index].patient ? appointments[index].name : "Busy"

            // Initialize the startTime of the appointment. Adjust according to timezone
            const startTime = new Date(appointments[index].date);
            startTime.setMinutes(startTime.getMinutes() + timeZoneOffset)

            // Initialize the endTime of the appointment. Adjust according to timezone
            const endTime = new Date(appointments[index].date);
            endTime.setMinutes(endTime.getMinutes() + appointments[index].duration_in_minutes + timeZoneOffset);

            const formattedAppointment = {
                title: appointmentName,
                start: startTime,
                end: endTime,
            }

            formattedAppointmentsArray.push(formattedAppointment)
        }

        setFormattedAppointments(formattedAppointmentsArray);
    }

    async function fetchAppointmentSuggestions() {

    }

    useEffect(() => {
        (async () => {
            await fetchAppointments(user.id, user.role);
            await fetchAppointmentSuggestions();
        })();
    }, []);


    async function BookAppointment() {

    }

    // Store today for calendar setup
    const today = new Date();

    return (
        <div className="container">
            <h1>Appointment Manager</h1>

            <section className="appointment-suggestion-selector d-flex">
                <div>
                    <h2>
                        Suggested Meeting Times
                    </h2>
                    <p>
                        Select a suggested time for your appointment.
                    </p>
                </div>

                <div className="form-check" name="appointment-suggestion" onChange={(e) => console.log(e)}>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" name="appointment-suggestion" id="appointment-suggestion-1" />
                        <label className="form-check-label" htmlFor="appointment-suggestion-radio">
                            <strong>Appointment 1<br /></strong>
                            <span>01:00 - 03:30</span>
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" name="appointment-suggestion" id="appointment-suggestion-2" />
                        <label className="form-check-label" htmlFor="appointment-suggestion-radio">
                            <strong>Appointment 2<br /></strong>
                            <span>12:00 - 12:30</span>
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" name="appointment-suggestion" id="appointment-suggestion-3" />
                        <label className="form-check-label" htmlFor="appointment-suggestion-radio">
                            <strong>Appointment 3<br /></strong>
                            <span>10:00 - 10:30</span>
                        </label>
                    </div>
                </div>

                <button className="btn btn-primary">
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
                    6
                )}
            />
        </div>
    );
}

export default AppointmentManagerPage;
