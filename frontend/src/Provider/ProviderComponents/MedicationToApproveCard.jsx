function MedicationToApproveCard({medication}) {
    return(
        <div className="bg-body-secondary rounded-3 my-3 p-2">
            <h3>{medication.name}</h3>
            <p>{medication.description}</p>
        </div>
    );
}

export default MedicationToApproveCard
