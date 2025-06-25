import { useNavigate } from "react-router";

function GoToUploadMedicationButton() {
    const navigate = useNavigate();

    return (
        <>
            <button className="btn btn-primary btn-lg w-100 p-4 mb-3" onClick={() => navigate('/medication-upload')}>Upload Medication</button>
        </>
    );
}

export default GoToUploadMedicationButton;
