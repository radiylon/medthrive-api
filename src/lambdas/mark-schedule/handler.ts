import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import ScheduleService from '../../services/ScheduleService.ts';

export default async function markSchedule(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const scheduleId = event.pathParameters?.schedule_id;
  
    if (!scheduleId) {
      return {
        statusCode: 400,
        body: "Error: schedule_id is required"
      };
    }
  
    if (scheduleId && typeof scheduleId !== 'string') {
      return {
        statusCode: 400,
        body: "Error: schedule_id is not a string"
      };
    }

    const scheduleService = new ScheduleService();
    const schedule = await scheduleService.markScheduleAsTaken(scheduleId);
  
    return {
      statusCode: 200,
      body: JSON.stringify(schedule)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to mark schedule as taken"
    };
  }
};
