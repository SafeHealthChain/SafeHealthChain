//node v18.0.0

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

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
    schema: {
      type: "object",
      properties: {
        alternateName: {
          type: "string",
          title: "Alternate Name",
        },
        associatedAnatomy: {
          type: "object",
          properties: {
            type: {
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
              type: "string",
              title: "Cause 1",
            },
            cause2: {
              type: "string",
              title: "Cause 2",
            },
            cause3: {
              type: "string",
              title: "Cause 3",
            },
          },
          title: "Causes",
        },
        code: {
          type: "object",
          properties: {
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
        differentialDiagnosis: {
          type: "object",
          properties: {
            diagnosis: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  title: "Diagnosis Name",
                },
              },
              title: "Diagnosis",
            },
            distinguishingSign: {
              type: "object",
              properties: {
                sign1: {
                  type: "string",
                  title: "Sign 1",
                },
                sign2: {
                  type: "string",
                  title: "Sign 2",
                },
                sign3: {
                  type: "string",
                  title: "Sign 3",
                },
                sign4: {
                  type: "string",
                  title: "Sign 4",
                },
                sign5: {
                  type: "string",
                  title: "Sign 5",
                },
              },
              title: "Distinguishing Signs",
            },
          },
          title: "Differential Diagnosis",
        },
        name: {
          type: "string",
          title: "Name",
        },
        possibleTreatment: {
          type: "object",
          properties: {
            treatment1: {
              type: "string",
              title: "Treatment 1",
            },
            treatment2: {
              type: "string",
              title: "Treatment 2",
            },
            treatment3: {
              type: "string",
              title: "Treatment 3",
            },
          },
          title: "Possible Treatments",
        },
        riskFactor: {
          type: "object",
          properties: {
            factor1: {
              type: "string",
              title: "Factor 1",
            },
            factor2: {
              type: "string",
              title: "Factor 2",
            },
            factor3: {
              type: "string",
              title: "Factor 3",
            },
          },
          title: "Risk Factors",
        },
        primaryPrevention: {
          type: "object",
          properties: {
            prevention1: {
              type: "string",
              title: "Prevention 1",
            },
            prevention2: {
              type: "string",
              title: "Prevention 2",
            },
            prevention3: {
              type: "string",
              title: "Prevention 3",
            },
          },
          title: "Primary Prevention",
        },
        signOrSymptom: {
          type: "object",
          properties: {
            symptom1: {
              type: "string",
              title: "Symptom 1",
            },
            symptom2: {
              type: "string",
              title: "Symptom 2",
            },
            symptom3: {
              type: "string",
              title: "Symptom 3",
            },
            symptom4: {
              type: "string",
              title: "Symptom 4",
            },
            symptom5: {
              type: "string",
              title: "Symptom 5",
            },
          },
          title: "Signs or Symptoms",
        },
      },
      required: [
        "alternateName",
        "associatedAnatomy",
        "code",
        "name",
        "possibleTreatment",
        "riskFactor",
        "primaryPrevention",
        "signOrSymptom",
      ],
    },
    uiSchema: {
      alternateName: {
        "ui:widget": "text",
      },
      associatedAnatomy: {
        type: {
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
    },
  };

  const allSchemas = [medicalConditionSchema];

  for (let schema of allSchemas) {
    if (schema.name == schemaName) {
      return [schema.schema, schema.uiSchema];
    }
  }
};

//ig I should configure the protocol
const addMedicalCondition = async (
  name,
  code,
  associatedAnatomies,
  description,
  possibleComplication,
  riskFactors,
  signsOrSymptoms,
  primaryPreventions,
  possibleTreatments
) => {
  const medicalCondition = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: name,
    code: code,
    associatedAnatomy: associatedAnatomies,
    description: description,
    possibleComplication: possibleComplication,
    possibleTreatment: possibleTreatments,
    // [
    //   {
    //     "@type": "Drug",
    //     name: "aspirin",
    //   },
    //   {
    //     "@type": "DrugClass",
    //     name: "beta blockers",
    //   },
    //   {
    //     "@type": "DrugClass",
    //     name: "ACE inhibitors",
    //   },
    //   {
    //     "@type": "Drug",
    //     name: "nitroglycerine",
    //   },
    // ],
    riskFactor: riskFactors,
    // [
    //   {
    //     "@type": "MedicalRiskFactor",
    //     name: "Age",
    //   },
    //   {
    //     "@type": "MedicalRiskFactor",
    //     name: "Total cholesterol and/or cholesterol:HDL ratio",
    //   },
    //   {
    //     "@type": "MedicalRiskFactor",
    //     name: "Coronary artery disease",
    //   },
    // ],
    primaryPrevention: primaryPreventions,
    // [
    //   {
    //     "@type": "LifestyleModification",
    //     name: "stopping smoking",
    //   },
    //   {
    //     "@type": "LifestyleModification",
    //     name: "weight management",
    //   },
    //   {
    //     "@type": "LifestyleModification",
    //     name: "increased physical activity",
    //   },
    // ]
    signOrSymptom: signsOrSymptoms,
    //  [
    //   {
    //     "@type": "MedicalSymptom",
    //     name: "chest discomfort",
    //   },
    //   {
    //     "@type": "MedicalSymptom",
    //     name: "feeling of tightness, heaviness, or pain in the chest",
    //   },
    // ],
    typicalTest: {
      "@type": "MedicalTest",
      name: testName,
      usedToDiagnose: name,
    },
  };
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
