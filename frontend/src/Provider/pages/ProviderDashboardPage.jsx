import { useEffect, useState } from "react";
import GoToAppointmentManagerButton from "../../components/GoToAppointmentManagerButton";
import ListOfMedications from "../../components/ListOfMedications"
import ListOfPatients from "../ProviderComponents/ListOfPatients";
import * as API from "../../api";
import { useAuth } from "../../hooks/AuthProvider";

function ProviderDashboardPage() {
    const [provider, setProvider] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            setProvider(await API.getProvider(user.id));
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <>
            <div className="container text-left justify-content-left pt-5">
                <h1>Welcome {provider.user.first_name}!</h1>

                <div className="row d-flex flex-wrap">
                    <div className="col-sm">
                        <h2>Pending Medications</h2>
                        <ListOfMedications renderApprovalMedicationCard={true} id={provider.id} />
                    </div>

                    <div className="col-sm">
                        <h2>Patients</h2>
                        <ListOfPatients providerId={provider.id} />
                        <GoToAppointmentManagerButton />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProviderDashboardPage;
