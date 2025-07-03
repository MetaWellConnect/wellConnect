import React, { useContext } from "react";
import { AuthContext } from "../hooks/AuthProvider"
import PatientDashboardPage from "../Patient/pages/PatientDashboardPage";
import ProviderDashboardPage from "../Provider/pages/ProviderDashboardPage";

export default function PrivateRoutes() {
    const { user } = useContext(AuthContext);
    const AccountTypes = {
        PATIENT: "PATIENT",
        PROVIDER: "PROVIDER"
    }


    if (user.role === AccountTypes.PATIENT) {
        return (<PatientDashboardPage />)
    }

    if (user.role === AccountTypes.PROVIDER) {
        return <ProviderDashboardPage />
    }
}
