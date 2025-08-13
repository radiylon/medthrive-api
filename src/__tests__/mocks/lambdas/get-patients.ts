import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../services/PatientService.ts';

export default async function getPatients(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    const patientService = new PatientService();
    const patients = await patientService.getPatients();

    return {
      statusCode: 200,
      body: JSON.stringify(patients)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch patients"
    };
  }
};