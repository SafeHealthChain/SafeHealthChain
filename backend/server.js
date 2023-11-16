//node v18.0.0

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const { Web5 } = require("@web5/api");

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server initialized on port ", PORT);
});

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);
app.use(bodyParser.json());

const JSONSchemas = (schemaName) => {
  const medicalConditionSchema = {
    name: "MedicalCondition",
    jsonLDSchema: {
      "@context": "https://schema.org/",
      "@type": "MedicalCondition",
      properties: [
        "name",
        "code",
        "alternateName",
        "associatedAnatomy",
        "cause",
        "differentialDiagnosis",
        "signOrSymptom",
        "possibleTreatment",
        "riskFactor",
        "primaryPrevention",
        "typicalTest",
      ],
    },
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "Name",
        },
        code: {
          type: "object",
          properties: {
            "@type": {
              type: "string",
              title: "",
              default: "MedicalCode",
              readOnly: true,
            },
            code: {
              type: "string",
              title: "Code",
            },
            codingSystem: {
              type: "string",
              title: "Coding System",
            },
          },
          title: "Code",
        },
        alternateName: {
          type: "string",
          title: "Alternate Name",
        },
        associatedAnatomy: {
          type: "object",
          properties: {
            "@type": {
              type: "string",
              enum: [
                "AnatomicalStructure",
                "AnatomicalSystem",
                "SuperficialAnatomy",
              ],
              title: "Anatomy Type",
            },
            name: {
              type: "string",
              title: "Anatomical Structure Name",
            },
          },
          title: "Associated Anatomy",
        },
        cause: {
          type: "object",
          properties: {
            cause1: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalCause",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Cause 1",
                },
              },
            },
            cause2: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalCause",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Cause 2",
                },
              },
            },
            cause3: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalCause",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Cause 3",
                },
              },
            },
          },
          title: "Causes",
        },
        differentialDiagnosis: {
          type: "object",
          properties: {
            "@type": {
              type: "string",
              readOnly: true,
              default: "DDxElement",
            },

            diagnosis: {
              type: "object",
              properties: {
                "@type": {
                  readOnly: true,
                  default: "MedicalCondition",
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Diagnosis Name",
                },
              },
              title: "Diagnosis",
            },
          },
          title: "Differential Diagnosis",
        },
        signOrSymptom: {
          type: "object",
          properties: {
            sign1: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalSymptom",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Sign 1",
                },
              },
            },
            sign2: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalSymptom",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Sign 2",
                },
              },
            },
            sign3: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalSymptom",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Sign 3",
                },
              },
            },
            sign4: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalSymptom",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Sign 4",
                },
              },
            },
            sign5: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalSymptom",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Sign 5",
                },
              },
            },
          },
          title: "Signs Or Symptoms",
        },
        possibleTreatment: {
          type: "object",
          properties: {
            treatment1: {
              type: "object",
              properties: {
                "@type": {
                  default: "Drug",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Treatment 1",
                },
              },
            },
            treatment2: {
              type: "object",
              properties: {
                "@type": {
                  default: "Drug",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Treatment 2",
                },
              },
            },
            treatment3: {
              type: "object",
              properties: {
                "@type": {
                  default: "Drug",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Treatment 3",
                },
              },
            },
          },
          title: "Possible Treatments",
        },
        riskFactor: {
          type: "object",
          properties: {
            factor1: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalRiskFactor",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Factor 1",
                },
              },
            },
            factor2: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalRiskFactor",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Factor 2",
                },
              },
            },
            factor3: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalRiskFactor",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Factor 3",
                },
              },
            },
          },
          title: "Risk Factors",
        },
        primaryPrevention: {
          type: "object",
          properties: {
            prevention1: {
              type: "object",
              properties: {
                "@type": {
                  default: "LifestyleModification",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Prevention 1",
                },
              },
            },
            prevention2: {
              type: "object",
              properties: {
                "@type": {
                  default: "LifestyleModification",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Prevention 2",
                },
              },
            },
            prevention3: {
              type: "object",
              properties: {
                "@type": {
                  default: "LifestyleModification",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Prevention 3",
                },
              },
            },
          },
          title: "Primary Prevention",
        },
        typicalTest: {
          type: "object",
          properties: {
            test1: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalTest",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Test 1",
                },
              },
            },
            test2: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalTest",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Test 2",
                },
              },
            },
            test3: {
              type: "object",
              properties: {
                "@type": {
                  default: "MedicalTest",
                  readOnly: true,
                  type: "string",
                },
                name: {
                  type: "string",
                  title: "Test 3",
                },
              },
            },
          },
          title: "Tests",
        },
      },
      required: [],
    },
    uiSchema: {
      alternateName: {
        "ui:widget": "text",
      },
      associatedAnatomy: {
        "@type": {
          "ui:widget": "select",
        },
        name: {
          "ui:widget": "text",
        },
      },
      cause: {
        cause1: {
          "ui:widget": "text",
        },
        cause2: {
          "ui:widget": "text",
        },
        cause3: {
          "ui:widget": "text",
        },
      },
      code: {
        code: {
          "ui:widget": "text",
        },
        codingSystem: {
          "ui:widget": "text",
        },
      },
      differentialDiagnosis: {
        diagnosis: {
          name: {
            "ui:widget": "text",
          },
        },
        distinguishingSign: {
          sign1: {
            "ui:widget": "text",
          },
          sign2: {
            "ui:widget": "text",
          },
          sign3: {
            "ui:widget": "text",
          },
          sign4: {
            "ui:widget": "text",
          },
          sign5: {
            "ui:widget": "text",
          },
        },
      },
      name: {
        "ui:widget": "text",
      },
      possibleTreatment: {
        treatment1: {
          "ui:widget": "text",
        },
        treatment2: {
          "ui:widget": "text",
        },
        treatment3: {
          "ui:widget": "text",
        },
      },
      riskFactor: {
        factor1: {
          "ui:widget": "text",
        },
        factor2: {
          "ui:widget": "text",
        },
        factor3: {
          "ui:widget": "text",
        },
      },
      primaryPrevention: {
        prevention1: {
          "ui:widget": "text",
        },
        prevention2: {
          "ui:widget": "text",
        },
        prevention3: {
          "ui:widget": "text",
        },
      },
      signOrSymptom: {
        symptom1: {
          "ui:widget": "text",
        },
        symptom2: {
          "ui:widget": "text",
        },
        symptom3: {
          "ui:widget": "text",
        },
        symptom4: {
          "ui:widget": "text",
        },
        symptom5: {
          "ui:widget": "text",
        },
      },

      possibleComplication: {
        complication1: {
          "ui:widget": "text",
        },
        complication2: {
          "ui:widget": "text",
        },
        complication3: {
          "ui:widget": "text",
        },
      },
      typicalTest: {
        test1: {
          "ui:widget": "text",
        },
        test2: {
          "ui:widget": "text",
        },
        test3: {
          "ui:widget": "text",
        },
      },
    },
  };

  const allSchemas = [medicalConditionSchema];

  for (let schema of allSchemas) {
    if (schema.name == schemaName) {
      return [schema.schema, schema.uiSchema, schema.jsonLDSchema];
    }
  }
};

const formatSchema = async (args, schemaName) => {
  if (!JSONSchemas(schemaName)) {
    return false;
  }

  const schema = JSONSchemas(schemaName)[2];

  const schemaWithInfo = {
    "@context": schema["@context"],
    "@type": schema["@type"],
  };

  for (let index in schema.properties) {
    let property = schema.properties[index];

    //if its a list of objects
    if (
      Object.values(args[property]).filter((a) => typeof a == "object")
        .length == Object.values(args[property]).length
    ) {
      schemaWithInfo[property] = [];
      for (let index in args[property]) {
        let item = args[property][index];
        if (item.name) {
          schemaWithInfo[property].push(item);
        }
      }
    } else {
      schemaWithInfo[property] = args[property];
    }
  }

  return schemaWithInfo;
};

const getWeb5 = async (myDid) => {
  const { web5 } = await Web5.connect({
    connectedDid: myDid,
  });

  return web5;
};

//ig I should configure the protocol
const addRecordToDwn = async (schema, myDid) => {
  let web5 = await getWeb5(myDid);

  const response = await web5.dwn.records.create({
    data: schema,
    message: {
      schema: schema["@context"] + schema["@type"],
      dataFormat: "application/json",
    },
  });

  if (response.status.code === 202) {
    return true;
  } else {
    return false;
  }
};

app.post("/request-schema", (req, res) => {
  const { schemaName } = req.body;
  const schema = JSONSchemas(schemaName)[0];
  res.send(JSON.stringify(schema));
});

app.post("/request-ui-schema", (req, res) => {
  const { schemaName } = req.body;
  const schema = JSONSchemas(schemaName)[1];
  res.send(JSON.stringify(schema));
});

//------------------pushed-------------------------

app.post("/add-schema-to-dwn", async (req, res) => {
  const { myDid, formData, schemaName } = req.body;
  const schemaWithInfo = await formatSchema(formData, schemaName);
  const result = addRecordToDwn(schemaWithInfo, myDid);
  res.json({ result: result });
  // const web5 = await getWeb5(myDid);
});
