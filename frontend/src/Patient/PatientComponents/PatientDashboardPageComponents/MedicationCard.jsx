function MedicationCard({medication}) {
    return(
        <div className="bg-body-secondary rounded-3 my-3 p-2">
            <h3>{medication.name}</h3>
            <img src={medication.photo_url} alt={medication.name} />
        </div>
    );
}

export default MedicationCard
