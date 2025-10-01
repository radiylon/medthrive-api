import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MockPatientService from '../services/MockPatientService.ts';
import { getPatientByIdSchema } from '../../../schemas.ts';
import { getValidationErrorMessage } from '../../../utils.ts';

export default async function getPatientById(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    const validationResult = getPatientByIdSchema.safeParse(event.pathParameters);
    
    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult)
      };
    }

    const { patient_id: patientId } = validationResult.data;

    const patientService = new MockPatientService();
    const patient = await patientService.getPatientById(patientId);

    return {
      statusCode: 200,
      body: JSON.stringify(patient)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch patient"
    };
  }
};
