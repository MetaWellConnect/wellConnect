import MedicationWebcam from "../PatientComponents/MedicationUploadPageComponents/MedicationCamera";

function MedicationUploadPage() {
    return(
        <div className="container text-left justify-content-left">
            <h1>Medication Upload</h1>
            <h2>Take a photo of your medication</h2>

            <div className="row d-flex flex-wrap">
                <div className="col">
                    <MedicationWebcam />
                </div>

                <div className="col">
                    
                </div>
            </div>
        </div>
    );
}

export default MedicationUploadPage;
