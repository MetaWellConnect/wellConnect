import Spinner from 'react-bootstrap/Spinner';

function MedicationInformationWidget({ medicationInformation }) {
    return (
        <>
            <section className="medication-information-view bg-body-secondary rounded-3 p-3 my-3">
                <h2>Medication Information</h2>
                <h3>Name</h3>
                <div>
                    {
                        medicationInformation ?
                            <p>{medicationInformation.name}</p>
                            :
                            <Spinner animation="border" role="status" />
                    }
                </div>
                <h3>Strength</h3>
                <div>
                    {
                        medicationInformation ?
                            <p>{medicationInformation.strength}</p>
                            :
                            <Spinner animation="border" role="status" />
                    }
                </div>
            </section>
        </>
    );
}

export default MedicationInformationWidget;
