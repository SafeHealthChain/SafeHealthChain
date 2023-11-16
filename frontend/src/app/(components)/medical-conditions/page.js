"use client";
import { useEffect, useState } from "react";
import { getMyDID, fetchBackend } from "@/app/helpers/page";

import Form from "@rjsf/core";
import { withTheme } from "@rjsf/core";
import Bootstrap4Theme from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";

export default function medicalConditions() {
  const [myDID, setMyDID] = useState(null);
  const [schema, setSchema] = useState(null);
  const [UISchema, setUISchema] = useState(null);

  const ThemedForm = withTheme(Bootstrap4Theme);

  useEffect(() => {
    const initialize = async () => {
      if (!myDID) {
        setMyDID(await getMyDID());
      }
      //read medical conditions inputs and display when creating a schema
      let schema = await fetchBackend("/request-schema", "POST", {
        schemaName: "MedicalCondition",
      });
      let uiSchema = await fetchBackend("/request-ui-schema", "POST", {
        schemaName: "MedicalCondition",
      });
      setSchema(schema);
      setUISchema(uiSchema);
      //read medical conditions and display
    };

    initialize();
  }, []);

  const onSubmit = async ({ formData }, e) => {
    let result = await fetchBackend("/add-schema-to-dwn", "POST", {
      myDID: myDID,
      formData: formData,
      schemaName: "MedicalCondition",
    });

    console.log("result: ", result);
  };

  return (
    <>
      <h1>Medical Conditions</h1>
      <p>DID: {myDID}</p>
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
