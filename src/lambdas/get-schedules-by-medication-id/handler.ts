import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import ScheduleService from '../../services/ScheduleService.ts';

export default async function getSchedulesByMedicationId(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const medicationId = event.pathParameters?.medication_id;
  
    if (!medicationId) {
      return {
        statusCode: 400,
        body: "Error: schedule_id is required"
      };
    }

    const scheduleService = new ScheduleService();
    const schedules = await scheduleService.getSchedulesByMedicationId(medicationId);
  
    return {
      statusCode: 200,
      body: JSON.stringify(schedules)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to get schedules"
    };
  }
};
