import { useAuth } from '../../../hooks/AuthProvider';
import * as API from '../../../api';

function ConfirmMedicationPhotoButton({ medicationInformation, imgSrc }) {
    const { user } = useAuth();

    async function uploadMedication() {
        try {
            await API.postMedication(user.id, medicationInformation.name, medicationInformation.strength, imgSrc);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <button className="btn btn-success w-100 p-4 mb-3" onClick={uploadMedication}>Confirm</button>
    );
}

export default ConfirmMedicationPhotoButton;
