import ConfirmMedicationPhotoButton from "../PatientComponents/MedicationUploadPageComponents/ConfirmMedicationPhotoButton";
import MedicationInformationWidget from "../PatientComponents/MedicationUploadPageComponents/MedicationInformationWidget";
import ResetMedicationPhotoButton from "../PatientComponents/MedicationUploadPageComponents/ResetMedicationPhotoButton";
import MedicationWebcam from "../PatientComponents/MedicationUploadPageComponents/MedicationCamera";
import { useState } from "react";

function MedicationUploadPage() {
    const [medicationInformation, setMedicationInformation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);

    return (
        <div className="container text-left justify-content-left pt-5">
            <h1>Medication Upload</h1>
            <h2>Take a photo of your medication</h2>

            <div className="row d-flex flex-wrap">
                <div className="col-sm">
                    <MedicationWebcam imgSrc={imgSrc} setImgSrc={setImgSrc} setMedicationInformation={setMedicationInformation} setIsLoading={setIsLoading} />
                </div>

                <div className="col-sm">
                    <MedicationInformationWidget medicationInformation={medicationInformation} isLoading={isLoading} />
                    <ResetMedicationPhotoButton setImgSrc={setImgSrc} setMedicationInformation={setMedicationInformation} />
                    <ConfirmMedicationPhotoButton medicationInformation={medicationInformation} imgSrc={imgSrc} />
                </div>
            </div>
        </div>
    );
}

export default MedicationUploadPage;
