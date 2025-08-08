export const validatePatientId = (patientId: string | undefined) => {
  if (!patientId) {
    return {
      statusCode: 400,
      body: "Error: patient_id is required"
    };
  }

  if (typeof patientId !== 'string') {
    return {
      statusCode: 400,
      body: "Error: patient_id is not a string"
    };
  }
};