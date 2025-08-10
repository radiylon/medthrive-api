import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../../services/PatientService.ts';

export default async function getPatients(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
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

    const caregiverId = eventBody?.caregiver_id;

    if (!caregiverId) {
      return {
        statusCode: 400,
        body: "Error: caregiver_id is required"
      };
    }

    if (caregiverId && typeof caregiverId !== 'string') {
      return {
        statusCode: 400,
        body: "Error: caregiver_id is not a string"
      };
    }

    const patientService = new PatientService();
    const patient = await patientService.getPatientsByCaregiverId(caregiverId);

    return {
      statusCode: 200,
      body: JSON.stringify(patient)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch patients"
    };
  }
};