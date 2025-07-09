import React, { useState } from "react";
import ViewTreatmentPlanModal from "./ViewTreatmentPlanModal"
import ViewEditableTreatmentPlanModal from "./ViewEditableTreatmentPlanModal"

export default function ViewTreatmentPlanButton({ patient, allowTreatmentEdit }) {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <button className="btn" onClick={() => setToggleModal(true)}>View Treatment Plan</button>

      {allowTreatmentEdit ?
        <ViewEditableTreatmentPlanModal patient={patient} show={toggleModal} onHide={() => setToggleModal(false)} /> :
        <ViewTreatmentPlanModal patient={patient} show={toggleModal} onHide={() => setToggleModal(false)}/>}
    </>
  );
}
