import * as API from "../../api";

export default function DenyMedicationButton({ patient, pendingMedication, setMedicationList }) {

  async function handleDenyMedication() {
    try {
      await API.putMedication(patient.id, pendingMedication.id, {approved: false});
      setMedicationList((prevMedicationList) =>
        prevMedicationList.filter((medication) =>
          medication.id !== pendingMedication.id));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button className="btn btn-danger m-1" onClick={handleDenyMedication}>Deny</button>
  );
}
