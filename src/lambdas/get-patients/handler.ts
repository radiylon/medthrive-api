import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { patients } from '../../__tests__/data/patients.ts';

export default async function getPatients(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  // Extract patientId from path parameters
  const patientId = event.pathParameters?.patient_id;

  if (patientId && typeof patientId !== 'string') {
    return {
      statusCode: 400,
      body: "Error: patient_id is not a string"
    };
  }

  // TODO: replace with a database query
  const patientsList = patientId ? patients.filter((patient) => patient.id === patientId) : patients;

  return {
    statusCode: 200,
    body: JSON.stringify(patientsList)
  };
};