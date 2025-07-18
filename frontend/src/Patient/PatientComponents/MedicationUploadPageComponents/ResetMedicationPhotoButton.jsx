function ResetMedicationPhotoButton({ setImgSrc }) {
    function resetWebcamImage() {
        setImgSrc(null);
    }

    return (
        <button onClick={resetWebcamImage} className="btn btn-danger w-100 p-4 mb-3">Reset</button>
    );
}

export default ResetMedicationPhotoButton;
