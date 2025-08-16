import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MedicationService from '../../services/MedicationService.ts';

export default async function patchMedication(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    
    const eventBody = event.body ? JSON.parse(event.body) : null;
    
    if (!eventBody) {
      return {
        statusCode: 400,
        body: "Error: Invalid request body"
      };
    }

    const medicationId = eventBody?.id;

    if (!medicationId) {
      return {
        statusCode: 400,
        body: "Error: id is required"
      };
    }

    if (typeof medicationId !== 'string') {
      return {
        statusCode: 400,
        body: "Error: id is not a string"
      };
    }

    const medicationService = new MedicationService();
    const medication = await medicationService.updateMedication(eventBody);
  
    return {
      statusCode: 200,
      body: JSON.stringify(medication)
    };
  } catch (err) {
    console.error("Error updating medication", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to update medication"
    };
  }
};
