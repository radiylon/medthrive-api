import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MockMedicationService from '../services/MockMedicationService.ts';
import { getMedicationByIdSchema } from '../../../schemas.ts';
import { getValidationErrorMessage } from '../../../utils.ts';

export default async function getMedicationById(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const validationResult = getMedicationByIdSchema.safeParse(event.pathParameters);
    
    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult)
      };
    }
  
    const medicationService = new MockMedicationService();
    const medication = await medicationService.getMedicationById(validationResult.data.medication_id);
  
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
