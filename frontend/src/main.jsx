import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router'

import App from './App.jsx'
import AppointmentManager from './Apps/AppointmentManager/AppointmentManagerPage.jsx'
import LandingPage from './Apps/Landing/LandingPage.jsx'
import LoginPage from './Auth/pages/LoginPage.jsx'
import LogoutPage from './Auth/pages/LogoutPage.jsx'
import MedicationUploadPage from './Patient/pages/MedicationUploadPage.jsx'
import MedicationValidationPage from './Provider/pages/MedicationValidationPage.jsx'
import MessengerPage from './Apps/Messenger/MessengerPage.jsx'
import NotFound from './Apps/NotFound/NotFoundPage.jsx'
import PatientDashboardPage from './Patient/pages/PatientDashboardPage.jsx'
import ProviderDashboardPage from './Provider/pages/ProviderDashboardPage.jsx'
import RegisterPage from './Auth/pages/RegisterPage.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/logout',
    element: <LogoutPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/patient-dashboard',
    element: <PatientDashboardPage />
  },
  {
    path: '/medication-upload',
    element: <MedicationUploadPage />
  },
  {
    path: '/provider-dashboard',
    element: <ProviderDashboardPage />
  },
  {
    path: '/medication-validation',
    element: <MedicationValidationPage />
  },
  {
    path: '/appointment-manager',
    element: <AppointmentManager />
  },
  {
    path: '/messenger',
    element: <MessengerPage />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
