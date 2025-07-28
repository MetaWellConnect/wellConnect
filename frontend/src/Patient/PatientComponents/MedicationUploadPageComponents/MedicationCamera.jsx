import { useCallback, useRef } from 'react';
import * as API from '../../../api.js'
import Webcam from 'react-webcam'

function MedicationWebcam({ imgSrc, setImgSrc, setMedicationInformation, setIsLoading }) {
    const webcamRef = useRef(null);

    const processCapture = useCallback(() => {
        (async () => {
            setIsLoading(true);

            const image = webcamRef.current.getScreenshot();
            setImgSrc(image);

            const medicationInformation = await API.runOCR(image);
            setMedicationInformation(medicationInformation);

            setIsLoading(false);
        })();
    }, [webcamRef]);

    return (

        <div className="overflow-hidden my-3 rounded-3 d-flex flex-column justify-content-center">
            {
                imgSrc ?
                    <img src={imgSrc} alt="Image of medication" />
                    :
                    <Webcam ref={webcamRef} screenshotFormat="image/jpeg"
                        style={{ objectFit: 'cover', transform: 'scaleX(-1)' }} />
            }
            <button onClick={processCapture} className="btn btn-light w-100 p-4 mb-3 rounded-top-0 rounded-bottom-3">Take Photo</button>
        </div>
    );
}

export default MedicationWebcam;
