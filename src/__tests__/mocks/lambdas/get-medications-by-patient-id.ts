import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MockMedicationService from '../services/MockMedicationService.ts';
import { getMedicationsByPatientIdSchema } from '../../../schemas.ts';
import { getValidationErrorMessage } from '../../../utils.ts';

export default async function getMedicationsByPatientId(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const validationResult = getMedicationsByPatientIdSchema.safeParse(event.pathParameters);
    
    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult)
      };
    }
  
    const { patient_id: patientId } = validationResult.data;
  
    const medicationService = new MockMedicationService();
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
