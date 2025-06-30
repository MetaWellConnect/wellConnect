import { users } from "../../../../backend/data";
import GoToAppointmentManagerButton from "../../components/GoToAppointmentManagerButton";
import GoToChatButton from "../../components/GoToChatButton";
import ListOfMedications from "../../components/ListOfMedications"

function ProviderDashboardPage() {
    const provider = users[0];

    return (
        <>
            <div className="container text-left justify-content-left">
                <h1>Welcome {provider.name}!</h1>


                <div className="row d-flex flex-wrap">
                    <div className="col">
                        <h2>Pending Medications</h2>
                        <ListOfMedications renderApprovalMedicationCard={true} />
                    </div>

                    <div className="col">
                        <h2>Patients</h2>

                        <GoToChatButton />
                        <GoToAppointmentManagerButton />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProviderDashboardPage;
