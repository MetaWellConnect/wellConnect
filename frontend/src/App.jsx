import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { Routes, Route, BrowserRouter, Link } from 'react-router'

import AppointmentManager from './Apps/AppointmentManager/AppointmentManagerPage.jsx'
import LoginPage from './Auth/pages/LoginPage.jsx'
import LogoutPage from './Auth/pages/LogoutPage.jsx'
import MedicationUploadPage from './Patient/pages/MedicationUploadPage.jsx'
import RegisterPage from './Auth/pages/RegisterPage.jsx'
import PrivateRoutes from './components/PrivateRoutes.jsx'
import DashboardRouteHandler from './components/DashboardRouteHandler.jsx'
import { useAuth } from './hooks/AuthProvider.jsx'


function App() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed container-fluid">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={user ? "/dashboard" : "/login"}>MediScan</Link>
                    {
                        user ?
                            <Link className="navbar-brand" to="/logout">Logout</Link>
                            :
                            <Link className="navbar-brand" to="/login">Login</Link>
                    }

                </div>
            </nav>

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {user && <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<DashboardRouteHandler />} />
                    <Route path="/medication-upload" element={<MedicationUploadPage />} />
                    <Route path="/appointment-manager" element={<AppointmentManager />} />
                </Route>}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
