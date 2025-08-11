import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../../services/PatientService.ts';

export default async function postPatients(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: "Error: Request body is required"
      };
    }

    let eventBody;
    try {
      eventBody = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        body: "Error: Invalid JSON in request body"
      };
    }

    const { caregiver_id, first_name, last_name, email, phone_number, date_of_birth, gender } = eventBody;

    if (!caregiver_id || !first_name || !last_name || !email || !phone_number || !date_of_birth || !gender) {
      return {
        statusCode: 400,
        body: "Error: caregiver_id, first_name, last_name, email, phone_number, date_of_birth, and gender are required"
      };
    }

    if (caregiver_id && typeof caregiver_id !== 'string') {
      return {
        statusCode: 400,
        body: "Error: caregiver_id is not a string"
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