import { treatments, users } from '../../../../backend/data.js';

import GoToAppointmentManagerButton from '../../components/GoToAppointmentManagerButton.jsx'
import GoToChatButton from '../../components/GoToChatButton.jsx';
import GoToUploadMedicationButton from './PatientDashboardPageComponents/GoToUploadMedicationButton.jsx';
import ListOfMedications from './PatientDashboardPageComponents/ListOfMedications.jsx'

function PatientDashboardPage() {
    return (
        <>
            <h1>Welcome {users[0].name}!</h1>

            <ListOfMedications />
            <section className="treatment-overview">
                <h2>Treatment Overview</h2>
                <p>{treatments[0].treatmentOverview}</p>
                <h2>Time Until Next Dose</h2>
                <p>{users[0].nextDoseMedication}</p>
                <p>{users[0].timeUntilNextDose.toString()}</p>
            </section>

            <section className="navigation-buttons">
                <GoToUploadMedicationButton />
                <GoToChatButton />
                <GoToAppointmentManagerButton />
            </section>
        </>
    );
}

export default PatientDashboardPage;
