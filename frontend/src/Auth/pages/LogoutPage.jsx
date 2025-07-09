import { useEffect } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { logoutUser } from "../../api";
import { useNavigate } from "react-router";

function LogoutPage() {
    const { logoutFrontend } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            logoutFrontend();
            logoutUser();

            setTimeout(() => {
                navigate('/');
            }, 3000);
        })();
    }, []);

    return (
        <div className="d-flex vh-100 align-items-center justify-content-center">
            <h1>You have been successfully logged out of MediScan!</h1>
        </div>
    );
}

export default LogoutPage;
