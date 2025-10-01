import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../../services/PatientService.ts';
import { getPatientByIdSchema } from '../../schemas.ts';
import { getValidationErrorMessage } from '../../utils.ts';

const patientService = new PatientService();

export default async function getPatientById(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    const validationResult = getPatientByIdSchema.safeParse(event.pathParameters);
    
    if (!validationResult.success) {
      console.error("Error: Validation failed for get patient by ID ", validationResult.error);
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult)
      };
    }

    const patient = await patientService.getPatientById(validationResult.data.patient_id);

    return {
      statusCode: 200,
      body: JSON.stringify(patient)
    };
  } catch (err) {
    console.error("Error fetching patient by ID", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch patient"
    };
  }
};
