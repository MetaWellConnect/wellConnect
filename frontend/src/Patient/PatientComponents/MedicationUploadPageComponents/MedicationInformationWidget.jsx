import { medications } from "../../../../data";

function MedicationInformationWidget() {
    const medication = medications[0];

    return (
        <>
            <section className="medication-information-view bg-body-secondary rounded-3 p-3 my-3">
                <h2>Medication Information</h2>

                {/* This information is test data. The way this data will be handled has not yet been decided */}
                <h3>Name</h3>
                <p>{medication.name}</p>
                <h3>Strength</h3>
                <p>{medication.strength}</p>
            </section>
        </>
    );
}

export default MedicationInformationWidget;
