import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MockMedicationService from '../services/MockMedicationService.ts';

export default async function getMedicationById(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const medicationId = event.pathParameters?.medication_id;
    
    if (!medicationId) {
      return {
        statusCode: 400,
        body: "Error: medication_id is required"
      };
    }
  
    if (typeof medicationId !== 'string') {
      return {
        statusCode: 400,
        body: "Error: medication_id is not a string"
      };
    }
  
    const medicationService = new MockMedicationService();
    const medication = await medicationService.getMedicationById(medicationId);
  
    return {
      statusCode: 200,
      body: JSON.stringify(medication)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch medication"
    };
  }
};