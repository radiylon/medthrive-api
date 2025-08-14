import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MedicationService from '../../services/MedicationService.ts';
import ScheduleService from '../../services/ScheduleService.ts';

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

    const { patient_id, name, quantity, is_active, schedule } = eventBody;
  
    if (!patient_id || !name || !quantity || !is_active || !schedule) {
      return {
        statusCode: 400,
        body: "Error: Missing required fields"
      };
    }

    const medicationService = new MedicationService();
    const scheduleService = new ScheduleService();

    const medication = await medicationService.createMedication(eventBody);
    await scheduleService.createSchedules(medication);
  
    return {
      statusCode: 200,
      body: JSON.stringify('Medication created successfully')
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to create medication"
    };
  }
};
