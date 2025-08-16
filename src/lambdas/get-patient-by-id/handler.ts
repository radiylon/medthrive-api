import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../../services/PatientService.ts';

export default async function getPatientById(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    const patientId = event.pathParameters?.patient_id;

    if (!patientId) {
      return {
        statusCode: 400,
        body: "Error: patient_id is required"
      };
    }

    if (patientId && typeof patientId !== 'string') {
      return {
        statusCode: 400,
        body: "Error: patient_id is not a string"
      };
    }

    const patientService = new PatientService();
    const patient = await patientService.getPatientById(patientId as string);

    return {
      statusCode: 200,
      body: JSON.stringify(patient)
    };
  } catch (err) {
    console.error("Error fetching patient by ID", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch patient"
    };
  }
};
