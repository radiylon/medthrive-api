import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { medications } from '../../__tests__/data/medications.js';
import { validatePatientId } from '../../helpers/validation.js';

export default async function getMedications(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  // Extract patientId from path parameters
  const patientId = event.pathParameters?.patient_id;
  validatePatientId(patientId);

  // TODO: replace with a database query
  // Filter medications by patient_id
  const patientMedications = medications.filter(med => med.patient_id === patientId);

  return {
    statusCode: 200,
    body: JSON.stringify(patientMedications)
  };
};