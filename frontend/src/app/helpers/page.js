"use client";

import { Web5 } from "@web5/api";

const protocolDefinition = {
  protocol: "http://localhost:3001/protocol",
  published: true,
  types: {
    medicalcondition: {
      schema: "https://schema.org/MedicalCondition",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    medicalcondition: {
      $actions: [
        { who: "anyone", can: "write" },
        { who: "author", of: "medicalcondition", can: "read" },
        { who: "recipient", of: "medicalcondition", can: "read" },
      ],
    },
  },
};

export async function getMyDID() {
  const { web5, did } = await Web5.connect();

  const { protocols, status: protocolStatus } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: protocolDefinition.protocol,
      },
    },
  });

  if (protocolStatus.code !== 200 || protocols.length === 0) {
    const { status: protocolStatus } = await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
    console.log("Configure protocol status", protocolStatus);
  }

  return did;
}

export async function fetchBackend(endpoint, method = "GET", body = {}) {
  const baseUrl = "http://localhost:3001";
  const url = baseUrl + endpoint;

  let result, stringifiedBody;

  //stringify body
  try {
    stringifiedBody = JSON.stringify(body);
  } catch (error) {
    stringifiedBody = stringify(body);
  }

  if (method == "GET") {
    result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    result = await fetch(url, {
      method: "POST",
      body: stringifiedBody,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    result = await result.json();
  } catch (error) {
    console.log("error: ", error);
    result = result;
  }

  return result;
}

export function getPatientDID() {
  const patientDID = localStorage.getItem("patientDID");
  if (!patientDID || patientDID == "" || patientDID == undefined) {
    return "No Patient DID";
  } else {
    return patientDID;
  }
}

export async function updatePatientDID(newPatientDID) {
  localStorage.setItem("patientDID", newPatientDID);
}

export async function addToDwn(schema) {
  const { web5, did } = await Web5.connect();

  const { record, status } = await web5.dwn.records.create({
    data: schema,
    message: {
      protocol: protocolDefinition.protocol,
      protocolPath: schema["@type"].toLowerCase(),
      schema: schema["@context"] + schema["@type"],
      recipient: getPatientDID(),
    },
  });

  sendRecord(record);

  readFromDwn();

  if (status.code == 202) {
    return true;
  } else {
    return false;
  }
}

export async function sendRecord(record) {
  return await record.send(getPatientDID());
}

export async function readFromDwn() {
  const { web5, did } = await Web5.connect();

  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        protocol: protocolDefinition.protocol,
      },
    },
  });

  console.log("records: ", await records[0].data.json());
}
