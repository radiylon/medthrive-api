import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MedicationService from '../../services/MedicationService.ts';
import ScheduleService from '../../services/ScheduleService.ts';

export default async function postMedications(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const eventBody = event.body ? JSON.parse(event.body) : null;
    const patientId = event.pathParameters?.patient_id;
  
    if (!patientId) {
      return {
        statusCode: 400,
        body: "Error: patient_id is required"
      };
    }
  
    if (patientId && typeof patientId !== 'string') {
      return {
        statusCode: 400,
        body: "Error: patient_id is not a string"
      };
    }

    const medicationService = new MedicationService();
    const medication = await medicationService.createMedication(patientId, eventBody);

    const scheduleService = new ScheduleService();
    await scheduleService.createSchedules(medication);
  
    return {
      statusCode: 200,
      body: JSON.stringify(medication)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to create medication"
    };
  }
};