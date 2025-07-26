import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { logoutUser } from "../../api";
import { useNavigate } from "react-router";

function LogoutPage() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const { logoutFrontend } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                await logoutFrontend();
                await logoutUser();
                setIsLoggedOut(true);
            } catch (error) {
                console.error(error)

            } finally {
                setTimeout(() => { navigate('/'); }, 2000);
            }
        })();
    }, []);

    if (!isLoggedOut) {
        return (
            <div className="d-flex vh-100 align-items-center justify-content-center">
                <h1>Failed to log out of MediScan!</h1>
            </div>
        );
    }

    return (
        <div className="d-flex vh-100 align-items-center justify-content-center">
            <h1>You have been successfully logged out of MediScan!</h1>
        </div>
    );
}

export default LogoutPage;
