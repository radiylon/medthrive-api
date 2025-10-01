import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MedicationService from '../../services/MedicationService.ts';
import { getMedicationByIdSchema } from '../../schemas.ts';
import { getValidationErrorMessage } from '../../utils.ts';

const medicationService = new MedicationService();

export default async function getMedicationById(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const validationResult = getMedicationByIdSchema.safeParse(event.pathParameters);
    
    if (!validationResult.success) {
      console.error("Error: Validation failed for get medication by ID ", validationResult.error);
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult)
      };
    }
  
    const medication = await medicationService.getMedicationById(validationResult.data.medication_id);
  
    return {
      statusCode: 200,
      body: JSON.stringify(medication)
    };
  } catch (err) {
    console.error("Error fetching medication by ID", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch medication"
    };
  }
};
