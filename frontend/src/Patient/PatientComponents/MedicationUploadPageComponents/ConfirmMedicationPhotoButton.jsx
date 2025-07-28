import { useAuth } from '../../../hooks/AuthProvider';
import { Alert } from 'react-bootstrap'
import * as API from '../../../api';
import { useState } from 'react';

function ConfirmMedicationPhotoButton({ medicationInformation, imgSrc }) {
    const [isFailureAlertShowing, setIsFailureAlertShowing] = useState(false);
    const [isSuccessAlertShowing, setIsSuccessAlertShowing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { user } = useAuth();

    function handleShowSuccessAlert() {
        setIsSuccessAlertShowing(true);
        setTimeout(() => setIsSuccessAlertShowing(false), 3000);
    }

    function handleShowFailureAlert() {
        setIsFailureAlertShowing(true);
        setTimeout(() => setIsFailureAlertShowing(false), 3000);
    }

    async function uploadMedication() {
        try {
            await API.postMedication(user.id, medicationInformation.name, medicationInformation.strength, imgSrc);
            handleShowSuccessAlert();
        } catch (e) {
            setErrorMsg(e.message);
            handleShowFailureAlert();
            console.error(e);
        }
    }

    return (
        <>
            <button className="btn btn-success w-100 p-4 mb-3" onClick={uploadMedication}>Confirm</button>
            {isSuccessAlertShowing && <Alert variant='success' onClose={() => setIsSuccessAlertShowing(false)} dismissible className='position-fixed top-0 translate-middle-x mt-3'>
                <strong>Medication Uploaded Successfully!</strong>
            </Alert>}
            {isFailureAlertShowing && <Alert variant='danger' onClose={() => setIsFailureAlertShowing(false)} dismissible className='position-fixed top-0 translate-middle-x mt-3'>
                <strong>Medication Uploaded Failed! Error: {errorMsg}</strong>
            </Alert>}
        </>
    );
}

export default ConfirmMedicationPhotoButton;
