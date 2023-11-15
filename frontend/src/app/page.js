"use client";
import { useEffect, useState } from "react";

import { getMyDID } from "@/app/helpers/page";

export default function Home() {
  let [myDID, setMyDID] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      setMyDID(await getMyDID());
    };
    initialize();
  }, []);

  return (
    <>
      <div>DID: {myDID}</div>
    </>
  );
}
