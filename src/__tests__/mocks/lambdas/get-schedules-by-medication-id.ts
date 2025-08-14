import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MockScheduleService from '../services/MockScheduleService.ts';

export default async function getSchedulesByMedicationId(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const medicationId = event.pathParameters?.medication_id;
  
    if (!medicationId) {
      return {
        statusCode: 400,
        body: "Error: medication_id is required"
      };
    }

    if (typeof medicationId !== 'string') {
      return {
        statusCode: 400,
        body: "Error: medication_id is not a string"
      };
    }

    const scheduleService = new MockScheduleService();
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
