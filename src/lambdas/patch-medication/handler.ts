import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MedicationService from '../../services/MedicationService.ts';
import { patchMedicationSchema } from '../../schemas.ts';
import { getValidationErrorMessage } from '../../utils.ts';

const medicationService = new MedicationService();

export default async function patchMedication(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const eventBody = event.body ? JSON.parse(event.body) : null;
    
    const validationResult = patchMedicationSchema.safeParse(eventBody);
    
    if (!validationResult.success) {
      console.error("Error: Validation failed for patch medication ", validationResult.error);
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult, "Error: Invalid request body")
      };
    }

    const medication = await medicationService.updateMedication(validationResult.data);
  
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
