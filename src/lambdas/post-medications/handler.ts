import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { medications } from '../../__tests__/data/medications.js';
import { validatePatientId } from '../../helpers/validation.js';

export default async function postMedications(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  // Extract patientId from path parameters
  const patientId = event.pathParameters?.patient_id;
  validatePatientId(patientId);

  return {
    statusCode: 200,
    body: JSON.stringify(patientId) // TODO: replace w/ result
  };
};