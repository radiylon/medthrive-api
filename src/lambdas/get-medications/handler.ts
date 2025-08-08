import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { medications } from '../../__tests__/data/medications.js';

export default async function getMedications(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  // Extract patientId from path parameters
  const patientId = event.pathParameters?.patientId;

  if (!patientId) {
    return {
      statusCode: 400,
      body: "Error: patientId is required"
    };
  }

  if (typeof patientId !== 'string') {
    return {
      statusCode: 400,
      body: "Error: patientId is not a string"
    };
  }

  // Filter medications by patientId
  const patientMedications = medications.filter(med => med.patient_id === patientId);

  return {
    statusCode: 200,
    body: JSON.stringify(patientMedications)
  };
};