import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback } from "react";
import { useEffect } from "react";
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
            resource: { type: "busy" }
        },
        {
            title: "Appointment",
            start: new Date("2025-07-18T10:00:00"),
            end: new Date("2025-07-18T12:00:00"),
            resource: { type: "appointment" }
        }
    ]
    */
    const [appointments, setAppointments] = useState(null);


    const fetchAppointments = useCallback(() => {

    });

    const fetchAppointmentSuggestions = useCallback(() => {

    });

    useEffect(() => {
        fetchAppointments();
        fetchAppointmentSuggestions();
    }, []);


    async function BookAppointment() {

    }

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
                events={appointments}
                startAccessor="start"
                style={{ height: "70vh" }}
                defaultView="work_week"
                views={["day", "work_week"]}
                timeslots={4}
                step={15}
            />
        </div>
    );
}

export default AppointmentManagerPage;
