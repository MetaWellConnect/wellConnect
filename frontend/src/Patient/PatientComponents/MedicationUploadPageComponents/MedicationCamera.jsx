import Webcam from 'react-webcam'
import { useRef, useState, useCallback } from 'react';

function MedicationWebcam() {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSource = webcamRef.current.getScreenshot();
        setImgSrc(imageSource)
    }, [webcamRef]);

    return (
        <div className="rounded-pill">
            <Webcam ref={webcamRef}  mirrored style={{objectFit: 'cover'}} />
        </div>
    );
}

export default MedicationWebcam;
