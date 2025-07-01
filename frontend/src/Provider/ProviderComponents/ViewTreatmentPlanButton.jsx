import React, { useState } from "react";
import ViewTreatmentPlanModal from "./ViewTreatmentPlanModal"
import ViewEditableTreatmentPlanModal from "./ViewEditableTreatmentPlanModal"

export default function ViewTreatmentPlanButton({ patientId, allowTreatmentEdit }) {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <button className="btn" onClick={() => setToggleModal(true)}>View Treatment Plan</button>

      {allowTreatmentEdit ?
        <ViewEditableTreatmentPlanModal patientId={patientId} show={toggleModal} onHide={() => setToggleModal(false)} /> :
        <ViewTreatmentPlanModal patientId={patientId} show={toggleModal} onHide={() => setToggleModal(false)}/>}
    </>
  );
}
