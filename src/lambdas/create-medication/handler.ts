import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MedicationService from '../../services/MedicationService.ts';
import ScheduleService from '../../services/ScheduleService.ts';
import { createMedicationSchema } from '../../schemas.ts';
import { getValidationErrorMessage } from '../../utils.ts';

export default async function createMedication(
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
    
    const validationResult = createMedicationSchema.safeParse(eventBody);
    
    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult, "Error: Missing required fields")
      };
    }

    const medicationService = new MedicationService();
    const scheduleService = new ScheduleService();

    const medication = await medicationService.createMedication(validationResult.data);
    await scheduleService.createSchedules(medication);
  
    return {
      statusCode: 200,
      body: JSON.stringify('Medication created successfully')
    };
  } catch (err) {
    console.error("Error creating medication", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to create medication"
    };
  }
};
