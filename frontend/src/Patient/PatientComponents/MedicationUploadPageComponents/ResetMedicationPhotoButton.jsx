import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const shakeStyle = `
    @keyframes shake {
    0% { transform: translate(0, 0); }
    20% { transform: translate(-5px, 0); }
    40% { transform: translate(5px, 0); }
    60% { transform: translate(-5px, 0); }
    80% { transform: translate(5px, 0); }
    100% { transform: translate(0, 0); }
    }
    .btn.shake {
        display: inline-block;
    }
    .btn.shake:hover {
        animation: shake 0.5s ease-in-out !important;
    }
`

function ResetMedicationPhotoButton({ setImgSrc }) {
    function resetWebcamImage() {
        setImgSrc(null);
    }

    return (
        <>
            <style>{shakeStyle}</style>
            <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => (
                    <Tooltip {...props}>
                        Restarts the medication upload process
                    </Tooltip>
                )}>
                <button onClick={resetWebcamImage} className="btn btn-danger w-100 p-4 mb-3 shake">Reset</button>
            </OverlayTrigger>
        </>
    );
}

export default ResetMedicationPhotoButton;
