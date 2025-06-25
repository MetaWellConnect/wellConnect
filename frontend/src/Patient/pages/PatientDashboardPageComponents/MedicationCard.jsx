function MedicationCard({medication}) {
    return(
        <>
            <h2>{medication.name}</h2>
            <p>{medication.description}</p>
        </>
    );
}

export default MedicationCard
