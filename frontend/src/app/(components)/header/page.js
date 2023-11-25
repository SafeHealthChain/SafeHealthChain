import { getMyDID, getPatientDID, updatePatientDID } from "@/app/helpers/page";
import { useEffect, useState } from "react";

export default function Header() {
  const [patientDID, setPatientDID] = useState(null);

  useEffect(() => {
    if (!patientDID) {
      setPatientDID(getPatientDID());
    }
  }, []);

  const copyDID = async () => {
    const did = await getMyDID();
    navigator.clipboard.writeText(did);
  };

  const changePatient = () => {
    const newPatientDID = document.getElementById("NewPatientDID").value;
    updatePatientDID(newPatientDID);
    setPatientDID(getPatientDID());
  };

  return (
    <>
      <div>
        <p>Current patient DID: {patientDID}</p>

        <label>New patient DID</label>
        <input placeholder="Input new patient DID" id="NewPatientDID"></input>
        <button onClick={changePatient}>Change</button>
        <button onClick={copyDID}>Copy ID</button>
      </div>
    </>
  );
}
