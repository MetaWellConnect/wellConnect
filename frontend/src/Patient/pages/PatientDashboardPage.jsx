import { useEffect, useState } from "react";
import GoToAppointmentManagerButton from '../../components/GoToAppointmentManagerButton.jsx'
import GoToUploadMedicationButton from '../PatientComponents/PatientDashboardPageComponents/GoToUploadMedicationButton.jsx';
import ListOfMedications from '../../components/ListOfMedications.jsx'
import TreatmentOverview from '../PatientComponents/PatientDashboardPageComponents/TreatmentOverview.jsx';
import * as API from '../../api.js';
import { useAuth } from "../../hooks/AuthProvider.jsx";

function PatientDashboardPage() {
    const [patient, setPatient] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            setPatient(await API.getPatient(user.id));
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <div className="container text-left justify-content-left">
            <h1>Welcome {patient.user.first_name}!</h1>
            <h2>Prescriptions</h2>

            <div className="row d-flex flex-wrap">
                <div className="col">
                    <ListOfMedications renderApprovalMedicationCard={false} id={patient.id} />
                </div>

                <div className="col">
                    <TreatmentOverview id={patient.id} />

                    <section className="navigation-buttons">
                        <GoToUploadMedicationButton />
                        <GoToAppointmentManagerButton />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboardPage;
