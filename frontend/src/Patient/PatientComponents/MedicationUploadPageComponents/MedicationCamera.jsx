import { useCallback, useRef } from 'react';
import Webcam from 'react-webcam'

function MedicationWebcam({imgSrc, setImgSrc}) {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const image = webcamRef.current.getScreenshot();
        setImgSrc(image);
    }, [webcamRef]);

    return (

        <div className="overflow-hidden my-3 rounded-3 d-flex flex-column justify-content-center">
            {
                imgSrc ?
                    <img src={imgSrc} alt="Image of medication" />
                    :
                    <Webcam ref={webcamRef} mirrored style={{ objectFit: 'cover' }} />
            }
            <button onClick={capture} className="btn btn-light w-100 p-4 mb-3 rounded-top-0 rounded-bottom-3">Take Photo</button>
        </div>
    );
}

export default MedicationWebcam;
