import React, { useState } from "react";
import ApproveModal from "./ApproveModal";

export default function ApproveMedicationButton({ patient, pendingMedication }) {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <button className="btn btn-success m-1" onClick={() => setToggleModal(true)}>Approve</button>

      <ApproveModal show={toggleModal} patient={patient} pendingMedication={pendingMedication} onHide={() => setToggleModal(false)}/>
    </>
  );
}
