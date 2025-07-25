import MedicationWebcam from "../PatientComponents/MedicationUploadPageComponents/MedicationCamera";
import MedicationInformationWidget from "../PatientComponents/MedicationUploadPageComponents/MedicationInformationWidget";
import ConfirmMedicationPhotoButton from "../PatientComponents/MedicationUploadPageComponents/ConfirmMedicationPhotoButton";
import ResetMedicationPhotoButton from "../PatientComponents/MedicationUploadPageComponents/ResetMedicationPhotoButton";
import { useState } from "react";

function MedicationUploadPage() {
    const [imgSrc, setImgSrc] = useState(null);
    const [medicationInformation, setMedicationInformation] = useState(null);

    return (
        <div className="container text-left justify-content-left">
            <h1>Medication Upload</h1>
            <h2>Take a photo of your medication</h2>

            <div className="row d-flex flex-wrap">
                <div className="col-sm">
                    <MedicationWebcam imgSrc={imgSrc} setImgSrc={setImgSrc} setMedicationInformation={setMedicationInformation} />
                </div>

                <div className="col-sm">
                    <MedicationInformationWidget medicationInformation={medicationInformation} />
                    <ResetMedicationPhotoButton setImgSrc={setImgSrc} />
                    <ConfirmMedicationPhotoButton medicationInformation={medicationInformation} />
                </div>
            </div>
        </div>
    );
}

export default MedicationUploadPage;
