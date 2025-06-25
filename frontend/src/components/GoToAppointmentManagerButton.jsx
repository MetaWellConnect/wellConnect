import { useNavigate } from "react-router";

function GoToAppointmentManagerButton() {
    const navigate = useNavigate();

    return(
        <>
            <button className="btn btn-light w-100 p-3 mb-3" onClick={() => navigate('/appointment-manager')}>Go To Appointment Manager</button>
        </>
    );
}

export default GoToAppointmentManagerButton;
