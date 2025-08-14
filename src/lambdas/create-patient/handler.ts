import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../../services/PatientService.ts';

export default async function createPatient(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const eventBody = event.body ? JSON.parse(event.body) : null;
  
    if (!eventBody) {
      return {
        statusCode: 400,
        body: "Error: Invalid request body"
      };
    }
  
    if (!eventBody.caregiver_id || !eventBody.first_name || !eventBody.last_name || !eventBody.email || !eventBody.phone_number || !eventBody.date_of_birth) {
      return {
        statusCode: 400,
        body: "Error: Missing required fields"
      };
    }

    const patientService = new PatientService();
    const patient = await patientService.createPatient(eventBody);
  
    return {
      statusCode: 200,
      body: JSON.stringify(patient)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to create patient"
    };
  }
};
