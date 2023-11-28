"use client";
import {
  getMyDID,
  getPatientDID,
  updatePatientDID,
  switchPortalSide,
  getPortalSide,
} from "@/app/(components)/helpers/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [patientDID, setPatientDID] = useState(null);
  const [portalSide, setPortalSide] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!patientDID && !portalSide) {
      setPatientDID(getPatientDID());
      setPortalSide(getPortalSide());
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

  const switchPortal = () => {
    switchPortalSide();
    setPortalSide(getPortalSide());
    router.refresh();
  };

  return (
    <>
      <div>
        <p>Current patient DID: {patientDID}</p>

        <p>Portal: {portalSide}</p>
        <button onClick={switchPortal}>Switch Portal</button>

        {portalSide == "doctor" ? (
          <>
            <br></br>
            <br></br>
            <label>New patient DID</label>
            <input
              placeholder="Input new patient DID"
              id="NewPatientDID"
            ></input>
            <button onClick={changePatient}>Change</button>

            <button onClick={copyDID}>Copy ID</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
