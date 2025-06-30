import React, { useState } from "react";
import ViewMedicatioPlanModal from "./ViewTreatmentPlanModal"

export default function ViewTreatmentPlanButton() {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <button className="btn" onClick={() => setToggleModal(true)}>View Treatment Plan</button>

      <ViewMedicatioPlanModal show={toggleModal} onHide={() => setToggleModal(false)} />
    </>
  );
}
