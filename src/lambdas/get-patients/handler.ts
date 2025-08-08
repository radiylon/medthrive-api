import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../../services/PatientService.ts';

export default async function getPatients(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    // Extract patientId from path parameters
    const patientId = event.pathParameters?.patient_id;

    if (patientId && typeof patientId !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify("Error: patient_id is not a string")
      };
    }

    const patientService = new PatientService();

    if (!patientId) {
      const patients = await patientService.getPatients();
      return {
        statusCode: 200,
        body: JSON.stringify(patients)
      };
    } else {
      const patient = await patientService.getPatientById(patientId);
      return {
        statusCode: 200,
        body: JSON.stringify(patient)
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify("Error: Internal server error")
    };
  }
};