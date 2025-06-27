import MedicationWebcam from "../PatientComponents/MedicationUploadPageComponents/MedicationCamera";
import MedicationInformationWidget from "../PatientComponents/MedicationUploadPageComponents/MedicationInformationWidget";
import ConfirmMedicationPhotoButton from "../PatientComponents/MedicationUploadPageComponents/ConfirmMedicationPhotoButton";
import RetakeMedicationPhotoButton from "../PatientComponents/MedicationUploadPageComponents/RetakeMedicationPhotoButton";

function MedicationUploadPage() {
    return(
        <div className="container text-left justify-content-left">
            <h1>Medication Upload</h1>
            <h2>Take a photo of your medication</h2>

            <div className="row d-flex flex-wrap">
                <div className="col-sm">
                    <MedicationWebcam />
                </div>

                <div className="col-sm">
                    <MedicationInformationWidget />
                    <RetakeMedicationPhotoButton />
                    <ConfirmMedicationPhotoButton />
                </div>
            </div>
        </div>
    );
}

export default MedicationUploadPage;
