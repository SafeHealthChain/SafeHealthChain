"use client";
import { useEffect, useState } from "react";
import {
  getMyDID,
  fetchBackend,
  addToDwn,
  getPatientDID,
} from "@/app/helpers/page";

import { withTheme } from "@rjsf/core";
import Bootstrap4Theme from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";

export default function medicalConditions() {
  const [myDID, setMyDID] = useState(null);
  const [schema, setSchema] = useState(null);
  const [UISchema, setUISchema] = useState(null);
  const schemaName = "MedicalCondition";

  const ThemedForm = withTheme(Bootstrap4Theme);

  useEffect(() => {
    const initialize = async () => {
      if (!myDID) {
        setMyDID(await getMyDID());
      }

      //read medical conditions inputs and display when creating a schema
      let schema = await fetchBackend("/request-schema", "POST", {
        schemaName: schemaName,
      });
      let uiSchema = await fetchBackend("/request-ui-schema", "POST", {
        schemaName: schemaName,
      });
      setSchema(schema);
      setUISchema(uiSchema);
      //read medical conditions and display from client side
    };

    const read = async () => {};

    initialize();
    read();
  }, []);

  const onSubmit = async ({ formData }, e) => {
    const schema = await fetchBackend("/format-as-schema", "POST", {
      formData: formData,
      schemaName: schemaName,
    });
    const result = await addToDwn(schema);
    //if result is true, then green card saying it was sent
  };

  return (
    <>
      <h1>Medical Conditions</h1>
      <div id="medical-conditions-form">
        <div className="uniforms">
          {schema ? (
            <>
              <ThemedForm
                schema={schema}
                uiSchema={UISchema}
                liveValidate={true}
                validator={validator}
                onSubmit={onSubmit}
              ></ThemedForm>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>{" "}
    </>
  );
}
