import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MedicationService from '../../services/MedicationService.ts';

export default async function patchMedications(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const medicationId = event.pathParameters?.medication_id;
    const eventBody = event.body ? JSON.parse(event.body) : null;
  
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

    const medicationService = new MedicationService();
    const medication = await medicationService.updateMedication(eventBody);
  
    return {
      statusCode: 200,
      body: JSON.stringify(medication)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to update medication"
    };
  }
};