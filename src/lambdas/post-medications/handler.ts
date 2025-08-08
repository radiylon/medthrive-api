import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { medications } from '../../__tests__/data/medications.ts';

export default async function postMedications(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  // Extract patientId from request body
  const body = event.body ? JSON.parse(event.body) : null;
  const patientId = body?.patient_id;

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

  return {
    statusCode: 200,
    body: JSON.stringify(patientId) // TODO: replace w/ result
  };
};