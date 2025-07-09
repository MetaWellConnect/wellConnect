import { useEffect, useState } from "react";
import GoToAppointmentManagerButton from "../../components/GoToAppointmentManagerButton";
import GoToChatButton from "../../components/GoToChatButton";
import ListOfMedications from "../../components/ListOfMedications"
import ListOfPatients from "../ProviderComponents/ListOfPatients";
import { getProvider } from "../../../testAPI";

function ProviderDashboardPage() {
    const [provider, setProvider] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setProvider(await getProvider(4));
            setIsLoading(false);
        })();
        console.log(provider)
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <>
            <div className="container text-left justify-content-left">
                <h1>Welcome {provider.first_name}!</h1>


                <div className="row d-flex flex-wrap">
                    <div className="col-sm">
                        <h2>Pending Medications</h2>
                        <ListOfMedications renderApprovalMedicationCard={true} id={provider.id}/>
                    </div>

                    <div className="col-sm">
                        <h2>Patients</h2>
                        <ListOfPatients providerId={provider.id}/>
                        <GoToChatButton />
                        <GoToAppointmentManagerButton />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProviderDashboardPage;
