"use client";

import { Web5 } from "@web5/api";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import Ajv from "ajv";

export async function getMyDID() {
  const { did } = await Web5.connect();
  return did;
}

export async function fetchBackend(endpoint, method = "GET", body = {}) {
  const baseUrl = "http://localhost:3001";
  const url = baseUrl + endpoint;

  let result;

  if (method == "GET") {
    result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    result = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
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

function createValidator(schema) {
  const ajv = new Ajv({ allErrors: true, useDefaults: true });
  const validator = ajv.compile(schema);
  return (model) => {
    validator(model);
    if (validator.errors && validator.errors.length) {
      throw { details: validator.errors };
    }
  };
}

export function schemaBridgeAutoForm(schema) {
  const schemaValidator = createValidator(schema);
  const bridge = new JSONSchemaBridge(schema, schemaValidator);
  return bridge;
}
