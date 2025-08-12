import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MedicationService from '../services/MedicationService.ts';

export default async function getMedicationsByPatientId(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const patientId = event.pathParameters?.patient_id;
    
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
  
    const medicationService = new MedicationService();
    const medications = await medicationService.getMedicationsByPatientId(patientId);
  
    return {
      statusCode: 200,
      body: JSON.stringify(medications)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch medications"
    };
  }
};