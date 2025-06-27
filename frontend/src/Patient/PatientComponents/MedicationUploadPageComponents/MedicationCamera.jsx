import Webcam from 'react-webcam'

function MedicationWebcam() {

    return (
        <div className="overflow-hidden my-3 rounded-3">
            <Webcam mirrored style={{objectFit: 'cover'}} />
        </div>
    );
}

export default MedicationWebcam;
