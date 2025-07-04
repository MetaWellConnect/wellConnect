import GoToAppointmentManagerButton from '../../components/GoToAppointmentManagerButton.jsx'
import GoToChatButton from '../../components/GoToChatButton.jsx';
import GoToUploadMedicationButton from '../PatientComponents/PatientDashboardPageComponents/GoToUploadMedicationButton.jsx';
import ListOfMedications from '../../components/ListOfMedications.jsx'
import TreatmentOverview from '../PatientComponents/PatientDashboardPageComponents/TreatmentOverview.jsx';
import { users } from '../../../data.js';

function PatientDashboardPage() {
    return (
        <div className="container text-left justify-content-left">
            <h1>Welcome {users[0].name}!</h1>
            <h2>Prescriptions</h2>

            <div className="row d-flex flex-wrap">
                <div className="col">
                    <ListOfMedications />
                </div>

                <div className="col">
                    <TreatmentOverview />

                    <section className="navigation-buttons">
                        <GoToUploadMedicationButton />
                        <GoToChatButton />
                        <GoToAppointmentManagerButton />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboardPage;
