import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../../services/PatientService.ts';
import { createPatientSchema } from '../../schemas.ts';
import { getValidationErrorMessage } from '../../utils.ts';

const patientService = new PatientService();

export default async function createPatient(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const eventBody = event.body ? JSON.parse(event.body) : null;
    
    if (!eventBody) {
      console.error("Error: Invalid request body");
      return {
        statusCode: 400,
        body: "Error: Invalid request body"
      };
    }
    
    const validationResult = createPatientSchema.safeParse(eventBody);
    
    if (!validationResult.success) {
      console.error("Error: Validation failed for create patient ", validationResult.error);
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult, "Error: Missing required fields")
      };
    }

    const patient = await patientService.createPatient(validationResult.data);
  
    return {
      statusCode: 200,
      body: JSON.stringify(patient)
    };
  } catch (err) {
    console.error("Error creating patient", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to create patient"
    };
  }
};
