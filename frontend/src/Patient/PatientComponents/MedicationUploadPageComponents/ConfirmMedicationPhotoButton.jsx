import { useAuth } from '../../../hooks/AuthProvider';
import { Alert } from 'react-bootstrap'
import * as API from '../../../api';
import { useState } from 'react';

function ConfirmMedicationPhotoButton({ medicationInformation, imgSrc }) {
    const [isAlertShowing, setIsAlertShowing] = useState(false);
    const { user } = useAuth();

    function handleShowAlert() {
        setIsAlertShowing(true);
        setTimeout(() => setIsAlertShowing(false), 3000);
    }

    async function uploadMedication() {
        try {
            await API.postMedication(user.id, medicationInformation.name, medicationInformation.strength, imgSrc);
            handleShowAlert();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button className="btn btn-success w-100 p-4 mb-3" onClick={uploadMedication}>Confirm</button>
            {isAlertShowing && <Alert variant='success' onClose={() => setIsAlertShowing(false)} dismissible className='position-fixed top-0 translate-middle-x mt-3'>
                <strong>Medication Uploaded Successfully!</strong>
            </Alert>}
        </>
    );
}

export default ConfirmMedicationPhotoButton;
